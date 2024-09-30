import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-md shadow-md">
        <div className="flex flex-col gap-y-5">
          <div className="w-full flex flex-row gap-x-4 justify-between items-center">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-[85%] text-black border border-input rounded-md p-2"
            />
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={createPaste}
            >
              {pasteId ? "Update Paste" : "Create My Paste"}
            </button>

            {pasteId && (
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={resetPaste}
              >
                <PlusCircle size={20} />
              </button>
            )}
          </div>

          <div className="w-full flex flex-col items-start relative rounded bg-opacity-10 border border-gray-300 backdrop-blur-2xl">
            <div className="w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-gray-300">
              <div className="w-full flex gap-x-[6px] items-center select-none">
                <div className="w-[13px] h-[13px] rounded-full bg-red-500" />
                <div className="w-[13px] h-[13px] rounded-full bg-yellow-500" />
                <div className="w-[13px] h-[13px] rounded-full bg-green-500" />
              </div>

              <button
                className="flex justify-center items-center transition-all duration-300 ease-in-out"
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", { position: "top-right" });
                }}
              >
                <Copy size={20} />
              </button>
            </div>

            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Write Your Content Here...."
              className="w-full p-3 focus-visible:ring-0 text-black"
              style={{ caretColor: "#000" }}
              rows={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

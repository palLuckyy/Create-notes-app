import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();

  const pastes = useSelector((state) => state.paste.pastes);

  // Filter pastes based on search term (by title or content)
  const paste = pastes.filter((paste) => paste._id === id)[0];

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-[80%] h-[80%] px-5 lg:px-0 flex flex-col justify-start pt-5 pb-10">
        <div className="flex flex-col gap-y-5 items-start w-full h-full">
          <input
            type="text"
            placeholder="Title"
            value={paste?.title || ""}
            disabled
            className="w-full text-black border border-input rounded-md p-2"
          />
          <div className="w-full h-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl">
            <div className="w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]">
              <div className="w-full flex gap-x-[6px] items-center select-none group">
                <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />
                <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]" />
                <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
              </div>

              {/* Copy Button */}
              <div className="w-fit rounded-t flex items-center justify-between gap-x-4 px-4">
                <button
                  className="flex justify-center items-center transition-all duration-300 ease-in-out group"
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content || "");
                    toast.success("Copied to Clipboard");
                  }}
                >
                  <Copy className="group-hover:text-success-500" size={20} />
                </button>
              </div>
            </div>

            {/* TextArea */}
            <textarea
              value={paste?.content || ""}
              disabled
              placeholder="Write Your Content Here...."
              className="w-full p-3 h-full resize-none focus-visible:ring-0"
              style={{
                caretColor: "#000",
              }}
              rows={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;

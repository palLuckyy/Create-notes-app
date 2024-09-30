import { Calendar, Copy, Eye, PencilLine, Trash2, Share2 } from "lucide-react"; // Import Share2
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react"; // Import useState
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatdate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
  };

  // Handle share action
  const handleShare = (paste) => {
    // Construct the shareable link (this can be customized based on your needs)
    const shareableLink = `http://yourapp.com/pastes/${paste._id}`;
    navigator.clipboard.writeText(shareableLink);
    toast.success("Shareable link copied to clipboard!");
  };

  // Filter pastes based on search term (by title or content)
  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-screen h-screen bg-gray-100">
      <div className="w-full max-w-5xl mx-auto p-6 bg-white rounded-md shadow-md">
        <div className="flex flex-col gap-y-3">
          {/* Search */}
          <div className="w-full flex gap-3 px-4 py-2 rounded-[0.3rem] border border-[rgba(128,121,121,0.3)] mt-6">
            <input
              type="search"
              placeholder="Search paste here..."
              className="focus:outline-none w-full bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* All Pastes */}
          <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
            <h2 className="px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4">
              All Pastes
            </h2>
            <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
              {filteredPastes.length > 0 ? (
                filteredPastes.map((paste) => (
                  <div
                    key={paste?._id}
                    className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
                  >
                    {/* heading and Description */}
                    <div className="w-[50%] flex flex-col space-y-3">
                      <p className="text-4xl font-semibold ">{paste?.title}</p>
                      <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-[#707070]">
                        {paste?.content}
                      </p>
                    </div>

                    {/* icons */}
                    <div className="flex flex-col gap-y-4 sm:items-end">
                      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                        <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-blue-500">
                          <a href={`/?pasteId=${paste?._id}`}>
                            <PencilLine
                              className="text-black group-hover:text-blue-500"
                              size={20}
                            />
                          </a>
                        </button>
                        <button
                          className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-pink-500"
                          onClick={() => handleDelete(paste?._id)}
                        >
                          <Trash2
                            className="text-black group-hover:text-pink-500"
                            size={20}
                          />
                        </button>

                        <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-orange-500">
                          <a href={`/pastes/${paste?._id}`} target="_blank">
                            <Eye
                              className="text-black group-hover:text-orange-500"
                              size={20}
                            />
                          </a>
                        </button>
                        <button
                          className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-green-500"
                          onClick={() => {
                            navigator.clipboard.writeText(paste?.content);
                            toast.success("Copied to Clipboard");
                          }}
                        >
                          <Copy
                            className="text-black group-hover:text-green-500"
                            size={20}
                          />
                        </button>
                        <button
                          className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7] hover:bg-transparent group hover:border-indigo-500"
                          onClick={() => handleShare(paste)}
                        >
                          <Share2
                            className="text-black group-hover:text-indigo-500"
                            size={20}
                          />
                        </button>
                      </div>

                      <div className="gap-x-2 flex ">
                        <Calendar className="text-black" size={20} />
                        {FormatDate(paste?.createdAt)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-2xl text-center w-full text-chileanFire-500">
                  No Data Found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;

import axios from "../../utils/token";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../utils/config";
import { toast } from "sonner";

interface AddContentProps {
  open: boolean;
  onClose: () => void;
  shared?: boolean;
}

const types = [
  { value: "Twitter", label: "Twitter" },
  { value: "Youtube", label: "Youtube" },
  { value: "Website", label: "Website" },
  { value: "Document", label: "Document" },
  { value: "Links", label: "Links" },
  { value: "Notion", label: "Notion" },
  { value: "Spotify", label: "Spotify" },
  { value: "Google Docs", label: "Google Docs" },
  { value: "Linkedin", label: "Linkedin" },
  { value: "Figma", label: "Figma" },
  { value: "Canva", label: "Canva" },
  { value: "Other", label: "Other" },
];

interface Tag {
  _id: string;
  name: string;
}

function CreateContent({ open, onClose, shared }: AddContentProps) {
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const [type, settype] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [showNewTagInput, setShowNewTagInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (shared) return;
    async function fetchTags() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/tags`);
        setTags(res.data.tags);
      } catch {
        toast.error("Error fetching tags ");
      }
    }
    fetchTags();
  }, [shared]);

  const handleTagSelection = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((name) => name !== tagName)
        : [...prev, tagName]
    );
  };

  const handleAddNewTag = async () => {
    if (tags.some((tag) => tag.name.toLowerCase() === newTag.toLowerCase())) {
      toast.error("Tag already exists ");
      return;
    }

    try {
      const res = await axios.put(`${BACKEND_URL}/api/v1/tags`, {
        tags: [newTag],
      });
      const createdTag = res.data.tags[0];
      setTags([...tags, createdTag]);
      setNewTag("");
      setShowNewTagInput(false);
      setSelectedTags([]);
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Failed to add new tag. " + error);
    }
  };

  const addContent = async () => {
    if (!title || !type) {
      toast.error("Please fill in all fields and select at least one tag.");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/api/v1/content`, {
        title,
        content,
        type,
        link,
        tags: selectedTags,
      });
      onClose();
      setTitle("");
      setcontent("");
      settype("");
      setLink("");
      toast.success("Successfully added content ");
    } catch (error) {
      toast.error("Error adding content: " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div
          className="w-screen h-screen fixed top-0 left-0  bg-opacity-50 z-50 flex items-center justify-center p-4"
          style={{ overflowY: "auto" }}
        >
          <div className="bg-white shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-lg relative transition-colors duration-200">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
              Add New Item
            </h2>

            <div className="space-y-5">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                  placeholder="Enter title"
                />
              </div>

              {/* Content Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content <span className="text-gray-400">(optional)</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setcontent(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                  placeholder="Enter the Content"
                ></textarea>
              </div>

              {/* Type Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => settype(e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                >
                  <option value="">Select type</option>
                  {types.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Link Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Link <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                  placeholder="Enter link"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags <span className="text-gray-400">(optional)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag._id}
                      type="button"
                      onClick={() => handleTagSelection(tag.name)}
                      className={`px-3 py-1 rounded-full border text-sm sm:text-base ${
                        selectedTags.includes(tag.name)
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-gray-100 text-gray-700 border-gray-300"
                      } hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowNewTagInput(true)}
                  className="text-orange-600 mt-2 text-sm sm:text-base"
                >
                  Add new tag
                </button>
              </div>

              {/* New Tag Input */}
              {showNewTagInput && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-grow px-3 py-2 sm:px-4 sm:py-2 rounded-md bg-gray-100 text-gray-900 border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                    placeholder="Enter new tag"
                  />
                  <button
                    onClick={handleAddNewTag}
                    className="px-3 py-2 sm:px-4 sm:py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors text-sm sm:text-base"
                  >
                    Add
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={addContent}
                disabled={isLoading}
                className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors text-sm sm:text-base"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateContent;

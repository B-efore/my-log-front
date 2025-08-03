import { useRef } from "react";
import { getDefaultImage, getToolbarIcon } from "../../util/get-images";
import { Tooltip } from "react-tooltip";

const markdownTypes = ["h1", "h2", "h3", "bold", "italic", "code", "quote"];
const tooltipMap = {
  h1: "짱짱짱커",
  h2: "짱짱커",
  h3: "짱커",
  italic: "넘어져!",
  bold: "뚠뚠해",
  code: "갇혔어!",
  quote: "오오전지전능하신외계인님께서말씀하시니",
  image: "버섯.",
}

const colorMap = {
  h1: "border-pink-400",
  h2: "border-pink-400",
  h3: "border-pink-400",
  italic: "border-green-600",
  bold: "border-green-600",
  code: "border-blue-500",
  quote: "border-yellow-400",
  image: "border-yellow-600",
};

const MarkdownToolbar = ({ applyMarkdown, uploadImages }) => {

  const fileInputRef = useRef();

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageFileChange = async (e) => {
    const files = Array.from(e.target.files);

    uploadImages(files);
    e.target.value = "";
  }

  return (
    <div className="bg-white flex flex-wrap gap-2">
      {markdownTypes.map((type) => (
        <button
          key={type}
          onClick={() => applyMarkdown(type)}
          className={`hover:opacity-70 transition-opacity duration-150 round-box-border ${colorMap[type]}`}
          data-tooltip-id="markdown-tooltip"
          data-tooltip-content={tooltipMap[type]}
        >
          <img src={getToolbarIcon(type)} alt={type} className="w-6 h-6" />
        </button>
      ))}
      <button
        type="button"
        onClick={handleImageButtonClick}
        title="이미지 업로드"
        className={`hover:opacity-70 transition-opacity duration-150 round-box-border ${colorMap["image"]}`}
        data-tooltip-id="markdown-tooltip"
        data-tooltip-content={tooltipMap["image"]}
      >
        <img src={getToolbarIcon("image")} alt="img" className="w-6 h-6" />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageFileChange}
        className="hidden"
      />

      <Tooltip
        id="markdown-tooltip"
        place="top"
        className={`!text-green-700 !bg-white !text-xs !shadow-[0_0_2px_rgba(0,0,0,0.3)]`}
      />
    </div>
  );
};

export default MarkdownToolbar;
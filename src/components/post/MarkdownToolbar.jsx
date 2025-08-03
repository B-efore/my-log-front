import { useRef } from "react";
import { getDefaultImage } from "../../util/get-images";
import { Tooltip } from "react-tooltip";

const markdownTypes = ["h1", "h2", "h3", "bold", "italic", "code", "quote"];
const tooltipMap = {
  h1: "짱커",
  h2: "짱짱커",
  h3: "짱짱짱커",
  bold: "뚠뚠해",
  italic: "넘어져!",
  code: "갇혔어!",
  quote: "오오전지전능하신외계인님께서말씀하시니",
}

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
    <div className="bg-white flex flex-wrap gap-4">
      {markdownTypes.map((type) => (
        <button
          key={type}
          onClick={() => applyMarkdown(type)}
          className="hover:opacity-70 transition-opacity duration-150"
          data-tooltip-id="markdown-tooltip"
          data-tooltip-content={tooltipMap[type]}
        >
          <img src={getDefaultImage(type)} alt={type} className="w-6 h-6" />
        </button>
      ))}
      <button
        type="button"
        onClick={handleImageButtonClick}
        title="이미지 업로드"
        className="hover:opacity-70"
      >
        <img src={getDefaultImage("image")} alt="img" className="w-6 h-6" />
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
        className="!bg-white !text-green-700 !text-xs !shadow-[0_0_2px_rgba(0,0,0,0.3)]"
      />
    </div>
  );
};

export default MarkdownToolbar;
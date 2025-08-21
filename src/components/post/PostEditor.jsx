import React, { useRef } from "react";
import TagInput from "../tag/TagInput";
import MarkdownToolbar from "./MarkdownToolbar";
import { getPresignedUrl, getPresignedUrls, uploadImageToS3 } from "../../api/imageService";
import { validatePostImage } from "../../util/get-images";
import { showErrorToast } from "../../util/toast";

const PostEditor = ({
  title,
  content,
  contentPreview,
  tags,
  onChange,
  addTag,
  removeTag,
}) => {

  const textareaRef = useRef(null);

  const insertAtCursor = (wrapperStart, wrapperEnd = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const value = textarea.value;
    const selected = value.slice(start, end);

    const newValue =
      value.slice(0, start) +
      wrapperStart + selected + wrapperEnd +
      value.slice(end);

    const newCursorPos = start + wrapperStart.length + selected.length;

    textarea.value = newValue;
    textarea.selectionStart = textarea.selectionEnd = newCursorPos;
    textarea.focus();

    onChange("content", newValue);
  };

  const applyMarkdown = (type) => {
    switch (type) {
      case "bold":
        insertAtCursor("**", "**");
        break;
      case "italic":
        insertAtCursor("*", "*");
        break;
      case "code":
        insertAtCursor("```\n살려줘", "\n```");
        break;
      case "quote":
        insertAtCursor("> 왹");
        break;
      case "h1":
        insertAtCursor("# ");
        break;
      case "h2":
        insertAtCursor("## ");
        break;
      case "h3":
        insertAtCursor("### ");
        break;
      case "image":
        insertAtCursor("![대체 텍스트](이미지주소)");
        break;
      default:
        break;
    }
  };

  const uploadImages = async (files) => {
    if (files.length === 0) return;

    const validFiles = [];
    for (const file of files) {
      const { valid, error } = validatePostImage(file);
      if (!valid) {
        showErrorToast(`${file.name}: ${error}`);
        return;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    const placeholderMap = new Map();
    for (const file of validFiles) {
      const placeholderId = `uploading-${file.name}-${Date.now()}`;
      const placeholder = `![업로드 중...](uploading://${placeholderId})`;
      insertAtCursor(placeholder + "\n");
      placeholderMap.set(file.name, placeholder);
    }

    try {
      const request = {
        images: validFiles.map(f => ({fileName: f.name}))
      };
      const res = await getPresignedUrls(request);
      const datas = res.data.presignedUrls;

      for (let i = 0; i < datas.length; i++) {
        const file = validFiles[i];
        const { key, presignedUrl } = datas[i];

        await uploadImageToS3(presignedUrl, file);

        const uploadedUrl = `https://mylog-image-bucket.s3.ap-northeast-2.amazonaws.com/${key}`;
        const currentContent = textareaRef.current.value;
        const placeholderText = placeholderMap.get(file.name);

        const newContent = currentContent.replace(
          placeholderText,
          `![](${uploadedUrl})`
        );

        onChange("content", newContent);
      }

    } catch (err) {
      console.error("다중 이미지 업로드 실패", err);
    }
  };

  const uploadImage = async (file) => {
    if (!file) return;

    const { valid, error } = validatePostImage(file);
    if (!valid) {
      showErrorToast(error);
      return;
    }

    const placeholderId = `uploading-${Date.now()}`;
    const placeholderText = `![업로드 중...](uploading://${placeholderId})`;
    insertAtCursor(placeholderText);

    try {
      const res = await getPresignedUrl({ fileName: file.name });
      const { key, presignedUrl } = res.data;

      await uploadImageToS3(presignedUrl, file);

      const uploadedUrl = `https://mylog-image-bucket.s3.ap-northeast-2.amazonaws.com/${key}`;
      const currentContent = textareaRef.current.value;

      const newContent = currentContent.replace(
        placeholderText,
        `![](${uploadedUrl})`
      );

      onChange("content", newContent);
    } catch (err) {
      console.error("이미지 업로드 실패", err);
      const currentContent = textareaRef.current.value;
      onChange(
        "content",
        currentContent.replace(placeholderText, "![업로드 실패]()")
      );
    }
  }

  const handlePasteImage = async (e) => {
    const clipboardItems = e.clipboardData.items;

    for (const item of clipboardItems) {
      if (item.type.indexOf("image") >= 0) {
        e.preventDefault();
        const file = item.getAsFile();
        uploadImage(file);
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 px-8 py-4 gap-4 overflow-auto w-full">
      <div className="flex flex-col text-left">
        <input
          className="outline-none border-none font-default-bold text-5xl"
          type="text"
          placeholder="제목"
          name="title"
          value={title}
          onChange={onChange}
        />
      </div>

      <hr className="divider" />

      <div className="flex">
        <TagInput tags={tags} onAdd={addTag} onRemove={removeTag} />
      </div>

      <hr className="divider" />

      <MarkdownToolbar
        applyMarkdown={applyMarkdown}
        uploadImages={uploadImages}
      />

      <hr className="divider" />

      <div className="flex-1 flex flex-col min-h-0 overflow-auto">
        <textarea
          ref={textareaRef}
          className="w-full min-h-full resize-none text-base whitespace-normal divide-none outline-none"
          placeholder="본문을 작성해주세요."
          name="content"
          value={content}
          onChange={onChange}
          onPaste={handlePasteImage}
        />
      </div>
    </div>
  );
};

export default PostEditor;
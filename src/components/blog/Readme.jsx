import { useLocation, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import MarkdownView from "../post/MarkdownView";
import { useState } from "react";
import { showErrorToast, showSuccessToast } from "../../util/toast";
import { editReadme } from "../../api/readmeService";

const Readme = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const readme = location.state?.readme;
    const previous = location.state?.from;

    const [content, setContent] = useState(readme?.content || '');

    const handleChange = (e) => {
        setContent(e.target.value);
    }

    const handleSave = async () => {
        if (!content || content.trim() === '') {
            showErrorToast("내용을 입력해!");
            return;
        }

        try {
            const res = await editReadme({ content });
            console.log(res);
            showSuccessToast("저장완료~");
            navigate(previous || '/');
        } catch (err) {
            console.error(err);
            showErrorToast("오류 발생!");
        }
    }


    return (
        <div className="flex flex-col h-screen">
            <Header
                rightChild={
                    <>
                        <div className="publish-button-wrapper" >
                            <button className="btn-primary px-10 py-2" onClick={handleSave}>저장</button>
                        </div>
                    </>
                }
            />

            <div className="flex flex-1 mt-14 min-h-0">
                <div className="flex flex-col flex-1 min-h-0 px-8 py-4 gap-4 overflow-auto w-full">
                    <div className="flex-1 flex flex-col min-h-0 overflow-auto">
                        <textarea
                            className="w-full min-h-full resize-none text-base whitespace-normal divide-none outline-none"
                            placeholder="자유로운 외계인을 설명하다. (MarkDown 및 HTML 지원)"
                            name="content"
                            value={content}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="hidden lg:flex flex-col flex-1 min-h-0 px-8 py-4 gap-4 overflow-auto text-left bg-green-50">
                    <MarkdownView
                        content={content}
                    />
                </div>
            </div>
        </div>
    );
};

export default Readme;
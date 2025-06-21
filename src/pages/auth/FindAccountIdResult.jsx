import { useEffect, useState } from "react";
import { getLogoImage } from "../../util/get-images";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { findAccountId } from "../../api/authService";
import { showErrorToast } from "../../util/toast";
import "./FindAccountIdResult.css"

const FindAccountIdResult = () => {

    const navigate = useNavigate();
    const goHome = () => navigate("/", { replace: true });

    const location = useLocation();
    const email = location.state?.email;

    const [result, setResult] = useState(null);

    useEffect(() => {
        if (!email) {
            navigate("/login", { replace: true });
        }
    }, [email, navigate]);

    useEffect(() => {
        if (email) {
            findAccountId({ email })
                .then(res => {
                    console.log(res);
                    setResult(res.data);
                })
                .catch(() => showErrorToast("정보를 불러올 수 없습니다."));
        }
    }, email);

    return (
        <div className="find-id-result-wrapper">
            <div className="find-id-result-container">
                <img onClick={goHome} src={getLogoImage()} alt="logo" className="find-password-logo" />
                <div className="title-wrapper">
                    <h2 className="title">
                        아이디 찾기 결과입니다.
                    </h2>
                </div>
                <div className="find-id-result-body">
                    {result ?
                        (result.provider === 'local' ? (
                            <div>
                                <strong>{result.accountId}</strong>
                            </div>
                        ) : (
                            <div>
                                <p>해당 이메일로 가입한 <strong>{result.provider}</strong> 소셜 로그인 계정이 존재합니다.</p>
                            </div>
                        )) :
                        (<p></p>)
                    }
                </div>
                <Link to="/login" replace={true}>로그인</Link>
            </div>
        </div>
    );
};

export default FindAccountIdResult;
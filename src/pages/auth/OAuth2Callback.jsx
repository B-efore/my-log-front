import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { showErrorToast } from "../../util/toast";
import { reissueToken } from "../../api/authService";

const OAuth2Callback = () => {
    const navigate = useNavigate();
    const { setLogin } = useAuth();
  
    useEffect(() => {
      const fetchAccessToken = async () => {
        try {
          const res = await reissueToken();
  
          const accessToken = res.data.accessToken;
          setLogin(accessToken);
  
          navigate("/");
        } catch (error) {
          showErrorToast("로그인에 실패했습니다. 다시 시도해주세요.");
          navigate("/login");
        }
      };
  
      fetchAccessToken();
    }, []);
  
    return <div>로그인 처리 중입니다...</div>;
  };
  
  export default OAuth2Callback;
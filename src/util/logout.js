export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profileImage");
    window.location.href = "/login";
  };
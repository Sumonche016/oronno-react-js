import { adminLogin } from "../Redux/auth/authSlice";
import Cookie from "./Cookie";
import { useDispatch } from "react-redux";

const InitializeAccessToken = () => {

    const dispatch = useDispatch()

    const accessToken = Cookie.get("accessToken")

    if (!accessToken) {
        return false
    }
    dispatch(adminLogin({ accessToken }))
    return true
};

export default InitializeAccessToken;
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStoreDispatch } from "../../../../hooks/useStore";
import type { GoogleLoginResponse, LoginResponse } from "../../../../types/user.types";
import { login } from "../../slices/authSlice";
import axios from 'axios';
const client_id = import.meta.env.VITE_CLIENTID;



const GoogleLogin = () => {
    const dispatch = useStoreDispatch()
    const navigate = useNavigate()
    const handleGoogleLogin = async () => {
        /* global google */
        

        try {
            const client = google.accounts.oauth2.initTokenClient({
                client_id: client_id,
                scope: 'openid profile email',
                callback: async (response: any) => {
                    

                    // Send token to backend
                    const { data: resData } = await axios.post<GoogleLoginResponse>(
                        'http://localhost:4004/user/google-login',
                        { token: response.access_token },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );

                    if (resData.success) {
                        toast(resData.message);
                        const userData: LoginResponse = resData.data!;
                        localStorage.setItem("authToken", userData.token);
                        localStorage.setItem("userName", userData.name);
                        localStorage.setItem("userRole", userData.role);
                        dispatch(login({
                            name: userData.name,
                            role: userData.role
                        }));
                        navigate('/');
                    } else {
                        toast.error(resData.message || "Google login failed");
                    }

                },
            });
            client.requestAccessToken();
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
            console.error("Google Login Error:", err);
        }
    }

    return (
        <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full mt-3 bg-gray-300 text-black font-semibold py-2 rounded-md"
        >
            Login with Google
        </button>
    )
}


export default GoogleLogin

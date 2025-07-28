// components/OTPVerification.tsx
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import type { ApiResponse, GoogleLoginResponse } from "../../../../types/user.types";

interface OTPProps {
  email: string;
  formData: any;
  // onSuccess: () => void;
}

const OTPVerification = ({ formData, email }: OTPProps) => {
  const [attempt, setAttempt] = useState(0)
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0)
  const [isVerifyDesabled, setIsVerifyDesabled] = useState(true)
  const [isResendDesabled, setIsResendDesabled] = useState(true)
  let intervalRef = useRef<null | number>(null)


  useEffect(() => {
    if (otp.length === 4 && timer < 60 && attempt < 3) {
      console.log("attempt inside if ", attempt)
      setIsVerifyDesabled(false);
    } else {
      setIsVerifyDesabled(true);
    }
  }, [otp, timer]);

  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setTimer((c) => {
          if (c >= 59) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            setIsVerifyDesabled(true);
            setIsResendDesabled(false);
          }
          return c + 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    startTimer()

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [timer])

  const handleResend = async () => {
    

    try {
      const res = await axios.post<ApiResponse>("http://localhost:4004/user/send-otp", { email });
      if (res.data.success) {
        toast(res.data.message)
        setIsResendDesabled(true)
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setAttempt(0)
        setTimer(0)
        startTimer()
        setOtp("")
      }else{
        toast(res.data.message)
      }
    } catch (error) {
      console.log("otp resend error ",error)
      toast("otp send failled ")
    }

  }

  const handleOtpSubmit = async () => {
    setAttempt(c => c + 1)
    setIsVerifyDesabled(true)
    setOtp('')
    if (attempt === 2) {
      toast("attempt limt exceeded");
      return
    } else {

    }

    try {
      const res = await axios.post<ApiResponse>("http://localhost:4004/user/verify-otp", { email, otp });
      //let res = { data:{ success: false}}

      if (res.data.success) {

        const signupRes = await axios.post<GoogleLoginResponse>("http://localhost:4004/user/sign-up", formData);
        //let signupRes = { data: { success: true } }
        if (signupRes.data.success) {
          toast("Signup successful!");

        } else {
          toast("Signup failed");
        }
      } else {
        toast(res.data.message);
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Something went wrong";
      toast(message);

    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md mx-auto p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">OTP Verification</h2>

        <div className="flex justify-center items-center gap-3 mb-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            maxLength={4}
            className="border border-gray-300 rounded-lg px-4 py-2 text-center text-lg w-40 tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="text-gray-600 font-medium text-sm w-12">{timer < 60 ? `00:${timer < 10 ? `0${timer}` : timer}` : '01:00'}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-1 justify-between mt-10">
          <button
            onClick={handleOtpSubmit}
            disabled={isVerifyDesabled}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"

          >
            Verify
          </button>
          <button
            onClick={handleResend}
            disabled={isResendDesabled}
            className="bg-slate-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-slate-600 transition disabled:bg-slate-300 disabled:cursor-not-allowed"

          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>

  );
}

export default OTPVerification

import React from "react";
import { signInWithPopup } from "firebase/auth";
import { google, auth } from "../config/Firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handleSignin = async () => {
    try {
      const res = await signInWithPopup(auth, google);
      if(res){
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[1200px] h-[500px] flex justify-center items-center m-auto max-sm:w-[400px]">
      <div
        className="google px-8 py-2 text-lg bg-stone-900 text-gray-400 rounded-md cursor-pointer"
        onClick={handleSignin}
      >
        Sign in with Google
      </div>
    </div>
  );
}

export default Login;

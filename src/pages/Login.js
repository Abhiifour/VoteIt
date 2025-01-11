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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 blur-[100px] animate-gradient-xy opacity-50"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Navbar */}
        <nav className="flex justify-between items-center">
          <div className="text-3xl font-bold text-white tracking-tight">
            Vote<span className="text-blue-400">it</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-gray-300 hover:text-white transition-colors">
              Features
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors">
              Try For Free
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="max-w-2xl w-full text-center space-y-8">
            {/* Hero Text */}
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              All-in-one<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-pink-400 text-transparent bg-clip-text">
                Real Time Polling
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg text-gray-300 max-w-xl mx-auto">
              Using online polls is an easy way to ask your audience for instant feedback on anything
            </p>

            {/* Sign In Button */}
            <button
              onClick={handleSignin}
              className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500/10 to-pink-500/10 hover:from-blue-500/20 hover:to-pink-500/20 text-white px-8 py-3 rounded-lg transition-all duration-300 backdrop-blur-sm m-auto"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in with Google
              <span className="absolute inset-0 border border-blue-500/30 rounded-lg"></span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-xy {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          25% {
            transform: translate(-50%, -50%) rotate(90deg);
          }
          50% {
            transform: translate(-50%, -50%) rotate(180deg);
          }
          75% {
            transform: translate(-50%, -50%) rotate(270deg);
          }
        }
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
        }
      `}</style>
    </div>
  );
}

export default Login;
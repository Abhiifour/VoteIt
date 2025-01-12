import React from "react";
import { signInWithPopup } from "firebase/auth";
import { google, auth } from "../config/Firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handleSignin = async () => {
    try {
      const res = await signInWithPopup(auth, google);
      if(res) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Minimal gradient accent */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-400"></div>

      {/* Main content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <header className="py-8">
          <nav className="flex items-center justify-between">
            <div className="text-2xl font-medium text-white tracking-tight">
              vote.it
            </div>
            <div className="flex items-center gap-8">
            
              <a href="https://github.com/Abhiifour/VoteIt" className="text-sm text-zinc-400 hover:text-white transition-colors">About</a>
            </div>
          </nav>
        </header>

        {/* Hero section */}
        <div className="min-h-[calc(100vh-120px)] flex">
          <div className="w-full grid lg:grid-cols-2 gap-24 items-center py-20">
            {/* Left column */}
            <div className="space-y-12">
              <div>
                <div className="inline-flex items-center text-sm text-zinc-400 mb-6">
                  <span className="w-8 h-px bg-zinc-800 mr-4"></span>
                  Real-time polling platform
                </div>
                <h1 className="text-6xl font-semibold text-white tracking-tight leading-tight">
                  Turn ideas into
                  <br />
                  <span className="text-green-400">instant decisions</span>
                </h1>
              </div>

              <p className="text-lg text-zinc-400 leading-relaxed">
                Create polls, gather real-time responses, and visualize results instantly. Perfect for meetings, events, and interactive presentations.
              </p>

              <div className="space-y-6">
                <button
                  onClick={handleSignin}
                  className="w-full sm:w-auto group relative flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 text-black px-8 py-4 rounded-lg transition-colors m-auto"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Sign in with Google
                </button>

               
              </div>

             
            </div>

            {/* Right column - Interface preview */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800">
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-zinc-900"></div>
                
                {/* Interface mockup */}
                <div className="relative p-8 space-y-8">
                  <div className="space-y-4">
                    <div className="h-4 w-24 bg-zinc-800 rounded-full"></div>
                    <div className="h-8 w-64 bg-zinc-800 rounded-full"></div>
                  </div>

                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-lg border border-zinc-800 hover:border-indigo-500/20 hover:bg-indigo-500/5 transition-colors cursor-pointer">
                        <div className="w-4 h-4 rounded-full border-2 border-zinc-700"></div>
                        <div className="h-4 w-full bg-zinc-800 rounded-full"></div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="h-10 w-32 bg-zinc-800 rounded-lg"></div>
                    <div className="h-10 w-10 bg-indigo-500/20 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
import React from 'react';
import { 
  Database, 
  Shield, 
  Users, 
  Clock,
  Share2, 
  Zap,
  Lock,
  BarChart2,
  Layout
} from 'lucide-react';

const Features = () => {
  return (
    <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-pink-600 blur-[100px] animate-gradient-xy opacity-40"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center space-y-4 mb-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Empowered by
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
              Firebase Technology
            </span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            A real-time voting platform built on Firebase's powerful infrastructure,
            delivering instant updates and secure data management.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Firebase Auth */}
          <div className="group hover:scale-[1.02] transition-all duration-300">
            <div className="h-full p-6 bg-zinc-900/90 backdrop-blur-xl rounded-xl border border-zinc-800/50 hover:border-zinc-700/50">
              <div className="h-12 w-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6">
                <Lock className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Firebase Auth</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Secure Google authentication powered by Firebase Auth. Single-click sign-in
                with automatic session management and real-time user state tracking.
              </p>
            </div>
          </div>

          {/* Firestore Database */}
          <div className="group hover:scale-[1.02] transition-all duration-300">
            <div className="h-full p-6 bg-zinc-900/90 backdrop-blur-xl rounded-xl border border-zinc-800/50 hover:border-zinc-700/50">
              <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                <Database className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Cloud Firestore</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Real-time data synchronization with Cloud Firestore. Automatic updates
                and offline persistence for seamless voting experience.
              </p>
            </div>
          </div>

          {/* Real-time Updates */}
          <div className="group hover:scale-[1.02] transition-all duration-300">
            <div className="h-full p-6 bg-zinc-900/90 backdrop-blur-xl rounded-xl border border-zinc-800/50 hover:border-zinc-700/50">
              <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Real-time Sync</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Instant vote updates using Firestore's real-time listeners. Watch results
                flow in as they happen with millisecond latency.
              </p>
            </div>
          </div>

          
        </div>

     
        
      </div>

      <style jsx>{`
        @keyframes gradient-xy {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          25% { transform: translate(-50%, -50%) rotate(90deg); }
          50% { transform: translate(-50%, -50%) rotate(180deg); }
          75% { transform: translate(-50%, -50%) rotate(270deg); }
        }
        .animate-gradient-xy {
          animation: gradient-xy 15s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Features;
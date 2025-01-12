import React, { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import VoteCard from "./Comp/VoteCard";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../config/Firebase";
import { Skeleton } from "../components/ui/skeleton";
import { useRecoilState } from "recoil";
import { isUser, userState } from "../Atom";
import toast from "react-hot-toast";
import Nav from "./Comp/Nav";
import { FirebaseError } from 'firebase/app';

function Home() {
  const [activeVoteList, setActiveVoteList] = useState([]);
  const [pastVoteList, setPastVoteList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useRecoilState(userState);
  const [userBool, setUserBool] = useRecoilState(isUser);

  const docRef = collection(db, "Vote");

  const getVoteData = async () => {
    try {
      const today = new Date();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const date = `${today.getFullYear()}-${month}-${day}`;

      const data = await getDocs(docRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const firstDate = new Date(date + 'T00:00:00');

      const activeVotes = filteredData.filter(vote => 
        new Date(vote.endDate + 'T00:00:00') >= firstDate
      );
      const pastVotes = filteredData.filter(vote => 
        new Date(vote.endDate + 'T00:00:00') < firstDate
      );

      setPastVoteList(pastVotes);
      setActiveVoteList(activeVotes);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error('Firebase error:', error.code, error.message);
        toast.error('Failed to load data. Please check your connection.');
      } else {
        console.error('Unknown error:', error);
        toast.error('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId({
          name: user.displayName,
          id: user.uid,
          img: user.photoURL,
        });
        setUserBool(true);
      } else {
        setUserBool(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Handle data fetching
  useEffect(() => {
    getVoteData();
  }, []);

  // Network status handling
  useEffect(() => {
    const handleOnline = () => {
      if (activeVoteList.length === 0) {
        getVoteData();
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [activeVoteList]);

  const renderVoteCards = (votes) => {
    if (isLoading) {
      return [...Array(6)].map((_, i) => (
        <Skeleton 
          key={i} 
          className="h-[200px] bg-zinc-800/50 rounded-xl" 
        />
      ));
    }

    return votes.map((vote) => (
      <VoteCard
        key={vote.id}
        title={vote.title}
        desc={vote.desc}
        date={vote.endDate}
        id={vote.id}
        name={vote?.creatorName}
        img={vote?.creator}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="relative">
        <Nav />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Active Votes Section */}
          <Card className="bg-zinc-900/95 border-zinc-800 shadow-xl">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <h2 className="text-lg sm:text-xl font-medium text-zinc-100">
                  Active Votes
                </h2>
              </div>
              <span className="text-zinc-400 text-xs sm:text-sm">
                {activeVoteList.length} active polls
              </span>
            </div>
            <div className="w-full h-[400px] sm:h-[500px] overflow-y-scroll scrollbar-thin scrollbar-track-zinc-900/95 scrollbar-thumb-zinc-800">
              <div className="p-4 sm:p-6">
                <div className="md:grid md:grid-cols-3 grid grid-cols-1 gap-4 sm:gap-6">
                  {renderVoteCards(activeVoteList)}
                </div>
              </div>
            </div>
          </Card>

          {/* Past Votes Section */}
          <Card className="bg-zinc-900/95 border-zinc-800 shadow-xl">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
                <h2 className="text-lg sm:text-xl font-medium text-zinc-100">
                  Past Votes
                </h2>
              </div>
              <span className="text-zinc-400 text-xs sm:text-sm">
                {pastVoteList.length} completed polls
              </span>
            </div>
            <div className="w-full h-[400px] sm:h-[500px] overflow-y-scroll scrollbar-thin scrollbar-track-zinc-900/95 scrollbar-thumb-zinc-800">
              <div className="p-4 sm:p-6">
                <div className="md:grid md:grid-cols-3 grid grid-cols-1 gap-4 sm:gap-6">
                  {renderVoteCards(pastVoteList)}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
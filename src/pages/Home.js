import React, { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import VoteCard from "./Comp/VoteCard";
import { onAuthStateChanged } from "firebase/auth";
import { ScrollArea } from "../components/ui/scroll-area";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../config/Firebase";
import { Skeleton } from "../components/ui/skeleton";
import { useRecoilState } from "recoil";
import { isUser, userState } from "../Atom";
import toast from "react-hot-toast";
import Nav from "./Comp/Nav";

function Home() {
  const [activeVoteList, setActiveVoteList] = useState([]);
  const [pastVoteList, setPastVoteList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useRecoilState(userState);
  const [userBool, setUserBool] = useRecoilState(isUser);

  const docRef = collection(db, "Vote");

  const getVoteData = async () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    const data = await getDocs(docRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const firstDate = new Date(date);

    const activeVotes = filteredData.filter(
      (vote) => firstDate <= new Date(vote.endDate)
    );
    const pastVotes = filteredData.filter(
      (vote) => firstDate > new Date(vote.endDate)
    );
    setPastVoteList(pastVotes);
    setActiveVoteList(activeVotes);
    setIsLoading(false);
  };

  const userData = async () => {
    try {
      onAuthStateChanged(auth, (user) => {
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
    } catch (e) {
      toast.error(e);
    }
  };

  useEffect(() => {
    getVoteData();
    userData();
  }, []);

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
            <div className="w-full h-[400px] sm:h-[500px] overflow-y-scroll  [&::-webkit-scrollbar]:w-2
             [&::-webkit-thumb]:rounded-full
          [&::-webkit-scrollbar-track]:bg-zinc-900/95
          [&::-webkit-scrollbar-thumb]:bg-zinc-800
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <div className="p-4 sm:p-6">
                <div className="md:grid md:grid-cols-3 gap-4 sm:gap-6 ">
                  {isLoading ? (
                    [...Array(6)].map((_, i) => (
                      <Skeleton 
                        key={i} 
                        className="h-[200px] bg-zinc-800/50 rounded-xl" 
                      />
                    ))
                  ) : (
                    activeVoteList?.map((vote) => (
                      <VoteCard
                        title={vote.title}
                        desc={vote.desc}
                        date={vote.endDate}
                        id={vote.id}
                        img={vote?.creator}
                        name={vote?.creatorName}
                        key={vote.id}
                      />
                    ))
                  )}
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
            <div className="w-full h-[400px] sm:h-[500px] overflow-y-scroll  [&::-webkit-scrollbar]:w-1
            [&::-webkit-thumb]:rounded-full
          [&::-webkit-scrollbar-track]:bg-zinc-900/95
          [&::-webkit-scrollbar-thumb]:bg-zinc-800
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
              <div className="p-4 sm:p-6">
                <div className="md:grid md:grid-cols-3 gap-4 sm:gap-6">
                  {isLoading ? (
                    [...Array(6)].map((_, i) => (
                      <Skeleton 
                        key={i} 
                        className="h-[200px] bg-zinc-800/50 rounded-xl" 
                      />
                    ))
                  ) : (
                    pastVoteList?.map((vote) => (
                      <VoteCard
                        title={vote.title}
                        desc={vote.desc}
                        date={vote.endDate}
                        id={vote.id}
                        key={vote.id}
                        name={vote?.creatorName}
                        img={vote?.creator}
                      />
                    ))
                  )}
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
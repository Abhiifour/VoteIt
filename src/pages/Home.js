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
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <h2 className="text-xl font-medium text-zinc-100">
                  Active Votes
                </h2>
              </div>
              <span className="text-zinc-400 text-sm">
                {activeVoteList.length} active polls
              </span>
            </div>
            <ScrollArea className="w-full h-[500px]">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </ScrollArea>
          </Card>

          {/* Past Votes Section */}
          <Card className="bg-zinc-900/95 border-zinc-800 shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
                <h2 className="text-xl font-medium text-zinc-100">
                  Past Votes
                </h2>
              </div>
              <span className="text-zinc-400 text-sm">
                {pastVoteList.length} completed polls
              </span>
            </div>
            <ScrollArea className="w-full h-[500px]">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;
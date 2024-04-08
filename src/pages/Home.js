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
    <div className="home bg-black">
      {/* main - content */}
      <div className="content w-[1200px] m-auto max-sm:w-full max-sm:px-2 ">
        <div className="active-content ">
          <Card className="bg-neutral-800 shadow-lg border-green-300">
            <div className="title flex">
              <p className="text-2xl font-bold font-mono pt-4 pl-5 text-green-500 max-sm:text-xl">
                Active Votes <span className="text-3xl max-sm:text-xl">⏱</span>
              </p>
            </div>
            <ScrollArea className="w-[1200px] h-[400px] max-sm:w-[400px] max-sm:h-[300px] ">
              <div className="content flex w-[1160px] flex-row flex-wrap gap-6 gap-y-9 m-auto pb-10 pt-6 max-sm:w-[380px] max-sm:gap-2 max-sm:flex-wrap max-sm:flex-row">
                {activeVoteList?.map((vote) => (
                  <VoteCard
                    title={vote.title}
                    desc={vote.desc}
                    date={vote.endDate}
                    id={vote.id}
                    img={vote?.creator}
                    name={vote?.creatorName}
                    key={vote.id}
                  />
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
        <div className="past-content mt-8">
          <Card className="bg-neutral-800 shadow-lg border-yellow-300">
            <div className="title flex">
              <p className="text-2xl font-bold font-mono pt-4 pl-5  text-yellow-500 max-sm:text-xl">
                Past Votes <span className="text-xl">⌛</span>
              </p>
            </div>
            <ScrollArea className="w-[1200px] h-[400px] max-sm:w-[400px] max-sm:h-[300px]">
              <div className="content flex w-[1160px] flex-row flex-wrap gap-6 gap-y-9 m-auto pb-10 pt-6 max-sm:w-[380px] max-sm:gap-2 max-sm:flex-wrap max-sm:flex-row">
                {pastVoteList?.map((vote) => (
                  <VoteCard
                    title={vote.title}
                    desc={vote.desc}
                    date={vote.endDate}
                    id={vote.id}
                    key={vote.id}
                    img={vote?.creator}
                  />
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;

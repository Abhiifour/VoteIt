import React, { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { Skeleton } from "../components/ui/skeleton";
import Comments from "./Comp/Comments";
import VoteOptions from "./Comp/VoteOptions";
import { useRecoilValue } from "recoil";
import { userState, voteState } from "../Atom";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import toast from "react-hot-toast";
import moment from "moment";
import Nav from "./Comp/Nav";

function VotePage() {
  const [voteData, setVoteData] = useState({});
  const idVote = useRecoilValue(voteState);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useRecoilValue(userState);
  const [commentValue, setCommentValue] = useState("");
  const [voted, setVoted] = useState([]);
  const [updatedOptions, setUpdatedOptions] = useState([]);

  const voteDetails = async () => {
    const data = await getDocs(collection(db, "Vote"));
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const tempData = filteredData.filter((item) => item.id === idVote);
    setVoteData(tempData[0]);
    setUpdatedOptions(tempData[0].options);
    setVoted(tempData[0].voted);
  };

  const updateComment = async () => {
    if (!commentValue.trim()) return;
    
    const voteRef = doc(db, "Vote", idVote);
    await updateDoc(voteRef, {
      comments: [
        { content: commentValue, userid: userData.name, img: userData.img },
        ...voteData.comments,
      ],
    });
    setCommentValue("");
    voteDetails();
    toast.success("Comment added successfully!");
  };

  const countVote = async (option) => {
    if (voted.find((id) => id === userData.id)) {
      toast.error("You have already voted!");
      return;
    }

    const updatedOption = updatedOptions.map(opt => 
      opt === option ? { ...opt, count: opt.count + 1 } : opt
    );
    setUpdatedOptions(updatedOption);

    const countRef = doc(db, "Vote", idVote);
    await updateDoc(countRef, {
      options: updatedOption,
      voted: [...voted, userData.id],
    });

    toast.success("Vote recorded successfully!");
    voteDetails();
  };

  useEffect(() => {
    voteDetails();
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 ">
    <Nav/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Card className="bg-zinc-900/95 border-zinc-800 shadow-xl">
          <div className="p-6 border-b border-zinc-800">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-2/3 bg-zinc-800/50 rounded-xl" />
                <Skeleton className="h-6 w-3/4 bg-zinc-800/50 rounded-xl" />
                <Skeleton className="h-6 w-1/3 bg-zinc-800/50 rounded-xl" />
              </div>
            ) : (
              <div className="space-y-4 text-start">
                <h1 className="text-2xl font-medium text-zinc-100">
                  {voteData?.title}
                </h1>
                <p className="text-zinc-300 text-lg">
                  {voteData?.desc}
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-zinc-400 text-sm">
                    Ends {moment(voteData?.endDate).format("DD MMM, YYYY")}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Voting Options */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-zinc-100 mb-6 text-start">Cast Your Vote</h2>
              <div className=" flex flex-wrap gap-4">
                {voteData?.options?.map((option, index) => (
                  <VoteOptions 
                    key={index}
                    option={option} 
                    fun={countVote}
                  />
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-zinc-100 mb-6 text-start">Discussion</h2>
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={commentValue}
                    placeholder="Share your thoughts..."
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500"
                    onChange={(e) => setCommentValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && updateComment()}
                  />
                </div>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {voteData?.comments?.map((item, index) => (
                      <Comments
                        key={index}
                        id={item.userid}
                        content={item.content}
                        img={item.img}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default VotePage;
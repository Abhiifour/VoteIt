import React, { useState } from "react";
import { Card } from "../components/ui/card";
import Comments from "./Comp/Comments";
import VoteOptions from "./Comp/VoteOptions";
import { useRecoilValue } from "recoil";
import { userState, voteState } from "../Atom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase";
import { useEffect } from "react";
import { updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import moment from "moment";
import { Skeleton } from "../components/ui/skeleton";

function VotePage() {
  const [voteData, setVoteData] = useState({});
  const idVote = useRecoilValue(voteState);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useRecoilValue(userState);
  const [commentValue, setCommentValue] = useState("");
  const [isVoted, setIsVoted] = useState(false);
  const [voted, setVoted] = useState([]);
  let tempData = [];

  const [updatedOptions, setUpdatedOptions] = useState([]);

  const voteDetails = async () => {
    const data = await getDocs(collection(db, "Vote"));
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    tempData = filteredData.filter((item) => {
      return item.id === idVote;
    });

    setVoteData(tempData[0]);

    setUpdatedOptions(tempData[0].options);
    setVoted(tempData[0].voted);
  };

  const updateComment = async () => {
    const voteRef = doc(db, "Vote", idVote);

    await updateDoc(voteRef, {
      comments: [
        { content: commentValue, userid: userData.name, img: userData.img },
        ...voteData.comments,
      ],
    });
    voteDetails();
  };

  const countVote = (option) => {
    if (voted.find((id) => id === userData.id)) {
      toast.error("Already Voted !");
    } else {
      option.count += 1;
      toast.success("Voted !");
    }
    updateCount();
  };

  const updateCount = async () => {
    const countRef = doc(db, "Vote", idVote);

    await updateDoc(countRef, {
      options: updatedOptions,
    });

    if (voted.find((id) => id === userData.id)) {
    } else {
      await updateDoc(countRef, {
        voted: [...voted, userData.id],
      });
    }
    voteDetails();
  };

  useEffect(() => {
    voteDetails();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="w-[1200px] m-auto font-mono  max-sm:w-full ">
      <div className="top flex flex-col  max-sm:pl-3">
        {isLoading ? (
          <div>
            <Skeleton className="h-8 w-[340px] bg-stone-900  rounded-xl mb-6" />
            <Skeleton className="h-6 w-[500px] bg-stone-900  rounded-xl mb-6 max-sm:w-[300px]" />
            <Skeleton className="h-6 w-[340px] bg-stone-900  rounded-xl" />
          </div>
        ) : (
          <div>
            {" "}
            <div className="question  text-gray-50 text-3xl text-start mb-6  max-sm:text-lg ">
              {voteData?.title}
            </div>
            <div className="desc text-start text-gray-100 text-xl mb-6  max-sm:text-sm ">
              {voteData?.desc}
            </div>
            <div className="time text-gray-400 text-start text-2xl mb-6  max-sm:text-sm">
              Until {moment(voteData?.endDate).format("DD MMM, YYYY")}
            </div>
          </div>
        )}
      </div>
      <div className="bottom flex flex-row h-[600px] gap-[40px]  max-sm:flex-col max-sm:w-full">
        <div className="voting w-[580px] mt-20  max-sm:w-[400px] max-sm:m-auto">
          <div className="voting box flex flex-wrap w-[460px] gap-8 max-sm:w-[370px] max-sm:pl-3  ">
            {voteData?.options?.map((option) => (
              <VoteOptions option={option} fun={countVote} />
            ))}
          </div>
        </div>
        <Card className="w-[580px] bg-color-black border-stone-900 max-sm:w-[400px] max-sm:m-auto">
          <div className="comment w-[580px] border-white max-sm:w-[400px] ">
            <div className="header text-3xl text-gray-200 text-start pb-10 pt-4 pl-6 max-sm:text-lg  max-sm:py-0 max-sm:w-[400px]">
              Opinions
            </div>
            <div className="comment-box w-[520px] m-auto max-sm:w-[400px]">
              <input
                type="text"
                placeholder="Comment"
                className="w-[520px] h-[40px] bg-stone-950  rounded-lg pl-6 text-lg text-white border-yellow-500 max-sm:w-[400px] max-sm:text-sm"
                onChange={(e) => setCommentValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") updateComment();
                }}
              />
              <div className="comment-box flex flex-col gap-2 pt-4">
                {voteData?.comments?.map((item) => (
                  <Comments
                    id={item.userid}
                    content={item.content}
                    img={item.img}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default VotePage;

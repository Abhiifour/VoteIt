import React, { useState } from "react";
import avatar from "../avatar.jpg";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../src/components/ui/card";
import { useRecoilState } from "recoil";
import { voteState } from "../../Atom";
import moment from "moment";

function VoteCard({ title, desc, date, id, img, name }) {
  const navigate = useNavigate();
  const [vodeId, setVoteId] = useRecoilState(voteState);
  const endDate = moment(date).format("DD MMM, YYYY");

  const goToVotePage = () => {
    setVoteId(id);

    navigate("/vote");
  };

  return (
    <Card
      className="w-[370px] flex justify-center items-center py-5 bg-neutral-950 border-black shadow-md shadow-stone-950 cursor-pointer max-sm:w-[180px]"
      onClick={goToVotePage}
    >
      <div className="card w-[360px] max-sm:w-[180px]">
        <div className="top flex justify-start items-center gap-2 pl-2">
          <div className="badge">
            <div className="img-wrapper w-[40px] h-[40px] rounded-full overflow-hidden max-sm:w-[30px] max-sm:h-[30px]">
              <img src={img} alt="avatar w-[40px] h-[40px] max-sm:w-[30px] max-sm:h-[30px]" />
            </div>
          </div>
          <div className="user text-lg font-medium font-mono text-neutral-100 max-sm:text-xs">
            {name}
          </div>
        </div>
        <div className="title text-2xl font-semibold font-mono text-start pl-2 w-[330px] pt-4 text-gray-100 max-sm:text-sm">
          {title}
        </div>
        <div className="timeline text-base font-medium font-mono text-start pl-2 w-[330px] pt-4 text-neutral-300 max-sm:text-xs">
          Until {endDate}
        </div>
      </div>
    </Card>
  );
}

export default VoteCard;

import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../../src/components/ui/card";
import { useRecoilState } from "recoil";
import { voteState } from "../../Atom";
import moment from "moment";

function VoteCard({ title, desc, date, id, img, name }) {
  const navigate = useNavigate();
  const [voteId, setVoteId] = useRecoilState(voteState);

  const goToVotePage = () => {
    setVoteId(id);
    navigate("/vote");
  };

  return (
    <Card
      className="group bg-zinc-900/95 border-zinc-800 shadow-xl transition-all duration-200 hover:bg-zinc-800/95 cursor-pointer"
      onClick={goToVotePage}
    >
      <div className="p-4 space-y-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-zinc-700/50">
              <img 
                src={img} 
                alt={`${name}'s avatar`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-zinc-900"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-zinc-200">{name}</span>
            <span className="text-xs text-zinc-400">
              Created a poll
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-base font-medium text-zinc-100 line-clamp-2 text-start">
            {title}
          </h3>
          {desc && (
            <p className="text-sm text-zinc-400 line-clamp-2 text-start">
              {desc}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 pt-2">
          <div className="h-2 w-2 bg-emerald-500 rounded-full"></div>
          <span className="text-xs text-zinc-400">
            Until {moment(date).format("DD MMM, YYYY")}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default VoteCard;
import React from "react";
import { Card } from "../../components/ui/card";

function VoteOptions({ option, fun }) {
  return (
    <Card
      onClick={() => fun(option)}
      className="group relative overflow-hidden bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/50 transition-all cursor-pointer w-[250px]"
    >
      <div className="p-6 flex flex-col items-center space-y-3">
        {/* Option Text */}
        <span className="text-lg font-medium text-zinc-100 text-center group-hover:text-emerald-400 transition-colors">
          {option?.value}
        </span>

        {/* Vote Count */}
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-emerald-500/70 rounded-full group-hover:animate-pulse" />
          <span className="text-zinc-400 group-hover:text-zinc-300">
            {option?.count} votes
          </span>
        </div>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </Card>
  );
}

export default VoteOptions;
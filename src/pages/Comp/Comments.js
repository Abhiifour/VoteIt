import React from "react";
import { Card } from "../../components/ui/card";

function Comments({ content, id, img }) {
  return (
    <Card className="bg-zinc-900/90 border border-zinc-800 hover:bg-zinc-900/95 transition-all">
      <div className="p-3 flex gap-3 items-center">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-zinc-800/50">
            <img 
              src={img} 
              alt={`${id}'s avatar`} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Username */}
          <div className="text-[13px] font-medium text-zinc-400 mb-0.5 text-start">
            {id}
          </div>
          
          {/* Comment Text */}
          <div className="text-[14px] text-zinc-200 break-words text-start">
            {content}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Comments;
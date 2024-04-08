import React from "react";
import avatar from "../avatar.jpg";
import { Card } from "../../components/ui/card";

function Comments({content , id , img}) {
  return (
    <div className="comments">
      <Card className=" bg-black font-mono flex flex-row justify-start gap-4 pl-2 py-2  border-stone-900">
       <div className="left">
       <div className="image-wrapper w-[50px] h-[50px] rounded-full overflow-hidden   bg-white  max-sm:w-[30px] max-sm:h-[30px]">
          <img src={img} alt="avatar" className="w-[50px] h-[50px] max-sm:w-[30px] max-sm:h-[30px]" />
        </div>
       </div>
       <div className="right ">
        <div className="user text-start text-lg text-gray-400 max-sm:text-sm">
            {id}
        </div>
        <div className="comment text-start text-md text-gray-200 max-sm:text-lg">
           {content}
        </div>
       </div>
      </Card>
    </div>
  );
}

export default Comments;

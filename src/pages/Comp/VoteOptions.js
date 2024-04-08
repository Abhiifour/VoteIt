import React from "react";
import { Card } from "../../components/ui/card";

function VoteOptions({ option, fun }) {

  return (
    <div>
      <Card
        className="bg-black cursor-pointer border-stone-900 w-[200px] h-[120px] text-gray-200 flex justify-center items-center transition-shadow shadow-md hover:shadow-green-950  max-sm:w-[140px] "
        onClick={() => fun(option)}
      >
        <div className="flex flex-col">
          <div className="title text-lg  max-sm:text-sm ">{option?.value}</div>
          <div className="count  max-sm:text-xs">{option?.count}</div>
        </div>
      </Card>
    </div>
  );
}

export default VoteOptions;

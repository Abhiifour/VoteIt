import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { userState } from "../Atom";

function CreateVote() {
  const userDoc = useRecoilValue(userState);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [endDate, setEndDate] = useState("");
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState({});

  const CreateAVote = async () => {
    try {
      const res = await addDoc(collection(db, "Vote"), {
        creator: userDoc.img,
        creatorName: userDoc.name,
        title: title,
        desc: desc,
        endDate: endDate,
        options: options,
        comments: [],
        voted: [],
      });
    } catch (e) {
      console.log(e);
    }
    navigate("/");
    toast.success("Vote created !!");
  };

  return (
    <div className="w-[1000px] flex flex-col gap-4 m-auto font-mono  max-sm:w-[380px] ">
      <label htmlFor="title" className="text-xl text-gray-200 text-start pb-3">
        Title:
      </label>
      <input
        type="text"
        id="title"
        name="name"
        className="rounded-sm bg-stone-900 py-2 px-2 
      text-gray-200"
        placeholder="Vote for the best of...."
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="desc" className="text-xl text-gray-200 text-start pb-3">
        Description:
      </label>
      <textarea
        id="desc"
        name="desc"
        className="rounded-sm bg-stone-900 py-2 px-2 text-gray-200"
        placeholder="(Optional) your vote description...."
        onChange={(e) => setDesc(e.target.value)}
      />

      <label
        htmlFor="options"
        className="text-xl text-gray-200 text-start pb-3"
      >
        Options:
      </label>
      {options.map((option) => {
        return (
          <div className="text-gray-200 text-start text-lg">
            - {option.value}
          </div>
        );
      })}
      <input
        type="text"
        id="options"
        name="options"
        placeholder="Press enter to add more options"
        onChange={(e) => setOption({ value: e.target.value, count: 0 })}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (option !== "") {
              setOptions([...options, option]);
              setOption("");
            }
          }
        }}
        className="rounded-sm bg-stone-900 py-2 px-2 text-gray-200"
      />
      <label htmlFor="date" className="text-xl text-gray-200 text-start pb-3">
        End date
      </label>
      <input
        type="datetime-local"
        id="date"
        label="Pick a date"
        placeholder=""
        className="rounded-sm bg-stone-900 py-2 px-2 text-gray-200"
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button
        type="submit "
        className="bg-yellow-400 text-xl rounded-sm py-2 mt-2 max-sm:text-lg"
        onClick={CreateAVote}
      >
        Create Vote
      </button>
    </div>
  );
}

export default CreateVote;

import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import { userState } from "../Atom";
import { Badge } from "../components/ui/badge";
import { X } from "lucide-react";

const CreateVote = () => {
  const userDoc = useRecoilValue(userState);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [endDate, setEndDate] = useState("");
  const [options, setOptions] = useState([]);
  const [currentOption, setCurrentOption] = useState("");

  const handleAddOption = (e) => {
    e.preventDefault();
    if (currentOption.trim()) {
      setOptions([...options, { value: currentOption.trim(), count: 0 }]);
      setCurrentOption("");
    }
  };

  const removeOption = (indexToRemove) => {
    setOptions(options.filter((_, index) => index !== indexToRemove));
  };

  const createVote = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (options.length < 2) {
      toast.error("Please add at least two options");
      return;
    }
    if (!endDate) {
      toast.error("Please select an end date");
      return;
    }

    try {
      await addDoc(collection(db, "Vote"), {
        creator: userDoc.img,
        creatorName: userDoc.name,
        title: title,
        desc: desc,
        endDate: endDate,
        options: options,
        comments: [],
        voted: [],
      });
      navigate("/");
      toast.success("Vote created successfully!");
    } catch (error) {
      toast.error("Failed to create vote");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 pt-[40px]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-zinc-900/95 border-zinc-800 shadow-xl">
          <div className="p-6 space-y-6">
            <h1 className="text-2xl font-medium text-zinc-100 text-start">Create New Vote</h1>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-zinc-200 block mb-2 text-start">
                  Title
                </label>
                <Input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What are we voting on?"
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-200 block mb-2 text-start">
                  Description (Optional)
                </label>
                <Textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Provide more context about this vote..."
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-500 min-h-[100px]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-200 block mb-2 text-start">
                  Options
                </label>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge 
                        className="flex-1 justify-between bg-zinc-800 text-zinc-100 hover:bg-zinc-800 py-2 px-4 rounded-lg "
                      >
                        {option.value}
                        <button
                          onClick={() => removeOption(index)}
                          className="ml-2 hover:text-zinc-400"
                        >
                          <X size={14} />
                        </button>
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <Input
                    type="text"
                    value={currentOption}
                    onChange={(e) => setCurrentOption(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddOption(e)}
                    placeholder="Add an option..."
                    className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder-zinc-500"
                  />
                  <Button 
                    onClick={handleAddOption}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Add
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-200 block mb-2 text-start">
                  End Date
                </label>
                <Input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100"
                />
              </div>
            </div>

            <Button
              onClick={createVote}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-6"
            >
              Create Vote
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateVote;
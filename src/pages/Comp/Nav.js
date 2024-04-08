import React, { useState } from "react";
import { Separator } from "../../components/ui/separator";
import avatar from "../avatar.jpg";
import { Card } from "../../components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { useNavigate } from "react-router-dom";
import { PopoverClose } from "@radix-ui/react-popover";
import { useRecoilState, useRecoilValue } from "recoil";
import { isUser, userState } from "../../../src/Atom";
import { signOut } from "firebase/auth";
import { auth } from "../../../src/config/Firebase";

function Nav() {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useRecoilState(userState);
  const [isBadge, setIsBadge] = useRecoilState(isUser);

  const sigNOut = async () => {
    const res = await signOut(auth);
    setImgSrc({
      name: "",
      id: "",
      img: "",
    });
    setIsBadge(false);
    navigate("/login");
    console.log(imgSrc);
  };

  return (
    <div>
      <div className="header flex w-[1200px] m-auto justify-between items-center pt-10 max-sm:w-full max-sm:px-2">
        <div className="logo">
          <Card className="px-8 py-2 flex items-center max-sm:px-4 max-sm:py-1 ">
            <p className="text-3xl font-semibold font-mono cursor-pointer max-sm:text-xl">
              Vote It <span className="text-2xl">🗽</span>
            </p>
          </Card>
        </div>
        {isBadge ? (
          <Popover>
            <PopoverTrigger>
              <div className="badge">
                <Card className="rounded-full overflow-hidden">
                  <div className="image-wrapper w-[50px] h-[50px]  rounded-2xl overflow-hidden bg-white max-sm:w-[40px] max-sm:h-[40px]">
                    <img
                      src={imgSrc.img || avatar}
                      alt="avatar"
                      className="w-[50px] h-[50px] max-sm:w-[40px] max-sm:h-[40px]"
                    />
                  </div>
                </Card>
              </div>
            </PopoverTrigger>
            <PopoverClose asChild>
              <PopoverContent className="bg-stone-900 font-mono text-gray-200 text-lg w-[180px] flex flex-col justify-center items-center">
                <div className="profile ">Profile</div>
                <Separator />
                <div
                  className="create cursor-pointer"
                  onClick={() => navigate("/create")}
                >
                  Create
                </div>
                <Separator />
                <div className="logout cursor-pointer" onClick={sigNOut}>
                  Logout
                </div>
              </PopoverContent>
            </PopoverClose>
          </Popover>
        ) : (
          <div></div>
        )}
      </div>
      <div className="separator w-[1200px] m-auto mt-6 mb-12 max-sm:mb-8 max-sm:mt-3 max-sm:w-full">
        <Separator />
      </div>
    </div>
  );
}

export default Nav;

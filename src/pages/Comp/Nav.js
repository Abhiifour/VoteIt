import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { useRecoilState, useRecoilValue } from "recoil";
import { isUser, userState } from "../../../src/Atom";
import { signOut } from "firebase/auth";
import { auth } from "../../../src/config/Firebase";
import { User, Plus, LogOut } from "lucide-react";

function Nav() {
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useRecoilState(userState);
  const [isBadge, setIsBadge] = useRecoilState(isUser);
  const { name } = useRecoilValue(userState);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setImgSrc({
        name: "",
        id: "",
        img: "",
      });
      setIsBadge(false);
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const menuItems = [
    {
      label: "Profile",
      icon: <User className="w-4 h-4" />,
      onClick: () => navigate("/profile"),
    },
    {
      label: "Create",
      icon: <Plus className="w-4 h-4" />,
      onClick: () => navigate("/create"),
    },
    {
      label: "Logout",
      icon: <LogOut className="w-4 h-4" />,
      onClick: handleSignOut,
    },
  ];

  return (
    <div className="border-b border-zinc-800/50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Welcome Message */}
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-medium text-zinc-100">
              Welcome back, {" "}
              <span className="text-emerald-400">{name}</span>!
            </h1>
          </div>

          {/* User Menu */}
          {isBadge && (
            <Popover>
              <PopoverTrigger asChild>
                <Card className="w-10 h-10 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-emerald-500/50 transition-all">
                  <img
                    src={imgSrc.img}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </Card>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-1 bg-zinc-900 border border-zinc-800 shadow-xl">
                {menuItems.map((item, index) => (
                  <React.Fragment key={item.label}>
                    <PopoverClose asChild>
                      <button
                        onClick={item.onClick}
                        className="w-full px-4 py-2.5 flex items-center gap-3 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/50 rounded-lg transition-colors"
                      >
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    </PopoverClose>
                    {index < menuItems.length - 1 && (
                      <Separator className="my-1 bg-zinc-800" />
                    )}
                  </React.Fragment>
                ))}
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
import React from "react";
import { Separator } from "../../components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <div>
      <div className="separator w-[1200px] m-auto mt-8 pb-8  max-sm:w-full">
        <Separator />
      </div>
      <div className="footer pb-10">
        <div className="banner text-white font-mono text-sm max-sm:text-xs flex justify-center">
     
        <div className="flex gap-4 text-[20px]"> 
        <a href="https://github.com/Abhiifour"><FaGithub /></a>
        <a href="https://github.com/Abhiifour"><FaXTwitter /></a>
      
        </div>
       
        </div>
      </div>
    </div>
  );
}

export default Footer;

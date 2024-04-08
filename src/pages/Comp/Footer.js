import React from "react";
import { Separator } from "../../components/ui/separator";

function Footer() {
  return (
    <div>
      <div className="separator w-[1200px] m-auto mt-8 pb-8  max-sm:w-full">
        <Separator />
      </div>
      <div className="footer pb-10">
        <div className="banner text-white font-mono text-sm max-sm:text-xs">
          @ Jerseyno4 . All Rights Reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;

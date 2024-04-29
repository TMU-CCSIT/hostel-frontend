"use client";
import React, { useState } from "react";
import SideBar from "../common/SideBar";
import CTCButton from "../common/CTCButton";

const PrincipalMain = (e: any) => {
  const [showSideBar, setShowSideBar] = useState(true);

  const handleSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <div>
      <div className="flex">{showSideBar && <SideBar />}

        <CTCButton text={"h"} type={false} onClickHandler={handleSidebar}>
        </CTCButton>

      </div>
    </div>
  );
};

export default PrincipalMain;






"use client";
import React, { useState } from "react";
import SideBar from "../common/SideBar";
import { TfiArrowRight } from "react-icons/tfi";
import { TfiArrowLeft } from "react-icons/tfi";
import {principalSidebar} from '@/constants/buttonConst'
import StudentLeaves from "@/components/principal/StudentLeaves";



const PrincipalMain = () => {
  
  const [showSideBar, setShowSideBar] = useState(true);
  const [showContent, setShowContent] = useState(principalSidebar[0]);
  

  const handleSidebar = () => {

    setShowSideBar(!showSideBar);
    
  };

  const handleContentChange = (content: any) =>{

    setShowContent(content);
    
  }

  return (
    <div className="flex overflow-x-hidden">
      {/* sidebar div */}
      <div className={`flex items-start ${showSideBar? "sm:w-[350px] w-[450px]" : "w-[4%]"} z-10 `}>
          {showSideBar && <SideBar name={principalSidebar} setShowContent={setShowContent} showContent={showContent} showSideBar={showSideBar} setShowSideBar={setShowSideBar} onChange={handleSidebar}/>}
          <button className="p-2 sm:m-4 m-[0.3rem] absolute sm:relative transition-all scroll-smooth delay-200" onClick={handleSidebar}> 
            {showSideBar? <TfiArrowLeft/> : <TfiArrowRight/>}
          </button>
      </div>

      {/* main content div */}
      <div className="flex mt-5 sm:relative absolute pr-4">
        {
          showContent == "Student Leaves"? <StudentLeaves></StudentLeaves> :""
        }
      </div>
    </div>
  );
};

export default PrincipalMain;






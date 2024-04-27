"use client"

import React , {useState} from 'react';
import Signup from "@/components/auth/Signup";
import SignupStudent from '@/components/auth/SignupStudent';
import SignupWarden from '@/components/auth/SignupWarden';
import SignupCoordinator from '@/components/auth/SignupCoordinator';
import {ADMINDATA} from '@/constants/constant';
import { ROLE } from '@/constants/constant';

const AdminFormPage = () => {

  const [render, setRender] = useState<React.ReactNode | null>(<Signup role = {ROLE.Admin}></Signup>);
  

  const clickHandler = (e:any) =>{
    console.log(e.target.textContent);
      if(e.target.textContent === "Sign Up Main"){
        setRender(<Signup role ={ROLE.Admin}/>);
      }
      if(e.target.textContent === "Sign Up Student"){
        setRender(<SignupStudent />);
      }
      if(e.target.textContent === "Sign Up Coordinator"){
        setRender(<SignupCoordinator />);
      }
      if(e.target.textContent === "Sign Up Warden"){
        console.log("warden clicked ");
        setRender(<SignupWarden/>)
      }
  }

  return (
    <div className='min-h-screen max-w-screen bg-white p-16'>
      <div className='flex items-center gap-24 justify-center'>
          {
            Object.entries(ADMINDATA).map(([key, value]) => (
              <button className='font-bold bg-[#EDF6FF] p-3 hover:bg-[#6DAFFE] rounded-md transition-all delay-75 hover:text-white' 
              key={key}
              onClick={clickHandler}
              >
                {value}
              </button>
            ))
          } 
      </div>

      <div>
        {render}
      </div>
    </div>
  )
}

export default AdminFormPage;

import React, {useState} from 'react'

interface SideBarProps {
  name: string[],
  showContent: string,
  setShowContent: (value: any) => void
  showSideBar: boolean,
  setShowSideBar: (value:any) => void
  onChange? :(value: any) => void
}

const SideBar = (props: SideBarProps) => {

  
  return (
    <div className={`bg-[#437FC7] h-screen w-[100%] text-white flex flex-col items-start font-semibold text-lg pt-9 pl-4 pr-2`}>
          {
            props.name.map((o: string) =>(
              <div key={o} onClick={() => props.setShowContent(o)} className={`${o==props.showContent? "bg-white text-black w-full p-4 rounded-md cursor-pointer" : "p-4 hover:bg-white hover:text-black w-full rounded-md cursor-pointer"}`}>
                <button className="">{o}</button>
              </div>
            ))
          }
    </div>
  )
}

export default SideBar
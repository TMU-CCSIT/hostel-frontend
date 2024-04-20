import React from "react";


interface DropdownProps {
    label:string;
    name:Record<string, string>;
}

const DropDown = (props: DropdownProps) =>{
    return(
        <div className="flex flex-col gap-4">
            <label htmlFor="dropdown" className="font-bold text-lg">{props.label}</label>
            <select id="dropdown" className="focus:outline-none rounded-md px-4 py-2 w-[15rem] sm:w-[30rem] lg:w-[45rem]">
                {Object.values(props.name).map((option) =>(
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default DropDown;

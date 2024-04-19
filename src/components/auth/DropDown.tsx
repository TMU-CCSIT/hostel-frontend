import React from "react";


interface DropdownProps {
    name:Record<string, string>;
}

const DropDown = (props: DropdownProps) =>{
    return(
        <div>
            <label htmlFor="dropdown">Select an option:</label>
            <select id="dropdown">
                {Object.values(props.name).map((option) =>(
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default DropDown;

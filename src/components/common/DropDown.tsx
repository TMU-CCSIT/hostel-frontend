import React from "react";

interface DropdownProps {
  label: string;
  name: string[] | string;
  text: string;
  onChange?: (value: any) => void;
}

const DropDown = (props: DropdownProps) => {
  // console.log(props.name);
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="dropdown" className="font-bold text-lg">
        {props.label}
      </label>
      <select
        name={props.text}
        id="dropdown"
        onChange={props.onChange}
        className="focus:outline-none rounded-md shadow-md px-4 py-2 w-[15rem] sm:w-[30rem] lg:w-[45rem]"
      >
        {Object.values(props.name).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;

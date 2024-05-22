// components/InputField.tsx
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  value: any;
  name: any;
  min?: number;
  required: Boolean;
  readOnly?: any;
  onChange: (value: any) => void;
}

const InputField = (props: InputFieldProps) => {
  const [show, setShow] = useState(props.type === "password" ? false : true);

  const handlePasswordToggle = () => {
    setShow(!show);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={props.label || ""} className="font-bold text-lg">
        {props.label}
      </label>

      <div className="relative">
        <input
          type={show ? props.type : "text"}
          id={props.label || ""}
          placeholder={props.placeholder || ""}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          required={props.required ? true : false}
          min={props.min}
          readOnly={props.readOnly}
          className="shadow border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline w-[15rem] sm:w-[30rem] lg:w-[45rem]"
        />

        {props.type === "password" && (
          <button
            className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
            onClick={handlePasswordToggle}
          >
            {show === true ? (
              <FaEye size={24}></FaEye>
            ) : (
              <IoEyeOffSharp size={24}></IoEyeOffSharp>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;

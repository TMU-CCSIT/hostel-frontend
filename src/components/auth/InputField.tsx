// components/InputField.tsx
import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  name: string;
  onChange: (value: any) => void;
}

const InputField = (props: InputFieldProps) => {

  return (
    <div className="flex flex-col">
      <label htmlFor={props.label || ""} className="font-bold text-lg">
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.label || ""}
        placeholder={props.placeholder || ""}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        className="shadow border rounded py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline md:w-[22rem] "
      />
    </div>
  );
};

export default InputField;

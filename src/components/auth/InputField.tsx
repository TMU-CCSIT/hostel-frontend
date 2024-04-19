// components/InputField.tsx
import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (value: any) => void;
}

const InputField = (props: InputFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <div className="">
      <label htmlFor={props.label} className="font-bold text-lg">
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.label}
        placeholder={props.placeholder || ""}
        value={props.value}
        onChange={handleChange}
        className="shadow border rounded py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default InputField;




// components/InputField.tsx
import React from "react";

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
        required={props.required ? true : false}
        min={props.min}
        readOnly={props.readOnly}
        className="shadow border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline w-[15rem] sm:w-[30rem] lg:w-[45rem]"
      />
    </div>
  );
};

export default InputField;

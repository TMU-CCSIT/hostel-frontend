import React from "react";

interface TextAreaProps {
  label: string;
  placeholder?: string;
  value: any;
  name?: any;
  required: Boolean;

  readOnly?: any;
  onChange: (value: any) => void;
}

const TextArea = (props: TextAreaProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={props.label || ""} className="font-bold text-lg">
        {props.label}
      </label>
      <textarea
        id={props.label || ""}
        placeholder={props.placeholder || ""}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        required={props.required ? true : false}
        readOnly={props.readOnly}
        className="shadow border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline resize-none h-32 w-[15rem] sm:w-[30rem] lg:w-[45rem]"
      />
    </div>
  );
};

export default TextArea;

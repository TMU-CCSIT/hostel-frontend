import React from "react";

interface CheckboxProps {
  label: string;
  name: string[] | string;
  text: string;
  onChange?: (value: any) => void;
}

const Checkbox = (props: CheckboxProps) => {
//   console.log(props.name);
  return (
    <div className="flex flex-col gap-4">
      <label className="font-bold text-lg">
        {props.label}
      </label>
      {Array.isArray(props.name) ? (
        props.name.map((option: string) => (
          <div key={option} className="flex items-center">
            <input
              type="checkbox"
              id={option}
              name={props.text}
              value={option}
              onChange={props.onChange}
              className="mr-2"
            />
            <label htmlFor={option}>{option}</label>
          </div>
        ))
      ) : (
        <div className="flex items-center">
          <input
            type="checkbox"
            id={props.name as string}
            name={props.text}
            value={props.name as string}
            onChange={props.onChange}
            className="mr-2"
          />
          <label htmlFor={props.name as string}>{props.name}</label>
        </div>
      )}
    </div>
  );
};

export default Checkbox;

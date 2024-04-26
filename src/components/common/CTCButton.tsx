import React from "react";

interface propsType {
  onClickHandler?: () => void;
  text: String;
  type?: Boolean;
}

const CTCButton = (props: propsType) => {
  return (
    <div>
      <button
        type={props.type ? "submit" : "button"}
        onClick={props.onClickHandler}
      >
        <span className="bg-[#437FC7] text-white px-8 rounded-md font-medium hover:bg-[#6DAFFE] transition-all duration-300 ease-in-out py-3">
          {props.text}
        </span>
      </button>
    </div>
  );
};

export default CTCButton;

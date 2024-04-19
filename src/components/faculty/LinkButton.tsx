import React from "react";
import Link from "next/link";

interface propsType {
  onClickHandler: () => void;
  text: String;
}

const LinkButton = (props: propsType) => {
  return (
    <div>
      <button onClick={props.onClickHandler}>
        <span className="bg-[#437FC7] px-8 rounded-md font-medium hover:bg-[#6DAFFE] transition-all duration-300 ease-in-out py-3">
          {props.text}
        </span>
      </button>
    </div>
  );
};

export default LinkButton;

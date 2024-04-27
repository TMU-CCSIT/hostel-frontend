import "./loading.css";
const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;

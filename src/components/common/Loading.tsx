import "./loading.css";
const Loading = () => {
  return (
    <div className="flex justify-center fixed z-[100] top-0 left-0 bg-[black]/[0.4] items-center w-full h-screen">
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

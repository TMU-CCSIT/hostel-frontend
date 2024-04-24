import Navbar from "@/components/common/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center text-black items-start bg-[#fff]">
        <div className="w-10/12 flex justify-center items-center text-4xl font-semibold flex-col text-black min-h-screen">
          <h2>Heyy</h2>
          <p>This is home page</p>
        </div>
      </div>
    </>
  );
}

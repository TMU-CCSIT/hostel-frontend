import LeaveApprovalCard from "@/components/faculty/LeaveApprovalCard";
import axios from "axios";

// const data = [
//   {
//     userName: "",
//     enrollment: "",
//     id: "",
//     profileImage: "",
//   },
//   {
//     userName: "",
//     enrollment: "",
//     id: "",
//     profileImage: "",
//   },
//   {
//     userName: "",
//     enrollment: "",
//     id: "",
//     profileImage: "",
//   },
//   {
//     userName: "",
//     enrollment: "",
//     id: "",
//     profileImage: "",
//   },
//   {
//     userName: "",
//     enrollment: "",
//     id: "",
//     profileImage: "",
//   },
//   {
//     userName: "",
//     enrollment: "",
//     id: "",
//     profileImage: "",
//   },
//   {
//     userName: "",
//     enrollment: "",
//     id: "",
//     profileImage: "",
//   },
//   {
//     userName: "",
//     enrollment: "",
//     id: "",
//     profileImage: "",
//   },
//   {
//     userName: "",
//     enrollment: "",
//     id: "",
//     profileImage: "",
//   },
//   {
//     userName: "",
//     enrollment: "",
//     id: "",
//     profileImage: "",
//   },
//   {
//     userName: "",
//     enrollment: "",
//     id: "",
//     profileImage: "",
//   },
//   {
//     userName: "",
//     enrollment: "",
//     id: "",
//     profileImage: "",
//   },
// ];

async function fetchAllPendingLeaves() {
  try {
    const result = await axios.get(`/api/faculty/leave-form`);
    console.log("res: ", result);
  } catch (error) {
    return null;
  }
}

const ApplicationPage = async () => {
  const data = await fetchAllPendingLeaves();

  return (
    <>
      <div className="min-h-screen w-full bg-[#ffffff] flex flex-col gap-5 justify-start items-center">
        <div className="w-11/12 mt-5 mb-10 flex-col flex gap-2">
          <div>
            <span className="text-4xl text-black font-semibold">
              Pending Applications
            </span>
          </div>
          <div className="w-full mt-5 flex-col flex gap-5">
            {data &&
              data?.map((user: any) => (
                <LeaveApprovalCard key={user.id} userInfo={user} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationPage;

import { atom } from "recoil";

export const userAtom = atom({
  key: "userAtom",
  default: null,
});

// import axios from "axios";
// import { atom, selector } from "recoil";

// const fetchUserFromBackend = async () => {
//   try {
//     const response = await axios.get("/api/auth/user");
//     return response.data?.data;
//   } catch (error: any) {
//     console.log("ERROR when fetching user data in userAtom: ", error.message);
//     return null;
//   }
// };



// Atom for storing user information
// export const userAtom = atom({
//   key: "userAtom",
//   default: selector({
//     key: "user/default",
//     get: async () => {
//       const userData = await fetchUserFromBackend();
//       return userData;
//     },
//   }),
// });


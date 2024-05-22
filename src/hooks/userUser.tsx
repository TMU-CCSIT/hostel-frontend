import { fetchUserDetails } from "@/action/userSignup";

export async function useUser({ userId = "" }: { userId: string }) {
  try {
    // if userId is not passed as params then fetch details of current user

    // fetch current/loggedIn user
    if (!userId) {
    }

    const response = await fetchUserDetails(userId);
    return response.data.data;
  } catch (error) {
    console.log("Error when try to fetch user details: ", error);
    return null;
  }
}

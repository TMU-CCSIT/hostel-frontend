
import user from "@/"

export async function isEmailAlreadyExist(email) {

    try {

        return await User.findOne({ email });

    } catch (error) {
        throw new Error("Server failed to findout user by email");
    }
}



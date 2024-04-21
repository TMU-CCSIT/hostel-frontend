
import User from "@/models/User.model"

// import User from "@/models/user.model";


import { dbConnection } from "@/config/dbConfig";

dbConnection();

export async function isEmailAlreadyExist(email: string) {

    try {

        return await User.findOne({ email });

    } catch (error) {

        throw new Error("Server failed to findout user by email");

    }
}





import User from "@/models/user.model";

import { dbConnection } from "@/config/dbConfig";

dbConnection();

export async function isEmailAlreadyExist(email: string) {

    try {
        
        return await User.findOne({ email });

    } catch (error: any) {

        console.log("Error: ", error.message)

        throw new Error("Server failed to findout user by email");

    }
}





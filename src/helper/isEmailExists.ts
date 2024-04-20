
import User from "@/models/User.model"

import { dbConnection } from "@/app/config/dbConfig";

dbConnection();

export async function isEmailAlreadyExist(email:any) {

    try {

        return await User.findOne({ email });

    } catch (error) {

        throw new Error("Server failed to findout user by email");
        
    }
}




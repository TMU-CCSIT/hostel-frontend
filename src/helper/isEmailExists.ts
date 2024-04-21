
import Student from "@/models/Student.model";

import { dbConnection } from "@/config/dbConfig";

dbConnection();

export async function isEmailAlreadyExist(email:any) {

    try {

        return await Student.findOne({ email });

    } catch (error) {

        throw new Error("Server failed to findout user by email");
        
    }
}





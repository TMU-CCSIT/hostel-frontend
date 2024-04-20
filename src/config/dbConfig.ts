
import mongoose from 'mongoose';

export const dbConnection = () => {

  mongoose.connect(process.env.DATABASE_URL || "")
    .then(() => {
      console.log("DB CONNECTION SUCCESSFULL!")
    })
    .catch((err: any) => {
      console.log("DB CONNECTION FAILED! ");
      console.log("ERROR: ", err)
    });
}

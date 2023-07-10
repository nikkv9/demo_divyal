import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mdb:laser@cluster0.xqqrjpj.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("database is connected successfully!");
  } catch (error) {
    console.log(error);
  }
};

export default databaseConnection;

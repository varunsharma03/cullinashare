import mongoose from "mongoose"
const dbconnect = mongoose.connect("mongodb+srv://nagato3:abcd1234@cluster0.5uwzgpa.mongodb.net/cullina").then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});
export default dbconnect;
import dbconnect from "../dbconnect";
import jwt from "jsonwebtoken";
import User from "../models/user";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {username,password}=req.body;
   try{
    const response=await User.findOne({username});
    if(response.password===password)
    {
      const payload=response._id;
      const token= await jwt.sign({payload},"varun123");
      return res.status(200).json({token});
    }
   }
   catch(err)
   {
    return res.json({err})
   }
  
  } else if (req.method === "PUT") {
    const { token, recipe } = req.body;
    try {
                const x = await jwt.verify(token, "varun123");
                const _id = x.payload;
                try {
                    const user = await User.findById(_id);
                    if (!user) {
                    return res.status(404).json({ message: "User not found" });
                    }
                    const index= user.liked.indexOf(recipe);
                    if(index>-1)
                    {
                        user.liked.splice(index,1);
                    }
                    await user.save();
                    return res.status(200).json({ liked:user.liked });
                } catch (error) {
                    console.error("Error updating liked recipes:", error.message);
                    return res.status(500).json({ message: "Internal Server Error" });
                }
    } catch (error) {
            console.error("JWT Verification Error:", error.message);
            return res.status(401).json({ message: "Invalid token" });
    }
  }
}

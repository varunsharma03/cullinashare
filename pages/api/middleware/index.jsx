import jwt from "jsonwebtoken";
import User from "../models/user";

export default async function middleware(req,res)
{if(req.method==="POST")
{
        
    let {token}= req.body;
    const response=await  jwt.verify(token,"varun123");
    if(response)
    {
        const _id=response.payload;
        const x = await User.findById(_id).populate("liked");
        const data= x.liked;
        return res.json({data});
    }

}
}
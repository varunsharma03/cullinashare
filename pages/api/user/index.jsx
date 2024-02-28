import User from "../models/user";
import dbconnect from "../dbconnect";
import jwt from "jsonwebtoken";

export default async function handler(req,res)
{
    
    if(req.method==="POST")
    {
        const{username,password,name}=req.body;
        const exitinguser=await User.findOne({username})
        
        if(exitinguser)
        {
            return res.json({message:"User Already Exists"})
        }
        const response= new User({username,password,name});
        await response.save();
        return res.status(200).json({response});
    }
    else if (req.method==="GET")
    {
        const {id} =req.body;
        const response = await User.findById(id).populate("liked");
        if(response){
            res.json({response});
        }
    }
    else if(req.method==='PUT')
    {
        const {token}=req.query;
        const {recipe}=req.body;
        const x= jwt.verify(token,"varun123");
        const _id=x.payload;
        const response=await User.findById({_id});
        if(!response.liked.includes(recipe)){
            response.liked.push(recipe);
            await response.save();
        }
        return res.json({response});
    }
}
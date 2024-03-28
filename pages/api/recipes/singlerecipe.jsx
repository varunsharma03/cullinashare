import Recipe from "../models/recipe";
export default async function handler(req,res){
    try{
        const {_id}=req.query;
        console.log(_id);
        const response= await Recipe.findById({_id});
        return res.json(response);
    }catch(err)
    {
        return res.json({message:"Error while fetching"})
    }
}
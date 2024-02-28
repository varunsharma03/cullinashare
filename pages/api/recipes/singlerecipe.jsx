import Recipe from "../models/recipe";
export default async function handler(req,res){
    try{
        const {_id}=req.query;
        const response= await Recipe.findById({_id});
        return res.json(response);
    }catch(err)
    {

    }
}
import dbconnect from "@/pages/api/dbconnect";
import Recipe from "../models/recipe";

export default async function handler(req,res)
{   
    if(req.method==="POST")
    {
      try{
        const{name,detail,ingredients,categorie,nationality,by,url}=req.body
        const response= new Recipe({
                name,detail,ingredients,categorie,nationality,by,url
        });
        await response.save();
        if(response)
        {
            return res.status(200).json({response})
        }
      }
      catch(err)
      {
        console.log(err,"error")
      }
    }
    else if(req.method==="GET")
    {
      const recipes=await Recipe.find({});
      if(recipes)
      {
        return res.json({recipes});
      }
    }
}
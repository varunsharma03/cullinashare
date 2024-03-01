import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/router';


const Postrecipe = () => {
  const[name,setname]=useState("");
  const[categorie,setcategorie]=useState("");
  const[nationality,setnationality]=useState("");
  const[detail,setdetail]=useState("");
  const[ingredients,setingredients]=useState("");
  const[url,seturl]=useState("")
  const[by,setby]=useState("")
  const router= useRouter()
  function addingredients() {
    let x = document.createElement("input");
    x.type = "text";
    x.addEventListener('change', (e) => {
      setingredients((prevIngredients) => [...prevIngredients, e.target.value]);
    });
    x.placeholder = "Ingredient...";
    x.className = 'text-xl font-semibold p-2 border-1 bg-slate-200 text-slate-900 border-slate-400 rounded-md shadow-xl';
    let div = document.querySelector(".ing");
    div.insertBefore(x, div.lastChild);
  }
  function postrecipe()
  {

    name.toUpperCase();
    const response= axios.post("api/recipes",{
      ingredients,name,categorie,nationality,detail,url,by
    });
    if(response)
    {
      router.push('/')
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='p-3  w-[60%] pt-8 mt-5 grid gird-cols-1 gap-4  rounded-md'>
        <p className='text-4xl font-bold text-slate-500'>Post You Recipe</p>
        <input
        type="text"
        placeholder="Name..."
        className='text-xl font-semibold p-2 border-1 bg-slate-200 text-slate-900 border-slate-400 rounded-md shadow-xl'
        onChange={(e)=>{setname(e.target.value)}}
        ></input>
        <input
        type="text"
        placeholder="categorie..."
        className='text-xl font-semibold p-2 border-1 bg-slate-200 text-slate-900 border-slate-400 rounded-md shadow-xl'
        onChange={(e)=>{setcategorie(e.target.value)}}
        ></input>
        <input
        type="text"
        placeholder="Nationality..."
        className='text-xl font-semibold p-2 border-1 bg-slate-200 text-slate-900 border-slate-400 rounded-md shadow-xl'
        onChange={(e)=>{setnationality(e.target.value)}}
        ></input>
        <input
        type="text"
        placeholder="By"
        className='text-xl font-semibold p-2 border-1 bg-slate-200 text-slate-900 border-slate-400 rounded-md shadow-xl'
        onChange={(e)=>{setby(e.target.value)}}
        ></input>
        <input
        type="text"
        placeholder="photo url"
        className='text-2xl font-semibold p-2 border-1 bg-slate-200  border-slate-400 rounded-md shadow-xl'
        onChange={(e)=>{seturl(e.target.value)}}
        ></input>
        <textarea
          placeholder='Details...'
          onChange={(e)=>{setdetail(e.target.value)}}
          rows={5}
          cols={10}
          className='text-xl font-semibold p-1 mt-2 p-2 shadow-xl border-1 bg-slate-200 border-slate-400 rounded-md'
        />
        <div className='ing grid grid-cols-1 gap-3' >
          <p
           className='text-2xl font-semibold p-1 mt-3 border-1  text-slate-500 border-slate-400 rounded-md '
          >Add Ingredients</p>
          <div className='flex justify-between p-4'>
          <button className='w-32 h-10 p-2 text-lg text-white font-bold bg-blue-500 rounded-md'
          onClick={()=>{addingredients()}}>
            Add 
          </button>
          <button 
           className='w-32 h-10 p-2 text-lg text-white font-bold bg-blue-500 rounded-md'
          onClick={()=>{postrecipe()}}>Post</button>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default Postrecipe

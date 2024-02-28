import { useRouter } from 'next/router'
import React from 'react'
import { useState } from 'react'
import axios from"axios"
import { useEffect } from 'react'
const Liked = () => {
  const [data,setdata]=useState([])
  const router= useRouter()
  async function fetch(){
    let token=localStorage.getItem("token");
    console.log(token)
    const response  = await axios.post("http://localhost:3000/api/middleware",{token});

    console.log(response.data.data)
    setdata(response.data.data);

  }
  async function handleremove(_id)
  {
    const token= localStorage.getItem("token");
    const recipe=_id
    let url="http://localhost:3000/api/user/login";
    const response= await axios.put(url,{token,recipe});
    if(response){
        router.reload();
    }    

  }
  useEffect(()=>{
    fetch()
  },[])
  
  return (
    <div>
      <p className='text-center font-bold text-slate-600 text-4xl mt-4'>Your Liked Recipes</p>
      {
        data.length>0?
      <div className='grid grid-cols-1 gap-8 p-3 m-4'>
        {
            data?.map((e)=>{
                return (
                    <div key={e._id} className='grid grid-cols-12  items-center max-[830px]:grid-cols-7 border-b-2 pb-4 border-slate-200'>
                        {/* photo */}
                        <div className='col-span-7 items-center p-2 flex justify-center  pt-10'>
                            <img 
                            src={e.url}
                            className='w-[300px] h-[300px] rounded-2xl '
                            />
                         
                        </div>
                        {/* except photo */}
                        <div className=' mt-15 p-2 col-span-4 flex flex-col max-[830px]:w-[100%] max-[830px]:mx-auto'>
                            <div className='flex  justify-between '>
                                    <p className='text-4xl text-start text-slate-600 font-bold '>{e.name}</p>
                                    <p className='text-xl  mt-2 text-blue-600 font-semibold '>{e.categorie}</p>
                            </div>
                            <div className='grid grid-cols-2 my-5'>
                                {
                                    e.ingredients?.map((ele)=>{
                                        return <li
                                        className='font-semibold text-xl text-slate-500 '
                                        key={ele}>
                                            {ele}
                                        </li>
                                    })
                                }

                            </div>
                            <p className='text-xl text-slate-600 font-thin overflow-hidden whitespace-pre-line break-words max-w-[600px]'>
                            {e.detail}
                            </p>
                            {/* ratimg and nationality */}
                            <div className='flex justify-between mt-4'>
                                <p className='text-2xl font-bold text-blue-600 '>
                                    {e.nationality}
                                    <p className='text-lg text-slate-500 cursor-pointer mt-2'
                                    onClick={()=>{handleremove(e._id)}}
                                    >Remove from Liked</p>

                                </p>
                                <div className='mt-3 flex justify-between grid grid-cols-1'>
                                <button className='text-blue-600 '
                                onClick={()=>{router.push(`/recipe/${e._id}`)}}>See More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }

      </div>
      :
      <>
        <div className='loader mx-auto mt-[20%]  '>
          
        </div>
        <p className='text-center font-bold mt-8'>No Liked Recipes...</p>
      </>
    }
    </div>
  )
}

export default Liked

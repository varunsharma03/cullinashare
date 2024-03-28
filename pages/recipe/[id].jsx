import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from "axios"

const Id = () => {
    const [data,setdata]=useState([])
    const[star,setstar]=useState([]);
    useEffect(() => {
    const fetchRecipe = async () => {
      try {
        let id=localStorage.getItem("recipeID");
<<<<<<< HEAD
        const response = await axios.get(`/api/recipes/singlerecipe?_id=${id}`);
=======
        const response = await axios.get(`api/recipes/singlerecipe?_id=${id}`);
        console.log(response.data);

>>>>>>> 0ff976243abb14143718be09fe0c7dfefdfa8f7d
        setdata([response.data]);
        setstar(Array(response.data?.rating || 0).fill(''));
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, []);
    return (
    <div className='w-[100vw]'>
        {
            data.length>0?
      <div className='mx-auto p-4 w-[80%] rounded-md mt-10 '>
        {
            data?.map((e,index)=>{
                return (
                    <div key={index} className='grid grid-cols-12 max-[1037px]:grid-cols-7 '>
                        {/* photo */}
                        <div className='col-span-7  p-2 flex  justify-center'>
                            <img 
                            src={e.url}
                            className='w-[500px] h-[600px] max-[800px]:w-[200px] max-[800px]:h-[200px]
                             rounded-2xl'
                            />
                         
                        </div>
                        {/* except photo */}
                        <div className=' mt-20 p-2 col-span-4 max-[800px]:col-span-7  '>
                            <div className='flex  justify-between '>
                                    <p className='text-4xl text-start text-slate-600 font-bold '>{e.name}</p>
                                    <p className='text-xl  mt-2 text-blue-600 font-semibold '>{e.categorie}</p>
                            </div>
                            <div className='grid grid-cols-2 my-5'>
                                {
                                    e.ingredients?.map((ele,index)=>{
                                        return <li
                                        className='font-semibold text-xl text-slate-500 '
                                        key={index}>
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
                                </p>
                                    
                                <div className='grid grid-cols-5'>
                                    {/* stars */}
                                {star.map((ele,index)=>{
                                        return(
                                        <img
                                        key={index}
                                        width={30}
                                        src='https://th.bing.com/th/id/R.a2cc496c524f6c5aad1e5f917a21f1da?rik=RgnfmPNhmD1Fww&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fyellow-stars-png-hd-pictures-of-cartoon-stars-hd-wallpapers-lovely-8029.png&ehk=m0CtO8Pg61I%2b%2fYN2EGmzKTA62VKU%2fhObQR0rdbm%2fUCQ%3d&risl=&pid=ImgRaw&r=0'
                                        />
                                        )
                                    })}
                                </div>

                            </div>
                        </div>
                    </div>
                )
            })
        }
      </div>
      :
      <div className='loader mx-auto mt-[20%]'>
      </div>
        }
    </div>
  )
}

export default Id

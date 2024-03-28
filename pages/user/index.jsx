import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useRouter } from 'next/router'

const Index = (props) => {
  const router=useRouter();
  // const setloginflag=router.query.setloginflag;
  const[loginflag,setloginflag2]=useState(false)
  const[name,setname]=useState("");
  const[username,seteusername]=useState("");
  const[password,setpassword]=useState("");
  async function loginhandler() {
    if (!username || !password) {
      window.alert("Please fill all the details");
    } else {
      try {
        const response = await axios.post("api/user/login", {
          username,
          password,
        });
        if (response.data.token) { 
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("loged", true);
          router.push('/');
        }else{
          window.alert("Invalid Credentials");
          let x= document.querySelector('.username');
          x.value="";
          let y =document.querySelector('.password');
          y.value=""

        } 
      } catch (error) {
        window.alert("An error occurred during login");
      }
    }
  }
  
  async function signuphandler()
  {
    if(!name || !username || !password)
    {
        window.alert("Please Fill all the details")
    }else{
        let url="api/user"
        const response =axios.post(url,{name,username,password});
        if(response)
        {
          router.push('/');
        }else{
          window.alert("nhi chalri")
        }
    }

  }

  return (
    <div>
      <div className='mx-auto p-2 m-2 w-[90vw] md:flex-row flex-wrap flex justify-betweeen gap-16 items-center h-[100vh]'>
            <div>
                <img 
                width={600}
                className='max-[800px]:w-[400px] rounded-xl'
                src='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ab1fff21308267.57a0ddb7dad63.jpg'></img>
            </div>

            {/* login & SignUp */}
            <div className='grid grid-cols-1 w-[40%] max-[600px]:w-[90%]
            max-[1200px]:w-[66%]
            bg-slate-200 rounded-xl p-3 m-4 items-center ml-5 p-4'>
                <p className='text-3xl font-bold m-2 p-1 text-slate-600 '>The Cullina Share</p>
                {
                    loginflag?
                    <input type="text" placeholder="Your Name"
                    onChange={(e)=>{setname(e.target.value)}}
                    className='  p-3 m-2 rounded-xl text-lg font-semibold  text-slate-500 bg-slate-100'></input>:""
                
                }
                <input type='text' placeholder='username...'
                 className='username p-3 m-2 rounded-xl text-lg font-semibold  text-slate-500 bg-slate-100'
                onChange={(e)=>{seteusername(e.target.value)}}></input>
                <input type='password' placeholder='password'
                onChange={(e)=>{setpassword(e.target.value)}}
                className='password p-3 m-2 rounded-xl text-lg font-semibold 
                text-slate-500 bg-slate-100'></input>
                {
                    loginflag?
                    <>
                    <button className='w-[50%] bg-blue-400 text-white text-lg font-semibold p-3 rounded-md m-2 
                    hover:bg-blue-500 taransition-all duration-300 max-[600px]:w-[90%] max-[1200px]:w-[70%] max-[1300px]:w-[80%]'
                    onClick={()=>{signuphandler()}}>SignUp</button>
                    <p className='m-2 p-2 text-blue-400 mt-0 pt-0 cursor-pointer'
                    onClick={()=>{setloginflag2(!loginflag)}}>Login?</p>
                    </>
                    :
                    <>
                    <button className='w-[50%] bg-blue-400 text-white text-lg font-semibold p-3 rounded-md m-2 
                    hover:bg-blue-500 taransition-all duration-300 max-[600px]:w-[90%] max-[1200px]:w-[70%] max-[1300px]:w-[80%]'
                    onClick={()=>{loginhandler()}}>Login</button>
                    <p className='m-2 p-2 text-blue-400 mt-0 pt-0 cursor-pointer'
                      onClick={()=>{setloginflag2(!loginflag)}}>SignUp?</p>
                    </>
                }
            </div>
      </div>
    </div>
  )
}

export default Index

import { useState } from "react"
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../config/firebase"
import { useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Login(){
    const from = "/gallery"
    const [loginEmail,setLoginEmail] = useState("")
    const [show,setShow] = useState(false)
  
    const navigate = useNavigate();
    const [loginPassword,setLoginPassword] = useState("")
    
    const login = async (event) => {
        event.preventDefault()
        toast.dismiss()
        try{
        const user = await signInWithEmailAndPassword(
            auth,
            loginEmail,
            loginPassword
        );
        console.log(user)
        toast.success("Login Successful!")
        setTimeout(() => {
            navigate(from,{replace:true})
        }, 1000);
        }catch(error){
            console.log(error.message)
            toast.error("Error: " + error.message.slice(22,-2))
        }
       
    }
    return(
        <section className="font-space bg-white min-h-screen flex justify-center items-center">
            <ToastContainer position="top-right" theme="colored"/>
            <div className="bg-white xs:w-96 h-96 rounded-[20px] px-8 w-5/6 shadow-2xl">
            <div className="flex items-center mt-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 fill-[#21092f]" height="1em" viewBox="0 0 512 512"><style></style><path d="M448 256c0-106-86-192-192-192V448c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>
                <p className="font-bold text-base text-[#21092f] tracking-[-0.08rem]">imagery</p>
            </div>
           <h1 className="font-extrabold text-xl my-4">Log In to Imagery</h1>
           <form className="flex flex-col">
            <label htmlFor ="username" className="font-medium mb-1">Username</label>
            <div className=" flex w-full items-center rounded-[10px]">
            <input onChange={(event) => {setLoginEmail(event.target.value)}} type="text" name="username" placeholder="Enter username" autoComplete="off" spellCheck = "false" className="input border-2 border-[#DEDDDF] outline-none pl-4 pr-7 w-full py-1 rounded-[10px] text-base"/>
            <svg xmlns="http://www.w3.org/2000/svg" className="-ml-8" height="1em" viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z"/></svg>
            </div>
            <label htmlFor ="password" className="font-medium mt-4 mb-1">Password</label>
            <div className="flex w-full items-center rounded-[10px] focus:border-purple-400">
            <input onChange={(event) => {setLoginPassword(event.target.value)}} type= {show ? "text" : "password"} name="password" autoComplete="off" spellCheck = "false" placeholder="Enter password" className="input border-2 border-[#DEDDDF]  pr-7 rounded-[10px] text-base py-1 pl-4 outline-none w-full"/>
            {show === false && <button className="" onClick={() => {setShow(true)}}><svg xmlns="http://www.w3.org/2000/svg" height="1em" className="-ml-8 fill-black" viewBox="0 0 640 512"><style>svg</style><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg></button>}
            {show === true && <button onClick={() => setShow(false)}><svg className="-ml-8 fill-black" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><style>svg</style><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg></button>}
            </div>
            <button onClick={login} className="w-full hover:saturate-200 py-4 mt-7 font-medium font-lg rounded-[10px] text-white bg-[#21092F]">Log In</button>
           </form>

           </div>
        </section>
    )
}
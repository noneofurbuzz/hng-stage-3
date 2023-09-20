import { useState,useRef } from "react"
import data from "../../data.json"
import { useEffect } from "react"
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";



export function Gallery(){

    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const [word,setWord] = useState({
        search : ""
    })
    function handleSubmit(event){
        event.preventDefault()
    }
    function handleChange(event){
        const {name,value} = event.target
        setWord((prev) => {
            return{
                ...prev,
                [name] : value
            }
        })
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        },4000)
    },[])
    
    useEffect(() => {
        console.log(word.search)
    },[word.search])
    let filtered = (data.filter((filter) => filter.name.toLowerCase().includes(word.search.toLowerCase()) === true ))
    const gridRef = useRef(null);
    const sortableJsRef = useRef(null);
    
    
    useEffect(() => {
        sortableJsRef.current = new Sortable(gridRef.current, {
            animation: 150,
            delayOnTouchOnly:false,
            delay:70

        });
    }, []);
    const logout = async() => {
        await signOut(auth);
        navigate("/login")
        
    }
    return(
        <section className="min-h-screen font-space">
            <nav className="border-b-[1px] border-zinc-300 flex justify-between fixed top-0 left-0 right-0 z-10  bg-white py-4 px-8 items-center">
                <h1 className="font-extrabold font-space1 text-3xl tracking-[-0.25rem] mr-4 xs:mr-0">imagery</h1>
                <div className="flex">
                <form onSubmit={handleSubmit} className="rounded-xl flex items-center bg-white py-1 shadow-2xl shadow-black">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" className="ml-5 fill-[#21092f]" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                    <input onChange={handleChange} autoComplete="off" spellCheck="false" value={word.search} type="text" name="search" placeholder="filter images..." className="px-3 shadow-2xl rounded-xl outline-none w-full text-ellipsis"/>
                </form>
                <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-8 rounded-full">
          <img src="/assets/images/random.webp" />
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-30">
        <li><button onClick={logout}>Logout</button></li>
      </ul>
    </div>
                </div>

            </nav>
          
            <div ref={gridRef}  id="gridDemo" className={`${(filtered.length === 0 && word.search !== "") ? "" : "grid"}        ms:grid-cols-3 grid-cols-1 sm:grid-cols-2 px-8 py-12 mt-16 w-full gap-16`}>
                {(word.search !== "" ? data.filter((filter) => filter.name.toLowerCase().includes(word.search.toLowerCase())) : (data)).map((image,index) => {
                    return(
                        <>
                        
                        <div key={index}  className="relative mx-auto grid-square">
                        {loading ? (<img src="/assets/images/background.jpg" className="max-w-full bg-zinc-300 animate-pulse rounded-2xl h-96 w-96 object-cover" alt="background"/>) : (<img src={image.image} alt={image.alt} className="max-w-full hover:scale-105 duration-500 ease-in-out transition-all rounded-2xl h-96 object-cover w-96"/>)}
                        {loading ? (<p className="absolute bottom-10 text-white font-extrabold text-2xl left-8 mr-4 bg-zinc-200 rounded-3xl w-40 h-3 animate-pulse">&nbsp;&nbsp;&nbsp;</p>): (<p className="absolute bottom-10 text-white font-extrabold text-2xl left-8 mr-4">{image.name}</p>)}
                        {loading ? (<p className="absolute bottom-6 text-xs text-zinc-400 left-8 break-words mr-4 rounded-3xl w-28 h-3 animate-pulse bg-zinc-200">&nbsp;</p>):(<p className="absolute bottom-6 text-xs text-zinc-400 left-8 break-words mr-4">{image.artist}</p>)}
                    </div> 
                    </>
                    )
                })}   
                {filtered.length === 0 && 
                       <section className=" px-8 flex w-full flex-col pt-20 items-center justify-center">
                       <svg className="fill-black w-16 max-w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><style>svg</style><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM159.3 388.7c-2.6 8.4-11.6 13.2-20 10.5s-13.2-11.6-10.5-20C145.2 326.1 196.3 288 256 288s110.8 38.1 127.3 91.3c2.6 8.4-2.1 17.4-10.5 20s-17.4-2.1-20-10.5C340.5 349.4 302.1 320 256 320s-84.5 29.4-96.7 68.7zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                       <p className="mt-6 text-center font-bold text-xl">Oops! No images found for <span className="text-[#21092f] break-all">{word.search}</span></p>
                       <p className=" text-gray-500 text-center">Please check spelling or try different keywords</p>
                   </section>
                   }
                </div>
        </section>
    )
}
"use client"
import { useEffect,useState } from "react";
import Link from "next/link";
export default function Table(){
    const [message , setMessage] = useState('');
    //delete function
    const handleDelete = async (userId)=>{
        const reqOption={
          method:"DELETE",
        }
        const response  = await fetch(`http://localhost:3000/api/user/${userId}`,reqOption);
        setMessage(` User Deleted Successfully`);
            setTimeout(navigate, 1000);
            function navigate() {
              window.location.reload();
            }
      }
    //fetch user function
    const [users , setUsers] = useState([]);
    useEffect(() => {
            async function fetchUser() {
                const res = await fetch("http://localhost:3000/api/user");
                setUsers(await res.json());
            }
            fetchUser();
    } , [])
    return(
      <>    
        {message && (<div className="flex justify-center bg-red-500 text-white text-md py-1 px-3 rounded-md mt-2">{message}</div>)}
        <table className="my-4 w-full">
          <tbody>
            <tr className=" border-t-0 border-r-0 border-l-0 border-2" >
                <th className="uppercase py-2">name</th>
                <th className="uppercase py-2">age</th>
                <th className="uppercase">phone number</th>
                <th className="uppercase">Action</th>
            </tr>
              
              { 
              Object.entries(users).map(([key,id])=>(
              <tr key={key}  className="text-center my-6 border-t-0 border-r-0 border-l-0 border-2">
                <td  className="py-3 capitalize">{id.name}</td>
                <td  className="py-3">{id.age}</td>
                <td >{id.mobno}</td>
                <td className="py-4 flex gap-3 justify-center propss-center">
                  <Link href={`/pages/editUser/${id.id}`} className=" px-4 py-2 rounded-xl bg-[#f8f8f8] shadow-xl text-white font-semibold uppercase hover:bg-[#f9f9f9] hover:shadow-inner" title="Edit User">
                  <img src="/edit.png" alt=""  width={25}/>
                  </Link>
                  <button id="refreshBtn" onClick={()=>{handleDelete(id.id)}} className=" px-4 py-2 rounded-xl bg-[#f8f8f8] shadow-xl text-white font-semibold uppercase hover:bg-[#f9f9f9] hover:shadow-inner" title="Delete User"><img src="/delete.png" alt="" width={25} /></button>
                </td>
              </tr>            
              ))
              }
          </tbody>
        </table>
      </>
    )
}
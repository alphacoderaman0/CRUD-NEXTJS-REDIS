"use client"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
export default function edit({params}){

  const id = params.id;
  const [user , setUser] = useState([]);
  const [message , setMessage] = useState('');
  const [error , setError] = useState('');
  const [name , setName] = useState('');
  const [age , setAge] = useState('');
  const [mobno , setMobno] = useState('');

    // update user ends
  const handleUpdateSubmit = async(e) => {
      e.preventDefault();
      
      try {
      if(name.length <=2){
        setError("name must be of 3 or more character");
      }
      else if(name == parseInt(name)){
        setError("Number not allowed in name field");
      }
      else if(age <=17){
        setError("age must be of 18 or more");
      }
      else if(mobno.length <=9){
        setError("mobile Number must be of 10 digit");
      }
      else{
        const res = await fetch(`http://localhost:3000/api/user/${id}`,{
        method:'PUT',
        headers:{
          "Content-Type":"Application/json"
        },
        body:JSON.stringify({name,age,mobno})});
        await res.json();
        setMessage(` User Updated Successfully`);
        setTimeout(navigate, 2000);
        function navigate() {
          window.location.href = 'http://localhost:3000'; 
        }
      }  
    }catch(error){
      setMessage('error occured');
      console.log("error occured",error);
    }
    
  }
  useEffect(() => {
      async function fetchData(params) {
          const info = await fetch(`http://localhost:3000/api/user/${params}`)
          setUser(await info.json());
      }
      fetchData(id)
  } , [])
    // update user ends
    return(
        <div className=" px-96 flex  justify-center items-center h-[100vh]">
      <div className="w-full bg-white px-6 py-6 border rounded-xl shadow-lg hover:shadow-xl">
          <h1 className="text-3xl text-center font-bold uppercase">Update Contact Details</h1>
          {message && (
              <div className="flex justify-center bg-green-500 text-white text-md py-1 px-3 rounded-md mt-2">
                {message}
              </div>)}
          {error && (
              <div className="flex justify-center bg-red-500 text-white text-md py-1 px-3 rounded-md mt-2">
                {error}
              </div>)}
          {/* form starts */}
          <form onSubmit={handleUpdateSubmit} className="my-2 space-y-5 ">
          {/* input starts */}
            <div>
              <label htmlFor="name"className="block mb-2 text-lg font-medium text-gray-900 ">Name</label>
              <input type="text" id='name' name="name" onChange={(e)=>setName(e.target.value)} defaultValue={user.name} placeholder="Enter your Name" className="block p-3 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 " required/>
            </div>
            <div>
              <label htmlFor="age"className="block mb-2 text-lg font-medium text-gray-900 ">Age</label>
              <input type="number" id='age' name="age" onChange={(e)=>setAge(e.target.value)} defaultValue={user.age} placeholder="Enter your Age" className="block p-3 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 " required/>
            </div>
            <div>
              <label htmlFor="mobno"className="block mb-2 text-lg font-medium text-gray-900 ">Phone Number</label>
              <input type="number" id='mobno' name="mobno" onChange={(e)=>setMobno(e.target.value)} defaultValue={user.mobno} placeholder="Enter your Phone Number" className="block p-3 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 " required/>
            </div>
            {/* input ends */}

            {/* buttons starts */}
            <div className="flex justify-between">
              <Link
              href="/"
              className="py-3 px-5 text-md font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 uppercase"
              >
              back
              </Link>
              <input
              type="submit"
              className="py-3 px-5 text-md font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 uppercase addCancel" value="update"/>
            </div>
           {/* buttons ends */}
          </form>
          {/* form ends */}
      </div>
    </div>
    )
}
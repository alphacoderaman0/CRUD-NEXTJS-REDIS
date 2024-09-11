"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function addUser() {
  
  //   add user function starts
  const router = useRouter();
  const [message , setMessage] = useState('');
  const [error , setError] = useState('');
  const [saveUser,setSaveUser] = useState({
    name: "",
    age:"",
    mobno: ""
  })
  const handleSaveChanges = ({target :{name,value}})=>{
    setSaveUser({...saveUser , [name] : value});
  }
  const handleAddSubmit= async (e)=>{
    e.preventDefault();
    try {
      if(saveUser.name.length <=2){
        setError("Name must be of 3 or More Character");
      }
      else if(saveUser.name == parseInt(saveUser.name)){
        setError("Number not Allowed in Name Field");
      }
      else if(saveUser.age <=17){
        setError("Age must be of 18 or More");
      }
      else if(saveUser.mobno.length <=9){
        setError("Mobile Number must be of 10 Digit");
      }
      else{
        const response = await fetch("http://localhost:3000/api/user",{
          method : "POST",
          headers : {"Content-Type": "application/json"},
          body: JSON.stringify(saveUser)
        });
          await response.json();
      setMessage(` User added Successfully`);
          setTimeout(navigate, 3000);
          function navigate() {
            window.location.href = '/';
          }
      }  
    } catch (error) {
      setError(`error:${error}`);
    }
  }
  //add user function ends
  return (
    <div className="px-60 flex  justify-center items-center h-[100vh]">
      <div className="w-[500px] bg-white px-6 py-6 border rounded-xl shadow-lg hover:shadow-xl">
          <h1 className="text-3xl text-center font-bold uppercase">Add New user</h1>
          {message && (
              <div className="flex justify-center bg-green-500 text-white text-md py-1 px-3 rounded-md mt-2">
                {message}
              </div>)}
          {
            error && 
            (<div id="err" className="flex justify-center bg-red-500 text-white text-mdpy-1 px-3 rounded-md mt-2">{error}</div>)
          }
          {/* form starts */}
          <form onSubmit={handleAddSubmit} className="my-2 space-y-5 ">
          {/* input starts */}
            <div>
              <label htmlFor="name"className="block mb-2 text-lg font-medium text-gray-900 ">Name</label>
              <input onChange={handleSaveChanges} value={saveUser.name} name="name" type="text" id="name" className="block p-3 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 " placeholder="Enter your Name" required/>
            </div>
            
            <div>
              <label htmlFor="age"className="block mb-2 text-lg font-medium text-gray-900 ">Age</label>
              <input onChange={handleSaveChanges} value={saveUser.age} name="age" type="number" id="age" className="block p-3 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 " placeholder="Enter your Age" required/>
            </div>
            <div>
              <label htmlFor="mobno"className="block mb-2 text-lg font-medium text-gray-900 ">Phone Number</label>
              <input onChange={handleSaveChanges} value={saveUser.mobno} name="mobno" type="number" id="mobno" className="block p-3 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 " placeholder="Enter your Phone Number (only 10 digits)" required/>
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
              className="py-3 px-5 text-md font-medium text-center text-white rounded-lg bg-blue-700 sm:w-fit hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 uppercase addCancel" value="add"/>
            </div>
           {/* buttons ends */}
          </form>
          {/* form ends */}
      </div>
    </div>
  );
}

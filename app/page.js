import Link from "next/link"
import Table from "./pages/Table/page"
export default function Home(){
  return (
    <div className="flex justify-center px-28 py-24">
      <div className="shadow-lg hover:shadow-xl border rounded-2xl px-8 py-8 bg-white" >
        <div className="flex justify-between items-center gap-40">
            <div className="leading-10">
              <h1 className="text-2xl font-semibold">All User and their Details</h1>
              <p className="text-sm">A list of all the users  including their Name , Age and Phone Number.</p>
            </div>
            
            <Link href="/pages/addUser
            " className=" px-6 py-2 rounded-xl bg-[#f8f8f8] text-white font-semibold uppercase shadow-xl hover:bg-[#f9f9f9] hover:shadow-inner" title="Add User">
              <img src="/add-user.png" alt="" width={35} />
            </Link>
        </div>
        <Table/>
     </div>
    </div>
  )
}
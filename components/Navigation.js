import { IoStatsChart } from "react-icons/io5";

function Nav(){
    return <header className=" container max-w-2xl px-6 py-6 mx-auto">
    <div className=" flex items-center justify-between">

    
    <div className="flex flex-row items-center gap-2">
    <div className="h-[40px] w-[40px] rounded-full overflow-hidden">
      <img className = "object-cover w-full h-full" src="https://thispersondoesnotexist.com/" alt="Profile Image"></img>
      </div>
      <name>Hi Ceren</name>
    </div>
    <nav className="flex items-center gap-4">
      <div>
      <IoStatsChart className="text-2xl"/>
      </div>
      <div>
        <button className="btn btn-danger">Sign Out</button>
      </div>
    </nav>
    </div>
   </header>
}
export default Nav;
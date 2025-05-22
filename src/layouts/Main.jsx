//rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

//helper functions
import { fetchData } from "../Helpers"

//Components
import Footer from "../components/Footer";
import Nav from "../components/Nav";

//loader
export function mainLoader(){
    const userName = fetchData("userName");
    return {userName};
}

const Main = () => {
  const {userName} = useLoaderData();  

  return (
    <div className="flex flex-col min-h-screen">
        <Nav userName={userName}/>
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Main
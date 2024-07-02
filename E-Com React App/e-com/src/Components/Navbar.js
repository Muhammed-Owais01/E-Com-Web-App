import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../utils/AuthContext";

const Navbar = () => {
    const { isLoggedIn, logout, user, cartCount } = useAuth();
    const history = useHistory();

    return ( 
        <div className="navbar bg-[#333333] fixed top-0 w-full border-solid border-t-0 border-x-0 border-b-[1px] border-b-black">
            <div className="flex bg-[#333333] justify-between items-center p-[10px] mx-12 ">
                <h1 className="ml-2">E-Com Website</h1>
                <div className="text-[18px]">
                    <Link to="/" className="mx-4">Home</Link> 
                    <Link to="/items" className="mx-4">Items</Link>
                    <Link to="/create" className="mx-4">Create</Link>
                    <button className=" border-none"><FontAwesomeIcon icon={ faMagnifyingGlass } /></button> 
                </div>
                <div className="relative">
                    <Link to={isLoggedIn ? '/cart' : '/login'} className="relative inline-block">
                        <FontAwesomeIcon icon={ faCartShopping } className="h-[24px] mr-[16px]" />
                        {cartCount > 0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center h-6 w-6 text-xs font-bold leading-none text-white bg-red-600 rounded-full">{cartCount}</span>}
                    </Link>
                    <div className="relative inline-block group">
                        <button className="border-none cursor-pointer">{isLoggedIn && <span className="mr-2 mb-3 text-[20px]">{user}</span>}<FontAwesomeIcon icon={ faUser } className="h-[24px]" /></button>
                        <div className="absolute min-w-40 right-0  shadow-[0px_8px_16px_0px_rgba(0,0,0,0.2)] z-[1] bg-[#f1f1f1] hidden group-hover:block">
                            {!isLoggedIn && <Link to="/login" className="text-black bg-white p-[12px_16px] block hover:bg-[#ddd] cursor-pointer">Login</Link>}
                            {isLoggedIn && <button onClick={() => {logout(); history.push('/login')}} className="text-black py-3 px-4 no-underline block border-none bg-white w-full text-center cursor-pointer text-[15px] border-b border-gray-200 hover:bg-gray-200">Logout</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;
import { useEffect, useState } from "react";
import getCookie from "../utils/getCookie";
import CartList from "./CartList";

const Cart = () => {
    const [cartItems, setCartItems] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchData = async () => {
        setIsLoading(true);

        const token = getCookie('token');

        try {
            const res = await fetch(`${process.env.REACT_APP_URL}/cart`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Application": "application/json",
                    "Authorization": `${token}`
                },
            });
            const data = await res.json();
            setCartItems(data);
            setIsLoading(false);    
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return ( 
        <div>
            {isLoading && <div>Loading...</div>}
            {error && <div>{ error }</div>}
            {cartItems && <CartList cartItems={cartItems} setCartItems={setCartItems} />}
        </div>
     );
}
 
export default Cart;
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../utils/useFetch";
import { useState } from "react";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getCookie from "../utils/getCookie";
import { useAuth } from "../utils/AuthContext";

const ItemDetails = () => {
    const { id } = useParams();
    const { data: item, isLoading, error } = useFetch(`${process.env.REACT_APP_URL}/item/${id}`, 'item');
    const { cartCount, setCartCount } = useAuth();
    const [ quantityCount, setQuantityCount ] = useState(1);
    const [isPending, setIsPending] = useState(false);

    const incQuantity = (quantityCount) => {
        setQuantityCount(quantityCount + 1);
    }

    const decQuantity = (quantityCount) => {
        setQuantityCount(quantityCount === 0 ? 0 : quantityCount - 1);
    }

    const addToCart = async () => {
        setIsPending(true);
        const quantity = quantityCount;
        const item = { quantity }

        const token = getCookie('token');

        try {
            const res = await fetch(`${process.env.REACT_APP_URL}/cart/${id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Application": "application/json",
                    "Authorization": `${token}`
                },
                body: JSON.stringify(item)
            })
            setIsPending(false);
            setCartCount(cartCount + quantity);
        } catch (err) {
            console.log(err);
            setIsPending(false);
        }
    }

    return ( 
        <div className="mt-12 mx-auto w-[75%]">
            {isLoading && <div>Loading...</div>}
            {error && <div>{ error }</div>}
            {item && (
                <div>
                    <div className="flex flex-row">
                        <div>
                            <img src={`${process.env.REACT_APP_URL}/item/image/${item.id}`} alt=""  className=" rounded-lg w-[700px] h-[500px]"/>
                        </div>
                        <div className="item-detail flex flex-col px-10 pt-2 bg-[#fafafa] text-left w-[500px]">
                            <h2 className="uppercase mt-2 mb-3 text-[28px]">{item.itemname}</h2>
                            <p className="mb-3">Ratings | Reviews</p>
                            <p className="mb-3 pb-3 border-solid border-t-0 border-x-0 border-b-[1px] border-b-black text-[26px] text-[#ab9a6f]">$ {item.price}</p>
                            <p className="mb-3">Quantity 
                                <button onClick={() => decQuantity(quantityCount)} className="ml-8 size-8 mr-2">
                                    <FontAwesomeIcon icon={ faMinus } />
                                </button>
                                <span className="px-2 max-w-10">{quantityCount}</span>
                                <button onClick={() => incQuantity(quantityCount)} className="size-8 ml-2">
                                    <FontAwesomeIcon icon={ faPlus } />
                                </button>
                            </p>
                            {!isPending && <button onClick={() => addToCart()} className="text-[18px] px-3 py-[12px] my-auto w-full cursor-pointer">Add To Cart</button>}
                            {isPending && <button className="text-[18px] px-3 py-[12px] my-auto w-full" disabled>Adding to cart...</button>}
                        </div>
                    </div>
                    <div className="description mt-5 w-[92%]">
                        <p>{item.description}</p>
                    </div>
                    <Link to="/items">
                    <button className="mx-auto mt-4 p-2 text-[17px] text-white font-medium bg-[#ab9a6f] border-none rounded-md cursor-pointer">Back to see more</button>
                    </Link>
                </div>
            )}
        </div>
     );
}
 
export default ItemDetails;
import { useAuth } from "../utils/AuthContext";
import getCookie from "../utils/getCookie";

const CartList = ({ cartItems, setCartItems }) => {
    const { setCartCount } = useAuth();

    const handleDelete = async (id) => {
        const token = getCookie('token');
        try {
            const res = await fetch(`${process.env.REACT_APP_URL}/cart/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`
                }
            })

            if (res.ok) {
                const updatedItems = cartItems.items.filter(item => item.id !== id);
                setCartItems({
                    ...cartItems,
                    items: updatedItems,
                    count: updatedItems.length,
                    total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
                })
                setCartCount(updatedItems.length);
            }

        } catch (err) {console.log(err);}       
    }

    return ( 
        <div className="flex flex-row mt-8 ml-5">
            <div>
                {cartItems.count && <p className="text-left text-[22px] mb-5"><b>Your cart: {cartItems.count}</b> items</p>}
                {cartItems.items && cartItems.items.map(item => (
                    <div className="flex flex-row pt-5 pr-5 pb-9 h-72 border-solid border-l-0 border-[#D2CECE36]" key={item.id}>
                        <div className="mr-14 mb-32">
                            <img src={`${process.env.REACT_APP_URL}/item/image/${item.id}`} alt="" 
                                className="w-[200px] h-[200px]"
                            />
                        </div>
                        <div className="flex flex-row">
                            <div className="w-[500px] break-words"><h3>{item.itemname}</h3></div>
                            <div className="flex flex-row w-64 ml-8">
                                <div><p className="ml-3">Qty: {item.quantity}</p></div>
                                <div className="flex flex-col w-44">
                                    <p className="ml-auto text-right font-bold">$ {item.price}</p>
                                    <button onClick={() => handleDelete(item.id)} className="w-[40%] ml-auto mt-auto border-none cursor-pointer">Remove</button>
                                </div>
                            </div>
                            <div className="block mt-auto">
                                
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-12 ml-5 pt-5 px-24 w-[800px] text-left border-solid border-[#D2CECE36] rounded-lg h-60">
                <div className="flex flex-row mb-14 pb-9 border-solid border-x-0 border-t-0 border-b-[#D2CECE36]"><p>Subtotal <span className="text-[15px]">({cartItems.count} items)</span></p><span className="ml-auto text-right font-bold">$ {cartItems.total}</span></div>
                <div className="flex flex-row mb-14"><p>With Delivery</p><span className="ml-auto text-right font-bold">$ {cartItems.total}</span></div>
                <div className="flex flex-row w-full justify-center"><button className="mx-auto p-2 text-[17px] text-white font-medium bg-[#ab9a6f] border-none rounded-2xl cursor-pointer">Check Out</button></div>
            </div>
        </div>
     );
}
 
export default CartList;
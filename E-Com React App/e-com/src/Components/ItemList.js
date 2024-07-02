import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ItemList = ({ items }) => {
    const titleLimit = 20;
    return ( 
        <div className=" col-span-full grid grid-cols-5 gap-y-4 items-center mt-10">
            {items && items.map(item => (
                <div key={item.id} className="">
                    <Link to={`item/${item.id}`}>
                        <img src={`${process.env.REACT_APP_URL}/item/image/${item.id}`} alt="" className=" rounded-xl w-[350px] h-[300px]" />
                        <div className="my-2 pl-4 flex flex-col items-start">
                            <h2 className=" font-semibold text-[19px]">{ item.itemname.length <= titleLimit ? item.itemname : item.itemname.substring(0, titleLimit) }</h2>
                            <p className="text-[18px] font-semibold">$ {item.price}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
     );
}
 
export default ItemList;
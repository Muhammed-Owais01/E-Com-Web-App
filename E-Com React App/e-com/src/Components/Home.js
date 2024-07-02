import { useEffect, useRef, useState } from "react";
import useFetch from "../utils/useFetch";
import ItemList from "./ItemList";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
    const RESULTS_PER_PAGE = 5;
    const item_id = 32;
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const fetchState = useRef(true);

    const fetchItems = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_URL}/item?page=${page}&limit=${RESULTS_PER_PAGE}`);
            const data = await res.json();

            if (data.items) {
                setItems(prev => [...prev, ...data.items]);
                setError(null);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (fetchState.current) {
            fetchState.current = false;
            return;
        }
        fetchItems();
    }, [page]);

    return ( 
        <div>
            <div>
                <img src={`${process.env.REACT_APP_URL}/item/image/${item_id}`} alt="" className="w-[1843px] h-[504px]" />
            </div>
            <div>
                <h1 className="mt-12 text-5xl font-[Roboto]">Featured Items</h1>
                <div className="mb-12 mt-[10px] w-[8%] mx-auto border-solid border-x-0 border-t-0 border-b-4 border-b-black"></div>
            </div>
            <div className="grid mx-auto">
                {error && <div> {error} </div>}
                {isLoading && <div>Loading...</div>}
                {items && <ItemList items={items} />}
                <Link to="/items">
                    <button className="generic-button">See More</button>
                </Link>
            </div>
        </div>
     );
}
 
export default Home;
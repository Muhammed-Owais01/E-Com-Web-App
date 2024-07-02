import { useEffect, useRef, useState } from "react";
import ItemList from "./ItemList";

const Items = () => {
    const RESULTS_PER_PAGE = 20;
    
    const [items, setItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(0);
    const [page, setPage] = useState(0);
    const fetchState = useRef(true);

    const fetchTotalItems = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_URL}/item?page=${page}&limit=${RESULTS_PER_PAGE}`);
            const data = await res.json();
            if (data.items) setTotalItems(data.count);
        } catch (err) {
            setError(err.message);
        }
    }

    const fetchItems = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_URL}/item?page=${page}&limit=${RESULTS_PER_PAGE}`);
            const data = await res.json();
            if (data.items) {
                setVisible(prev => prev + data.items.length);
                setItems(prev => [...prev, ...data.items]);
                setError(null);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
    }

    useEffect(() => {
        fetchTotalItems();
    }, []);

    useEffect(() => {
        if (fetchState.current) {
            fetchState.current = false;
            return;
        }
        fetchItems();
    }, [page]);

    return ( 
        <div className="grid grid-cols-[auto] items-center my-0 mx-auto">
            {error && <div> { error } </div>}
            {isLoading && <div>Loading...</div>}
            {items && <ItemList items={items}/>}
            <button onClick={handleLoadMore} className="generic-button mx-auto">Load More</button>
            {/* {totalItems > 0 ? (visible < totalItems ? (
                
            ) : (
                <button disabled className="mx-auto">Load More</button>
            )) : null} */}
        </div>
     );
}
 
export default Items;
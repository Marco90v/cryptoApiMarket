import { useContext, useEffect } from "react";
import Row from "../components/Row";
import { userContext } from "../context/Context";

const Home = () => {
    const { state , dispatch } = useContext(userContext);
    const { API_KEY , data } = state;

    const getTicker = async() => {
        const rest = await fetch(`https://api.nomics.com/v1/currencies/ticker?status=active&key=${API_KEY}`).then(e=>e.json());
        dispatch({ type:'newData', rest });
    }
    
    useEffect(() => {
        getTicker();
        setInterval(()=>getTicker(),60000);
      return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return(
        <>
            <table>
                <thead>
                    <tr className="tr" >
                        <th>#</th>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    { data.map( (items, index) => <Row key={items.id} index={index} /> ) }
                </tbody>
            </table>
        </>
    );
}
export default Home;
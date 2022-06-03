import { useContext, useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { userContext } from "../context/Context";
import listCoins from "../assets/list.json";

const Details = ({index}) => {
    const { state } = useContext(userContext);
    const [details, setDetails] = useState({data:[],timeActive:'1d'});
    const [historicalMarket, setHistoricalMarket] = useState([]);
    // const [visible, setVisible] = useState(false);
    
    const transfor = (price) =>  price > 9 ? Number(price).toFixed(2) : (price < 9 && price > 0.9999) ? Number(price).toFixed(4) : price;

    const extraction = (key) => {
        setDetails({data:state.data[index][key],timeActive:key});
    };

    const getHistoricalMarket = async () => {
        const ID = listCoins.filter(coins => coins.symbol === state.data[index].symbol.toLowerCase() )[0].id;
        const dataHistorical = await fetch(`https://api.coingecko.com/api/v3/coins/${ID}/market_chart?vs_currency=usd&days=6&interval=daily`).then(e=>e.json());
        const formatHistorical = dataHistorical.prices.map(item => {
            return {
                fecha: new Date(item[0]).toLocaleString('es-mx'),
                precio: transfor(item[1])
            }
        });
        setHistoricalMarket(formatHistorical);
    };

    const upOrDown = (num) => num > 0 ? 'up' : 'down';

    const timeActiveOrNot = (id) => id === details.timeActive ? 'timeActive' : '' ;

    useEffect(() => {
        extraction('1d');
        getHistoricalMarket();
        // setVisible(true);
      return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return(
        <tr>
            <td colSpan={5}>
                {/* <div className={visible ? "detalles visible" : "detalles"} > */}
                <div className="detalles" >
                    <LineChart width={330} height={300} data={historicalMarket} >
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="fecha" />
                        <YAxis dataKey="precio" />
                        <Tooltip />
                        <Line type="monotone" dataKey="precio" stroke="#8884d8" />
                    </LineChart>
                    <div>
                        <ul>
                            <li className={ timeActiveOrNot('1d') } onClick={()=> extraction('1d')}>1d</li>
                            <li className={ timeActiveOrNot('7d') } onClick={()=> extraction('7d')}>7d</li>
                            <li className={ timeActiveOrNot('30d') } onClick={()=> extraction('30d')}>30d</li>
                            <li className={ timeActiveOrNot('365d') } onClick={()=> extraction('365d')}>365d</li>
                            <li className={ timeActiveOrNot('ytd') } onClick={()=> extraction('ytd')}>ytd</li>
                        </ul>
                        <table>
                            <thead>
                                <tr>
                                    <td>Volume</td>
                                    <td>Price Change</td>
                                    <td>% Change</td>
                                    <td>Volume Change</td>
                                    <td>% Volume Change</td>
                                    <td>Market Cap Change</td>
                                    <td>% Market Cap Change</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>$ {details.data.volume}</td>
                                    <td className={ upOrDown(details.data.price_change) } >$ {details.data.price_change}</td>
                                    <td className={ upOrDown(details.data.price_change_pct) } >{details.data.price_change_pct} %</td>
                                    <td className={ upOrDown(details.data.volume_change) } >$ {details.data.volume_change}</td>
                                    <td className={ upOrDown(details.data.volume_change_pct) } >{details.data.volume_change_pct} %</td>
                                    <td className={ upOrDown(details.data.market_cap_change) } >$ {details.data.market_cap_change}</td>
                                    <td className={ upOrDown(details.data.market_cap_change_pct) } >{details.data.market_cap_change_pct} %</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </td>
        </tr>
    );
}

export default Details;
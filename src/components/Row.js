import { useContext, useState } from "react";
import { userContext } from "../context/Context";
import Details from "./Details";

const transfor = (price) => {
    const formatPrice = price > 9 ? Number(price).toFixed(2) : (price < 9 && price > 0.9999) ? Number(price).toFixed(4) : price;
    let source = formatPrice.split(".");
    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)','ig'),"$1,");
    return source.join('.');
}

const Row = ({index}) => {
    const { state } = useContext(userContext);
    const items = state.data[index]
    const {rank,logo_url,name,symbol,price,market_cap} = items;
    // const formatPrice = transfor(price);
    const [detailsActive , setDetailsActive] = useState(false);
    return(
        <>
            <tr className="tr" onClick={()=>setDetailsActive(!detailsActive)} >
                <td>{rank}</td>
                <td>{symbol}</td>
                <td>
                    <img src={logo_url} alt={name}></img>
                    {name}
                </td>
                <td>$ {transfor(price)}</td>
                <td>$ {transfor(market_cap)}</td>
            </tr>
            { detailsActive && <Details index={index} /> }
        </>
    );
}

export default Row;
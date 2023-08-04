import React from 'react'
import "./featureproductcard.css"
import Bestseller from './producttag';
import { Link } from 'react-router-dom';

function Featureproductcard(props){

    
return(
<div className="productcontainer">
<div className="bestseller-overlay">
<Bestseller />
</div>
<img src={props.productimage} alt={props.productalt}/>
<p>{props.productname}</p>

<div className="productpricecont">
<p>{props.productdiscountprice}</p>
<del>{props.productactualprice}</del>
<p>{props.productdiscountpercent}</p>
</div>

<button><Link to="/productdetail">View product</Link></button>
</div>
)
}

export default Featureproductcard;
import { useState, useEffect, useContext } from 'react';
import ShopAPIContext from "../../../shared/context/ShopAPIProvider";

import './index.css';

function ItemDetails({ item, size, quantity }) {
	return (
		<div className="detail-product">
			{/*
			<div className="detail-product-image">
				<div className="detail-product-icon" >
					<img className="detail-basket-image" src={item ? item.images?.[0] || "" : ""} alt={item ? item.display_name : "?"}/>
					<img className="detail-product-image" src="assets/home_icon.svg"/>
				</div>
			</div>
			*/}
			<img className="detail-product-image" src="assets/home_icon.svg"/>
			<div className="detail-product-details">
				<div className="detail-name">{item ? `${item.title} (${size})` : "?"}</div>
				<div className="detail-quantity">x{quantity}</div>
			</div>
			<div className="detail-product-price">{item ? item.price * quantity: '?'} €</div>
		</div>
	);
}

function ItemSummary({ basket, items }) {
	return (<div className="item-summary">
		{Object.entries(basket).map(el => {
			const id = el[0];
			return Object.entries(basket[id]).map(el => {
				const size = el[0];
				return (<ItemDetails key={id} item={items[id]} size={size} quantity={basket[id][size]}/>)
			});
		})}
	</div>);
}

function Summary({ basket, next, detailed=false }) {
	const { fetchItem } = useContext(ShopAPIContext);
	const [items, setItems] = useState({});
	const [price, setPrice] = useState({amount: 0, fee: 0});

	useEffect(() => {
		let new_fee = 0, new_amount = 0;
		for (const item in basket) {
			fetchItem(item).then((data) => {
				for (const size in basket[item]) {
					new_fee += .01 * basket[item][size];
					new_amount += basket[item][size] * parseFloat(data.price);
					setPrice(p => ({...p, amount: new_amount, fee: new_fee}));
				}

				if (detailed) {
					setItems({...items, [data.id]: data});
				}
			}).catch(e => console.error(`[BasketPrice;useEffect] ${e.message}`));
		}
	}, [basket]);

	return (<>
		<div className="order-summary">
			{/* TITLE */}
			<div className="title">ORDER SUMMARY</div>
			{detailed && <ItemSummary basket={basket} items={items}/>}
			{/* DETAILS */}
			<div className="details">
				<div className="amount-row">
					<div className="label">Montant</div>
					<div className="value">{(price.amount).toFixed(2)} €</div>
				</div>
				<div className="delivery-row">
					<div className="label">Livraison</div>
					<div className="value">{(price.fee).toFixed(2)} €</div>
				</div>
				<div className="total-row">
					<div className="label">TOTAL</div>
					<div className="total-value">{(price.amount + price.fee).toFixed(2)} €</div>
				</div>
			</div>
			{/* BUTTON */}
			<button className="order-button" onClick={next}>JE PASSE À LA SUITE</button>
		</div>
	</>);
}

export default Summary;

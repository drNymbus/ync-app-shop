import { useState, useEffect, useContext } from 'react';
import ShopAPIContext from "../../../shared/context/ShopAPIProvider";

function PaymentItem({ item, size, quantity }) {
    return (<div className="payment-product">
        <div className="payment-product-image">
            <div className="payment-product-icon" >
                <img className="payment-basket-image" src={item ? item.images?.[0] || "" : ""} alt={item ? item.display_name : "?"}/>
            </div>
        </div>
        <div className="payment-product-details">
            <div className="product-name"> {item ? `${item.title} (${size})` : "?"} </div>
            <div className="product-quantity">Quantité: {quantity}</div>
        </div>
        <div className="product-price">{item ? item.price * quantity: '?'} €</div>
    </div>);
}

function PaymentSummary({ basket, payment }) {
    const { fetchItem } = useContext(ShopAPIContext);
    const [items, setItems] = useState({});
    const [price, setPrice] = useState({amout: 0, fee: 0});

    useEffect(() => {
        let new_fee = 0, new_amount = 0;
        for (const item in basket) {
            fetchItem(item).then((data) => {
                for (const size in basket[item]) {
                    new_fee += .01 * basket[item][size];
                    new_amount += basket[item][size] * parseFloat(data.price);
                    setPrice(p => ({...p, amount: new_amount, fee: new_fee}));
                }

                setItems({...items, [data.id]: data});
            }).catch(e => console.error(`[PaymentSummary;useEffect] ${e.message}`));
        }
    }, []);

    return (
        <div className="payment-basket">
            <div className="payment-summary">
                <h1>Résumé du paiement</h1>
            </div>

            <div className="basket-summary">
                {Object.entries(basket).map(el => {
                    const id = el[0];
                    return Object.entries(basket[id]).map(el => {
                        const size = el[0];
                        return (<PaymentItem key={id} item={items[id]} size={size} quantity={basket[id][size]}/>)
                    });
                })}
                <div className="basket-price-compact">
                    <div className="price-details-compact">
                        <div className="price-row-compact">
                            <span className="price-label-compact">Montant</span>
                            <span className="price-value-compact">{price.amount} €</span>
                        </div>
                        <div className="price-row-compact">
                            <span className="price-label-compact">Livraison</span>
                            <span className="price-value-compact">{price.fee} €</span>
                        </div>
                        <div className="total-row-compact">
                            <span className="price-label-compact">TOTAL</span>
                            <span className="total-value-compact">{price.amount + price.fee} €</span>
                        </div>
                    </div>
                    <button className="finalisation-button" onClick={payment}>Je finalise mon achat</button>
                </div>
            </div>

            <div className="payment-note">Tu seras redirigé vers PayPal, notre unique moyen de paiement pour le moment. (Désolé D'avance :/)</div>
        </div>
    );
}

export default PaymentSummary;

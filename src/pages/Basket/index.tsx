import {useContext, useEffect, useState, useCallback } from "react";
import ShopAPIContext from "../../shared/context/ShopAPIProvider";
import Section from '../../shared/components/Section';

import './index.css';

function BasketArticle({ item, size, quantity, max_qtty, compact, add, rm, del }) {
    useEffect(() => {}, [max_qtty]);

    return (item &&
        <div className="article"> {/* ARTICLE */}

            {!compact && <>
                {/*
                <div className="article-image">

                    <img className="image" src={(!item) ? "" : item.images[0]}/>
                    <img className="labeled-price" src="/assets/label_ync.png"/>
                    <p className="image-price">{!item ? 0 : item.price}€</p>

                </div>
                */}

                {/* INFOS */}
                <div className="article-information">

                    <h3 className="article-title">{(!item) ? "?" : item.title} (<b>{size}</b>)</h3>
                    <p className="article-delivery-description">{(!item) ? "?" : item.basket_description}</p>

                    <div className="article-icon">
                        {(quantity < 5 && !compact)
                            ? ([...Array(quantity)].map((_,i) => <img key={i} className="icon" src="assets/home_icon.svg"/>))
                            : (<><img className="icon" src="assets/home_icon.svg"/><p>x{quantity}</p></>)
                        }
                    </div>

                    <div className="article-incrementator">
                        {quantity > 1 ?
                            <button id={item.id} className="article-remove" onClick={() => rm(item.id, size)}>-</button>
                            : <button id={item.id} className="article-remove" onClick={() => rm(item.id, size)} disabled>-</button>
                        }
                        {quantity < max_qtty ?
                            <button id={item.id} className="article-add" onClick={() => add(item.id, size)}>+</button>
                            : <button id={item.id} className="article-add" onClick={() => add(item.id, size)} disabled>+</button>
                        }
                    </div>

                    <p className="article-price">{(!item) ? "?" : (item.price * quantity).toFixed(2)}€</p>
                    <button id={item.id} className="article-delete" onClick={() => del(item.id, size)}>X</button>

                </div>

            </>}

        </div>
    );
}

function BasketItem({ basket, id, compact, add, rm, del }) {

    const { fetchItem, fetchQuantity } = useContext(ShopAPIContext);
    const [item, setItem] = useState(undefined);
    const [quantity, setQuantity] = useState(undefined);

    useEffect(() => {
        fetchItem(id)
            .then(data => setItem(data))
            .catch(e => console.error(`[BasketItem;fetchItem] ${e.message}`));
        fetchQuantity(id)
            .then(data => setQuantity(data.sizes))
            .catch(e => console.error(`[BasketItem;fetchQuantity] ${e.message}`));
    }, [basket]);

    return (<>
        {Object.entries(basket[id]).map(el => {
            const size = el[0];
            // console.log(size, quantity);
            return (<BasketArticle key={size} item={item} size={size}
                quantity={basket[id][size]} max_qtty={quantity?.[size]}
                compact={compact} add={add} rm={rm} del={del}
            />);
        })}
    </>);
}

function BasketPrice({ basket, compact, next }) {

    const { fetchItem } = useContext(ShopAPIContext);
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
            }).catch(e => console.error(`[BasketPrice;useEffect] ${e.message}`));

        }

    }, [basket]);

    return (

        <div className="order-summary">

            {/* TITLE */}
            <div className="title">ORDER SUMMARY</div>

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
            {!compact && (<button className="order-button" onClick={next}>JE PASSE À LA SUITE</button>)}

        </div>
      );
}


/* @desc: This component is used to display all items currently in the basket and all pricing informations
 * @param basket: a list of all items in the basket
 * @return: Basket component of the website page
 */
function Basket({ basket, compact=true, add=undefined, rm=undefined, del=undefined, next=undefined }) {

    // const isEmpty = !basket || Object.keys(basket).length === 0;
    const isEmpty = !basket || Object.entries(basket).every(([_, quantity]) => quantity <= 0);

    return (<>
        {isEmpty
            ? (<div className="empty-basket-wrapper"> {/* NO BASKET */}

                <p className="empty-basket">&lt; No item in your cute lil basket &gt;</p>

                <div className="empty-basket-image-container">
                    <img src="/assets/empty_basket3.svg" alt="Empty basket" className="empty-basket-image" />
                </div>

            </div>)
            : (<div className="basket"> {/* BASKET */}
                {/* BASKET ARTICLES */}
                <div className="basket-rows">
                    {Object.keys(basket).map((item, i) => <BasketItem key={i} basket={basket} id={item} compact={compact} add={add} rm={rm} del={del}/>)}
                </div>

                {/* ORDER SUMMARY */}
                <BasketPrice basket={basket} compact={compact} next={next}/>

            </div>)}

    </>);

} export default Basket;

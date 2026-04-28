import { useState, useId } from 'react';
import Section from './Section';

import './index.css';

function FoldoutSection({ title, content }) {
    const [display, setDisplay] = useState(false);
    const handleDisplay = () => { setDisplay(!display); };

    return (
        <div className="foldout-section">
            <div className="foldout-header" onClick={handleDisplay}>
                <span className="foldout-title">{title}</span>
                <span className="foldout-icon">+</span>
            </div>
            <div className="foldout-content">
                {display && content}
            </div>
        </div>
    );
}

function PopupItem({ item, quantity, onClose, add }) {
    const [selectedSize, setSelectedSize] = useState(undefined);
    const [imageIndex, setImageIndex] = useState(0);

    if (!item) return null;

    return (<>
        <div className="popup-page" onClick={onClose}>
            <div className="model" onClick={(e) => e.stopPropagation()}>

                <div className="popup-image-container">

                    <img className="popup-main-image" src={item.images[imageIndex]} alt="YNC Tee Shirt STAIRS"/>

                    {item.images.map((img, i) => {
                        if (i === imageIndex) return null;
                        return <img key={i} className="popup-mini-image" src={img} alt="YNC Tee Shirt STAIRS" onClick={() => setImageIndex(i)}/>
                    })}
                </div>

                <div className="content-section">
                    <button className="popup-close" onClick={onClose}><img src="/assets/croix.svg" alt="X"/></button>

                    <div className="popup-title_quote">
                        <h1 className="popup-title">{item.title}</h1>
                        <div className="popup-quote"><q>{item.quote}</q></div>
                    </div>
                    <div className="popup-subtitle">{item.subtitle}</div>

                    <div className="popup-price">{item.price}€</div>

                    <p className="popup-description">{item.description}</p>

                    <div className="size-selector">
                        <select className="size-dropdown" onChange={e => {setSelectedSize(e.target.value !== "none" ? e.target.value : undefined)}}>
                            <option value={"none"}>Sélectionne ta taille :)</option>
                            {item.sizes.map((size) => {
                                if (quantity[size] > 0) {
                                    return <option value={size}>{size}</option>
                                } else {
                                    return <option value={size} disabled>{size}</option>
                                }
                            })}
                        </select>
                    </div>

                    <button className="popup-add" onClick={() => add(item.id, selectedSize)}>AJOUTER AU PANIER</button>

                    <FoldoutSection title="HISTOIRE DU PRODUIT" content={item.details}/>
                    <FoldoutSection title="DETAILS DU PRODUIT" content={item.spec}/>
                    <FoldoutSection title="INFORMATIONS DE LIVRAISON" content={"SOME SOME SOME SOME SOME SOME SOME SOME"}/>
                </div>
            </div>
        </div>
    </>);
}

export default PopupItem;

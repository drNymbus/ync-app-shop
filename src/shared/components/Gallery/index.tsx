import { useContext, useEffect, useState, forwardRef } from "react";
import ShopAPIContext from "../../context/ShopAPIProvider";
import Section from "./Section";

import './index.css';

function GalleryItem({ id, onItemClick }) {
    const { fetchItem } = useContext(ShopAPIContext);
    const [item, setItem] = useState(undefined);

    useEffect(() => {
        fetchItem(id)
            .then(data => setItem(data))
            .catch(e => console.error(`[GalleryItem] ${e.message}`));
    }, []);

    return (item === undefined ? <></> :
        <div key={item.id} className="gallery-item" onClick={() => onItemClick(item.id)}>
            <div className="gallery-wrapper">
                <img src={item.images[0]} alt="Article"/>
                <div className="gallery-description">
                    <div className="gallery-title">
                        <div className="gallery-name">{item.title}</div>
                        <div className="gallery-price">{item.price}€</div>
                    </div>
                    <div className="gallery-label">{item.subtitle}</div>
                    <div className="gallery-note">{item.quote}</div>
                </div>
            </div>
        </div>
    );
}

function GalleryPage({ ids, onItemClick }, ref) {
    return (<>
        <div className="gallery-space">
            <p>L’univers est en expansion,</p>
            <p>nous aussi</p>
        </div>
        <div className="gallery" ref={ref}>
            {ids.map(id => <GalleryItem key={id} id={id} onItemClick={onItemClick} />)}
        </div>
    </>);
}

const Gallery = forwardRef(GalleryPage);
export default Gallery;

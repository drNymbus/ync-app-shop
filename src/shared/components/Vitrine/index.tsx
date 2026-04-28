import { useContext, useEffect, useState } from "react";
import ShopAPIContext from "../../context/ShopAPIProvider";

import './index.css';

function Vitrine({ id, add, goto }) {
    const [item, setItem] = useState(null);
    // NEW: track when the image is loaded to trigger the reveal animation
    const [imgLoaded, setImgLoaded] = useState(false);
    const { fetchItem } = useContext(ShopAPIContext);

    useEffect(() => {
        fetchItem(id)
            .then(setItem)
            .catch(e => console.error(`[Vitrine] ${e.message}`));
    }, [id]);

    // NEW: reset the loading state whenever the id changes (new item/image)
    useEffect(() => {
        setImgLoaded(false);
    }, [id]);

    const handleClick = () => {
        add(id, item.sizes[0]);
        goto();
    };

    return (
        // NEW: toggle clip-path animation based on image load state
        // <div className={`showcase`}>
        <div className={`showcase ${imgLoaded ? 'revealed' : 'pending'}`}>
            <div className="item">
                <div className="item-image">
                    {/* NEW: start animation only when the image has actually loaded */}
                    <img
                        src={item?.images[0] || ""}
                        alt=""
                        onLoad={() => setImgLoaded(true)}
                        onError={() => setImgLoaded(true)}
                    />
                </div>
                <div className="item-description">
                    <p>{item?.description}</p>
                </div>
                <button
                    className="item-button custom-target"
                    id={id}
                    onClick={handleClick}
                    price={item?.price}
                />
                <div className="arrow">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
}

export default Vitrine;

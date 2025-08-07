import { useContext, useEffect, useState } from "react";
import ShopAPIContext from "../../context/ShopAPIProvider";
import Section from "./Section";

import './index.css';

function Vitrine({ id, add, goto }) {
    const [item, setItem] = useState(null);
    const { fetchItem } = useContext(ShopAPIContext);

    useEffect(() => {
        fetchItem(id)
            .then(setItem)
            .catch(e => console.error(`[Vitrine] ${e.message}`));
    }, [id]);

    const handleClick = () => {
        add(id, item.sizes[0]);
        goto();
    };

    return (<>
        <div className="showcase">
            <div className="item">
                <div className="zoom-box">
                    <div className="shadow-image">
                        <img src={item?.images[0] || "??"} alt="" />
                    </div>
                    <div className="item-description-border">
                        <div className="item-description">
                            <p>{item?.description || ""}</p>
                        </div>
                    </div>
                </div>
                <button
                    className="item-button custom-target"
                    id={id}
                    onClick={handleClick}
                    price={item?.price}
                />
            </div>
        </div>
    </>);
}

export default Vitrine;

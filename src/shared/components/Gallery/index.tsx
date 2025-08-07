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
        <div key={item.id} className="gallery-thumbnail" onClick={() => onItemClick(item.id)}>
                <div className="image-wrapper">
                    <img className="gallery-image" src={item.images[0]} alt="Article"/>
                </div>
                <div className="description-wrapper">
                    <div className="gallery-title">{item.title}</div>
                    <div className="gallery-description">{item.subtitle}</div>
                    <div className="gallery-note">{item.quote}</div>
                    <div className="gallery-price">{item.price}</div>
                    {/* <div>etiquette</div> */}
                </div>
        </div>
    );
}

function GalleryPage({ ids, onItemClick }, ref) {
    return (<>
        <div className="gallery" ref={ref}>
            <div className="gallery-container">
                <div className="gallery-thumbnails">
                    {ids.map(id => <GalleryItem key={id} id={id} onItemClick={onItemClick} />)}
                </div>
            </div>
            <div className="gallery-logo">
                <img src="/assets/yng_metal_logo.png" alt="ync-logo" className="gallery-logo-image" />
            </div>
            <div className="gallery-phrase"></div>
            <div className="gallery-text">
                <p>
                    Nous préparons de nouveaux articles et designs exclusifs.
                    <br/>
                    Restes connecté — notre équipe adore explorer de nouveaux concepts, tester des idées folles,
                    pour enrichir notre univers avec de nouvelles pièces.
                    <br/>
                    Nous contacter: <a href="mailto:yng.corporation@zohomail.eu">yng.corporation@zohomail.eu</a>
                </p>
                <p>
                    © 2025 Young New Corporation. L’univers est en expansion – nous aussi.
                </p>
            </div>
        </div>
    </>);
}

const Gallery = forwardRef(GalleryPage);
export default Gallery;

import { useContext, useEffect, useState, forwardRef } from "react";
import { motion } from "motion/react";
import ShopAPIContext from "../../context/ShopAPIProvider";

import './index.css';

const itemVariants = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: "easeOut" } },
};

function GalleryItem({ id, onItemClick }) {
    const { fetchItem } = useContext(ShopAPIContext);
    const [item, setItem] = useState(undefined);

    useEffect(() => {
        fetchItem(id)
            .then(data => setItem(data))
            .catch(e => console.error(`[GalleryItem] ${e.message}`));
    }, []);

    return (item === undefined ? <></> :
        <motion.div
            className="gallery-item"
            onClick={() => onItemClick(item.id)}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <div className="gallery-wrapper">
                <img src={item.images[0]} alt="Article"/>
                <div className="gallery-description">
                    <div className="gallery-title">
                        <div className="gallery-name">{item.title}</div>
                        <div className="gallery-price">{item.price}€</div>
                    </div>
                    <div className="gallery-label">{item.subtitle}</div>
                    {/* <div className="gallery-note">{item.quote}</div> */}
                </div>
            </div>
        </motion.div>
    );
}

function GalleryPage({ ids, onItemClick }, ref) {
    return (<>
        <div className="gallery" ref={ref}>
            {ids.map((id) => <GalleryItem key={id} id={id} onItemClick={onItemClick} />)}
        </div>
    </>);
}

const Gallery = forwardRef(GalleryPage);
export default Gallery;

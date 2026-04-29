import { useEffect, useRef, useState } from "react";
import "./index.css";

/* @desc: the top title component of the website page
 * @param image: public path to the image to be displayed
 * @param name: section title
 * @return: the top title component of the website page
 */
function Section({ image, name }) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [displayName, setDisplayName] = useState(name);
    const [displayImage, setDisplayImage] = useState(image);
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        const el = contentRef.current;
        if (!el) return;

        el.style.animation = "fadeOut 0.2s ease both";

        const timer = setTimeout(() => {
            setDisplayName(name);
            setDisplayImage(image);
            el.style.animation = "none";
            void el.offsetWidth;
            el.style.animation = "";
        }, 200);

        return () => clearTimeout(timer);
    }, [name, image]);

    return (
        <div className="section">
            <div ref={contentRef} className="section-content">
                <img className="section-image" src={displayImage}/>
                <p className="section-title">{displayName}</p>
            </div>
        </div>
    );
} export default Section;

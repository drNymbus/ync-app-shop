import { useState } from "react";

function Logo({ content }) {

    const [videoEnded, setVideoEnded] = useState(false);
    const handleVideoEnd = () => { setVideoEnded(true); };

    let page;
    if (!videoEnded) {
        page = (
            <video autoPlay muted onEnded={handleVideoEnd}>
                <source src="/assets/logo_yng.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
        );
    } else {
        page = (<div>{content ? content : "Veuillez recharger la page."}</div>);
    }

    return (
        <div className="video-container">
            {page}
        </div>
    );

} export default Logo;
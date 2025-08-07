// Import des modules et composants React nécessaires
// import App from "./App";

/* npm & React module imports */
import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

/* Custom context imports */
import { ShopAPIProvider } from "./shared/context/ShopAPIProvider";
import ShopAPIContext from "./shared/context/ShopAPIProvider";

/* Custom hook imports */
import useBasket from "./shared/hook/useBasket";

/* Custom component imports */
import Logo from "./shared/components/Splashpage";

import Header from "./shared/components/Header";
import Section from "./shared/components/Section";
import Footer from "./shared/components/Footer";

import Vitrine from "./shared/components/Vitrine";
import Gallery from "./shared/components/Gallery";
import PopupItem from "./shared/components/PopupItem";

import Basket from "./pages/Basket";
import Payment from "./pages/Payment";

import About from "./pages/About";
import Acknowledgment from "./pages/Acknowledgment";

/* Style imports */
import "./index.css";

/* @desc: the main component orchestating all different components of the website
 * @return: the whole website content
 */
function App() {
    const { basket, addBasket, removeBasket, removeBasketSize, gone, setGone } = useBasket();
    const { fetchItem, fetchQuantity } = useContext(ShopAPIContext);

    // Define default app state
    const [state, setState] = useState("HOME");
    const [buttonDisplay, setButtonDisplay] = useState("PANIER");
    const [section, setSection] = useState({name: "Quelconque", image: "assets/home_icon.svg"});

    function homeState() {
        setButtonDisplay("PANIER");
        setSection({name:"Quelconque", image:"assets/home_icon.svg"});
        setState("HOME");
    };

    function paymentState() {
        setButtonDisplay("RETOUR");
        setSection({name:"Paiement", image:"assets/payment_icon.svg"});
        setState("PAYMENT");
    };

    function basketState() {
        setButtonDisplay("RETOUR");
        setSection({name:"Panier", image:"assets/basket_icon.svg"});
        setState("BASKET");
    };

    function aboutState() {
        setButtonDisplay("RETOUR");
        setSection({name:"À propos", image:"assets/home_icon.svg"})
        setState("ABOUT");
    };

    function acknowledgmentState() {
        setButtonDisplay("RETOUR");
        setSection({name:"Nous te remercions !", image:"assets/acknowledgment/acknowledgment_icon.svg"});
        setState("ACKNOWLEDGMENT");
    };

    const updateState = () => {
        if (state === "HOME" || state === "PAYMENT" || state === "VITRINE" || state === "GALLERY") {
            basketState();
        } else if (state === "BASKET" || state === "ABOUT" || state === "ACKNOWLEDGMENT") {
            homeState();
        }
    }

    const [popupItem, setPopupItem] = useState(null);
    const [popupQuantity, setPopupQuantity] = useState(null);
    const [popupId, setPopupId] = useState(null);

    const handleItemClick = (clickedId) => setPopupId(clickedId);
    const closePopup = () => {
        setPopupId(null);
        setPopupItem(null);
        setPopupQuantity(null);
    };

    useEffect(() => {
        if (popupId) {
            fetchItem(popupId)
                .then(data => setPopupItem(data))
                .catch(e => {
                    console.error(`[PopupItem] ${e.message}`);
                    setPopupItem(null);
                });
            fetchQuantity(popupId)
                .then(data => setPopupQuantity(data.sizes))
                .catch(e => {
                    console.error(`[PopupItem] ${e.message}`);
                    setPopupQuantity(null);
                });
        }
    }, [popupId, fetchItem]);

    const [scrollPos, setScrollPos] = useState(0);
    const galleryRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (galleryRef.current) {
                const rect = galleryRef.current.getBoundingClientRect();
                const currentScrollY = window.scrollY;
                // Check if we've scrolled past the bottom of the element
                if (currentScrollY > rect.top) {
                    setSection(section => { return {name:"Galerie", image:"assets/gallery_icon.svg"}; });
                } else {
                    setSection(section => { return {name:"Quelconque", image:"assets/home_icon.svg"}; });
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
    }, []);


    const content = (
        <div className="App">
            <Header name={buttonDisplay} basket={basket} homeFn={homeState} aboutFn={aboutState} basketFn={updateState}/>
            <Section name={section.name} image={section.image}/>

            {state === "HOME" && (<>
                <Vitrine id="quelconque" add={addBasket} goto={basketState} />
                <Gallery ref={galleryRef} ids={["quelconque", "stairs_white_shirt", "frog_poster"]} onItemClick={(id) => setPopupId(id)} />
            </>)}

            {(state === "BASKET") && <Basket basket={basket} compact={false} add={addBasket} rm={removeBasket} del={removeBasketSize} next={paymentState} />}
            {(state === "PAYMENT") && <Payment basket={basket} onSuccess={acknowledgmentState} onFailure={basketState} />}

            {(state === "ABOUT") && <About />}
            {(state === "ACKNOWLEDGMENT") && <Acknowledgment />}

            {popupItem && popupId && (
                <PopupItem
                    item={popupItem}
                    quantity={popupQuantity}
                    onClose={closePopup}
                    add={addBasket}
                    toggleLike={() => setLikes(likes + 1)}
                />
            )}

            {gone && <div className="info-popup">
                <h1>Tu t'es fait volé !</h1>
                <p>Certains articles de ton panier ont été retirés car il ne sont plus disponible.</p>
                <button onClick={() => setGone(false)}>OK</button>
            </div>}

        </div>
    );

    return (
        // <Logo content={content} />
        <>{content}</>
    );

} 
// Sélection de l'élément DOM où l'application sera rendue et créartion d'une variable capable de rendre dynamiquement l'application
const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

// Render //
// StrictMode activé pour demander à React de détecter et expliciter plus de problèmes potentiels
// BrowserRouter est une composante qui nous permet de gérer la navigation entre les pages de l'application
root.render(
    <React.StrictMode>
        <ShopAPIProvider>
            <App />
        </ShopAPIProvider>
    </React.StrictMode>
);

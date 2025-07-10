/* npm & React module imports */
import { useState, useContext, useEffect } from "react";

/* Custom context imports */
import ShopAPIContext from "./context/ShopAPIProvider";

/* Custom component imports */
import Bandeau from "./components/Bandeau";
import Section from "./components/Section";
import Logo from "./components/Splashpage";
import Item from "./components/Item";
import Basket from "./components/Basket";
import Payment from "./components/Payment";

/* Style imports */
import "./style/styles.css";

function useBasket() {
    const { fetchBasket, postBasket } = useContext(ShopAPIContext);
    const [basket, setBasket] = useState({});

    useEffect(() => {
        fetchBasket()
            .then((data) => { if (data) setBasket(data); })
            .catch(e => console.error(`[useBasket;useEffect | fetchBasket] ${e.message} (${e.status}))`));
    }, []);

    function addBasket(item) {
        let count = 1;
        if (basket[item]) count = basket[item] + 1;

        postBasket({...basket, [String(item)]: count});
        setBasket({...basket, [String(item)]: count});
    };

    function removeBasket(item) {
        if (basket[item]) {
            let count = basket[item] - 1;

            postBasket({...basket, [item]: count});
            setBasket({...basket, [item]: count});
        }
    };

    return { basket, addBasket, removeBasket };
}

/* @desc: the main component orchestating all different components of the website
 * @return: the whole website content
 */
function App() {
    const { basket, addBasket, removeBasket } = useBasket();

    // Define default app state
    const [state, setState] = useState("HOME");

    // Define default "Bandeau" and "Section" state
    const [buttonDisplay, setButtonDisplay] = useState("PANIER");
    const [section, setSection] = useState({name: "Quelconque", image: "assets/home_icon.svg"});

    function homeState() {
        setButtonDisplay("PANIER");
        setSection({name: "Quelconque", image: "assets/home_icon.svg"})
        setState("HOME");
    };

    function paymentState() {
        setButtonDisplay("RETOUR");
        setSection({name: "Payment", image: "assets/home_icon.svg"})
        setState("PAYMENT");
    };

    function basketState() {
        setButtonDisplay("RETOUR");
        setSection({name: "Panier", image: "assets/home_icon.svg"})
        setState("BASKET");
    };

    // onClick top right button
    const updateState = () => {
        if (state === "HOME" || state === "PAYMENT") {
            basketState();
        } else if (state === "BASKET") {
            homeState();
        }
    }

    const content = (
        <div className="App">
            <Bandeau name={buttonDisplay} basket={basket} homeFn={homeState} clickFn={updateState}/>
            <Section name={section.name} image={section.image}/>

            {(state === "HOME") && <Item id="quelconque" add={addBasket} goto={basketState}/>}
            {(state === "BASKET") && <Basket basket={basket} compact={false} add={addBasket} rm={removeBasket} next={paymentState}/>}
            {(state === "PAYMENT") && <Payment basket={basket}/>}
        </div>
    );

    return ( // HTML website rendering
        // <Logo content={content} />
        content
    );

} export default App;

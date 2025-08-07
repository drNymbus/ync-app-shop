import { useState, useContext, useEffect, useRef} from "react";

import ShopAPIContext from "../context/ShopAPIProvider";

function useBasket() {
    const { fetchBasket, postBasket, fetchQuantity } = useContext(ShopAPIContext);
    const [basket, setBasket] = useState({});
    const [gone, setGone] = useState(false);

    const TIMEOUT = 5 * 1000;

    async function gatherBasket() {
        console.log('gatherBasket');
        await fetchBasket()
            .then(data => setBasket(data))
            .catch(e => console.error(`[useBasket;gatherBasket] ${e}`));

        for (const id in basket) {
            const item_quantity = await fetchQuantity(id);
            console.log(item_quantity);
            for (const size in basket[id]) {
                if (basket[id][size] > item_quantity.sizes[size]) {
                    basket[id][size] = item_quantity.sizes[size];
                    setGone(true);
                }
            }
        }
    };

    useEffect(() => {
        gatherBasket();
        const interval = setInterval(() => gatherBasket(), TIMEOUT);
        return () => clearInterval(interval);
    }, []);

    function addBasket(item, size) {
        // Create new basket without mutating current state
        const newBasket = {...basket};

        if (!newBasket[item]) {
            newBasket[item] = {};
        }

        const currentCount = newBasket[item][size] || 0;
        const newCount = currentCount + 1;

        // Update the specific size
        newBasket[item] = {...newBasket[item], [String(size)]: newCount};

        postBasket(newBasket);
        setBasket(newBasket);
    }

    function removeBasket(item, size) {
        if (basket[item]?.[size]) {
            const count = basket[item][size] - 1;
            const newBasket = {...basket};

            if (count <= 0) {
                newBasket[item] = {...newBasket[item]};
                delete newBasket[item][size];

                if (Object.keys(newBasket[item]).length === 0) {
                    delete newBasket[item];
                }
            } else {
                newBasket[item] = {...newBasket[item], [size]: count};
            }

            postBasket(newBasket);
            setBasket(newBasket);
        }
    }

    function removeBasketSize(item, size) {
        if (basket[item]?.[size]) {
            const newBasket = {...basket};
            newBasket[item] = {...newBasket[item]};

            // Remove the specific size completely
            delete newBasket[item][size];

            // Remove the entire item if no sizes left
            if (Object.keys(newBasket[item]).length === 0) {
                delete newBasket[item];
            }

            postBasket(newBasket);
            setBasket(newBasket);
        }
    }

    return { basket, addBasket, removeBasket, removeBasketSize, gone, setGone };
}

export default useBasket;
// export default useBasket;

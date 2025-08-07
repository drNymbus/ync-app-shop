import { createContext } from 'react';
import axios from 'axios';

// init Context
const ShopAPIContext = createContext();

export const ShopAPIProvider = ({ children }) => {
    // const api_address = `https://yn-corp.xyz/api/shop`;
    const api_address = `http://localhost:8080/api/shop`;
    // const api_address = `https://${process.env.REACT_APP_API_CONTACT_POINTS}:${process.env.REACT_APP_API_PORT}/api/shop`;
    const config = {withCredentials: true, headers: {'Content-Type':'application/json', 'Accept':'application/json'}};

    const fetchBasket = async () => { // Fonction pour récupérer le panier
        try {
            const res = await axios.get(`${api_address}/connect`, config);
            let basket = res.data.items;
            for (const k in basket) {
                for (const size in basket[k]) { basket[k][size] = parseInt(basket[k][size]); }
            }
            return basket;
        } catch (e) { console.error('[fetchBasket]', e); }
    };

    const postBasket = async (items) => { // Fonction pour mettre à jour le panier
        try {
            const res = await axios.post(`${api_address}/basket`, {items}, config);
            return res.data.items;
        } catch (e) { console.error('[postBasket]', e); }
    };

    const fetchItem = async (item) => { // Récupérer les données de l'article en fonction de id_article
        try {
            await axios.get(`${api_address}/connect`, config);
            const res = await axios.get(`${api_address}/item?id=${item}`, config);
            if (res.data.length === 1) res.data = res.data[0];

            for (let i=0; i < res.data.images.length; i++) {
                res.data.images[i] = `data:image/jpeg;base64,${res.data.images[i]}`;
            }
            return res.data;
        } catch (e) { console.error('[fetchItem]', e); }
    };

    const fetchQuantity = async (item) => {
        try {
            // await axios.get(`${api_address}/connect`, config);
            const res = await axios.get(`${api_address}/quantity?id=${item}`, config);
            if (res.data.length === 1) res.data = res.data[0];

            for (const size in res.data.sizes) { res.data.sizes[size] = parseInt(res.data.sizes[size]); }
            return res.data;
        } catch (e) { console.error('[fetchQuantity]', e); }
        return Promise.resolve({ S: 25, M: 25, L: 0 });
    };

    const fetchOrder = async (order) => {
        try {
            const res = await axios.get(`${api_address}/capture?id=${order}`, config);
            // If new cookie in response, goto connect route to retrieve old session token
            if (res.data.length === 1) res.data = res.data[0];
            return res.data;
        } catch (e) { console.error('[fetchOrder]', e); }
    }

    const postOrder = async (order) => {
        try {
            const res = await axios.post(`${api_address}/order`, {order}, config);
            if (res.data.length === 1) res.data = res.data[0];
            return res.data;
        } catch (e) { console.error('[postOrder]', e); }
    }

    const captureOrder = async (order) => {
        try {
            const res = await axios.post(`${api_address}/capture`, {order}, config);
            if (res.data.length === 1) res.data = res.data[0];
            return res.data;
        } catch (e) { console.error('[captureOrder]', e); }
    };

    const postMailing = async (infos) => {
        try {
            const res = await axios.post(`${api_address}/mailing`, {infos}, config);
            if (res.data.length === 1) res.data = res.data[0];
            return res.data;
        } catch (e) { console.error('[postMailing]', e); }
    };

    return (
        <ShopAPIContext.Provider value={{ fetchBasket, postBasket, fetchItem, fetchQuantity, fetchOrder, postOrder, captureOrder, postMailing }}>
            {children}
        </ShopAPIContext.Provider>
    );

};

export default ShopAPIContext;

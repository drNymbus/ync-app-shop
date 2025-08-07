import { useState, useContext } from 'react';

import Section from '../../shared/components/Section';
import ShopAPIContext from "../../shared/context/ShopAPIProvider";
import PaymentForm from './PaymentForm';
import PaymentSummary from './PaymentSummary';
import useValidators from '../../shared/hook/useValidators';
import paypalPayment from './PaymentMethod/Paypal';

import './index.css';

function Payment({ basket, onFailure, onSuccess }) {
    const { fetchOrder, postOrder, captureOrder, postMailing } = useContext(ShopAPIContext);
    const { isFormValid } = useValidators();

    /*
    const [order, setOrder] = useState({
        first_name: '', name: '', phone: '',
        mail: '', address: '',
        postal_code: '', city: '', country: '',
        newsletter: false, gtc: false
    });
    */
    const [order, setOrder] = useState({
        first_name: 'yo', name: 'cmoi', phone: '',
        mail: 'xxvmelanconxx@gmail.com', address: '33 Avenue Thiers',
        postal_code: '33100', city: 'Bordeaux', country: 'France',
        newsletter: false, gtc: true
    });
    const setOrderField = (field, value) => setOrder(order => { return {...order, [field]: value}; });

    const [errors, setErrors] = useState({
        first_name: '', name: '', phone: '',
        mail: '', address: '',
        postal_code: '', city: '', country: '',
        newsletter: '', gtc: ''
    });
    const setErrorsField = (field, value) => setErrors(errors => { return {...errors, [field]: value}; });

    const [status, setStatus] = useState(undefined);

    const time2pay = async () => {
        // Assert form values
        const result = await isFormValid(order);
        if (!result.valid) {
            setErrors(result.error);
            setStatus({
                event:'Formulaire incomplet',
                description:"Hop hop hop, pas de cadeau tant que tu n'as pas correctement remplit ton formulaire."
            });
            return undefined;
        }

        setStatus({
            event:'On enregistre proprement ta commande :)',
            description:"On s'assure que nous sommes en capacité de te livrer."
        });

        if (order.newsletter) {
            // Post infos to API
            postMailing(order)
                .catch(e => {
                    setState({
                        event:'Inscription à la newsletter',
                        description:"Apparemment la divinité Javascript t'a jugé inapte à l'inscription de notre newsletter. T'avais l'air super sympa pourtant :/"
                    });
                });
        }

        // Post order to API
        let proceed = false;
        await postOrder({...order, items:basket})
            .then(data => {
                console.log('postOrder', data);
                if (data && data.error) {
                    setStatus({
                        event: "Trop lent :(",
                        description: "On s'est fait dévaliser broski... Certains articles dans ton panier ne sont plus disponible."
                    });
                } else {
                    // Go to payment
                    setStatus({
                        event: 'Vous payez par carte ?',
                        description: "Non, je rigole. Qui a encore de l'espèce de nos jours ? Attend un peu, tu devrais voir la page de paiement apparaître sous peu."
                    });
                    paypalPayment(setStatus, data, fetchOrder, captureOrder)
                        .then(result => {
                            captureOrder({...order, id: data.id, uuid: data.uuid})
                                .then(result => {
                                    if (result.status === 'COMPLETED') {
                                        proceed = true;
                                        setStatus({
                                            event: "On est tout bon :D",
                                            description: "Excellent, tout s'est bien passé ? Merci, à la prochaine! Ciao, ciao."
                                        });
                                    } else if (result.status === 'PENDING') {
                                        if (result.reason === '') {
                                        } else if (result.reason === '') {
                                        } else {
                                            proceed = false;
                                            setStatus({
                                                event: "Mince... On fait quoi ?",
                                                description: "",
                                                failure: true
                                            });
                                        }
                                    } else {
                                        proceed = false;
                                        setStatus({
                                            event: "Trop relou, trop relou",
                                            description: "Désolé mais Paypal n'a pas validé ton paiement, ça peut aussi être aussi un erreure de notre part. Tu peux nous contacter si tu as le moindre soucis (sauf si tu viens de perdre ton chien. On compatis mais on peut pas trop t'aider là...).",
                                            failure: true
                                        });
                                    }
                                })
                                .catch(e => {
                                    proceed = false;
                                    setStatus({
                                        event: "Il s'est passé quoi ?",
                                        description: "On a eu un soucis avec notre serveur (mais entre nous on sait que ça peu uniquement venir de Paypal ;)). Retente de passer la commande, si tu l'ose !",
                                        failure: true
                                    });
                                });
                        })
                        .catch(e => {
                            console.error(`[Payment;time2pay;paypalPayment] ${e}`)
                            setStatus({
                                event: 'Erreur de paiement',
                                description: "Une erreur est survenue avec Paypal. Si tu as été prélevé, ce n'est pas garanti qu'on puisse t'aider mais on va tout faire pour. N'hésite pas à nous contacter."
                            });
                        });
                }
            })
            .catch(e => {
                console.error(`[Payment;time2pay;postOrder] ${e.message}`);
                setStatus({
                    event:'Commande impossible.',
                    description:"Euh... Gênant... C'est sûrement un problème de notre côté. Re-essaye, peut-être que c'est juste un petit bogue. :)"
                });
            });

        /*
        if (proceed) {
            paypalPayment(setStatus, data, fetchOrder, captureOrder)
                .then(result => {
                    captureOrder({...order, id: data.id, uuid: data.uuid})
                        .then(result => {
                            if (result.status === 'COMPLETED') {
                                proceed = true;
                                setStatus({
                                    event: "On est tout bon :D",
                                    description: "Excellent, tout s'est bien passé ? Merci, à la prochaine! Ciao, ciao."
                                });
                            } else if (result.status === 'PENDING') {
                                if (result.reason === '') {
                                } else if (result.reason === '') {
                                } else {
                                    proceed = false;
                                    setStatus({
                                        event: "Mince... On fait quoi ?",
                                        description: "",
                                        failure: true
                                    });
                                }
                            } else {
                                proceed = false;
                                setStatus({
                                    event: "Trop relou, trop relou",
                                    description: "Désolé mais Paypal n'a pas validé ton paiement, ça peut aussi être aussi un erreure de notre part. Tu peux nous contacter si tu as le moindre soucis (sauf si tu viens de perdre ton chien. On compatis mais on peut pas trop t'aider là...).",
                                    failure: true
                                });
                            }
                        })
                        .catch(e => {
                            proceed = false;
                            setStatus({
                                event: "Il s'est passé quoi ?",
                                description: "On a eu un soucis avec notre serveur (mais entre nous on sait que ça peu uniquement venir de Paypal ;)). Retente de passer la commande, si tu l'ose !",
                                failure: true
                            });
                        });
                })
                .catch(e => {
                    console.error(`[Payment;time2pay;paypalPayment] ${e}`)
                    setStatus({
                        event: 'Erreur de paiement',
                        description: "Une erreur est survenue avec Paypal. Si tu as été prélevé, ce n'est pas garanti qu'on puisse t'aider mais on va tout faire pour. N'hésite pas à nous contacter."
                    });
                });
        }
        */

        if (proceed) onSuccess();
    }

    return (<>
        <div className="payment">
            <PaymentForm order={order} setOrderField={setOrderField} errors={errors} setErrorsField={setErrorsField}/>
            <PaymentSummary basket={basket} payment={time2pay}/>
        </div>
        {status && <div className="payment-status">
            <h1>{status.event}</h1>
            <p>{status.description}</p>
            {status.failure && <button onClick={onFailure}>Retour</button>}
        </div>}
    </>);
}

export default Payment;

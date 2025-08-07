import { isChrome, isFirefox, isSafari, isOpera, isIE } from 'react-device-detect';

function getBrowserOptions() {
    const windowFeatures = "left=100,top=100,width=600,height=800";
    if (isChrome) {
        return ["chromeWindow", windowFeatures];
    } else if (isFirefox) {
        return ["mozillaWindow", windowFeatures];
    } else if (isOpera || isSafari) {
        return [];
    } else if (isIE) {
        return ["IEWindow", windowFeatures];
    }
}

async function paypalPayment(setStatus, order, fetchOrder, captureOrder) {
    console.log('paypal', order);
    let popup = window.open(order.links[1].href, ...getBrowserOptions());
    setStatus({
        event:'Redirection',
        description:"Va voir Paypal, on reste ici t'inquiète pas. Je pense qu'on a le temps d'un petit *caffè corretto*."
    });

    let res = {status: 'NONE'};
    let processed = false;
    while (!processed) {
        res = await fetchOrder(order.id);
        console.log('fetchOrder;resp', res);
        if (res.status === 'APPROVED' || res.status === 'COMPLETED') {
            setStatus({
                event: 'Sprint final',
                description: "Paypal a bien enregistré ton paiement, on s'assure maintenant que t'as pas triché petit coquin ;)."
            });
            processed = true;
        }
    }

    popup?.close();
    return res;
}

export default paypalPayment;

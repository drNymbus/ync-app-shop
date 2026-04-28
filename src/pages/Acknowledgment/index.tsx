import {useContext, useEffect, useState, useRef } from "react";
import Section from '../../shared/components/Section';

function Acknowledgment() {
    return (<>
        <Section name="Nous te remercions" image="assets/acknowledgment/acknowledgment_icon.svg" />
        <div className="acknowledgment">

            <img src="/assets/acknowledgment/acknowledgment2.png" alt="Confirmation de commande YNC"/>
            <p>
                Merci !
                <br/>
                Ta commande a bien été passée (comment tu te sens ?).
            </p>
            <p>
                Tu recevras rapidement les détails concernant ta commande dans ta boîte mail.
                <br/>
                (Si tu n'as rien reçu après 24h, n'hésite pas à nous contacter directement par mail)
            </p>

            <button className="ync-button" onClick={() => window.location.href = 'https://yn-corp.xyz/home'}>ET À PART YOUNG NEW SHOP ?</button>

        </div>
    </>);
} export default Acknowledgment;

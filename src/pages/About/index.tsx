import { useState, useEffect } from 'react';

import './index.css';

function About() {
    const [info, setInfo] = useState({
        delivery: false,
        delay: false,
        feedback: false
    });

    const toggleInfo = (el) => {
        const update = {...info};
        for (const key in info) {
            update[key] = (key === el) ? !info[key] : false;
        }
        return () => setInfo(update);
    };

    return (
        <div className="about">
            <div className="select">
            </div>

            <div className="wrapper">
                <div className="content">
                    <p className= "pp"><span>1.YNCORP</span>Nous sommes la Young New Corporation, dit YNC ou YNCorp. Un collectif d'amis Bordelais et Montpelliérains. Bercés pas la culture et l'univers numérique, nous avons pour vocation d'explorer l'art sous toutes ses formes, de nous en approprier les codes pour mieux les briser, et de créer de zéro par nous même.</p>

                    <p className= "pp">Ce que l'on ressent, ce qui nous inspire, on veut donner vie à toutes ces pensées éphémères. En partageant une part de nous, on espère fédérer des individus comme vous et moi, si nous avons la même sensibilité on l'espère.</p>

                    <p className= "pp">Votre implication nous est importante et très appréciée, vos retours et votre implication nous permet de développer l'histoire de la YNCorp ensemble. Vous aussi vous pouvez faire partie de cette aventure collaborative ! Nous prônons l'échange, la communication, l'humilité et le dépassement de soi.</p>
                </div>

                <div className="content">
                    <p className= "pp"><span>2.YNSHOP</span>YNShop est un de nos services, notre modeste boutique, et d'autres sont à venir, tous différents les uns des autres. À travers cette boutique, nous voulons proposer des produits issus de notre imaginaire chaotique, des idées de toutes part, qui peuvent vous faire sourire, ressentir une émotion, ou mêmevous être tout simplement utile. Sans aucune prétention (toujours).</p>

                    <p className= "pp">Cette boutique nous sert à connecter les différents projets de l'univers YNCorp que nous essayons de peindre. Il nous permet aussi d'améliorer la qualité des projets futurs.</p>

                    <p className= "pp">Tout ce que vous trouverez dans ce shop est ici pour deux raisons: 1. On aime tellement ce produit qu'on le voulait pour nous avant de la mettre dans la boutique. 2. Différents acteurs nous ont permis de retranscrire une idée de la meilleure des façons (ça se peut aussi que ce soit juste les qui se sont alignées mais on n'a pas trop creusé cette piste).</p>
                </div>
            </div>

            <div className="faq">
                <h1>FAQ</h1>

                <span className="info" onClick={toggleInfo("delivery")}>

                    <div className={info.delivery ? "visible" : "hidden"}>
                        <p className={"pp " + (info.delivery ? "visible" : "hidden")}>Le délai de rétraction est de XX jours, tu peux te rétracter à l'aide du lien que tu as reçu dans ton mail de confirmation de commande. Si ton colis n'a pas été expédié, nous annulerons l'envoit et tu recevras instantanément les dineros que tu nous a confié. Si ton colis a été expédié, nous attendrons que tu nous le renvois avant de te rendre la plata qui était tienne pour commencer.</p>
                    </div>
                    <span className='label'>
                        <h3>OÙ LIVREZ-VOUS ?</h3>
                        <img src="assets/arrow.svg"/>
                    </span>

                </span>


                <span className="info" onClick={toggleInfo("delay")}>

                    <div className={info.delay ? "visible" : "hidden"}>
                    <p className={"pp " + (info.delivery ? "visible" : "hidden")}>Nous livrons dans la France entière (Métropolitaine et Outre-mer). Pour le moment nous n'avons pas intégrer de solution automatique nous permettant d'envoyer des colis hors de France, nous travaillons dur dur dur à ce que cela soit possible. Si nos produits te donnent réellement envie et que tu te situes en dehors du territoire Français, n'hésite pas à nous contacter par mail, on pourra sûrement trouver un moyen de te livrer !</p>
                     </div>
                    <span className="label">
                        <h3>DÉLAIS DE LIVRAISON</h3>
                        <img src="assets/arrow.svg"/>
                    </span>

                </span>

                <span className="info" onClick={toggleInfo("feedback")}>

                    <div className={info.feedback ? "visible" : "hidden"}>
                    <p className={"pp " + (info.delivery ? "visible" : "hidden")}>Tu peux retrouver toutes les informations nécessaires dans le mail que tu as reçu lors de ta commande. Il te suffit de nous renvoyez par voie postale ton/tes articles et de nous indiquer ton numéro de commande dans le colis retourné. Si tu as le moindre doute, n'hésite pas à nous contacter par mail, nous répondrons à tes questions le plus rapidement possible (pinky promise !).</p>

                    </div>
                    <span className="label">
                        <h3>FAIRE UN RETOUR</h3>
                        <img src="assets/arrow.svg"/>
                    </span>
                </span>

            </div>
        </div>
    );
}

export default About;

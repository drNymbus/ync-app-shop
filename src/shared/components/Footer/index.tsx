import './index.css';

/* @desc: the bootom component of the website page
 * @param message: the text to display on the bottom right
 * @return: the top menu component of the website page
 */

function Footer( {onClick}) {
    return (
        <div className="footer">
            <img src="/assets/yng_metal_logo.png" alt="ync-logo" className="gallery-logo-image" />
            <div className="footer-text">
                <p>
                    Nous préparons de nouveaux articles et designs exclusifs.
                    <br/>
                    Restes connecté — notre équipe adore explorer de nouveaux concepts, tester des idées folles,
                    pour enrichir notre univers avec de nouvelles pièces.
                    <br/>
                    Nous contacter: <a href="mailto:yng.corporation@zohomail.eu">yng.corporation@zohomail.eu</a>
                </p>
                <p>© 2025 Young New Corporation.</p>
                <p>L’univers est en expansion – nous aussi.</p>
            </div>
            {/* <button onClick={onClick}> Je veux etre de la YNC </button> */}
        </div>
    );
} export default Footer;
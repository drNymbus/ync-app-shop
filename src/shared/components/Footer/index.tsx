/* @desc: the bootom component of the website page
 * @param message: the text to display on the bottom right
 * @return: the top menu component of the website page
 */

function Footer( {onClick}) {
    return (
        <div className="footer">
            <button className="footer-title" onClick={onClick}> Je veux etre de la YNC </button>
        </div>
    );
} export default Footer;
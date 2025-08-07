/* @desc: the top menu component of the website page
 * @param name: the text to display on the top right button
 * @param basketSize: how many items are currently in the basket
 * @param homeFn: the onClick handler for the top left button
 * @param clickFn: the onClick handler for the top right button
 * @return: the top menu component of the website page
 */
function Header({name, basket, homeFn, aboutFn, basketFn}) {

    // If top right button is "PANIER" then display the number of items in basket next to it
    // let item_count = Object.values(basket).reduce((a, b) => a + b, 0);

    const item_count = Object.values(basket).reduce((a, b) => {
        const count_a = Object.values(a).reduce((a,b) => a+b, 0);
        const count_b = Object.values(b).reduce((a,b) => a+b, 0);
        return count_a + count_b;
    }, 0);

    let display_name = (name === "PANIER") ? `${name}[${item_count}]` : name;

    return (
        <div className="header-mask">
            <div className="header">
                <button className="header-left" onClick={homeFn}>YNC SHOP</button>
                <div className="header-right">
                    <button className="butt-right1" onClick={aboutFn}>À PROPOS</button>
                    <button className="butt-right" onClick={basketFn}>{display_name}</button>
                </div>
            </div>
        </div>
    );

} export default Header;

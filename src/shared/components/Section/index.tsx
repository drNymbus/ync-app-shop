/* @desc: the top title component of the website page
 * @param image: public path to the image to be displayed
 * @param name: section title
 * @return: the top title component of the website page
 */
function Section({ image, name }) {
    return (
        <div className="section">
            <img className="section-image" src={image} />
            <p className="section-title">{name}</p>
        </div>
    );
} export default Section;
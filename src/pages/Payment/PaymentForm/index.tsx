import { useState } from 'react';
import { make, register } from 'simple-body-validator';
import useValidators from '../../../shared/hook/useValidators';

function PaymentForm({ order, setOrderField, errors, setErrorsField }) {
    const [suggestions, setSuggestions] = useState([]);

    const { getAddressSuggestions, isFieldValid } = useValidators();

    const handleChange = (e) => {
        let { name, value } = e.target;

        if (name === 'newsletter' || name === 'gtc') value = !order[name];

        if (name === 'address' && value.length > 5) {
            getAddressSuggestions(value)
                .then(data => setSuggestions(data))
                .catch(e => console.error(`[PaymentForm;handleChange] ${e.message}`));
        } else if (name !== 'address') {
            const result = isFieldValid(name, value);
            setErrorsField(name, result.error);
        }

        setOrderField(name, value);
    };

    const autocomplete = (val) => {
        const elements = val.split(' ');
        setOrderField('postal_code', elements.at(-2));
        setOrderField('city', elements.at(-1));

        elements.splice(elements.length - 2, 2)
        setOrderField('address', elements.join(' '));
        setOrderField('country', 'France');

        setSuggestions([]);
    }

    return (
        <div className="form">

            <div className="delivery">
                <h1>Méthode de livraison</h1>
                <div className="shipping-option">
                    <input type="radio" id="to-my-address" name="shipping-method" defaultChecked />
                    <label htmlFor="to-my-address">À mon adresse</label>
                </div>
            </div>

            <div className="contact">
                <h1>Contact</h1>
                <input
                    className={errors.mail ? 'error-border' : ''}
                    type="email"
                    name="mail"
                    placeholder="Email"
                    value={order.mail}
                    onChange={handleChange}
                    required
                />
                {errors.mail && <p className="error-message">{errors.mail}</p>}

                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        checked={order.newsletter}
                        onChange={handleChange}
                    />
                    <label htmlFor="newsletter">M'envoyer un mail lorsque YNG sort une nouvelle création.</label>
                </div>
            </div>

            <div className="shipping">
                <h1>Livraison</h1>
                <div className="name-fields">
                    <input
                        className={errors.first_name ? 'error-border' : ''}
                        type="text"
                        name="first_name"
                        placeholder="Prénom"
                        value={order.first_name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className={errors.name ? 'error-border' : ''}
                        type="text"
                        name="name"
                        placeholder="Nom"
                        value={order.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                {errors.first_name && <p className="error-message">{errors.first_name}</p>}
                {errors.name && <p className="error-message">{errors.name}</p>}

                <input
                    className={errors.region ? 'error-border' : ''}
                    type="text"
                    name="country"
                    placeholder="Pays/Région"
                    value={order.country}
                    onChange={handleChange}
                    required
                />
                {errors.region && <p className="error-message">{errors.region}</p>}

                <input
                    className={errors.address ? 'error-border' : ''}
                    type="text"
                    name="address"
                    placeholder="Adresse"
                    value={order.address}
                    onChange={handleChange}
                    required
                />
                {(suggestions.length > 0) &&
                    <ul className="autocomplete-list">
                        {suggestions.map((value, index) => (
                            <li key={index} className="autocomplete-item" onClick={() => autocomplete(value)}>
                                {value}
                            </li>
                        ))}
                    </ul>
                }
                {errors.address && <p className="error-message">{errors.address}</p>}

                <div className="city-fields">
                    <input
                        className={errors.postal_code ? 'error-border' : ''}
                        type="text"
                        name="postal_code"
                        placeholder="Code Postal"
                        value={order.postal_code}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className={errors.city ? 'error-border' : ''}
                        type="text"
                        name="city"
                        placeholder="Ville"
                        value={order.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                {errors.postal_code && <p className="error-message">{errors.postal_code}</p>}
                {errors.city && <p className="error-message">{errors.city}</p>}

                <input
                    className={errors.phone ? 'error-border' : ''}
                    type="tel"
                    name="phone"
                    placeholder="Téléphone"
                    value={order.phone}
                    onChange={handleChange}
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>


            <div className="checkbox-container">
                <input
                    type="checkbox"
                    id="gtc"
                    name="gtc"
                    checked={order.gtc}
                    onChange={handleChange}
                />
                <label htmlFor="gtc">J'ai lu et j'accepte les conditions générales de vente.</label>
                {errors.gtc && <p className="error-message">{errors.gtc}</p>}
            </div>

        </div>
    );
}

export default PaymentForm;

import { useState } from 'react';
import { make, register, setTranslationObject } from 'simple-body-validator';

function useValidators() {

   register('telephone', function (value) {
        if (!value) return true;
        return /^0\d{9}$/.test(value);
    });

    const requestAddress = async (address, limit) => {
        try {
            // const uri = `https://${process.env.FRENCH_GOV_ADDRESS_API}/search?q`;
            const uri = `https://api-adresse.data.gouv.fr/search?q=${encodeURIComponent(address)}&limit=${limit}`;
            const res = await fetch(uri);
            const data = await res.json();

            let result = [];
            for (let i = 0; i < data.features.length; i++) {
                result[i] = data.features[i].properties.label;
            }
            return result;
        } catch (e) {
            console.error(`[useValidators;requestAddress] ${e.message}`);
            return undefined;
        }
    };

    register('address', async function (value) {
        let result = false;
        await requestAddress(value, 5)
            .then(data => {
                Object.values(data).map(val => {
                    let elements = val.split(' ');
                    elements.splice(elements.length - 2, 2);
                    let adr = elements.join(' ');
                    if (adr === value) result = true;
                });
            })
            .catch(e => `[simple-body-validator;address] ${e.message}`);
        return result;
    });

    const getAddressSuggestions = (value) => requestAddress(value, 7);

    const rules = {
        first_name: 'required|alpha',
        name: 'required|alpha',
        phone: 'nullable|telephone',
        mail: 'required|email',
        address: 'required|address',
        postal_code: 'required|string',
        city: 'required|string',
        country: 'required|string',
        newsletter: 'strict|boolean',
        gtc: 'strict|boolean|accepted'
    };

    const isFieldValid = (field, value) => {
        const validator = make({[field]: value}, {[field]: rules[field]});
        const isValid = validator.validate();
        if (isValid) {
            return { valid:true, error:undefined };
        } else {
            const err = validator.errors().first(field);
            return { valid:false, error:err };
        }
    };

    const isFormValid = async (order) => {
        const validator = make(order, rules);
        const isValid = await validator.validateAsync();
        let errors = validator.errors().all();
        Object.entries(errors).map(el => {
            const field = el[0], msg = el[1][0];
            errors[field] = msg;
        });

        return {valid:isValid, error:errors};
    }

    return { getAddressSuggestions, isFieldValid, isFormValid };
}

export default useValidators;

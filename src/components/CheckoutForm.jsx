import { useState } from "react"
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const [formData, setFormData] = useState({
        cardNumber: '',
        cardHolder: "",
        cvv: "",
        exp: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zip: "",
    });

    const [formSubmitted, setFormSubmitted] = useState({});

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = e => {
        e.preventDefault();
        setFormSubmitted(formData);
        clearCart();
        setFormData({
        cardNumber: '',
        cardHolder: "",
        cvv: "",
        exp: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zip: "",
        });
        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit}>
        <fieldset>
            <legend>Payment Information</legend>
            <input type="password" name='cardNumber' placeholder='card number' required value={formData.cardNumber} onChange={handleChange} />
            <input type="text" name='cardHolder' placeholder='card holder' required value={formData.cardHolder} onChange={handleChange} />
            <input type="password" name='cvv' placeholder='CVV' required value={formData.cvv} onChange={handleChange} />
            <input type="text" name='exp' placeholder='exp mm/yy' required value={formData.exp} onChange={handleChange} />
        </fieldset>
        <fieldset>
            <legend>Shipping Information</legend>
            <input type="text" name='addressLine1' placeholder='Address Line 1' required value={formData.addressLine1} onChange={handleChange} />
            <input type="text" name='addressLine2' placeholder='Address Line 2' required value={formData.addressLine2} onChange={handleChange} />
            <input type="text" name='city' placeholder='City' required value={formData.city} onChange={handleChange} />
            <input type="text" name='state' placeholder='State' required value={formData.state} onChange={handleChange} />
            <input type="text" name='zip' placeholder='Zip' required value={formData.zip} onChange={handleChange} />
        </fieldset>
        <button type="submit">Submit</button>
        </form>
    )
}

export default CheckoutForm
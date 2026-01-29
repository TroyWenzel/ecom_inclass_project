import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

// Step 1: Create the cart context
const CartContext = createContext();

// Step 2: Create hook to consume/use our context
export const useCart = () => {
    const context = useContext(CartContext);
    return context;
    };

    // Step 3: Cart Provider component
    export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem("my-cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const [total, setTotal] = useState(0);

    // Calculate total whenever cart items change
    useEffect(() => {
        const calculatedTotal = cartItems.reduce((sum, item) => {
        return sum + item.price * item.quantity;
        }, 0);
        setTotal(calculatedTotal);
    }, [cartItems]);

    // Store cart changes to local storage when they're made
    useEffect(() => {
        localStorage.setItem("my-cart", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, event) => {
        // Prevent event bubbling to avoid clicking into card details
        if (event) {
        event.stopPropagation();
        event.preventDefault();
        }

        // Check if item already exists in the cart
        const existingItem = cartItems.find((item) => item.id === product.id);

        // If item exists, update the quantity
        if (existingItem) {
        const newCart = cartItems.map((item) => {
            if (item.id === product.id) {
            return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(newCart);
        }
        // Else add new item to the cart with quantity of 1
        else {
        const newItem = {
            title: product.title,
            id: product.id,
            price: product.price,
            quantity: 1,
            brand: product.brand,
            thumbnail: product.thumbnail,
            availabilityStatus: product.availabilityStatus,
        };
        setCartItems((prevItems) => [...prevItems, newItem]);
        }

        toast.success(`Added ${product.title} to the cart!`);
    };

    // Increment quantity of an item
    const incrementQuantity = (id) => {
        const newCart = cartItems.map((item) => {
        if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
        }
        return item;
        });
        setCartItems(newCart);
        toast.info("Quantity updated");
    };

    // Decrement quantity of an item
    const decrementQuantity = (id) => {
        const newCart = cartItems
        .map((item) => {
            if (item.id === id) {
            const newQuantity = item.quantity - 1;
            if (newQuantity > 0) {
                return { ...item, quantity: newQuantity };
            }
            return null; // Mark for removal
            }
            return item;
        })
        .filter((item) => item !== null); // Remove items marked as null

        setCartItems(newCart);
        toast.info("Quantity updated");
    };

    // In-class practice
    // Write a function to change the state variable cartItems.
    // The function will take an item's id and remove the item from the cart.
    // This is react so make sure you are properly changing the state with setCartItems().
    const removeItem = (id) => {
        // Find the item being removed for toast message
        const itemToRemove = cartItems.find((item) => item.id === id);
        
        // Filter out the item with the given id
        const newCart = cartItems.filter((item) => item.id !== id);
        
        // Update state with the filtered array
        setCartItems(newCart);
        
        // Show notification
        if (itemToRemove) {
        toast.warning(`Removed ${itemToRemove.title} from cart`);
        }
    };

    // Clear entire cart
    const clearCart = () => {
        setCartItems([]);
        toast.info("Cart cleared");
    };

    // Get total quantity of items in cart
    const getTotalQuantity = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Get item quantity by id
    const getItemQuantity = (id) => {
        const item = cartItems.find((item) => item.id === id);
        return item ? item.quantity : 0;
    };

    const value = {
        cartItems,
        addToCart,
        total,
        incrementQuantity,
        decrementQuantity,
        removeItem,
        clearCart,
        getTotalQuantity,
        getItemQuantity,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};
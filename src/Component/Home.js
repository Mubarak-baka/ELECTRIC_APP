import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom"; 
import AddProduct from './Addproduct';
import ElectronicsSlider from './ElectronicsSlider';
import { FaShoppingCart } from 'react-icons/fa'; 

// Separate loader component (optional for clarity)
const Loader = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);

function Home() {
    const navigate = useNavigate(); 
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState([]); 
    const [loading, setLoading] = useState(true);

    // Fetch products on load
    useEffect(() => {
        fetch("https://electric-app.onrender.com/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products", error);
                setLoading(false); // In case of error, stop loading
            });
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Filter products based on search term
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Add product to cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const productIndex = prevCart.findIndex(item => item.id === product.id);

            if (productIndex !== -1) {
                const updatedCart = [...prevCart];
                updatedCart[productIndex].quantity += 1;
                return updatedCart;
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Increase product quantity
    const increaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Decrease product quantity
    const decreaseQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map(item =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    // Calculate total amount in the cart
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    // Get the total number of items in the cart
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    // Function to submit cart to db.json
    const submitCart = () => {
        const currentTimestamp = new Date().toISOString(); 

        fetch("https://electric-app.onrender.com/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cartDetails: cart,
                totalAmount: totalAmount,
                createdAt: currentTimestamp 
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Cart submitted successfully:", data);
            // Clear the cart after submission
            setCart([]);
            localStorage.removeItem("cart");
            navigate('/');
        })
        .catch(error => {
            console.error("Error submitting cart:", error);
        });
    };

    // Function to close modal
    const closeModal = () => {
        const modal = new window.bootstrap.Modal(document.getElementById('cartModal'));
        modal.hide();
    };

    // Function to navigate to the home page (continue shopping)
    const continueShopping = () => {
        closeModal();
        navigate('/');
    };

    return (
        <>
            <ElectronicsSlider />
            <AddProduct />
            <div className="container mt-4">
                <h1 className="text-center mb-4">Products</h1>

                {/* Search Input */}
                <div className="mb-4 text-center">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="form-control"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Cart Info */}
                <div className="text-right mb-4">
                    <h5>Total Items in Cart: {totalItems}</h5>
                    <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#cartModal"
                    >
                        View Cart <FaShoppingCart />
                    </button>
                </div>

                {loading ? (
                    <Loader /> // Show loader if data is still being fetched
                ) : (
                    <div className="row">
                        {filteredProducts.map(product => (
                            <div className="col-md-3 mb-4" key={product.id}>
                                <div className="card h-100 product-card">
                                    <Link 
                                        to={`/Productdetails/${product.id}`} 
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <img 
                                            src={product.image} 
                                            className="card-img-top" 
                                            alt={product.title}
                                            style={{ height: '200px', objectFit: 'cover' }} 
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.title}</h5>
                                        </div>
                                        <h5 className="card-title" style={{ color: 'red' }}>Ksh:{product.price}</h5>
                                    </Link>
                                    <button
                                        className="btn add-to-cart-btn"
                                        onClick={() => addToCart(product)}
                                    >
                                        <FaShoppingCart />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal to display cart items */}
            <div
                className="modal fade"
                id="cartModal"
                tabIndex="-1"
                aria-labelledby="cartModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="cartModalLabel">Shopping Cart</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={closeModal}
                            ></button>
                        </div>
                        <div className="modal-body">
                            {cart.length === 0 ? (
                                <p>Your cart is empty.</p>
                            ) : (
                                <ul className="list-group">
                                    {cart.map((item, index) => (
                                        <li className="list-group-item" key={index}>
                                            <div className="d-flex justify-content-between">
                                                <span>{item.title}</span>
                                                <div>
                                                    <button
                                                        className="btn btn-sm btn-secondary"
                                                        onClick={() => decreaseQuantity(item.id)}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="mx-2">{item.quantity}</span>
                                                    <button
                                                        className="btn btn-sm btn-secondary"
                                                        onClick={() => increaseQuantity(item.id)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <span>Khs:{item.price * item.quantity}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={continueShopping}
                            >
                                Continue Shopping
                            </button>
                            <div>
                                <strong>Total: Ksh:{totalAmount.toFixed(2)}</strong>
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={submitCart} // Submit cart details
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;

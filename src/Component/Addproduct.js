import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function AddProductModal() {
    const nav = useNavigate();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

// Handle form submission
function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create product object with all fields including quantity
    const newProduct = {
        title,
        image,
        description,
        price,
        quantity,
    };

    // Send POST request to backend to add product
    fetch('https://electric-app.onrender.com/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Product added successfully:', data);

        // Navigate to home page or another page
        nav('/');

        // Show success message with Toastify
        toast.success("Product added successfully!");
    })
    .catch((error) => {
        console.error('Error:', error);
        toast.error("Failed to add product.");
    });

    // Reset form fields
    setTitle('');
    setImage('');
    setDescription('');
    setPrice('');
    setQuantity('');
}

return (
    <div>
        {/* Button to trigger modal */}
        <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProductModal"
        >
            Add Product
        </button>

        {/* Modal */}
        <div
            className="modal fade"
            id="addProductModal"
            tabIndex="-1"
            aria-labelledby="addProductModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addProductModalLabel">Add Product</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-container"> 
                            <form onSubmit={handleSubmit} className="form"> 
                                <div className="form-group"> 
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        placeholder="Enter product title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group"> 
                                    <label htmlFor="image">Image URL</label>
                                    <input
                                        type="text"
                                        id="image"
                                        placeholder="Enter image URL"
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                    />
                                </div>
                                <div className="form-group"> 
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        placeholder="Enter product description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group"> 
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="number"
                                        id="price"
                                        placeholder="Enter product price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group"> 
                                    <label htmlFor="quantity">Quantity</label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        placeholder="Enter the Quantity"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="form-submit-btn w-100" data-bs-dismiss="modal"> 
                                    Add Product
                                </button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default AddProductModal;
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProductDetails() {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const[Quantity,setQuantity] =useState (0)

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setImage(data.image);
                setTitle(data.title);
                setDescription(data.description);
                setPrice(data.price);
                setQuantity(data.Quantity)
            })
            .catch((error) => console.error('Error fetching product:', error));
    }, [id]);

    function Delete() {
        fetch(`http://localhost:3000/products/${id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then(() => {
                console.log('Product deleted');
                navigate('/');
                toast.success('Deleted successfully');
            });
    }

    function submit(e) {
        e.preventDefault();

        fetch(`http://localhost:3000/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                image: image,
                description: description,
                price: price,
                Quantity:Quantity,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('Product updated');
                toast.success('Product updated successfully!');
            })
            .catch((error) => {
                console.error('Error updating product:', error);
                toast.error('Failed to update product.');
            });
    }

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Left Column - Product Image */}
                <div className="col-md-6 text-center">
                    <img 
                        src={image} 
                        alt={title} 
                        className="img-fluid" 
                        style={{ maxHeight: '400px', objectFit: 'contain' }} 
                    />
                </div>

                {/* Right Column - Product Details */}
                <div className="col-md-6">
                    <h1 className="mb-3">{title}</h1>
                    <h3 className="text-primary mb-3">Price: ${price}</h3>
                    <p className="mb-4">{description}</p>
                    <p className="mb-4">Quantity:{Quantity}</p>
                    <button onClick={Delete} type="button" className="btn mt-3 btn-danger btn-sm">DELETE</button>
                    <button 
                        type="button" 
                        className="btn mt-3 btn-warning btn-sm ms-2" 
                        data-bs-toggle="modal" 
                        data-bs-target="#updateProductModal"
                    >
                        Update
                    </button>

                    {/* Product Details Section */}
                    <div className="mb-3">
                        <h5>Product Details</h5>
                        <ul className="list-unstyled">
                            <li><strong>Product status:</strong> Available</li>
                            <li><strong>Manufacturer:</strong> MUSSA Electronics</li>
                            <li><strong>Model:</strong> MADE IN USA</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Update Product Modal */}
            <div
                className="modal fade"
                id="updateProductModal"
                tabIndex="-1"
                aria-labelledby="updateProductModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateProductModalLabel">Update Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-container">
                                <form onSubmit={submit} className="form">
                                    <div className="form-group">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            className="form-control"
                                            placeholder="Enter product title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="image" className="form-label">Image URL</label>
                                        <input
                                            type="text"
                                            id="image"
                                            className="form-control"
                                            placeholder="Enter image URL"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea
                                            id="description"
                                            className="form-control"
                                            placeholder="Enter product description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price" className="form-label">Price</label>
                                        <input
                                            type="number"
                                            id="price"
                                            className="form-control"
                                            placeholder="Enter product price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="price" className="form-label">Quantity</label>
                                        <input
                                            type="number"
                                            id="price"
                                            className="form-control"
                                            placeholder="Enter product price"
                                            value={Quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100 form-submit-btn" data-bs-dismiss="modal">
                                        Update Product
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

export default ProductDetails;

import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"
import AddProduct from './Addproduct';

function Home() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setProducts(data)
            })
            .catch((error) => console.error("Error fetching", error));
    }, []);

    return (
        <>
        <AddProduct />
        <div className="container mt-4">
            <h1 className="text-center mb-4">Products</h1>
            <div className="row">
                {Array.isArray(products) && products.length > 0 ? (
                    products.map(product => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <Link to={`/Productdetails/${product.id}`} >
                            <div className="card h-100">
                            
                                <img
                                    src={product.image}
                                    className="card-img-top"
                                    alt={product.title}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    </div>
                                    <div className="card-body">
                                    <h5 className="card-title">{product.price}</h5>
                                    </div>
                                    
                            </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No products available.</p>
                )}
            </div>
           
        </div>
        </>
    );
}

export default Home;

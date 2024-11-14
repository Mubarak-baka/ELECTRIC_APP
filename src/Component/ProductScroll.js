import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductScroll() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the API
        fetch('https://electric-app.onrender.com/products') // Adjust endpoint as needed
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Show 3 products at a time
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };

    return (
        <div className="product-scroll my-4">
            <Slider {...settings}>
                {products.map(product => (
                    <div key={product.id} className="product-card p-2 text-center">
                        <img src={product.image} alt={product.name} className="product-image w-100" />
                        <h6>{product.name}</h6>
                        <p>Ksh:{product.price}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ProductScroll;

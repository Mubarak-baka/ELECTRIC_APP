import React from 'react';
import ProductScroll from './ProductScroll';

function Footer() {
    return (
        <footer className="footer mt-4 py-4 bg-dark text-light">
            <div className="container text-center">
                <ProductScroll /> 
                <h5>MUSAS ELECTRONIC</h5>
                <p>
                    &copy; 2024 | All rights Reserved
                </p>
            </div>
        </footer>
    );
}

export default Footer;

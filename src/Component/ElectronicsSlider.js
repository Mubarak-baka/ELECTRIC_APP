import React from 'react';
import Slider from 'react-slick';


const ElectronicsSlider = () => {
    const images = [
        'https://thumbs.dreamstime.com/b/row-televisions-positioned-electronics-store-displaying-sale-sign-various-models-brands-available-328105411.jpg',
        'https://thumbs.dreamstime.com/b/vibrant-display-electronic-gadgets-store-showcasing-various-modern-retail-space-highlighting-attractive-layout-337017892.jpg',
        'https://thumbs.dreamstime.com/z/laptops-displayed-neat-row-electronic-store-variety-modern-arranged-shelf-shop-showcasing-different-brands-334019213.jpg',
        'https://img.freepik.com/premium-photo/new-smartphones-stands-display-store-mobile-phones-show-sale-electronics-shop-concept-cell-retail-product-technology-cellphone_788189-15506.jpg',
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };

    return (
        <div className="electronics-slider">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="slider-item">
                        <img src={image} alt={`electronics sale ${index + 1}`} className="slider-image" />
                    </div>
                ))}
            </Slider>
            <h1 className="slider-title">Musas Electronic Shop</h1>
        </div>
    );
};

export default ElectronicsSlider;

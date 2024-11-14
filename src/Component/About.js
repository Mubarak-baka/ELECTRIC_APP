
import React from 'react';

function About() {
  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">About Musas Electronic Shop</h1>
      <div className="row">
        <div className="col-md-6">
          <p>
            Musas Electronic Shop is your go-to destination for the latest and greatest in electronic products.
            We offer a wide range of products, from smartphones to laptops, home appliances, and gadgets, all at
            affordable prices. Whether you're looking for the best in technology or the perfect gift, we've got you covered.
          </p>
          <p>
            We pride ourselves on providing excellent customer service and a seamless shopping experience both online and in-store.
            Our mission is to bring you top-quality electronics that fit your needs and budget.
          </p>
        </div>
        <div className="col-md-6">
          <img
            src="https://thumbs.dreamstime.com/b/vibrant-display-electronic-gadgets-store-showcasing-various-modern-retail-space-highlighting-attractive-layout-337017892.jpg"
            alt="Electronics Display"
            className="img-fluid"
            style={{ borderRadius: '8px', marginBottom: '20px' }}
          />
    
        </div>
      </div>
    </div>
  );
}

export default About;


import React, { useState } from "react";
import { useProductsContext } from "../../context/products_context";

const Details = () => {
  const { single_product: product } = useProductsContext();
  // console.log(single_product);
  // console.log(product);
  const {
    title,
    price,
    description,
    sale_percentage,
    shipping_return_detail,
    tax,
    newVariants,
    variants,
  } = product;
  // console.log(newVariants);
  // Sizes

  const [sizes, setSizes] = useState([]);
  const colorSize = [].concat.apply(
    [],
    sizes.map((item) => Object.keys(item))
  );

  // Amount
  const [amount, setAmount] = useState(1);
  const [stock, setStock] = useState(0);
  const increase = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount + 1;
      if (tempAmount > stock) {
        tempAmount = stock;
      }
      return tempAmount;
    });
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      let tempAmount = oldAmount - 1;
      if (tempAmount < 1) {
        tempAmount = 1;
      }
      return tempAmount;
    });
  };

  return (
    <div className="col-md-6">
      <div className="product-details">
        <div className="product-navigation">
          <ul className="breadcrumb breadcrumb-lg">
            <li>
              <a href="index.html">
                <i className="d-icon-home"></i>
              </a>
            </li>
            <li>
              <a href="#" className="active">
                Products
              </a>
            </li>
            <li>Detail</li>
          </ul>
        </div>

        <h1 className="product-name">{title}</h1>
        {/* <div className="product-meta">
          SKU: <span className="product-sku">12345670</span>
          BRAND: <span className="product-brand">The Northland</span>
        </div> */}
        <div className="product-price">TK {price}</div>

        <div className="product-short-desc">
          {/* <div dangerouslySetInnerHTML={single_product.description} /> */}
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className="product-form product-color">
          <label>Color:</label>
          <div className="product-variations">
            {newVariants &&
              newVariants.map((item, index) => {
                // console.log(item);
                return (
                  <a
                    className="color"
                    data-src="images/demos/demo7/products/big1.jpg"
                    style={{ backgroundColor: item.color_code }}
                    key={index}
                    onClick={() => setSizes(item.sizes)}
                  ></a>
                );
              })}
          </div>
        </div>
        {colorSize.length !== 0 && (
          <div className="product-form product-size">
            <label>Size:</label>
            <div className="product-form-group">
              <div className="product-variations">
                {colorSize.map((item, index) => {
                  console.log(sizes);
                  return (
                    <a
                      className="size"
                      key={index}
                      onClick={() => {
                        const quantity = sizes.find((qty) => console.log(qty));
                      }}
                    >
                      {item}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <hr className="product-divider" />

        <div className="product-form product-qty">
          <label>QTY:</label>
          <div className="product-form-group">
            <div className="input-group">
              <button className="quantity-minus d-icon-minus"></button>
              <input
                className="quantity form-control"
                type="number"
                min="1"
                max="1000000"
                value="4"
                readOnly
              />
              <button className="quantity-plus d-icon-plus"></button>
            </div>
            <button className="btn-product btn-cart">
              <i className="d-icon-bag"></i>Add To Cart
            </button>
          </div>
        </div>

        <hr className="product-divider mb-3" />

        <div className="product-footer">
          <div className="social-links mr-4">
            <a
              href="#"
              className="social-link social-facebook fab fa-facebook-f"
            ></a>
            <a
              href="#"
              className="social-link social-twitter fab fa-twitter"
            ></a>
            <a
              href="#"
              className="social-link social-pinterest fab fa-pinterest-p"
            ></a>
          </div>
          <span className="divider"></span>
          <div className="product-action">
            <a href="#" className="btn-product btn-wishlist">
              <i className="d-icon-heart"></i>Add To Wishlist
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

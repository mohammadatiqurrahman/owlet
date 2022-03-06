import React, { useEffect, useState } from "react";
import { useProductsContext } from "../../context/products_context";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";

const Images = () => {
  const { single_product: product } = useProductsContext();

  const { main_image, gallery_images } = product;
  const [activeImage, setActiveImage] = useState(main_image);

  useEffect(() => {
    setActiveImage(main_image);
  }, [main_image]);

  const activeImageSection = () => {
    return (
      <div className="product-single-carousel owl-carousel owl-theme owl-nav-inner row cols-1">
        <figure className="product-image">
          {/* effect from Salman vai */}
          {activeImage && (
            <img
              src={
                activeImage
                  ? activeImage
                  : "/images/dummy-images/product-preview.jpeg"
              }
              style={{ objectFit: "fill", height: "500px", width: "100%" }}
            />
          )}
        </figure>
      </div>
    );
  };

  const imageGallery = () => {
    return (
      <div className="product-thumbs">
        {main_image && (
          <div
            className={
              activeImage == main_image
                ? "product-thumb active"
                : "product-thumb"
            }
            onClick={() => setActiveImage(main_image)}
          >
            <img
              src={main_image}
              alt="product thumbnail"
              style={{ height: "100px", width: "100%", objectFit: "fill" }}
            />
          </div>
        )}
        {gallery_images &&
          JSON.parse(gallery_images).map((item, index) => {
            return (
              item.path !== null && (
                <div
                  className={
                    activeImage == item.path
                      ? "product-thumb active"
                      : "product-thumb"
                  }
                  key={index}
                  onClick={() => setActiveImage(item.path)}
                >
                  <img
                    src={
                      item.path
                        ? item.path
                        : "/images/dummy-images/product-preview.jpeg"
                    }
                    alt="product thumbnail"
                    style={{
                      height: "100px",
                      width: "100%",
                      objectFit: "fill",
                    }}
                  />
                </div>
              )
            );
          })}
      </div>
    );
  };

  const imageGallerySlideButton = () => {
    return (
      <>
        <button className="thumb-up">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="thumb-down">
          <i className="fas fa-chevron-right"></i>
        </button>
      </>
    );
  };
  return (
    <div className="col-md-6">
      <div className="product-gallery pg-vertical">
        {activeImageSection()}

        <div className="product-thumbs-wrap">
          {imageGallery()}
          {imageGallerySlideButton()}
        </div>
      </div>
    </div>
  );
};

export default Images;

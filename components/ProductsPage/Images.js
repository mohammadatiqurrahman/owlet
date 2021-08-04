import React, { useEffect, useState } from "react";
import Zoom from "react-img-zoom";
import { useProductsContext } from "../../context/products_context";

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
          {/* Zoom effect  */}
          {/* {activeImage && (
            <Zoom
              img={
                activeImage
                  ? activeImage
                  : "/images/dummy-images/product-preview.jpeg"
              }
              zoomScale={3}
              width={441}
              height={496}
            />
          )} */}
          {activeImage && (
            <img
              src={
                activeImage
                  ? activeImage
                  : "/images/dummy-images/product-preview.jpeg"
              }
              data-zoom-image="images/demos/demo24/product/product-1-800x900.jpg"
              alt="Blue Pinafore Denim Dress"
              width="800"
              height="900"
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
              width="109"
              height="122"
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
                    width="109"
                    height="122"
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

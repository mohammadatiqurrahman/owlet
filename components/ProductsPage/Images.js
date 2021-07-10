import React, { useEffect, useState } from "react";
import Zoom from "react-img-zoom";
import { useProductsContext } from "../../context/products_context";

const Images = () => {
  const { single_product: product } = useProductsContext();
  // console.log(product);
  // const [main, setMain] = useState(images[0]);

  const { main_image, gallery_images } = product;
  const [activeImage, setActiveImage] = useState(main_image);
  // console.log(gallery_images);
  // console.log(gallery_images);
  // const [images, setImages] = useState([]);
  // if (gallery_images) {
  //   const modifiedImages = JSON.parse(gallery_images).map((item) => item.path);
  //   const allModifiedImages = [main_image, ...modifiedImages];
  //   setImages(allModifiedImages);
  //   console.log(images);
  // console.log(images);
  // }
  // if (gallery_images) {
  //   const gallery = JSON.parse(gallery_images);
  //   console.log(gallery_images);
  // }
  useEffect(() => {
    setActiveImage(main_image);
  }, [main_image]);

  return (
    <div className="col-md-6">
      <div className="product-gallery pg-vertical">
        <div className="product-single-carousel owl-carousel owl-theme owl-nav-inner row cols-1">
          <figure className="product-image">
            {/* <img
              src={
                activeImage
                  ? activeImage
                  : "/images/dummy-images/product-preview.jpg"
              }
              data-zoom-image="/images/demos/demo24/product/product-1-800x900.jpg"
              alt="Blue Pinafore Denim Dress"
              width="800"
              height="900"
            /> */}
            {activeImage && (
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
            )}
          </figure>
        </div>

        <div className="product-thumbs-wrap">
          <div className="product-thumbs">
            {main_image && (
              <div
                className="product-thumb active"
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
                // console.log(item);
                return (
                  item.path !== null && (
                    <div
                      className="product-thumb active"
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

          <button className="thumb-up disabled">
            <i className="fas fa-chevron-left"></i>
          </button>
          <button className="thumb-down disabled">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Images;

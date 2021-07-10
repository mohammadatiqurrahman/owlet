import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useProductsContext } from "../../context/products_context";
import Loading from "../Loading";

const CollectionBanner = ({ bannerLoading, banner }) => {
  const { navigations, navigations_child } = useProductsContext();

  const router = useRouter();

  const { slug, category, search } = router.query;
  // const [banner, setBanner] = useState("");
  // const [loading, setLoading] = useState(true);
  // const [showBanner, setShowBanner] = useState(false);

  // useEffect(() => {
  //   if (navigations.length > 0) {
  //     setLoading(true);
  //     if (category === "child") {
  //       const categoryBanner = navigations_child.find(
  //         (item) => item.slug === slug
  //       ).banner_image;
  //       setBanner(categoryBanner);
  //       setLoading(false);
  //       setShowBanner(true);
  //     } else if (category === "size") {
  //       setBanner("");
  //       setLoading(false);
  //       setShowBanner(false);
  //     } else if (search) {
  //       setBanner("");
  //       setLoading(false);
  //       setShowBanner(false);
  //     } else {
  //       if (
  //         slug === "new_arrival" ||
  //         slug === "on_sale" ||
  //         slug === "featured"
  //       ) {
  //         setBanner("");
  //         setLoading(false);
  //         setShowBanner(false);
  //       } else {
  //         const categoryBanner = navigations.find(
  //           (item) => item.slug === slug
  //         ).banner_image;
  //         setBanner(categoryBanner);
  //         setLoading(false);
  //         setShowBanner(true);
  //       }
  //     }
  //   }
  // });

  if (bannerLoading) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <section>
        <div className="row">
          <div className="col-lg-12 mb-4">
            <img
              src={
                banner ? banner : "/images/dummy-images/category-banner.jpeg"
              }
              alt="banner"
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CollectionBanner;

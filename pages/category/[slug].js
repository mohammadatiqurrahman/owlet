import React, { useEffect, useState } from "react";
import { CollectionBanner, Filter, Product } from "../../components";
import { useRouter } from "next/router";
import { based_url } from "../../utils/constants";
import Loading from "../../components/Loading";
import { useProductsContext } from "../../context/products_context";

const collections = () => {
  const { navigations_child, products_loading, fetchProducts } =
    useProductsContext();

  //Banner start
  const [banner, setBanner] = useState("");
  const [bannerLoading, setBannerLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  useEffect(() => {
    if (navigations_child.length > 0) {
      const categoryBanner = navigations_child.find(
        (item) => item.slug === slug
      );
      setBanner(categoryBanner.banner_image);
      setBannerLoading(false);
      setShowBanner(true);
    }
  });
  //Banner End

  useEffect(() => {
    fetchProducts(`${based_url}/category/${slug}/product/list`);
  }, [slug]);
  
  if (products_loading) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <main className="main">
        <div className="page-content mb-10 pb-3">
          <div className="container">
            {showBanner && (
              <CollectionBanner bannerLoading={bannerLoading} banner={banner} />
            )}
            <div className="row gutter-lg">
              <Filter />
              <Product />
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default collections;

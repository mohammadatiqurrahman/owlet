import React, { useEffect } from "react";
import {
  BottomPage,
  Footer,
  Header,
  CollectionBanner,
  Filter,
  Product,
} from "../../components";
import { useRouter } from "next/router";
import { based_url } from "../../utils/constants";
import Loading from "../../components/Loading";
import { useProductsContext } from "../../context/products_context";
import NoProductFound from "../../components/NoProductFound";
import CollectionSkeleton from "../../components/Skeleton/CollectionSkeleton";

const collections = () => {
  const { fetchProducts, products_loading, products } = useProductsContext();

  const router = useRouter();
  const { slug } = router.query;
  useEffect(() => {
    fetchProducts(`${based_url}/size/${slug}/product/list`);
  }, [slug]);
  // if (products_loading) {
  //   return <Loading />;
  // }
   if (products_loading) {
     return <CollectionSkeleton />;
   }
  return (
    <React.Fragment>
      {/* <Header navigations={navigations} /> */}
      <main className="main">
        <div className="page-content mb-10 pb-3">
          <div className="container">
            {/* <CollectionBanner /> */}
            <div className="row gutter-lg">
              <Filter />
              {products.length > 0 ? <Product /> : <NoProductFound />}
            </div>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
      {/* <BottomPage /> */}
    </React.Fragment>
  );
};

export default collections;

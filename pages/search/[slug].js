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
import Head from "next/head";
import Loading from "../../components/Loading";
import { useProductsContext } from "../../context/products_context";

const collections = () => {
  const { fetchProducts, products_loading } = useProductsContext();

  const router = useRouter();
  const { slug } = router.query;
  useEffect(() => {
    fetchProducts(`${based_url}/product/search/${slug}`);
  }, [slug]);
  if (products_loading) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <Head>
        <title>Search | The Owlet</title>
      </Head>
      {/* <Header navigations={navigations} /> */}
      <main className="main">
        <div className="page-content mb-10 pb-3">
          <div className="container">
            {/* <CollectionBanner /> */}
            <div className="row gutter-lg">
              <Filter />
              <Product />
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

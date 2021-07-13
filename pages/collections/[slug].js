import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CollectionBanner, Filter, Product } from "../../components";
import { useProductsContext } from "../../context/products_context";
import { based_url } from "../../utils/constants";
import Loading from "../../components/Loading";
import Head from "next/head";

const collections = () => {
  const { fetchProducts, navigations, navigations_child, products_loading } =
    useProductsContext();
  const router = useRouter();

  const { slug } = router.query;

  //Banner start
  const [banner, setBanner] = useState(null);
  const [bannerLoading, setBannerLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (slug === "new_arrival" || slug === "on_sale" || slug === "featured") {
      setBanner("");
      setBannerLoading(false);
      setShowBanner(false);
    } else {
      if (navigations_child.length > 0) {
        const categoryBanner = navigations_child.find(
          (item) => item.slug === slug
        );
        setBanner(categoryBanner.banner_image);
        setBannerLoading(false);
        setShowBanner(true);
      }
    }
  });
  //Banner End
  const [title, setTitle] = useState("");
  const [metaKey, setMetaKey] = useState("");
  const [metaDesc, setMetaDesc] = useState("");

  // Slug wise products fetching
  useEffect(() => {
    if (slug === "new_arrival") {
      fetchProducts(`${based_url}/new_arrival/product/list`);
      if (navigations_child.length > 0) {
        setTitle("New Arrival");
        setMetaKey("");
        setMetaDesc("");
      }
    } else if (slug === "on_sale") {
      fetchProducts(`${based_url}/on_sale/product/list`);
      if (navigations_child.length > 0) {
        setTitle("On Sale");
        setMetaKey("");
        setMetaDesc("");
      }
    } else if (slug === "featured") {
      fetchProducts(`${based_url}/featured/product/list/home`);
      if (navigations_child.length > 0) {
        setTitle("Featured");
        setMetaKey("");
        setMetaDesc("");
      }
    } else {
      fetchProducts(`${based_url}/parent/category/${slug}/product/list`);
      if (navigations_child.length > 0) {
        const seo = navigations_child.find((item) => item.slug === slug);
        const { title, meta_keywords, meta_description } = seo;
        setTitle(title);
        setMetaKey(meta_keywords);
        setMetaDesc(meta_description);
      }
    }
  }, [slug]);

  if (products_loading) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <Head>
        <title>{title} | The Owlet</title>

        {metaKey && <meta name="keywords" content={metaKey} />}
        {metaDesc && <meta name="description" content={metaDesc} />}
      </Head>
      {/* <Header navigations={navigations} /> */}
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
      {/* <Footer /> */}
      {/* <BottomPage /> */}
    </React.Fragment>
  );
};

export default collections;

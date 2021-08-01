import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CollectionBanner, Filter, Product } from "../../components";
import { useProductsContext } from "../../context/products_context";
import { based_url } from "../../utils/constants";
import Loading from "../../components/Loading";
import Head from "next/head";
import NoProductFound from "../../components/NoProductFound";
import CollectionsPageService from "../../services/CollectionsPageService";

const collections = ({ seo }) => {
  const { fetchProducts, products, navigations_child, products_loading } =
    useProductsContext();

  const router = useRouter();

  const { slug } = router.query;

  // Slug wise products fetching
  useEffect(() => {
    if (slug === "new_arrival") {
      fetchProducts(`${based_url}/new_arrival/product/list`);
    } else if (slug === "on_sale") {
      fetchProducts(`${based_url}/on_sale/product/list`);
    } else if (slug === "featured") {
      fetchProducts(`${based_url}/featured/product/list/home`);
    } else {
      fetchProducts(`${based_url}/parent/category/${slug}/product/list`);
    }
  }, [slug]);

  if (products_loading) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <Head>
        <title>{seo.title} | The Owlet</title>
        {seo.title && <meta property="og:title" content={seo.title} />}
        {seo.meta_keywords && (
          <meta name="keywords" content={seo.meta_keywords} />
        )}
        {seo.meta_description && (
          <>
            <meta name="description" content={seo.meta_description} />
            <meta property="og:description" content={seo.meta_description} />
          </>
        )}
        {seo.menu_image && (
          <meta property="og:image" content={seo.menu_image} />
        )}
        <meta property="og:url" content={`/collections/${seo.slug}`} />
      </Head>
      {/* <Header navigations={navigations} /> */}
      <main className="main">
        <div className="page-content mb-10 pb-3">
          <div className="container">
            <CollectionBanner banner={seo.banner_image} />
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

export async function getServerSideProps(context) {
  const parents = await CollectionsPageService.instance.getParentCategoryList();
  if (context.query.slug === "new_arrival") {
    const seo = {
      meta_keywords: "sdfg,sadg,sadfg",
      title: "New Arrival",
      meta_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis cursus in hac habitasse platea dictumst quisque sagittis. Viverra mauris in aliquam sem fringilla. Sodales ut etiam sit amet nisl purus in. Amet porttitor eget dolor morbi non arcu risus.",
    };
    return {
      props: { seo },
    };
  }
  if (context.query.slug === "on_sale") {
    const seo = {
      meta_keywords: "sdfg,sadg,sadfg",
      title: "On Sale",
      meta_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis cursus in hac habitasse platea dictumst quisque sagittis. Viverra mauris in aliquam sem fringilla. Sodales ut etiam sit amet nisl purus in. Amet porttitor eget dolor morbi non arcu risus.",
    };
    return {
      props: { seo },
    };
  }
  if (context.query.slug === "featured") {
    const seo = {
      meta_keywords: "sdfg,sadg,sadfg",
      title: "Featured",
      meta_description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis cursus in hac habitasse platea dictumst quisque sagittis. Viverra mauris in aliquam sem fringilla. Sodales ut etiam sit amet nisl purus in. Amet porttitor eget dolor morbi non arcu risus.",
    };
    return {
      props: { seo },
    };
  }
  const seo = parents.find((item) => item.slug === context.query.slug);

  return {
    props: { seo },
  };
}

export default collections;

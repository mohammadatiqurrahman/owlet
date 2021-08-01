import React, { useEffect, useState } from "react";
import { CollectionBanner, Filter, Product } from "../../components";
import { useRouter } from "next/router";
import Head from "next/head";
import { based_url } from "../../utils/constants";
import Loading from "../../components/Loading";
import { useProductsContext } from "../../context/products_context";
import NoProductFound from "../../components/NoProductFound";
import CollectionsPageService from "../../services/CollectionsPageService";

const collections = ({ seo }) => {
  const { navigations_child, products_loading, fetchProducts, products } =
    useProductsContext();
  const router = useRouter();
  const { slug } = router.query;
  useEffect(() => {
    fetchProducts(`${based_url}/category/${slug}/product/list`);
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
          <>
            <meta property="og:image" content={seo.menu_image} />
          </>
        )}
        <meta property="og:url" content={`/category/${seo.slug}`} />
      </Head>
      <main className="main">
        <div className="page-content mb-10 pb-3">
          <div className="container">
            <CollectionBanner banner={seo.banner} />
            <div className="row gutter-lg">
              <Filter />
              {products.length > 0 ? <Product /> : <NoProductFound />}
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export async function getServerSideProps(context) {
  const parents = await CollectionsPageService.instance.getCategoryList();

  const seo = parents.find((item) => item.slug === context.query.slug);

  return {
    props: { seo },
  };
}

export default collections;

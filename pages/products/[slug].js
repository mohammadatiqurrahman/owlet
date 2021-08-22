import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ContentLoader, { Facebook } from "react-content-loader";
import Head from "next/head";
import {
  Details,
  DetailsBottom,
  Images,
  RelatedProducts,
} from "../../components";

import { useProductsContext } from "../../context/products_context";
import { based_url } from "../../utils/constants";
import Loading from "../../components/Loading";
import ProductsService from "../../services/ProductsService";
const products = ({ seo }) => {
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();
  const { navigations } = useProductsContext();

  const router = useRouter();
  const { slug } = router.query;

  const [relatedProducts, setRelatedProducts] = useState([]);

  const getRelatedProductsRes = async () => {
    const parentSlug = navigations.find(
      (item) => item.id == product.category_id
    );

    if (parentSlug) {
      const relatedProducts =
        await ProductsService.instance.relatedProductlList(parentSlug.slug);
      const x = relatedProducts.filter((item) => item.slug !== slug);
      const y = x.slice(0, 4);
      setRelatedProducts(y);
    }
  };
  useEffect(() => {
    getRelatedProductsRes();
  }, [navigations, product, slug]);
  useEffect(() => {
    fetchSingleProduct(`${based_url}/product/${slug}`);
  }, [slug]);
  const {
    gallery_images,
    main_image,
    additional_information,
    shipping_return_detail,
  } = product;
  // if (loading) {
  //   return <Loading />;
  // }
  if (loading) {
    return (
      <main className="main single-product mt-6">
        <div className="page-content mb-10">
          <div className="container">
            <div className="product product-single row">
              <ContentLoader viewBox="0 0 380 90">
                {/* Only SVG shapes */}
                <rect x="0" y="0" rx="0" ry="0" width="30" height="30" />
                <rect x="35" y="0" rx="0" ry="0" width="70" height="90" />
                <rect x="110" y="0" rx="4" ry="4" width="100%" height="13" />
                <rect x="110" y="25" rx="3" ry="3" width="100%" height="10" />
                <rect x="110" y="40" rx="3" ry="3" width="100%" height="10" />
                <rect x="110" y="55" rx="3" ry="3" width="100%" height="10" />
              </ContentLoader>
            </div>
            <ContentLoader viewBox="0 0 380 90">
              {/* Only SVG shapes */}
              <rect x="0" y="20" rx="4" ry="4" width="100%" height="13" />
              <rect x="0" y="40" rx="3" ry="3" width="100%" height="10" />
              <rect x="0" y="60" rx="3" ry="3" width="100%" height="10" />
              <rect x="0" y="80" rx="3" ry="3" width="100%" height="10" />
            </ContentLoader>
          </div>
        </div>
      </main>
    );
  }
  return (
    <React.Fragment>
      {/* <Header navigations={navigations} /> */}
      <Head>
        {seo.title && (
          <>
            <title>{seo.title} | The Owlet</title>
            <meta property="og:title" content={seo.title} />
          </>
        )}
        {seo.meta_keywords && (
          <meta name="keywords" content={seo.meta_keywords} />
        )}
        {seo.meta_description && (
          <>
            <meta name="description" content={seo.meta_description} />
            <meta property="og:description" content={seo.meta_description} />
          </>
        )}
        {seo.main_image && (
          <meta property="og:image" content={seo.main_image} />
        )}
        <meta property="og:url" content={`/products/${seo.slug}`} />
      </Head>
      <main className="main single-product mt-6">
        <div className="page-content mb-10">
          <div className="container">
            <div className="product product-single row">
              <Images mainImage={main_image} gallery={gallery_images} />
              <Details slugForFacebookShare={seo.slug} />
            </div>
            <DetailsBottom
              shipping_return_detail={shipping_return_detail}
              additional_information={additional_information}
            />
            <RelatedProducts relatedProducts={relatedProducts} />
          </div>
        </div>
      </main>
      {/* <Footer /> */}
      {/* <BottomPage /> */}
    </React.Fragment>
  );
};

export async function getServerSideProps(context) {
  const seo = await ProductsService.instance.getProductForSeo(
    context.query.slug
  );
  return {
    props: { seo },
  };
}

export default products;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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

      setRelatedProducts(relatedProducts);
    }
  };
  useEffect(() => {
    getRelatedProductsRes();
  }, [product]);
  useEffect(() => {
    fetchSingleProduct(`${based_url}/product/${slug}`);
  }, [slug]);
  const {
    gallery_images,
    main_image,
    additional_information,
    shipping_return_detail,
  } = product;
  if (loading) {
    return <Loading />;
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

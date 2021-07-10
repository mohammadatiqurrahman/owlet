import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
const products = () => {
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
      <main className="main single-product mt-6">
        <div className="page-content mb-10">
          <div className="container">
            <div className="product product-single row">
              <Images mainImage={main_image} gallery={gallery_images} />
              <Details />
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

// export const getServerSideProps = async (context) => {
//   const navRes = await fetch(`${based_url}/category/parent/list`);
//   const navigations = await navRes.json();
//   // console.log(navigations);
//   // const singleProduct = navigations.find(
//   //   (item) => context.query.slug == "product-one"
//   // );
//   // console.log(singleProduct);
//   return {
//     props: {
//       navigations,
//     },
//   };
// };

// export const getStaticProps = async ({ params: { slug } }) => {
//   const navRes = await fetch(`${based_url}/category/parent/list`);
//   const navigations = await navRes.json();

//   // const productRes = await fetch(`${based_url}/`)
//   return {
//     props: {
//       navigations,
//     },
//   };
// };

// export async function getStaticPaths() {
//   const navRes = await fetch(`${based_url}/category/parent/list`);
//   const navigations = await navRes.json();

//   const slugs = navigations.map((item) => item.slug);
//   const paths = slugs.map((slug) => ({
//     params: { slug: slug.toString() },
//   }));

//   return {
//     // paths: [{ params: { slug: "product-one" } }],
//     paths,
//     fallback: true,
//   };
// }

export default products;

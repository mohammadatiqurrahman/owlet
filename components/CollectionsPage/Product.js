import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useFilterContext } from "../../context/filter_context";
import { useProductsContext } from "../../context/products_context";
import { paginate } from "../../utils/helpers";
import SingleProduct from "../SingleProduct";
import Loading from "../../components/Loading";
import Head from "next/head";
import NoProductFound from "../NoProductFound";
const Product = () => {
  const { fetchProducts, products_loading, navigations_child, navigations } =
    useProductsContext();
  const { filtered_products: products, sort, updateSort } = useFilterContext();
  const router = useRouter();
  const { slug, category, search } = router.query;

  const [page, setPage] = useState(0);
  const [paginatedProduct, setPaginatedProduct] = useState([]);
  const [title, setTitle] = useState("");
  const [metaKey, setMetaKey] = useState("");
  const [metaDesc, setMetaDesc] = useState("");

  useEffect(() => {
    setPaginatedProduct(paginate(products));
  }, [products]);

  const prevPage = () => {
    page >= 1 && setPage(page - 1);
  };
  const nextPage = () => {
    page < paginatedProduct.length - 1 && setPage(page + 1);
  };
  const numericPage = (pageIndex) => {
    setPage(pageIndex);
  };

  const productSorting = () => {
    return (
      <nav className="toolbox sticky-toolbox sticky-content fix-top">
        <div className="toolbox-left">
          <div className="toolbox-item toolbox-sort select-box text-dark">
            <label>Sort By :</label>
            <select
              className="form-control"
              name="sort"
              id="sort"
              value={sort}
              onChange={updateSort}
            >
              <option value="price-lowest">price (lowest)</option>
              <option value="price-highest">price (highest)</option>
              <option value="name-a">name (a-z)</option>
              <option value="name-z">name (z-a)</option>
            </select>
          </div>
        </div>
        <div className="toolbox-right"></div>
      </nav>
    );
  };

  const showProducts = () => {
    return (
      <div className="row cols-2 cols-sm-3 product-wrapper">
        {paginatedProduct[page] &&
          paginatedProduct[page].map((item) => {
            return (
              <div className="product-wrap" key={item.id}>
                <SingleProduct item={item} />
              </div>
            );
          })}
      </div>
    );
  };

  const paginationOfProducts = () => {
    return (
      <nav className="toolbox toolbox-pagination">
        <p className="show-info"></p>
        <ul className="pagination">
          {!products_loading && (
            <li
              className="page-item"
              onClick={prevPage}
              style={{ display: page === 0 ? "none" : "block" }}
            >
              <a
                className="page-link page-link-prev"
                aria-label="Previous"
                tabIndex="-1"
                aria-disabled="true"
              >
                <i className="d-icon-arrow-left"></i>Prev
              </a>
            </li>
          )}
          {!products_loading &&
            paginatedProduct.map((item, index) => {
              return (
                <li
                  key={index}
                  className={`page-item ${page === index ? "active" : ""}`}
                  aria-current="page"
                  onClick={() => numericPage(index)}
                >
                  <a className="page-link">{index + 1}</a>
                </li>
              );
            })}

          {!products_loading && (
            <li
              className="page-item"
              onClick={nextPage}
              style={{
                display:
                  page === paginatedProduct.length - 1 ? "none" : "block",
              }}
            >
              <a className="page-link page-link-next" aria-label="Next">
                Next<i className="d-icon-arrow-right"></i>
              </a>
            </li>
          )}
        </ul>
      </nav>
    );
  };
  return (
    <React.Fragment>
      {/* <Head>
        <title>{title} | The Owlet</title>

        {metaKey && <meta name="keywords" content={metaKey} />}
        {metaDesc && <meta name="description" content={metaDesc} />}
      </Head> */}
      {paginatedProduct[page] && paginatedProduct[page].length > 0 ? (
        <div className="col-lg-9 text-center">
          {productSorting()}
          {showProducts()}
          {paginationOfProducts()}
        </div>
      ) : (
        <NoProductFound />
      )}
    </React.Fragment>
  );
};

export default Product;

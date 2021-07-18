import React from "react";
import { useFilterContext } from "../../context/filter_context";
import { getUniqueValues, formatPrice } from "../../utils/helpers";

import Slider from "@material-ui/core/Slider";
const Filter = () => {
  const {
    filters: {
      text,
      category,
      size,
      color,
      min_price,
      price,
      max_price,
      shipping,
    },
    updateFilters,
    clearFilters,
    all_products,
  } = useFilterContext();

  const sizes = getUniqueValues(all_products, "size");
  const { colorCode, colorName } = getUniqueValues(all_products, "colors");

  const filterMenuForMobile = () => {
    return (
      <>
        <div
          className="sidebar-overlay"
          onClick={() => document.body.classList.remove("sidebar-active")}
        ></div>
        <a
          className="sidebar-toggle"
          onClick={() => {
            document.body.classList.add("sidebar-active");
          }}
          style={{
            border: "1px solid white",
            padding: "5px",
            cursor: "pointer",
          }}
        >
          <img src="/images/demos/demo24/filter1.png" alt="logo" />
        </a>

        <a
          className="sidebar-close"
          style={{ cursor: "pointer" }}
          onClick={() => document.body.classList.remove("sidebar-active")}
        >
          <i className="d-icon-times"></i>
        </a>
      </>
    );
  };

  const filterBySize = () => {
    return (
      <div className="widget widget-collapsible">
        <h3 className="widget-title">
          Sizes<span className="toggle-btn"></span>
        </h3>
        <div className="widget-body">
          {sizes.map((item, index) => {
            if (item === "all") {
              return (
                <div
                  className="product-variations"
                  style={{
                    display: "inline-block",
                    margin: "0px 5px",
                  }}
                  key={index}
                >
                  <a
                    name="size"
                    onClick={updateFilters}
                    data-size="all"
                    className={`pt-1 ${size === "all" ? "active" : ""}`}
                  >
                    All
                  </a>
                </div>
              );
            }
            return (
              <div
                className="product-variations"
                style={{ display: "inline-block", margin: "0px 2px" }}
                key={index}
              >
                <a
                  name="size"
                  className={`pt-1 ${size === item ? "active" : ""}`}
                  data-size={item}
                  onClick={updateFilters}
                >
                  {item}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const filterByColor = () => {
    return (
      <div className="widget widget-collapsible">
        <h3 className="widget-title">
          Colors<span className="toggle-btn"></span>
        </h3>

        <div className="widget-body">
          {colorCode.map((item, index) => {
            if (item === "all") {
              return (
                <div
                  className="product-variations"
                  style={{
                    display: "inline-block",
                    margin: "0px 5px",
                  }}
                  key={index}
                >
                  <a
                    name="color"
                    onClick={updateFilters}
                    data-color="all"
                    className={`pt-1 ${color === "all" ? "active" : ""}`}
                  >
                    All
                  </a>
                </div>
              );
            }
            return (
              <div
                className="product-variations"
                style={{ display: "inline-block", margin: "0px 2px" }}
                key={index}
              >
                <a
                  name="color"
                  style={{ background: item }}
                  className={`${color === item ? "active" : ""}`}
                  data-color={item}
                  onClick={updateFilters}
                ></a>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const filterByPrice = () => {
    return (
      <div className="widget widget-collapsible">
        <h3 className="widget-title">
          Filter by Price<span className="toggle-btn"></span>
        </h3>

        <div className="widget-body">
          <p className="price">TK {price}</p>
          <input
            onChange={updateFilters}
            type="range"
            name="price"
            min={min_price}
            max={max_price}
            value={price}
            style={{
              borderRadius: "25px",
              backgroundColor: "rgb(0 0 0 / 20%)",
            }}
          />
        </div>
      </div>
    );
  };

  const resetProductFilter = ()=>{
    return (
      <div className="widget widget-collapsible">
        <div className="widget-body mt-3">
          <button type="button" className="btn" onClick={clearFilters}>
            clear filters
          </button>
        </div>
      </div>
    );
  }
  return (
    <aside className="col-lg-3 sidebar sidebar-fixed shop-sidebar sticky-sidebar-wrapper">
      {filterMenuForMobile()}
      <div className="sidebar-content">
        <div className="sticky-sidebar">
          <form>
            {filterBySize()}
            {filterByColor()}
            {filterByPrice()}
          </form>
          {resetProductFilter()}
        </div>
      </div>
    </aside>
  );
};

export default Filter;

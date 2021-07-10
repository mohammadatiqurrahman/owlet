import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { useFilterContext } from "../../context/filter_context";
import { getUniqueValues, formatPrice } from "../../utils/helpers";

const Filter = () => {
  // Filter by price start
  const [value, setValue] = React.useState([2, 10]);

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };
  //Filter by price end

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
  // console.log(color);
  const sizes = getUniqueValues(all_products, "size");
  const { colorCode, colorName } = getUniqueValues(all_products, "colors");
  // console.log(colorName);
  return (
    <aside className="col-lg-3 sidebar sidebar-fixed shop-sidebar sticky-sidebar-wrapper">
      <div
        className="sidebar-overlay"
        onClick={() => document.body.classList.remove("sidebar-active")}
      ></div>
      <a
        className="sidebar-toggle"
        onClick={() => {
          document.body.classList.add("sidebar-active");
        }}
        style={{ border: "1px solid white", padding: "5px", cursor: "pointer" }}
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
      <div className="sidebar-content">
        <div className="sticky-sidebar">
          <div className="widget widget-collapsible">
            <h3 className="widget-title">
              Filter by Price<span className="toggle-btn"></span>
            </h3>

            <div className="widget-body mt-3">
              <div
                style={{
                  margin: "auto",
                  display: "block",
                  width: "100%",
                }}
              >
                <Slider
                  value={value}
                  onChange={rangeSelector}
                  valueLabelDisplay="auto"
                />
              </div>
              <div className="filter-price-text mb-4">
                Price:{" "}
                <span className="filter-price-range">
                  From {value[0]} To {value[1]}
                </span>
              </div>
            </div>
          </div>

          <div className="widget widget-collapsible">
            <h3 className="widget-title">
              Size<span className="toggle-btn"></span>
            </h3>
            <ul className="widget-body filter-items">
              {/* <li>
                <a>Extra Large</a>
              </li> */}
              {sizes.map((item, index) => {
                return (
                  <li key={index}>
                    <input type="checkbox" name="vehicle1" value="Bike" />
                    <label htmlFor="vehicle1"> I have a bike</label>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="widget widget-collapsible">
            <h3 className="widget-title">
              Color<span className="toggle-btn"></span>
            </h3>
            <ul className="widget-body filter-items">
              <li>
                <a href="#">Black</a>
              </li>
              <li>
                <a href="#">Blue</a>
              </li>
              <li>
                <a href="#">Green</a>
              </li>
              <li>
                <a href="#">White</a>
              </li>
            </ul>
          </div>
          <div className="widget widget-collapsible">
            <h3 className="widget-title">Brands</h3>
            <ul className="widget-body filter-items">
              <li>
                <a href="#">Cinderella</a>
              </li>
              <li>
                <a href="#">Comedy</a>
              </li>
              <li>
                <a href="#">Rightcheck</a>
              </li>
              <li>
                <a href="#">SkillStar</a>
              </li>
              <li>
                <a href="#">SLS</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Filter;

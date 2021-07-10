import React from "react";

const DetailsBottom = ({ shipping_return_detail, additional_information }) => {
  return (
    <div
      className="tab tab-nav-simple product-tabs"
      style={{ borderTop: "1px solid gray" }}
    >
      <div className="tab-content">
        <div className="tab-pane active in" id="product-tab-description">
          <div className="row mt-6">
            <div className="col-md-12 mb-8">
              <h5 className="description-title mb-4 font-weight-semi-bold ls-m">
                Additional Information
              </h5>

              <div
                dangerouslySetInnerHTML={{ __html: additional_information }}
              />
            </div>

            <h5 className="description-title mb-3 font-weight-semi-bold ls-m">
              Shipping & Returns
            </h5>
            <div dangerouslySetInnerHTML={{ __html: shipping_return_detail }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsBottom;

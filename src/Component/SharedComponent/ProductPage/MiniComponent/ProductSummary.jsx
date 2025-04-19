import React from "react";

const ProductSummary = ({ productTitle, productInfo }) => {
  return (
    <div className="h-full">
      <h1 className="text-2xl font-semibold cursor-context-menu mb-5 mt-5 nav_active">
        {productTitle}
      </h1>
      <div className="xl:mr-20 md:h-[29rem] overflow-y-auto">


        <article
          className="text-base text-primary-text md:text-primary-white cursor-context-menu leading-7 text-justify pr-2"
          dangerouslySetInnerHTML={{ __html: productInfo?.product_details }}
        ></article>
      </div>

    </div>
  );
};

export default ProductSummary;

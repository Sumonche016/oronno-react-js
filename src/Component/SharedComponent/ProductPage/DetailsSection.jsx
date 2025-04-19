import React, { useState } from "react";
import DetailsBtn from "../../../utils/Button/DetailsBtn";
import RelatedProductsCart from "./MiniComponent/RelatedProductsCart";
import ShowDetailText from "./MiniComponent/ShowDetailText";
import { useGetRelatedProductQuery } from "../../../Redux/product/productApi";
import RelentedProductLoading from "../../../loading/RelentedProductLoading";

const DetailsSection = ({ product }) => {
  const { product_info: productInfo, product_category } = product || {};
  const query = product_category.join(",");

  const category = encodeURIComponent(query);

  console.log(category, "product catagery");

  const { data, isError, isLoading, isFetching } = useGetRelatedProductQuery(
    category,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  let content = null;
  if (isLoading || isFetching) {
    content = [1, 2, 3, 4].map(() => <RelentedProductLoading />);
  }
  if (!isLoading && isError) {
    content = <div>Error...</div>;
  }
  if (!isLoading && data?.data?.length == 0) {
    content = <div>No product Found</div>;
  }
  if (!isLoading && data?.data?.length > 0) {
    content = data.data.map((sp) => <RelatedProductsCart product={sp} />);
  }

  const [detailsRoute, setDetailsRoute] = useState("গাছের-যত্ন");

  const delivaryProcess =
    " ঢাকা সিটির মধ্যে ১-৫ কর্ম-দিবসের মধ্যে আমরা পণ্য হোম ডেলিভারি দিয়ে থাকি। ঢাকার সিটির বাইরে দেশের সকল জেলায় কুরিয়ারে যত্ন সহকারে আমরা পণ্য সরবরাহ করে থাকি।ঢাকার ভিতর হোম ডেলিভারি চার্জ ১০০ টাকা। ঢাকার বাইরে পণ্য অর্ডারের ক্ষেত্রে ২৫% অগ্রিম পেমেন্ট পরিশোধ করতে হবে । বাকি টাকা প্রোডাক্ট রিসিভ করার পর দিতে হবে। কুরিয়ার সার্ভিসে পণ্য পাঠানোর পর এর স্লিপ নাম্বার আপনাকে ইনবক্সে পাঠিয়ে দেওয়া হবে। পণ্য প্রক্রিয়াজাতকরণ বা ডেলিভারি সংক্রান্ত ত্রুটির কারনে ভাঙ্গা, মরা, ত্রুটিপূর্ণ পণ্য পেলে তরুলতার সাপোর্ট টিম এর সাথে যোগাযোগ করুন।অর্ডারকৃত পণ্যটি বাতিল করতে অবশ্যই অর্ডার করার পর থেকে ১০ ঘণ্টার ভিতর জানাতে হবে। ডেলিভারি সংক্রান্ত যেকোনো তথ্য-সেবার জন্য যোগাযোগ করুন আমাদের সাথে। আমাদের সাপোর্ট টিম ৭/২৪ ঘণ্টা আপনাদের সেবায় নিয়োজিত।";

  let contentDesktop = null;
  if (detailsRoute === "গাছের-যত্ন")
    contentDesktop = (
      <ShowDetailText
        data={{ text: productInfo.product_care, title: "গাছের-যত্ন" }}
      />
    );

  if (detailsRoute === "ভিডিও")
    contentDesktop = (
      <ShowDetailText
        data={{ text: "Coming Soon...", title: "ভিডিও টিউটোরিয়াল" }}
      />
    );

  if (detailsRoute === "ডেলিভারী")
    contentDesktop = (
      <ShowDetailText
        data={{ text: delivaryProcess, title: "ডেলিভারী প্রক্রিয়া" }}
      />
    );

  const contentMobile = (
    <>
      <ShowDetailText
        data={{ text: productInfo.product_care, title: "গাছের-যত্ন" }}
      />
      <ShowDetailText
        data={{ text: delivaryProcess, title: "ডেলিভারী প্রক্রিয়া" }}
      />
      <ShowDetailText
        data={{ text: "Coming Soon...", title: "ভিডিও টিউটোরিয়াল" }}
      />
    </>
  );

  return (
    <div className="container mx-auto w-full mt-6">
      <div className="w-full lg:flex lg:flex-row">
        {/* details header  */}
        <div className="border-y border-secondary lg:w-[65%] lg:max-h-[36px]">
          <div className="inline-flex rounded-md shadow-sm ml-0 lg:ml-14 mb-6">
            <DetailsBtn onClick={() => setDetailsRoute("গাছের-যত্ন")}>
              গাছের যত্ন
            </DetailsBtn>
            <DetailsBtn onClick={() => setDetailsRoute("ডেলিভারী")}>
              {" "}
              ডেলিভারী প্রক্রিয়া
            </DetailsBtn>
            <DetailsBtn onClick={() => setDetailsRoute("ভিডিও")}>
              ভিডিও টিউটোরিয়াল
            </DetailsBtn>
          </div>
          {/* show details  */}
          <div className="block">{contentDesktop}</div>
          {/* <div className="md:hidden block">{contentMobile}</div> */}
        </div>

        {/* related product  */}
        <div className="lg:w-[35%] border mt-10 lg:mt-0 border-secondary ml-4">
          <div className="text-xl px-4 py-2 font-semibold border-b border-secondary">
            সংশ্লিষ্ট পণ্য সমূহ
          </div>
          <div className="md:px-4 h-auto md:max-h-[30rem] md:overflow-y-auto">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;

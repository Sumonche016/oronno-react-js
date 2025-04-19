import ProductCard from "./MiniComponent/ProductCard";
import ProductSummary from "./MiniComponent/ProductSummary";
import UseFindWindowSize from "../../../hooks/UseFindWindowSize";

const HeroProductPage = ({ productTitle, price, productImage, productInfo, setIsOpen,_id }) => {
  const windowWidth = UseFindWindowSize();



  return (
    <div>
      {/* product image and about product  */}
      <div
        className="w-full md:h-[36rem] bg-no-repeat bg-cover relative bg-primary-white md:bg-transparent"
        style={
          windowWidth > 768
            ? {
              backgroundImage:
                "url('https://i.ibb.co/zS6Z1QF/ezgif-com-webp-to-jpg.jpg')",
            }
            : {
              backgroundImage: null,
            }
        }
      >
        {/* overlay color  */}
        <div className="absolute top-0 left-0 w-full md:h-[36rem] bg-gradient-to-r from-overlay-color-primary via-overlay-color-secondary to-overlay-color-Tertiary" />
        <div className="container mx-auto md:grid md:grid-cols-12 h-full">
          <div className="relative z-20 md:col-span-5 h-full flex items-center justify-center ">
            {/* product card  */}
            <ProductCard
              productTitle={productTitle}
              productImage={productImage}
              price={price}
              _id={_id}
              setIsOpen={setIsOpen} />
          </div>
          {/* product details */}
          <div className="relative z-20 h-full text-primary-text md:text-primary-white md:col-span-7 p-5">
            <ProductSummary
              productTitle={productTitle}
              productInfo={productInfo}

            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroProductPage;

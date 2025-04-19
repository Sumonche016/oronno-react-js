import React from 'react';
import delivery from '../../../../assets/SVG/delivery.svg'
import payment from '../../../../assets/SVG/payment.svg'
import customerSupport from '../../../../assets/SVG/customer-support.svg'
import easyRecent from '../../../../assets/SVG/easy-recent.svg'


const FooterTop = () => {

    const footerTopOption = [
        { name: "Free Delivery", img: delivery, minOrder: "Up to 5000TK order" },
        { name: "Secure Payment", img: payment, minOrder: "100% Secure payment" },
        { name: "Customer Support", img: customerSupport, minOrder: "Call or email us 24/7" },
        { name: "Easy Resend", img: easyRecent, minOrder: "Any back within 10 days" },

    ];

    return (
        <div className="lg:p-6 lg:py-4  bg-primary-green">
            <div className="container mx-auto px-12">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                    {/* single image and curt */}
                    {
                        footerTopOption && footerTopOption?.map((single, index) => {
                            return (
                                <div key={index} className='flex items-center py-4'>
                                    <div className="flex mr-5">
                                        <img src={single?.img} alt="" className='w-[3.75rem] h-[3.75rem]' />
                                    </div>
                                    <div className="flex flex-col space-y-4 text-[.87rem] ">
                                        <div>
                                            <h4 className=" font-semibold text-title-primary">{single?.name}</h4>
                                        </div>
                                        <div className=" text-title-secondary">
                                            <h4>{single?.minOrder}</h4>
                                        </div>
                                    </div>
                                </div>)
                        })
                    }





                </div>
            </div>
        </div>
    );
};

export default FooterTop;
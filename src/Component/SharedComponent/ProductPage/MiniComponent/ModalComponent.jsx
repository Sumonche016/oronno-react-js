import React from 'react';
import './Product.css'

const ModalComponenet = ({ setActiveModal, title, children, top, width, background, radious, childrenPadding }) => {

    const closeModal = () => {
        setActiveModal(false)

    }



    return (
        <div className={`popup`}>
            <div className="modal-empty-div"></div>
            <div className={`content-container `} style={{ width: width, top: top, borderRadius: radious }}>
                <div className={`w-full popup-content min-h-full`} style={{ backgroundColor: background }}>
                    <div className="flex justify-between items-center radius-top bg-white border-b border-primary p-4">
                        <h1 className="text-[14px] font-medium">{title}</h1>
                        <button
                            onClick={closeModal}
                            className=" hover:text-[#1991eb] font-medium hover:bg-[#e8eef4] text-[30px] w-[18px] h-[18px] flex justify-center items-center"
                        >
                            &times;
                        </button>
                    </div>
                    <div className={`p-[${childrenPadding}]`} style={{ padding: childrenPadding }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalComponenet;
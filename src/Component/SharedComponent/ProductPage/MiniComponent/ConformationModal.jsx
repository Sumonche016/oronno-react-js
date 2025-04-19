import React from 'react';
import ModalComponenet from './ModalComponent';


const ConformationModal = ({ setConfirmModal, deleteFunction }) => {
    // onClick={() => handleDelete(row._id)}
    return (
        <ModalComponenet
            setActiveModal={setConfirmModal}
            title={'Confirmation'}

            width={'40vw'}
            background={''}>
            <div className="p-4">
                <h1 className='text-[14px] font-medium'> Are you sure you want to Delete the product? . This process can not be undone !</h1>
                <div className="flex justify-end mt-4">
                    <div className="flex">
                        <button
                            onClick={() => setConfirmModal(false)}
                            className={`border border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500 input-border cancel-button-hover mr-4 font-500 h-[32px] px-[12px] rounded-[3px] text-[13px]`}
                        >
                            Cancel
                        </button>

                        <div>

                            <button onClick={() => deleteFunction()} className="border border-gray-300 bg-red-500 text-white  input-border cancel-button-hover mr-4 font-500 h-[32px] px-[12px] rounded-[3px] text-[13px]">
                                Delete
                            </button>


                        </div>
                    </div>
                </div>
            </div>

        </ModalComponenet>
    );
};

export default ConformationModal;
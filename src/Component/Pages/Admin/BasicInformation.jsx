import React from 'react';
import { useForm } from 'react-hook-form';
import { Editor } from "react-draft-wysiwyg";
import { toolbar } from '../../../utils/Toolbar';
import InputFeild from './InputFeild';

const BasicInformation = ({ description, setDescription, register, onEditorStateChange, editorState }) => {


    return (

        <div className="bg-white border border-primary rounded-[10px] text-[.9375rem] p-5">
            <h1 className="text-[1.125rem] font-medium mb-5 ">
                Basic Information
            </h1>

            <InputFeild type={'text'} require={true} register={register} label={'Product Name :'} name={"producTtitle"} />


            <div className="mt-3">
                <h1 className="text-[0.875rem] mb-1 inline-block font-medium">Description</h1>
                <div className="draft-editor">
                    <Editor

                        toolbar={toolbar}
                        onEditorStateChange={onEditorStateChange}
                        editorState={editorState}
                        editorStyle={{ minHeight: '10rem', fontWeight: '500' }}
                    />
                </div>


                {/* <div>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='border-input pl-1 border w-full form-control' name="" id="" cols="30" rows="10">

                    </textarea>
                </div> */}

            </div>



        </div>

    );
};

export default BasicInformation;
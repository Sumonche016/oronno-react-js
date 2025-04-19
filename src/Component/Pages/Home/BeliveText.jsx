import React, { useEffect, useState } from 'react';
import UseFindWindowSize from '../../../hooks/UseFindWindowSize';

const BeliveText = () => {

    const [showFullText, setShowFullText] = useState(false);

    const handleReadMore = () => {
        setShowFullText(true);
    };

    const renderText = showFullText ? "torulata.com অনলাইন নার্সারিতে আপনাকে স্বাগতম। অর্ডার পাওয়ার দ্রুততম সময়ের ভিতর পুনরায় কল করে গাছের বিস্তারিত জানিয়ে আপনার অর্ডারটি নিশ্চিত করা হবে। আপনার বাসায় বারান্দায়, ছাদে কিংবা আঙ্গিনায় সবুজের ছোঁয়াতে ভরিয়ে তুলতে ইনডোর/আউটডোর সহ সকল প্রকার শোভাবর্ধক গাছ নিশ্চিন্তে অর্ডার দিন অনলাইনে। torulata.com নিবিড়ভাবে নিশ্চিত করে সেরা মানের গাছ ও গাছের চারা। সেজন্য নিজস্ব উৎপাদন ছাড়াও দেশের বিভিন্ন প্রান্ত ও বিদেশ থেকে বাছাই করা সেরা মানের চারা - গাছগুলোই সংগ্রহ করা হয়ে থাকে অনলাইন গ্রাহকদের জন্য। তাছাড়া প্রজাতিভেদে ও সাইজের উপর নির্ভর করে দাম কিছুটা কমবেশি হয়ে থাকে। তাই আপনার অনলাইন অর্ডারটি পাওয়ার দ্রুত সময়ের ভিতর কল করে যাবতীয় তথ্য জানিয়ে আপনার অর্ডারটি নিশ্চিত করা হবে। তাই নিশ্চিন্তে অর্ডার করুন আপনার কাঙ্ক্ষিত যে কোন পণ্য। ঢাকা ছিটিতে হোম ডেলিভারি এবং সারা দেশে কুরিয়ার সার্ভিসের মাধ্যমে আমরা নিজেস্ব তত্বাবধায়নে যত্ন সহকারে পণ্য সরবরাহ করে থাকি। কুরিয়ারে মাধ্যমে যেকোনো অর্ডার করতে আংশিক মূল্য পরিশোধ করে অর্ডার নিশ্চিত করতে হবে। ওয়েব - সাইটে বিভিন্ন পণ্যের ছবি নমুনা হিসাবে ব্যবহার করা হয়েছে। সাম্প্রতিক ছবিসহ বিস্তারিত তথ্য জানতে যোগাযোগ করুন, আমাদের হোয়াটসঅ্যাপ বা মেসেঞ্জারে অথবা সরাসরি কল করুন 01711258558" : "torulata.com অনলাইন নার্সারিতে আপনাকে স্বাগতম। অর্ডার পাওয়ার দ্রুততম সময়ের ভিতর পুনরায় কল করে গাছের বিস্তারিত জানিয়ে আপনার অর্ডারটি নিশ্চিত করা.. "

    return (
        <div className='relative'>
            <div className='belive-text'>
            </div>
            <div className='bg-white container text-center mx-auto margin-box md:mt-[-195px] mt-[-235px]'>
                <p className='md:text-[19px]  w-[90%] mx-auto font-medium'>
                    {renderText} {(!showFullText) && (
                        <button className='text-primary-green font-medium' onClick={handleReadMore}>
                            Read More..
                        </button>
                    )} {(showFullText) && (
                        <button className='text-primary-green ml-4 font-medium' onClick={() => setShowFullText(false)}>
                            See Less..
                        </button>
                    )}
                </p>
            </div>
        </div>
    );
};

export default BeliveText;
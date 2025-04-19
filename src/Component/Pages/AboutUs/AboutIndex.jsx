import React, { useEffect, useRef } from 'react';
import aboutUs from './about.json'
import Lottie from 'lottie-web';

const AboutIndex = () => {

    const anime = useRef(null);
    useEffect(() => {
        Lottie.loadAnimation({
            container: anime.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: aboutUs,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
            },
        });
        // More logic goes here
    }, []);



    return (
        <div className='md:py-[10rem] py-[3rem]'>
            <div className='md:container w-[95%] mx-auto'>
                <div className='flex md:flex-row flex-col justify-center items-center'>
                    <div ref={anime} style={{

                        overflow: "hidden",
                        outline: "none",
                        margin: "0 auto",
                    }} className='md:w-1/2 w-full'>

                    </div>
                    <div className='md:w-1/2 w-full'>
                        <div>
                            <h1 className='md:text-[30px] text-[20px] font-semibold mb-4'>আমাদের সম্পর্কে</h1>
                            <p className='leading-[1.8] text-[17px]'>
                                তরুলতা একটি নার্সারী ও গ্রীন প্রোজেক্ট কোম্পানী। আমাদের লক্ষ্য হল সবধরনের গাছ এবং উদ্ভিদসমূহ অনলাইনে বিক্রি করে এবং গ্রিন প্রোজেক্ট পরিচালনা করে মানুষের জীবনকে সুস্থ ও পরিবেশকে উন্নত করা।
                                আমরা প্রকৃতির সংরক্ষণে সহায়তা করার জন্য গ্রীন বিউটি এবং পরিবেশ বাঁচানোর জন্য সাধারণ ও উচ্চ মানের সূত্রপাত ব্যবহার করি। আমরা উচ্চ মানের ও স্বাস্থ্যসম্মত গাছ এবং উদ্ভিদসমূহ প্রতিষ্ঠিত করে থাকি।
                                তরুলতা কোম্পানী একইসাথে হোম ডেলিভারী সেবা প্রদান করে থাকে। আমাদের ওয়েবসাইটে গ্রাহকরা গাছের ছবি, গাছের যত্ন, গাছের উপকারিতা, গাছের বিবরণ এবং মূল্যের তথ্য পেতে পারেন। <br /> <br />
                                গ্রাহকরা আমাদের অনলাইন প্ল্যাটফর্মে অর্ডার প্লেস করে নিজেদের পছন্দমত গাছ নিতে পারেন এবং আমরা তাদের ঠিকানায় গাছ পৌঁছে দেই।
                                আমরা বিশ্বস্ত কুরিয়ার পার্টনারদের মাধ্যমে গাছ সঠিকভাবে প্যাকেজ করে এবং সময়মত ডেলিভারি করে থাকি। তরুলতা নার্সারী এবং গ্রীন প্রোজেক্ট কোম্পানী আমাদের গ্রাহকদের সন্তুষ্টির জন্য প্রতিবদ্ধ এবং সর্বোচ্চ মানের পণ্য ও সেবা প্রদানের জন্য কাজ করে।
                                আমাদের গাছের মান এবং স্বাস্থ্যসম্মত হওয়ায় আমরা গ্রাহকদের সন্তুষ্ট করতে পারি।
                                যদি আপনার বিশেষ কোনো প্রশ্ন বা তথ্য প্রয়োজন হয়, অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন। আমরা আপনার সমস্যায় সহায়তা করতে প্রস্তুত আছি।
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutIndex;
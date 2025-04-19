import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import lottie1 from './faq1.json';


const FaqLottie = () => {
    const anime = useRef(null);
    useEffect(() => {
        Lottie.loadAnimation({
            container: anime.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: lottie1,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
            },
        });
        // More logic goes here
    }, []);
    return (

        <div
            className="overflow-hidden"
            style={{
                width: '100%',
                overflow: "hidden",
                outline: "none",
                margin: "0 auto",
            }}
            ref={anime}
        ></div>

    );
};

export default FaqLottie;
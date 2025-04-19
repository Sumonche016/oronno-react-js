import React, { useState } from 'react';


const StarRating = () => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    function handleStarClick(index) {
        setRating(index + 1);
    }

    function handleReviewTextChange(event) {
        setReviewText(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        // TODO: Send rating and review data to server using HTTP request

        // Reset form fields
        setRating(0);
        setReviewText("");
    }
    let blancStar = '&#9734';
    let fillStar = '&#9733';
    return (
        <div className="review-form">
            <form onSubmit={handleSubmit}>
                <div className="star-rating">
                    {[...Array(5)].map((_, index) => (
                        <span
                            key={index}
                            className={` lg:text-[1.5rem] text-[1.3rem] text-primary-yellow hover:text-gray-500 ${index < rating ? " " : "text-gray-500"}`}
                            onClick={() => handleStarClick(index)}
                        >
                            &#9734;

                        </span>
                    ))}
                </div>
                <div className='hidden'>

                    <textarea
                        placeholder="Write your review here..."
                        value={reviewText}
                        onChange={handleReviewTextChange}
                    ></textarea>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default StarRating;
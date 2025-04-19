const data = [

    {
        _id: 45454545454554,
        product_title: "Product Name",
        product_images: "https//:image.jpg",
        product_thumbnail: "https//:image.jpg",
        product_price: 500,
        product_reading: 5,
        product_info: {
            product_details: "product Details",
            product_care: "product care",
            product_care_video: "youtube video link",
            product_review: [
                {
                    review_massages: "Review massages",
                    review_time: Date.now()
                }
            ],
        },
        Product_Category: 'Product Category',
        product_tags_english: ["tags_english", "tags_english", "tags_english"],
        product_tags_bangla: ["tags_bangla", "tags_bangla", "tags_bangla"],
        product_discount: 10, //discount count by percent(%)
        product_abatable_flash_sell: false, //flash sell decide true or false
        product_quantity: 50,
        product_seller_email: "tom@gmail.com", //who is add this product in database
        product_add_time: Date.now(),
    },

]
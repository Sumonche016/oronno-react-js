export const routeLink = [
    {
        name: "হোম",
        path: "/হোম",
    },
    {
        name: "শোভাময় গাছ ",
        path: "/শোভাময়-গাছ",
    },

    {
        name: "ফুল গাছ",
        path: "/ফুল-গাছ",
    },
    {
        name: "ফল-গাছ",
        path: "/ফল-গাছ",
    },
    {
        name: "বনসাই",
        path: "/বনসাই",
    },
    {
        name: "ক্যাকটাস",
        path: "/ক্যাকটাস",
    },
    {
        name: "অন্নান্য",
        path: "/অন্নান্য",
        children: [
            {
                name: "বাগান আনুষাঙ্গিক",
                path: "/বাগান-আনুষাঙ্গিক",

            },
            {
                name: "গার্ডেনিং টুলস",
                path: "/গার্ডেনিং-টুলস",
            },
            {
                name: "মশলা জাতীয় গাছ",
                path: "/মশলা-জাতীয়-গাছ",
            },
            {
                name: "সবজি জাতীয় গাছ",
                path: "/সবজি-জাতীয়-গাছ",
            },
            {
                name: "গার্ডেনিং প্যাকেজ",
                path: "/গার্ডেনিং-প্যাকেজ",
            },
            {
                name: "গার্ডেনিং সার্ভিস/মালি সেবা",
                path: "/গার্ডেনিং-সার্ভিস",
            },

        ],
    },
];


//side navbar route 
export const sideNavRoutes = [
    {
        name: "বাগান আনুষাঙ্গিক",
        path: "/অন্নান্য/বাগান-আনুষাঙ্গিক",
    },
    {
        name: "গার্ডেনিং টুলস",
        path: "/অন্নান্য/গার্ডেনিং-টুলস",
    },
    {
        name: "মশলা জাতীয় গাছ",
        path: "/অন্নান্য/মশলা-জাতীয়-গাছ",
        //   children: [],
    },
    {
        name: "সবজি জাতীয় গাছ",
        path: "/অন্নান্য/সবজি-জাতীয়-গাছ",
    },
    {
        name: "গার্ডেনিং প্যাকেজ",
        path: "/অন্নান্য/গার্ডেনিং-প্যাকেজ",
    },
    {
        name: "গার্ডেনিং সার্ভিস/মালি সেবা",
        path: "/অন্নান্য/গার্ডেনিং-সার্ভিস",
    },
];


//Home slider image 
const image2 =
    "https://icms-image.slatic.net/images/ims-web/71c8081b-569c-4441-873f-d61dadb7da78.jpg_1200x1200.jpg";

const image1 = "https://icms-image.slatic.net/images/ims-web/1f5599ec-690d-4452-b523-e11885233ea7.png"

const image3 = "https://icms-image.slatic.net/images/ims-web/be864785-8eb5-4991-aacf-ba2933005494.jpg"

export const sliderImage = [image2, image1, image3, image1, image2, image3, image2];
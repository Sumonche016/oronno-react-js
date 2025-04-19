
const properties = {

    REACT_APP_ENVIRONMENT: import.meta.env.REACT_APP_ENVIRONMENT || "development",
    REACT_APP_SERVER_URL:
        import.meta.env.REACT_APP_ENVIRONMENT === "production"
            ? "https://server.torulata.com/"
            : "http://localhost:5000",
    REACT_APP_CLIENT_URL:
        import.meta.env.REACT_APP_ENVIRONMENT === "production"
            ? "https://torulata.com/"
            : "http://localhost:3000",
    HTTPS: import.meta.env.REACT_APP_ENVIRONMENT === "production" ? true : false,

};

export default properties;

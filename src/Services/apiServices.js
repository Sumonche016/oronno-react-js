
import http from "./httpServices";

export function addProduct(data) {
    return http.post(`api/v1/product/addProduct`, data);
}

export function updateProduct(productId, data) {
    return http.put(`api/v1/product/updateProduct/${productId}`, data);
}
export function getProduct(data) {
    return http.get(`api/v1/product/fetchProducts`, data);
}
export function getSingleProduct(data) {
    return http.get(`api/v1/product/singleProduct/${data}`);
}

export function deleteProduct(data) {
    return http.delete(`api/v1/product/deleteProduct/${data}`);
}
export function getSearchProduct(search) {
    return http.get(`api/v1/product/getSearchProduct/${search}`);
}


export function updateOrderStatus(data) {
    return http.put(`odder/update-order/${data.id}/${data.status}`);
}

export function getSingleOrder(data) {
    return http.get(`odder/singleOrder/${data}`);
}




export function getAllorder() {
    return http.get(`/odder`);
}



//user 

export function createUser(data) {
    return http.post(`user/createUser`, data);
}

const useStoreProduct = (proId, price = 0) => {

    const products = localStorage.getItem('products');
    const allProduct = products ? JSON.parse(products) : [];
    const existProduct = allProduct?.find((p) => p.id == proId)
    if (existProduct) {
        const withoutExistProduct = allProduct?.filter((p) => p.id != proId)
        const newProduct = { id: proId, value: existProduct.value + 1, totalPrice: existProduct.totalPrice + price }
        const newData = [...withoutExistProduct, newProduct]
        localStorage.setItem('products', JSON.stringify(newData));
        return
    }
    const setNewData = [...allProduct, { id: proId, value: 1, totalPrice: price }];
    localStorage.setItem('products', JSON.stringify(setNewData));
    return
}
export default useStoreProduct;

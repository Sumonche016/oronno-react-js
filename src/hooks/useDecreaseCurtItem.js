
const useDecreaseCurtItem = (proId, price = 0) => {
    const products = JSON.parse(localStorage.getItem('products'));
    const restProduct = products?.filter((p) => p.id != proId)
    const existProduct = products?.find((p) => p.id == proId)

    console.log(products, price);

    if (existProduct) {
        if (existProduct.value == 0) return;
        if (existProduct.value == 1) {
            const newExistProduct = { id: existProduct.id, value: existProduct.value - 1, totalPrice: 0 }
            localStorage.setItem('products', JSON.stringify([...restProduct, newExistProduct]));
            console.log("enter");
            return
        }
        const newExistProduct = { id: existProduct.id, value: existProduct.value - 1, totalPrice: existProduct.totalPrice - price }

        localStorage.setItem('products', JSON.stringify([...restProduct, newExistProduct]));

    }

};

export default useDecreaseCurtItem;
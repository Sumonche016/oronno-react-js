const useRemoveCart = (proId) => {
    const product = JSON.parse(localStorage.getItem('products'));
    const restProduct = product?.filter((p) => p.id != proId)
    localStorage.setItem('products', JSON.stringify(restProduct));
};

export default useRemoveCart;
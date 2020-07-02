const mapper = ({ store }) => {
  return {
    // views
    productList: store.productsList.products,
    productsBySize : store.productsList.productsBySize,
    productsByPrice : store.productsList.productsByPrice,
    productsById : store.productsList.productsById,
    isLoading: store.productsList.isLoading,

    // actions
    loadproductsList: async () => {
      await store.productsList.load();
    }
  }
}

export default mapper
export function usePondProduct() {
    const { apiClient } = useShopwareContext();
    const { handleError } = usePondHandleError();

    const getProductsById = async (itemIds: string[]) => usePondCacheAsyncData(`products-${itemIds.join('-')}`, async () => {
        try {
            return (await apiClient.invoke('readProduct post /product', {
                body: { ids: itemIds },
            })).data;
        } catch (error) {
            handleError(error);
            return null;
        }
    });

    return { getProductsById };
}

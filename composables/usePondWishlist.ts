export function usePondWishlist() {
    const { apiClient } = useShopwareContext();
    const { handleError } = usePondHandleError();

    const getCustomerWishlistProducts = async (itemIds: string[]) => {
        try {
            const { data } = await apiClient.invoke('readProduct post /product', {
                body: { ids: itemIds },
            });

            if (data?.elements) {
                return data.elements;
            }
        } catch (error) {
            handleError(error);
            return null;
        }
    };

    return { getCustomerWishlistProducts };
}

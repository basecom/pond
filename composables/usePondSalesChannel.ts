export function usePondSalesChannel() {
    const { apiClient } = useShopwareContext();
    const { handleError } = usePondHandleError();

    const getAvailableCurrencies = async () => usePondCacheAsyncData('availableCurrencies', async () => {
        try {
            return (await apiClient.invoke('loadCurrencies get /currency')).data;
        } catch (error) {
            handleError(error);
            return null;
        }
    });

    return { getAvailableCurrencies };
}

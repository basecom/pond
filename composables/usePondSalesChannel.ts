export function usePondSalesChannel() {
    const { apiClient } = useShopwareContext();

    const getAvailableCurrencies = async () => {
        const res = await apiClient.invoke('loadCurrencies get /currency');
        console.log('erge', res);

        usePondCacheAsyncData('availableCurrencies', async () => {
            try {
                console.log('try');
                const res = await apiClient.invoke('loadCurrencies get /currency').data;
                console.log('danach', res);
            } catch (error) {
                return null;
            }
        });
    };

    return { getAvailableCurrencies };
}

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

    const getSnippets = async () => usePondCacheAsyncData('snippets', async () => {
        try {
            return (await apiClient.invoke('loadSnippets post /pond/snippets')).data;
        } catch (error) {
            handleError(error);
            return null;
        }
    });

    const getSnippetsById = async (url: string) => {
        if(apiClient) {
            try {
                return (await apiClient.invoke('loadSnippets post /pond/snippet', {
                    body: { domainUrl: url },
                })).data;
            } catch (error) {
                handleError(error);
                return null;
            }
        }

    };

    return { getAvailableCurrencies, getSnippets, getSnippetsById };
}

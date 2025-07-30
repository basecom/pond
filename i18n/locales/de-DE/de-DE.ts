export default defineI18nLocale(async () => {
    // Guck in Server Route, wie apiClient erstellt wird
    const { apiClient } = useShopwareContext();
    const { handleError } = usePondHandleError();
    const url = useRequestURL();

    if(apiClient) {
        try {
            const res = (await apiClient.invoke('loadSnippets post /pond/snippet', {
                body: {domainUrl: url.origin},
            })).data;
            console.log('res', res);
            return res.snippets;
        } catch (error) {
            handleError(error);
            return null;
        }
    }

})
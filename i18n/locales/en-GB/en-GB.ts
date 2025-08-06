import { createAPIClient } from '@shopware/api-client';

export default defineI18nLocale(async () => {
    const runtimeConfig = useRuntimeConfig();
    const url = useRequestURL();

    const shopwareEndpoint =
        runtimeConfig.public?.shopware?.endpoint;
    const shopwareAccessToken = runtimeConfig.public?.shopware?.accessToken;

    // Have to create the apiClient, because the shopware context is missing here if useShopwareContext() is used instead
    const apiClient = createAPIClient<operations>({
        accessToken: shopwareAccessToken,
        baseURL: shopwareEndpoint,
    });

    if (apiClient) {
        try {
            const res = (await apiClient.invoke('loadSnippets post /pond/snippet', {
                body: { domainUrl: `${url.origin}${url.pathname}` },
            })).data;
            return res.snippets;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
});

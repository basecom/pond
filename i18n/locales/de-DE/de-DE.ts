import { createAPIClient } from '@shopware/api-client';

export default defineI18nLocale(async () => {
    const runtimeConfig = useRuntimeConfig();
    const url = useRequestURL();

    const shopwareEndpoint =
        runtimeConfig.public?.shopware?.endpoint;
    const shopwareAccessToken = runtimeConfig.public?.shopware?.accessToken;

    const apiClient = createAPIClient<operations>({
        accessToken: shopwareAccessToken,
        baseURL: shopwareEndpoint,
    });

    if (apiClient) {
        try {
            const res = (await apiClient.invoke('loadSnippets post /pond/snippet', {
                body: { domainUrl: url.origin as string },
            })).data;
            return res.snippets;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
});

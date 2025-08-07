import { createAPIClient } from '@shopware/api-client';

export function usePondSnippets() {
    const runtimeConfig = useRuntimeConfig();
    const { handleError } = usePondHandleError();

    const getSnippets = async (url: string) => {

        const shopwareEndpoint = runtimeConfig.public?.shopware?.endpoint;
        const shopwareAccessToken = runtimeConfig.public?.shopware?.accessToken;

        // Have to create the apiClient, because the shopware context is missing here if useShopwareContext() is used instead
        const apiClient = createAPIClient<operations>({
            accessToken: shopwareAccessToken,
            baseURL: shopwareEndpoint,
        });

        if (apiClient) {
            try {
                const res = (await apiClient.invoke('loadSnippets post /pond/snippet', {
                    body: {
                        domainUrl: url,
                    },
                })).data;
                return res.snippets;
            } catch (error) {
                handleError(error);
                return null;
            }
        }
    };

    return { getSnippets };
}

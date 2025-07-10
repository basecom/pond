import { createAPIClient } from '@shopware/api-client';

export default defineEventHandler(async (event) => {

    const query = getQuery(event);
    if (!query.em || !query.hash) {
        await sendRedirect(event, '/', 400);
        return;
    }

    const runtimeConfig = useRuntimeConfig();

    const shopwareEndpoint =
        runtimeConfig.public?.shopware?.endpoint;
    const shopwareAccessToken = runtimeConfig.public?.shopware?.accessToken;

    const apiClient = createAPIClient({
        accessToken: shopwareAccessToken,
        baseURL: shopwareEndpoint,
    });

    await apiClient.invoke(
        'confirmNewsletter post /newsletter/confirm',
        {
            body: {
                em: query.em as string,
                hash: query.hash as string,
            },
        },
    );

    await sendRedirect(event, '/account', 200);
});

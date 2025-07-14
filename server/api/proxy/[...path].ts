import { createAPIClient } from '@shopware/api-client';

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig();
    const shopwareAccessToken = runtimeConfig.public.pond.accessToken;

    if (
        !runtimeConfig.public?.pond?.shopwareEndpoint ||
        !shopwareAccessToken
    ) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Shopware endpoint or access token missing',
        });
    }

    const shopwareEndpoint =
        `${runtimeConfig.public?.pond?.shopwareEndpoint}/store-api/`;

    const apiClient = createAPIClient({
        accessToken: shopwareAccessToken,
        baseURL: shopwareEndpoint,
    });

    const incoming = await readBody(event);
    const { headers = {}, endpoint, pathParams = {}, ...body } = incoming || {};
    const query = getQuery(event);

    if (!endpoint) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No endpoint provided to proxy request',
        });
    }

    // only add entries to options if they are not empty
    // needed because passing a body on a GET request would throw an error
    const isNonEmpty = (obj: object) => obj && Object.keys(obj).length > 0;
    const options = {
        ...(isNonEmpty(headers) && { headers }),
        ...(isNonEmpty(pathParams) && { pathParams }),
        ...(isNonEmpty(query) && { query }),
        ...(isNonEmpty(body) && { body }),
    };

    const { data } = await apiClient.invoke(endpoint, options);

    return data;
});

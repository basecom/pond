import { createAPIClient } from '@shopware/api-client';

export default defineCachedEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig();
    const query = getQuery(event);
    const { endpoint, salesChannel, ...params } = query;

    // when using multi-sales-channel the correct accessToken based on the salesChannelId needs to be loaded here
    const shopwareAccessToken = runtimeConfig.public.pond.accessToken;
    const shopwareEndpoint = `${runtimeConfig.public?.pond?.shopwareEndpoint}/store-api/`;

    if (!shopwareEndpoint || !shopwareAccessToken) {
        throw createError({ statusCode: 500, statusMessage: 'Shopware endpoint or access token missing' });
    }

    if (!endpoint) {
        throw createError({ statusCode: 400, statusMessage: 'No endpoint provided to proxy request' });
    }

    const apiClient = createAPIClient({
        accessToken: shopwareAccessToken,
        baseURL: shopwareEndpoint,
    });

    const options: {
        headers?: Record<string, string>,
        pathParams?: Record<string, any>,
        body?: Record<string, any>
    } = { body: {} };

    // Matches keys like "key[nestedKey]"
    const namespaceRegex = /^(\w+)\[(.+?)]$/;

    for (const key in params) {
        const value = params[key];
        const match = key.match(namespaceRegex);

        if (match) {
            // This is a namespaced parameter (e.g., for headers or pathParams)
            const namespace = match[1] as 'headers' | 'pathParams';
            const innerKey = match[2];

            if (!options[namespace]) {
                options[namespace] = {};
            }
            options[namespace]![innerKey] = value;
        } else {
            // This is a root parameter, so it goes into the body
            options.body![key] = value;
        }
    }

    // clean up empty objects to prevent sending empty bodies/headers
    if (options.body && Object.keys(options.body).length === 0) delete options.body;
    if (options.headers && Object.keys(options.headers).length === 0) delete options.headers;
    if (options.pathParams && Object.keys(options.pathParams).length === 0) delete options.pathParams;

    const { data } = await apiClient.invoke(endpoint, options);

    return data;
}, {
    name: 'store-api-proxy-cache',
    getKey: (event) => {
        const query = getQuery(event);
        // this creates a key from the full query, ensuring that every unique combination of parameters gets its own cache entry
        return JSON.stringify(query);
    },
    // keep cache entry valid for x seconds
    maxAge: 60,
    // do not serve stale data
    staleMaxAge: 0,
    swr: false,
});

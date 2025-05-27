import { createAPIClient } from '@shopware/api-client';

/**
 * This file is based on the Shopware Frontends Demo Shop:
 * https://github.com/shopware/frontends/blob/main/templates/vue-demo-store/server/routes/account/login/imitate-customer.ts
 *
 * These things are customized:
 *
 * The config for the apiClient is directly read from the runtimeConfig instead from
 * the apiBuilder include.
 *
 * The Cookie name that is set is changed from "sw-context-token" to "contextToken"
 */
export default defineEventHandler(async event => {
    const body = await readBody(event);
    if (!body.customerId || !body.token || !body.userId ||
        typeof body.customerId !== 'string' ||
        typeof body.token !== 'string' ||
        typeof body.userId !== 'string') {
        await sendRedirect(event, '/', 400);
        return;
    }

    const runtimeConfig = useRuntimeConfig();

    if (
        !runtimeConfig.public?.pond?.shopwareEndpoint ||
        !runtimeConfig.public?.pond?.accessToken
    ) {
        await sendRedirect(event, '/', 500);
        return;
    }

    const shopwareEndpoint =
        `${runtimeConfig.public?.pond?.shopwareEndpoint  }/store-api/`;
    const shopwareAccessToken = runtimeConfig.public?.pond?.accessToken;

    const apiClient = createAPIClient<operations>({
        accessToken: shopwareAccessToken,
        baseURL: shopwareEndpoint,
    });

    try {
        await apiClient.invoke(
            'imitateCustomerLogin post /account/login/imitate-customer',
            {
                body: {
                    customerId: body.customerId,
                    token: body.token,
                    userId: body.userId,
                },
            },
        );
    } catch (error) {
        await sendRedirect(event, '/', 400);
        return;
    }

    if (!apiClient.defaultHeaders['sw-context-token']) {
        await sendRedirect(event, '/', 400);
        return;
    }

    setCookie(
        event,
        'contextToken',
        apiClient.defaultHeaders['sw-context-token'],
    );

    await sendRedirect(event, '/account', 200);
});

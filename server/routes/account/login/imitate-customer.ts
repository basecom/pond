import { createAPIClient } from '@shopware/api-client';

/**
 * This file is based con the Shopware Frontends Demo Shop:
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
    if (!body.customerId || !body.token || !body.userId) {
        await sendRedirect(event, '/', 400);
        return;
    }

    const runtimeConfig = useRuntimeConfig();

    const shopwareEndpoint =
        `${runtimeConfig.public?.pond?.shopwareEndpoint  }/store-api/`;
    const shopwareAccessToken = runtimeConfig.public?.pond?.accessToken;

    const apiClient = createAPIClient<operations>({
        accessToken: shopwareAccessToken,
        baseURL: shopwareEndpoint,
    });

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

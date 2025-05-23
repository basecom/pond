/*
import { createAPIClient } from "@shopware/api-client";
import type { operations } from "#shopware";

export default defineEventHandler(async (event) => {
    // setTimeout(() => {
    //
    // },3000);
    const body = await readBody(event);
    if (!body.customerId || !body.token || !body.userId) {
        console.log(!body.customerId, !body.token, !body.userId);
        await sendRedirect(event, "/", 400);
        return;
    }

    const runtimeConfig = useRuntimeConfig();

    const apiClient = createAPIClient<operations>({
        baseURL: `${runtimeConfig.public.pond.shopwareEndpoint}/store-api`,
        accessToken: runtimeConfig.public.pond.accessToken,
    });
    console.log('test 1');

    const response = await apiClient.invoke(
        "imitateCustomerLogin post /account/login/imitate-customer",
        {
            body: {
                customerId: body.customerId,
                token: body.token,
                userId: body.userId,
            },
        },
    );
    console.log('test 2', response);

    // if (!apiClient.defaultHeaders["contextToken"]) {
    //     await sendRedirect(event, "/", 400);
    //     return;
    // }

    console.log('test 3');

    setCookie(
        event,
        "contextToken",
        apiClient.defaultHeaders["contextToken"],
    );
    console.log('test 4', apiClient.defaultHeaders["contextToken"]);

    await sendRedirect(event, "/account", 200);
});

*/
//
// import { readBody, sendRedirect } from 'h3';
//
// export default defineEventHandler(async event => {
//     // This server route ist called from SW admin
//     if (event.method === 'POST') {
//         const body = await readBody(event);
//         const token = body.token;
//         const userId = body.userId;
//         const customerId = body.customerId;
//
//         // Redirect to dedicated page, to call login store api
//         await sendRedirect(
//             event,
//             `/imitate-customer/?token=${token}&userId=${userId}&customerId=${customerId}`,
//             200,
//         );
//     }
// });

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
 * The Cookie name that is set is changed from "sw-context-token" to "contextToken" because
 * this seems to be the one that Pond is using.
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

import type { components, operations as coreOperations } from '@shopware/api-client/api-types';

type ExtendedOperations = coreOperations & {
    'imitateCustomerLogin post /account/login/imitate-customer': {
        contentType?: 'application/json';
        accept?: 'application/json';
        body?: {
            customerId: components['schemas']['Customer']['id'],
            token: string,
            userId: components['schemas']['User']['id'],
        };
        response: {
            redirectUrl: string|null;
        };
        responseCode: 200;
    };
}

declare global {
    type operations = ExtendedOperations;
}

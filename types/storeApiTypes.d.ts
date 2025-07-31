import type { operations as coreOperations } from '@shopware/api-client/api-types';

export type ExtendedOperations = coreOperations & {
    'loadSnippets post /pond/snippet': {
        contentType?: 'application/json';
        accept?: 'application/json';
        body?: {
            domainUrl: string,
        };
        response: {
            data: {
                snippets: {
                    [key: string]: string;
                },
                error?: string,
                apiAlias: string,
            }
            status: number,
        };
        responseCode: 200;
    };
}

declare global {
    type operations = ExtendedOperations;
}

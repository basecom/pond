import type { PondAnalyticsType } from '~/types/analytics/analytics';

export interface PondHooks {
    'pond:determine-access-token': (accessKey: AccessToken) => HookResult;
}

declare module '#app' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RuntimeNuxtHooks extends PondHooks {}
}

declare module '@nuxt/schema' {
    interface PublicRuntimeConfig {
        pond: {
            accessToken: string;
            shopwareEndpoint: string;
            devStorefrontUrl: string,
            analytics: {
                enabled: boolean;
                type: PondAnalyticsType;
                trackingUrl?: string;
                id?: string;
            };
            breadcrumb: {
                enableDynamicLoading: boolean,
            },
            cms: {
                enableProgressiveLoading: boolean,
            },
            preloading: {
                enabled: boolean,
                imagePreloadingClass: string,
            },
        };
    }
}

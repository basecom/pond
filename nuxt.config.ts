import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const currentDir = dirname(fileURLToPath(import.meta.url));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: [
        '@pinia/nuxt',
        '@nuxtjs/tailwindcss',
        '@formkit/auto-animate/nuxt',
        '@vueuse/nuxt',
        'nuxt-swiper',
        'radix-vue/nuxt',
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@formkit/nuxt',
        '@nuxtjs/i18n',
        '@nuxtjs/device',
    ],

    experimental: {
        asyncContext: true,
        sharedPrerenderData: true,
        typedPages: true,
        viewTransition: true,
    },

    features: {
        devLogs: true,
    },

    future: {
        compatibilityVersion: 4,
    },

    runtimeConfig: {
        public: {
            pond: {
                shopwareEndpoint: '',
                accessToken: '',
                devStorefrontUrl: '',
                analytics: {
                    enabled: false,
                    type: 'gtag',
                    id: 'G-XXXX',
                    trackingUrl: 'https://www.googletagmanager.com/',
                },
                cms: {
                    enableProgressiveLoading: false,
                },
                preloading: {
                    enabled: false,
                    imagePreloadingClass: 'cms-lcp-block',
                },
            },
        },
    },

    routeRules: {
        // add redirects
        '/newsletter-subscribe': { redirect: '/newsletter/confirm' },
        '/registration/confirm': { redirect: '/account/register/confirm' },
        // disable ssr for specific routes
        '/account/**': { ssr: false },
        '/checkout/**': { ssr: false },
        '/newsletter/**': { ssr: false },
        '/search/**': { ssr: false },
        '/wishlist/**': { ssr: false },
        // nitro caching
        // can be enabled here to be used as a proxy to cache certain predefined store-api routes
        // supported routes: /navigation, /config
        // possible options are provided by nuxt (https://nuxt.com/docs/guide/concepts/rendering) and nitro (https://nitro.build/guide/cache)
        // e.g.: cache every proxy api route for 5 minutes and never serve stale data (as opposed to swr):
        // '/api/proxy/**': {
        //     cache: {
        //         maxAge: 60 * 5,
        //         staleMaxAge: 0,
        //     },
        // },
        // e.g.: cache a specific route and serve stale data for the first hit even after maxAge expired:
        // '/api/proxy/config': {
        //     swr: 60 * 5,
        // },
        // e.g.: cache a specific sub-route:
        // '/api/proxy/navigation/**': {
        //     swr: 60 * 5,
        // },
    },

    extends: ['@shopware/composables/nuxt-layer'],

    imports: {
        dirs: [join(currentDir, 'composables/**'), join(currentDir, 'utils')],
    },

    formkit: {
        autoImport: true,
    },

    fonts: {
        defaults: {
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
            styles: ['normal', 'italic'],
        },
    },

    components: {
        dirs: [join(currentDir, 'components')],
        global: true,
    },

    tailwindcss: {
        config: {
            content: [join(currentDir, 'formkit.theme.ts')],
        },
    },

    i18n: {
        strategy: 'prefix_except_default',
        defaultLocale: 'de-DE',
        detectBrowserLanguage: false,
        bundle: {
            optimizeTranslationDirective: false,
        },
        lazy: true,
        locales: [
            {
                code: 'de-DE',
                file: 'de-DE/de-DE.ts',
            },
            {
                code: 'en-GB',
                file: 'en-GB/en-GB.ts',
            },
        ],
    },

    compatibilityDate: '2024-10-14',

    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
    },
});

import tailwindcss from '@tailwindcss/vite';
import { autoInjectTWTheme } from './vite/autoInjectTWTheme';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    modules: [
        '@pinia/nuxt',
        '@formkit/auto-animate/nuxt', 
        '@vueuse/nuxt',
        '@nuxt/eslint',
        '@nuxt/fonts',
        '@nuxtjs/i18n',
        '@nuxt/icon',
        'shadcn-nuxt',
        '@shopware/nuxt-module',
        '@therealironduck/ducktory',
    ],

    experimental: {
        asyncContext: true,
        sharedPrerenderData: true,
        viewTransition: true,
        enforceModuleCompatibility: true,
    },

    features: {
        devLogs: true,
    },

    future: {
        compatibilityVersion: 4,
    },

    vite: {
        plugins: [autoInjectTWTheme(), tailwindcss()],
        optimizeDeps: {
            include: ['@shopware/cms-base-layer', '@shopware-pwa/helpers-next', 'scule'],
        },
    },

    css: ['~/assets/css/main.css'],

    nitro: {
        preset: 'bun',
        // moduleSideEffects: ['vue'],
        // externals: {
        //     inline: ['vue', '@vue/runtime-core', '@vue/runtime-dom', '@vue/reactivity']
        // }
    },

    fonts: {
        defaults: {
            weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
            styles: ['normal', 'italic'],
        },
    },

    icon: {
        serverBundle: {
            collections: ['mdi'],
        },
        customCollections: [
            {
                prefix: 'custom-icons',
                dir: './assets/icons',
                normalizeIconName: false,
            },
        ],
    },

    components: {
        dirs: ['components'],
        global: true,
    },

    i18n: {
        vueI18n: './i18n.config.ts',
        strategy: 'prefix_except_default',
        defaultLocale: 'de-DE',
        detectBrowserLanguage: false,
        locales: [
            {
                code: 'de-DE',
                files: ['de-DE/account.json', 'de-DE/error.json', 'de-DE/general.json', 'de-DE/product.json', 'de-DE/listing.json', 'de-DE/wishlist.json'],
            },
            {
                code: 'en-GB',
                files: ['en-GB/account.json', 'en-GB/error.json', 'en-GB/general.json', 'en-GB/product.json', 'en-GB/listing.json', 'en-GB/wishlist.json'],
            },
        ],
        lazy: true,
        bundle: {
            optimizeTranslationDirective: false,
        },
    },

    compatibilityDate: '2025-02-24',

    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        },
    },

    runtimeConfig: {
        public: {
            shopware: {
                endpoint: '',
                accessToken: '',
            },
        },
    },

    routeRules: {
        '/account/**': { ssr: false },
    },

    extends: ['@shopware/composables/nuxt-layer', '@shopware/cms-base-layer'],

    shadcn: {
        prefix: '',
        componentDir: './components/ui',
    },

    ducktory: {
        path: '/styleguide',
        debug: true,
    },
});

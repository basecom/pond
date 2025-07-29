<script setup lang="ts">
// context should be fetched alone, as other calls depend on its result
const customerStore = useCustomerStore();
await customerStore.refreshContext();

const { locale } = useI18n();
const url = useRequestURL();
const route = useRoute();
const { handleError } = useHandleError();

const { refreshCart } = useCart();
const { getWishlistProducts } = useWishlist();
const { setAffiliateCode } = useAffiliateMarketing();

const configStore = useConfigStore();

try {
    await Promise.all([
        configStore.loadConfig(),
    ]);
} catch (error) {
    handleError(error, false);
}

refreshCart();

const wishlistEnabled = configStore.get('core.cart.wishlistEnabled');
// wishlist products should not block ssr
if (route.path !== '/wishlist' && wishlistEnabled && import.meta.client) {
    // If not on wishlist page we fetch for displaying the number of items in the header
    getWishlistProducts();
}

// language handling
const { changeLanguage, getLanguageIdFromCode, getAvailableLanguages } = useInternationalization();
const updateSessionWithLanguage = async () => {
    const frontendLocale = locale.value;
    await getAvailableLanguages();
    await changeLanguage(getLanguageIdFromCode(frontendLocale));
};
await updateSessionWithLanguage();

useNotifications();

setAffiliateCode('affiliateCode');

useHead(() => ({
    htmlAttrs: {
        lang: locale.value,
    },
    link: [
        {
            rel: 'canonical',
            href: url.origin + route.path,
        },
        {
            rel: 'alternate',
            hreflang: locale.value ?? 'x-default',
            href: url.origin + route.path,
        },
    ],
}));
</script>

<template>
    <LayoutHeader />
    <UtilityToastNotifications />

    <main
        class="container mt-4 flex flex-col items-center justify-center md:mt-10"
    >
        <slot />
    </main>

    <LayoutFooter />

    <CookieBanner />
</template>

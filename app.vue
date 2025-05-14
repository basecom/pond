<script setup lang="ts">
const {changeLanguage, getLanguageIdFromCode, getAvailableLanguages} = useInternationalization();
const {locale} = useI18n();
const url = useRequestURL();
const route = useRoute();

const updateSessionWithLanguage = async () => {
    const frontendLocale = locale.value;
    await getAvailableLanguages();
    await changeLanguage(getLanguageIdFromCode(frontendLocale));
};

await updateSessionWithLanguage();

const {refreshCart} = useCart();
const {getWishlistProducts} = useWishlist();
const {refreshContext} = useCustomerStore();
const configStore = useConfigStore();
await configStore.loadConfig();
await refreshContext();

useNotifications();
useBreadcrumbs();

const wishlistEnabled = configStore.get('core.cart.wishlistEnabled') as boolean;
refreshCart();
// only load wishlist products when they are not already loaded, the wishlist is enabled in the config and we are on the client so it doesn't block SSR
if (route.path !== '/wishlist' && wishlistEnabled && import.meta.client) {
    getWishlistProducts();
}

const shopName = configStore.get('core.basicInformation.shopName') as string | null ?? 'pond';

useHead(() => ({
    title: shopName,
    htmlAttrs: {
        lang: locale.value,
    },
    link: [
        {
            rel: 'canonical',
            href: url.origin + route.path,
        },
    ],
}));
</script>

<template>
    <UiToaster/>

    <NuxtLayout/>
</template>

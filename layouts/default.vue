<script setup lang="ts">
const { changeLanguage, getLanguageIdFromCode, getAvailableLanguages } = useInternationalization();
const { locale } = useI18n();

const updateSessionWithLanguage = async () => {
    const frontendLocale = locale.value;
    await getAvailableLanguages();
    await changeLanguage(getLanguageIdFromCode(frontendLocale));
};

await updateSessionWithLanguage();

const customerStore = useCustomerStore();
const { loading } = storeToRefs(customerStore);

const configStore = useConfigStore();
await configStore.loadConfig();

const wishlistEnabled = configStore.get('core.cart.wishlistEnabled');

const { refreshCart } = useCart();
const { getWishlistProducts } = useWishlist();
const { setAffiliateCode } = useAffiliateMarketing();

useNotifications();
useBreadcrumbs();

await customerStore.refreshContext();

const navigationStore = useNavigationStore();
await navigationStore.loadNavigation('main-navigation', 2);

const route = useRoute();

if (route.path.includes('/checkout')) {
    // await cart on checkout pages
    await refreshCart();
} else {
    // when not on checkout page we can unblock the navigation earlier
    refreshCart();
}

// wishlist products should not block ssr
if (route.path !== '/wishlist' && wishlistEnabled && import.meta.client) {
    // If not on wishlist page we fetch for displaying the number of items in the header
    getWishlistProducts();
}

const shopName = configStore.get('core.basicInformation.shopName') as string|null;

setAffiliateCode('affiliateCode');

useHead({
    title: shopName ?? '',
    htmlAttrs: {
        lang: locale.value,
    },
});
</script>

<template>
    <NuxtLoadingIndicator class="!bg-brand-primary !bg-none" />
    <NuxtRouteAnnouncer />
    <UtilityLoadingSpinner v-if="loading" />

    <LayoutHeader v-show="!loading" />
    <UtilityToastNotifications />

    <main v-show="!loading" class="min-h-[calc(100Vh-140px)]">
        <LayoutBreadcrumbs />
        <NuxtPage class="mt-4 lg:mt-0" />
    </main>

    <LayoutFooter v-show="!loading" />
    <CookieBanner />
</template>

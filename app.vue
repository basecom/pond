<script setup>
const { locale } = useI18n();
const url = useRequestURL();
const route = useRoute();
const { handleError } = useHandleError();

const { refreshCart } = useCart();
const { getWishlistProducts } = useWishlist();
const { setAffiliateCode } = useAffiliateMarketing();

const customerStore = useCustomerStore();
const configStore = useConfigStore();
const navigationStore = useNavigationStore();

try {
    await Promise.all([
        customerStore.refreshContext(),
        configStore.loadConfig(),
        navigationStore.loadNavigation('main-navigation', 2),
        navigationStore.loadNavigation('footer-navigation', 1),
        navigationStore.loadNavigation('service-navigation', 1),
    ]);
} catch (error) {
    handleError(error, false);
}

if (route.path.includes('/checkout')) {
    // await cart on checkout pages
    await refreshCart();
} else {
    // when not on checkout page we can unblock the navigation earlier
    refreshCart();
}

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
useBreadcrumbs();

const shopName = configStore.get('core.basicInformation.shopName');
setAffiliateCode('affiliateCode');

useHead(() => ({
    title: shopName ?? '',
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

const ssrId = () => useId();
</script>

<template>
    <ConfigProvider :use-id="ssrId">
        <NuxtLayout />
    </ConfigProvider>
</template>

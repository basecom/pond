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

const shopName = configStore.get('core.basicInformation.shopName') as string;
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
    <NuxtLoadingIndicator class="!bg-brand-primary !bg-none" :throttle="100" />

    <ConfigProvider :use-id="ssrId">
        <NuxtLayout />
    </ConfigProvider>
</template>

<script setup>
const { locale } = useI18n();
const url = useRequestURL();
const route = useRoute();
const { handleError } = useHandleError();

try {
    const navigationStore = useNavigationStore();
    await Promise.all([
        navigationStore.loadNavigation('main-navigation', 2),
        navigationStore.loadNavigation('footer-navigation', 1),
        navigationStore.loadNavigation('service-navigation', 1),
    ]);
} catch (error) {
    handleError(error, false);
}

useCrossTabState();

useHead(() => ({
    htmlAttrs: {
        lang: locale,
    },
    link: [
        {
            rel: 'canonical',
            href: url.origin + route.path,
        },
        {
            rel: 'alternate',
            hreflang: locale ?? 'x-default',
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

<template>
    <NuxtLoadingIndicator class="!bg-brand-primary !bg-none" />
    <NuxtRouteAnnouncer />

    <LayoutHeader />
    <UtilityToastNotifications />

    <main class="min-h-[calc(100Vh-140px)]">
        <LayoutBreadcrumbs />
        <NuxtPage class="mt-4 lg:mt-0" />
    </main>

    <LayoutFooter />

    <!-- Do not wrap this in ClientOnly because the script tag needs to run in order for the GTM to load properly -->
    <CookieBanner />
</template>

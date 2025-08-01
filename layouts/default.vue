<template>
    <LayoutHeader />
    <UtilityToastNotifications />

    <main class="min-h-[calc(100Vh-140px)]">
        <NuxtPage />
    </main>

    <LayoutFooter />

    <!-- Do not wrap this in ClientOnly because the script tag needs to run in order for the GTM to load properly -->
    <CookieBanner />
</template>

<script setup lang="ts">
const { rerouteIfLoggedOut } = usePondAuthentication();
const { getStyle } = usePondStyle();

await rerouteIfLoggedOut();
const showLayoutPageLoader = inject('showLayoutPageLoader');
</script>

<template>
    <NuxtLoadingIndicator :class="getStyle('layout.loadingIndicator')" />
    <NuxtRouteAnnouncer />

    <ClientOnly>
        <UiToaster />
    </ClientOnly>

    <LayoutHeader />

    <main class="container">
        <LayoutPageLoader v-if="showLayoutPageLoader" />
        <AccountBreadcrumb />

        <div :class="getStyle('layout.account')">
            <AccountMenu />

            <div>
                <NuxtPage />
            </div>
        </div>
    </main>

    <LayoutFooter />
</template>

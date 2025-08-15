<script setup lang="ts">
const showLayoutPageLoader = inject('showLayoutPageLoader');
const { getStyle } = usePondStyle();
</script>

<template>
    <NuxtLoadingIndicator :class="getStyle('layout.loadingIndicator')" />
    <NuxtRouteAnnouncer />

    <ClientOnly>
        <UiToaster />
    </ClientOnly>

    <LayoutHeader />

    <main>
        <LayoutPageLoader v-if="showLayoutPageLoader" />
        <NuxtPage />
    </main>

    <LayoutFooter />
</template>

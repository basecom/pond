<script setup lang="ts">
const { signedIn, loading } = storeToRefs(useCustomerStore());
const { refreshContext } = useCustomerStore();
await refreshContext();
</script>

<template>
    <NuxtLoadingIndicator class="!bg-brand-primary !bg-none" />
    <NuxtRouteAnnouncer />

    <LayoutHeader />

    <main class="container">
        <AccountBreadcrumb />

        <div v-if="!loading && signedIn" class="md:mt-6 md:grid md:grid-cols-[3fr_9fr] md:gap-8">
            <AccountMenu />

            <div>
                <NuxtPage />
            </div>
        </div>

        <div v-else class="md:mt-6">
            <NuxtPage />
        </div>
    </main>
</template>

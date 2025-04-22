<script setup lang="ts">
await useAuthentication().rerouteIfLoggedIn();

const { accountBreadcrumbs } = useStaticBreadcrumbs();

useBreadcrumbs(accountBreadcrumbs({ type: 'login' }));
useAnalytics({ trackPageView: true, pageType: 'login' });
</script>

<template>
    <div class="container flex w-full flex-wrap justify-between md:w-3/5">
        <AccountLogin :redirect-after-success="true" />
    </div>
</template>

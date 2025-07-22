<script setup lang="ts">
await useAuthentication().rerouteIfLoggedOut();

const { accountBreadcrumbs } = useStaticBreadcrumbs();
useBreadcrumbs(accountBreadcrumbs({ type: 'profile' }));

useAnalytics({ trackPageView: true, pageType: 'accountProfile' });
</script>

<template>
    <LayoutBreadcrumbs />

    <Account>
        <AccountProfileContent />
    </Account>
</template>

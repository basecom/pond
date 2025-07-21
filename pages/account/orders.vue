<script setup lang="ts">
await useAuthentication().rerouteIfLoggedOut();

const { accountBreadcrumbs } = useStaticBreadcrumbs();
useBreadcrumbs(accountBreadcrumbs({ type: 'orders' }));

useAnalytics({ trackPageView: true, pageType: 'accountOrders' });
</script>

<template>
    <Account>
        <AccountOrderContent />
    </Account>
</template>

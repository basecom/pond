<script setup lang="ts">
await useAuthentication().rerouteIfLoggedOut();

const { accountBreadcrumbs } = useStaticBreadcrumbs();
useBreadcrumbs(accountBreadcrumbs({ type: 'address' }));

useAnalytics({ trackPageView: true, pageType: 'accountAddress' });
</script>

<template>
    <Account>
        <AccountAddressContent />
    </Account>
</template>

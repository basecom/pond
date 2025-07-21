<script setup lang="ts">
await useAuthentication().rerouteIfLoggedOut();

const { accountBreadcrumbs } = useStaticBreadcrumbs();
useBreadcrumbs(accountBreadcrumbs({ type: 'payment' }));

useAnalytics({ trackPageView: true, pageType: 'accountPayment' });
</script>

<template>
    <Account>
        <AccountPaymentContent />
    </Account>
</template>

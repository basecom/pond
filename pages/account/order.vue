<script setup lang="ts">
definePageMeta({
    layout: 'account',
});

const { t } = useI18n();
const configStore = useConfigStore();

const shopName = configStore.get('core.basicInformation.shopName') as string|null ?? 'pond';

useHead(() => ({
    title: `${t('account.ordersMetaTitle')  } | ${shopName}`,
}));
</script>

<template>
    <AccountPageOrder />
</template>

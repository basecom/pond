<script setup lang="ts">
const { t } = useI18n();
const configStore = useConfigStore();
await configStore.loadConfig();

const shopName = configStore.get('core.basicInformation.shopName') as string|null ?? 'pond';

useHead(() => ({
    title: `${t('account.recover.header')  } | ${shopName}`,
}));
</script>

<template>
    <AccountRecover />
</template>

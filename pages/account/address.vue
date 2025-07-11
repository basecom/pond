<script setup lang="ts">
definePageMeta({
  layout: 'account',
});

const { t } = useI18n();
const configStore = useConfigStore();

const shopName = configStore.get('core.basicInformation.shopName') as string|null ?? 'pond';

useHead(() => ({
  title: `${t('account.order')  } | ${shopName}`,
}));
</script>

<template>
  <AccountPageAddress />
</template>

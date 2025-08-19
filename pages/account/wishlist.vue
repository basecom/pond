<script setup lang="ts">
definePageMeta({
    layout: 'account',
});

const { t } = useI18n();
const configStore = useConfigStore();
const wishlistEnabled = configStore.get('core.cart.wishlistEnabled') as boolean;

if(!wishlistEnabled) {
    throw createError({ statusCode: 404, message: t('general.404ErrorPageHeader') });
}
</script>

<template>
    <AccountPageWishlist />
</template>

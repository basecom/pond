<script setup lang="ts">
const configStore = useConfigStore();
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);
const wishlistEnabled = configStore.get('core.cart.wishlistEnabled') as boolean;
const wishlistAllowed = computed(() => wishlistEnabled && signedIn.value);
</script>

<template>
    <LayoutHeaderActionsInner :wishlist-enabled="wishlistAllowed" />
</template>

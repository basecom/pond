<script setup lang="ts">
const customerStore = useCustomerStore();
const { customer } = storeToRefs(customerStore);
const { logout } = usePondAuthentication();
const configStore = useConfigStore();
const wishlistEnabled = configStore.get('core.cart.wishlistEnabled') as boolean;

const accountLinks: {name: string, link: string}[] = [
    {
        name: 'overview',
        link: '/account',
    },
    {
        name: 'profile',
        link: '/account/profile',
    },
    {
        name: 'address',
        link: '/account/address',
    },
    {
        name: 'payment',
        link: '/account/payment',
    },
    {
        name: 'order',
        link: '/account/order',
    },
];

if (wishlistEnabled) {
    accountLinks.push({
        name: 'wishlist',
        link: '/account/wishlist',
    });
}
</script>

<template>
    <AccountMenuInner :account-links="accountLinks" :customer="customer" @logout="logout" />
</template>

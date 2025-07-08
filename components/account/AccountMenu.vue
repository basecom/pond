<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast';

const { formatLink } = useInternationalization();
const customerStore = useCustomerStore();
const { customer } = storeToRefs(customerStore);
const { toast } = useToast();
const { t } = useI18n();

const accountLinks: {name: string, link: string}[] = [
    {
        name: 'account',
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
    {
        name: 'wishlist',
        link: '/account/wishlist',
    },
];

const logout = async () => {
    await navigateTo(formatLink('/'));
    await customerStore.logout();
    toast({
        title: t('account.auth.logoutSuccess'),
    });
};
</script>

<template>
    <AccountMenuInner :account-links="accountLinks" :customer="customer" @logout="logout" />
</template>

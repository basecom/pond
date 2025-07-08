<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast';

const { formatLink } = useInternationalization();
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);
const { toast } = useToast();
const { t } = useI18n();

const logout = async () => {
    await navigateTo(formatLink('/'));
    await customerStore.logout();
    toast({
        title: t('account.auth.logoutSuccess'),
    });
};
</script>

<template>
    <div class="hidden md:flex">
        <LayoutHeaderAccountInner :signed-in="signedIn" @logout="logout" />
    </div>
</template>

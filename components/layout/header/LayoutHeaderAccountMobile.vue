<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast';

const { formatLink } = useInternationalization();
const customerStore = useCustomerStore();
const { signedIn } = storeToRefs(customerStore);
const { toast } = useToast();
const { t } = useI18n();

const isOpen: Ref<boolean> = ref(false);
const isSignedIn = computed(() => signedIn.value);

const logout = async () => {
    await navigateTo(formatLink('/'));
    await customerStore.logout();
    toast({
        title: t('account.auth.logoutSuccess'),
    });
};
</script>

<template>
    <div class="flex md:hidden">
        <LayoutHeaderAccountMobileInner
            :signed-in="isSignedIn"
            :open="isOpen"
            @logout="logout"
            @click="() => isOpen = false"
            @open="(value: boolean) => isOpen = value"
        />
    </div>
</template>

<script setup lang="ts">
import type { RecoverPasswordFormData } from '~/types/vueForm/RecoverPassword';
import { useToast } from '@/components/ui/toast/use-toast';

const props = withDefaults(
    defineProps<{
      hashQuery?: string;
    }>(),
    {
        hashQuery: undefined,
    },
);

const isLoading = ref(false);
const { formatLink } = useInternationalization();
const { recoverPasswordConfirm } = usePondCustomer();
const { toast } = useToast();
const { t } = useI18n();

onMounted(() => {
    if(!props.hashQuery) {
        handleError();
    }
});

const recoverPassword = async (recoverPasswordFormData: RecoverPasswordFormData) => {
    isLoading.value = true;
    if (!props.hashQuery) {
        isLoading.value= false;
        await handleError();
        return;
    }

    const result = await recoverPasswordConfirm(props.hashQuery, recoverPasswordFormData.newPassword, recoverPasswordFormData.newPassword_confirmation);

    if (result && result === 200) {
        await navigateTo(formatLink('/account/login'));
        toast({
            title: t('account.recover.successResetHeader'),
            description: t('account.recover.successResetMessage'),
        });
    } else {
        await handleError();
    }
    isLoading.value = false;
};

const handleError = async () => {
    await navigateTo(formatLink('/account/recover'));
    toast({
        title: t('account.recover.errorMessage'),
    });
};
</script>

<template>
    <AccountPageRecoverPasswordInner
        :is-loading="isLoading"
        @recover-password="(recoverPasswordFormData: RecoverPasswordFormData) => recoverPassword(recoverPasswordFormData)"
    />
</template>

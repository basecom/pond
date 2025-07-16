<script setup lang="ts">
import type { RecoverPasswordFormData } from '~/types/vueForm/RecoverPassword';

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
const { toast } = usePondToast();
const { t } = useI18n();
const { apiClient } = useShopwareContext();

const recoverPassword = async (recoverPasswordFormData: RecoverPasswordFormData) => {
    isLoading.value = true;
    if (!props.hashQuery) {
        isLoading.value = false;
        await handleError();
        return;
    }

    try {
        const result = await apiClient.invoke(
            'recoveryPassword post /account/recovery-password-confirm',
            {
                body: {
                    hash: props.hashQuery,
                    newPassword: recoverPasswordFormData.newPassword,
                    newPasswordConfirm: recoverPasswordFormData.newPassword_confirmation,
                },
            },
        );

        if (result && result.status === 200) {
            await navigateTo(formatLink('/account/login'));
            toast({
                title: t('account.recover.successResetHeader'),
                description: t('account.recover.successResetMessage'),
            });
        }
    } catch {
        await handleError();
    } finally {
        isLoading.value = false;
    }
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

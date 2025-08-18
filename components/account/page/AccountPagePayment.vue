<script setup lang="ts">
import type { PaymentMethodDataForm } from '~/components/account/page/AccountPagePaymentInner.vue';
import { ApiClientError } from '@shopware/api-client';

const { setPaymentMethod, refreshSessionContext } = useSessionContext();
const { toast } = usePondToast();
const { t } = useI18n();

const updatePaymentMethod = async (paymentMethodForm: PaymentMethodDataForm) => {
    try {
        await setPaymentMethod({ id: paymentMethodForm.paymentId });
        await refreshSessionContext();
        toast({
            title: t('account.paymentSuccess'),
        });
    } catch (error) {
        if (error instanceof ApiClientError) {
            const errorCode = error.details?.errors?.[0]?.code ?? 'GENERAL';
            toast({
                title: t('error.message-default'),
                description: t(`error.${errorCode}`),
                variant: 'destructive',
            });
        }
    }
};
</script>

<template>
    <AccountPagePaymentInner @update-payment-method="(paymentMethodForm: PaymentMethodDataForm) => updatePaymentMethod(paymentMethodForm)" />
</template>

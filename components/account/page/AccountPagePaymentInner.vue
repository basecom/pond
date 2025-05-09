<script setup lang="ts">
import * as z from 'zod';
import { getTranslatedProperty } from '@shopware/helpers';

const emits = defineEmits<{
    'update-payment-method': [paymentMethodForm: PaymentMethodDataForm];
}>();

const { paymentMethods, getPaymentMethods } = useCheckout();
const { selectedPaymentMethod } = useSessionContext();

const schema = z.object({
    paymentId: z.string(),
});
export type PaymentMethodDataForm = z.infer<typeof schema>;

const changePaymentMethod = (paymentMethodForm: PaymentMethodDataForm) => {
    emits('update-payment-method', paymentMethodForm);
};

onMounted(async () => {
    await getPaymentMethods();
});
</script>

<template>
    <slot name="introduction">
        <h1 class="mb-4 text-xl font-bold md:mb-6 md:text-2xl">{{ $t('account.payment') }}</h1>
    </slot>

    <UiAutoForm
        class="space-y-6"
        :schema="schema"
        @submit="changePaymentMethod"
    >
        <template #paymentId="slotProps">
            <slot name="payment-id">
                <FormField v-slot="{ componentField }" v-bind="slotProps" name="paymentId">
                    <UiFormItem>
                        <UiAutoFormLabel>{{ $t('account.defaultPaymentMethod.description') }}</UiAutoFormLabel>
                        <UiRadioGroup
                            v-bind="componentField"
                            :default-value="selectedPaymentMethod?.id"
                            orientation="vertical"
                            class="gap-4"
                        >
                            <div v-for="paymentMethod in paymentMethods" :key="paymentMethod.id" class="flex items-start">
                                <UiRadioGroupItem :id="paymentMethod.id" :value="paymentMethod.id" />
                                <UiLabel :for="paymentMethod.id" class="grid gap-1 pl-3">
                                    <span class="font-bold">
                                        {{ getTranslatedProperty(paymentMethod, 'name') }}
                                    </span>

                                    <span class="text-sm">
                                        {{ getTranslatedProperty(paymentMethod, 'description') }}
                                    </span>
                                </UiLabel>
                            </div>
                        </UiRadioGroup>

                        <UiFormMessage />
                    </UiFormItem>
                </FormField>
            </slot>
        </template>

        <slot name="submit-button">
            <UiButton type="submit" class="col-span-12">
                {{ $t('general.save') }}
            </UiButton>
        </slot>
    </UiAutoForm>
</template>

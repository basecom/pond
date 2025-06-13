<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';
import type { LoginData } from './AccountLoginInner.vue';

withDefaults(
    defineProps<{
      redirectTo?: string | null;
    }>(),
    {
        redirectTo: '/',
    },
);

const isLoading = ref(false);
const errorMessage: Ref<string|undefined> = ref(undefined);

const customerStore = useCustomerStore();
const { t } = useI18n();

const register = async (registerData: LoginData) => {
    isLoading.value = true;
    errorMessage.value = undefined;

    try {
        console.log('data', registerData);
        // TODO Nochmal nachgucken: Aufbau des Formulars (Hide shippingData -> Ist dann trotzdem in registerData; Warum? Nur AccountType)
        // TODO Accepted Data Protection in Formular inkludieren mit Todo Verweis auf Ticket, damit registerData hier nicht geändert werden muss
        /**registerData = {
            ...registerData,
            acceptedDataProtection: true,
        };
        delete registerData.shippingAddress;*/
        await customerStore.register(registerData);

    } catch (error) {
        if (error instanceof ApiClientError) {
            errorMessage.value = t(`error.${ error.details.errors[0]?.code}`);
            return;
        }
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <AccountRegisterInner
        :is-loading="isLoading"
        :error-message="errorMessage"
        @register="(registerData: LoginData) => register(registerData)"
    >
        <template #headline><slot name="headline" /></template>
    </AccountRegisterInner>
</template>

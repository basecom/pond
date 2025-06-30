<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';
import type {RegisterFormData} from '~/types/vueForm/Register';

const customerStore = useCustomerStore();
const { t } = useI18n();

const isLoading = ref(false);
const errorMessage: Ref<string|undefined> = ref(undefined);

const register = async (registerData: RegisterFormData) => {
    isLoading.value = true;
    errorMessage.value = undefined;

    try {
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
        @register="(registerData: RegisterFormData) => register(registerData)"
    />
</template>

<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';
import type { RegisterFormData } from '~/types/vueForm/Register';

const customerStore = useCustomerStore();
const { t } = useI18n();
const { handleError } = usePondHandleError();
const { toast } = usePondToast();
const { getStyle } = usePondStyle();

const isLoading = ref(false);
const errorMessage: Ref<string|undefined> = ref(undefined);

const register = async (registerData: RegisterFormData) => {
    isLoading.value = true;
    errorMessage.value = undefined;

    try {
        await customerStore.register(registerData);
        toast({
            title: t('account.registerSucceeded'),
        });
    } catch (error) {
        if (error instanceof ApiClientError) {
            const firstError = error.details.errors?.[0];
            if (firstError?.code) {
                errorMessage.value = t(`error.${firstError.code}`);
            } else {
                errorMessage.value = t('error.message-default');
            }
        } else {
            handleError(`Unexpected registration error: ${error}`);
            errorMessage.value = t('error.message-default');
        }
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div :class="getStyle('account.register.page.outer')">
        <div :class="getStyle('account.register.page.inner')">
            <AccountRegisterInner
                :is-loading="isLoading"
                :error-message="errorMessage"
                @register="(registerData: RegisterFormData) => register(registerData)"
            />
        </div>
    </div>
</template>

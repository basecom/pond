<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';
import type { LoginData } from './AccountLoginInner.vue';

const props = withDefaults(
    defineProps<{
        redirectTo?: string | null;
    }>(),
    {
        redirectTo: '/account',
    },
);

const isLoading = ref(false);
const errorMessage: Ref<string|undefined> = ref(undefined);

const customerStore = useCustomerStore();
const { t } = useI18n();
const { formatLink } = useInternationalization();
const { toast } = usePondToast();

const login = async (loginData: LoginData) => {
    isLoading.value = true;
    errorMessage.value = undefined;

    try {
        await customerStore.login(loginData);
        if (props.redirectTo !== null) {
            navigateTo(formatLink(props.redirectTo));
        }

        toast({
            title: t('account.loginSucceeded'),
        });
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
    <AccountLoginInner
        :is-loading="isLoading"
        :error-message="errorMessage"
        @login="(loginData: LoginData) => login(loginData)"
    >
        <template #headline><slot name="headline" /></template>
    </AccountLoginInner>
</template>

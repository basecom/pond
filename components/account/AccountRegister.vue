<script setup lang="ts">
import { ApiClientError } from '@shopware/api-client';
import type { LoginData } from './AccountLoginInner.vue';

const props = withDefaults(
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
const { formatLink } = useInternationalization();

const register = async (registerData: LoginData) => {
  isLoading.value = true;
  errorMessage.value = undefined;

  try {
    console.log('data', registerData);

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

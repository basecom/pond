<script setup lang="ts">
import type { RecoverData } from './AccountPageRecoverInner.vue';

const isLoading = ref(false);
const showSuccessMessage = ref(false);

const customerStore = useCustomerStore();
const { getStorefrontUrl } = useInternationalization();
const { handleError } = usePondHandleError();

const recover = async (recoverData: RecoverData) => {
    isLoading.value = true;

    try {
        await customerStore.resetPassword({
            ...recoverData,
            storefrontUrl: getStorefrontUrl(),
        });
    } catch (error) {
        handleError(error);
    } finally {
        showSuccessMessage.value = true;
        isLoading.value = false;
    }
};
</script>

<template>
    <AccountRecoverInner
        :is-loading="isLoading"
        :show-success-message="showSuccessMessage"
        @recover="(recoverData: RecoverData) => recover(recoverData)"
    />
</template>

<script setup lang="ts">
import type { ChangePasswordForm } from '~/components/account/page/AccountPageProfileChangePasswordInner.vue';

withDefaults(
    defineProps<{
        isLoading?: boolean,
        resetForm?: boolean
    }>(),
    {
        isLoading: false,
        resetForm: false,
    },
);

defineEmits<{
  'update-password': [passwordForm: ChangePasswordForm];
}>();
</script>

<template>
    <AccountPageProfileChangePasswordInner :is-loading="isLoading" :reset-form="resetForm" @update-password="(passwordForm: ChangePasswordForm) => $emit('update-password', passwordForm)" />
</template>

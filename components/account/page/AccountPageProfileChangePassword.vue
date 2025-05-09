<script setup lang="ts">
import type { ChangePasswordForm } from '~/components/account/page/AccountPageProfileChangePasswordInner.vue';

withDefaults(
    defineProps<{
        isLoading?: boolean
    }>(),
    {
        isLoading: false,
    },
);

defineEmits<{
  'update-password': [passwordForm: ChangePasswordForm];
}>();
</script>

<template>
    <AccountPageProfileChangePasswordInner :is-loading="isLoading" @update-password="(passwordForm: ChangePasswordForm) => $emit('update-password', passwordForm)" />
</template>

<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ChangeMailForm } from '~/components/account/page/AccountPageProfileChangeMailInner.vue';

withDefaults(
    defineProps<{
        customer: Schemas['Customer'];
        isLoading?: boolean,
        resetForm?: boolean
    }>(),
    {
        isLoading: false,
        resetForm: false,
    },
);

defineEmits<{
  'update-mail': [mailForm: ChangeMailForm];
}>();
</script>

<template>
    <AccountPageProfileChangeMailInner
        :customer="customer"
        :is-loading="isLoading"
        :reset-form="resetForm"
        @update-mail="(mailForm: ChangeMailForm) => $emit('update-mail', mailForm)"
    />
</template>

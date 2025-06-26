<script setup lang="ts">
import type {Columns} from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      cols?: Columns;
    }>(),
    {
        cols: () => ({
            sm: 12,
            md: 3,
        }),
    },
);
</script>

<template>
    <slot name="account-type">
        <SelectElement
            name="accountType"
            :label="$t('account.customer.accountType.label')"
            :messages="{ required: $t('account.customer.accountType.errorRequired') }"
            rules="required"
            :native="false"
            :can-clear="false"
            :items="[{ value: 'private', label: $t('account.customer.accountType.private') }, { value: 'business', label: $t('account.customer.accountType.business') }]"
            default="private"
            :columns="cols"
        />
    </slot>
</template>

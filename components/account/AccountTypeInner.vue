<script setup lang="ts">
import type {Columns} from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      cols?: Columns;
      /**
       * This component can be used multiple times in a form (e.g., registration form). To ensure that the form fields
       * are unique upon submission, it is possible to specify a prefix
       */
      prefix?: string;
    }>(),
    {
        cols: () => ({
            sm: 12,
            md: 3,
        }),
        prefix: '',
    },
);
</script>

<template>
    <slot name="account-type">
        <FormSelectElement
            :id="`${prefix}accountType`"
            :name="`${prefix}accountType`"
            :label="$t('account.customer.accountType.label')"
            :messages="{ required: $t('account.customer.accountType.errorRequired') }"
            rules="required"
            :items="[{ value: 'private', label: $t('account.customer.accountType.private') }, { value: 'business', label: $t('account.customer.accountType.business') }]"
            default-value="private"
            :columns="cols"
        />
    </slot>
</template>

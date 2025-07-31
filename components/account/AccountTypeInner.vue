<script setup lang="ts">
import type { Columns } from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      columns?: Columns;
      /**
       * This component can be used multiple times in a form (e.g., registration form). To ensure that the form fields
       * are unique upon submission, it is possible to specify a prefix
       */
      prefix?: string;
    }>(),
    {
        columns: () => ({
            sm: 12,
            md: 3,
        }),
        prefix: '',
    },
);
</script>

<template>
    <slot name="account-type">
        <UiSelectElement
            :id="`${prefix}accountType`"
            :name="`${prefix}accountType`"
            :label="$t('account.personalTypeLabel')"
            :messages="{ required: $t('account.personalTypeRequired') }"
            rules="required"
            :items="[{ value: 'private', label: $t('account.personalTypePrivate') }, { value: 'business', label: $t('account.personalTypeBusiness') }]"
            default-value="private"
            :columns="columns"
        />
    </slot>
</template>

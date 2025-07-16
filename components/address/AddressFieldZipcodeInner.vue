<script setup lang="ts">
import type { Columns } from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      prefix?: string;
      columns?: Columns;
    }>(),
    {
        prefix: '',
        columns: () => ({
            sm: 12,
            md: 6,
        }),
    },
);
</script>

<template>
    <FormTextElement
        :id="`${prefix}zipcode`"
        :label="$t('address.zipCode.label')"
        :name="`${prefix}zipcode`"
        :placeholder="$t('address.zipCode.placeholder')"
        rules="required"
        :messages="{ required: $t('address.zipCode.errorRequired') }"
        :columns="columns"
    />
</template>

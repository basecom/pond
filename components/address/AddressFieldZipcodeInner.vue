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
    <UiTextElement
        :id="`${prefix}zipcode`"
        :label="$t('address.zipcodeLabel')"
        :name="`${prefix}zipcode`"
        :placeholder="$t('address.zipcodePlaceholder')"
        rules="required"
        :messages="{ required: $t('address.zipcodeRequired') }"
        :columns="columns"
    />
</template>

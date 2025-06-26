<script setup lang="ts">
import type {Columns} from '~/types/vueForm/Columns';

const props = withDefaults(
    defineProps<{
      cols?: Columns;
    }>(),
    {
        cols: undefined,
    },
);
</script>

<template>
    <AccountSalutationInner v-bind="props">
        <template #salutation>
            <slot name="salutation" />
        </template>
    </AccountSalutationInner>
</template>

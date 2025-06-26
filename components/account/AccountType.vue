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
    <AccountTypeInner v-bind="props">
        <template #account-type>
            <slot name="account-type" />
        </template>
    </AccountTypeInner>
</template>

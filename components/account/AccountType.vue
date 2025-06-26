<script setup lang="ts">
import type {Columns} from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      cols?: Columns;
    }>(),
    {
        cols: undefined,
    },
);
</script>

<template>
    <AccountTypeInner>
        <template #account-type>
            <slot name="account-type" />
        </template>
    </AccountTypeInner>
</template>

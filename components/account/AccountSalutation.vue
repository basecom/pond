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
    <AccountSalutationInner>
        <template #salutation>
            <slot name="salutation" />
        </template>
    </AccountSalutationInner>
</template>

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
    <AccountBirthdayInner>
        <template #birthday>
            <slot name="birthday" />
        </template>

        <template #birthday-day>
            <slot name="birthday-day" />
        </template>

        <template #birthday-month>
            <slot name="birthday-month" />
        </template>

        <template #birthday-year>
            <slot name="birthday-year" />
        </template>
    </AccountBirthdayInner>
</template>

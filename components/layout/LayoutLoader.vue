<script setup lang="ts">
withDefaults(
    defineProps<{
      spinnerClasses?: { [key: string]: boolean };
      isLoading?: boolean;
    }>(),
    {
        spinnerClasses: () => ({}),
        isLoading: false,
    },
);
</script>

<template>
    <LayoutLoaderInner v-bind="$props">
        <template #loading-spinner-content>
            <slot name="loading-spinner-content" />
        </template>
    </LayoutLoaderInner>
</template>

<script setup lang="ts">
withDefaults(
    defineProps<{
      id?: string;
      label?: string;
      name?: string;
      isFull?: boolean;
      isSubmit?: boolean;
      isSecondary?: boolean;
      isDisabled?: boolean;
      isLoading?: boolean;
      classes?: string;
    }>(),
    {
        id: undefined,
        label: undefined,
        name: undefined,
        isFull: false,
        isSubmit: false,
        isSecondary: false,
        isDisabled: false,
        isLoading: false,
        classes: undefined,
    },
);
</script>

<template>
    <slot name="button-element">
        <ButtonElement
            :id="id"
            :name="name"
            :full="isFull"
            :submits="isSubmit"
            :secondary="isSecondary"
            :disabled="isDisabled"
            :loading="isLoading"
            :class="classes"
        >
            {{ label }}
        </ButtonElement>
    </slot>
</template>

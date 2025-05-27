<script setup lang="ts">
const emits = defineEmits<{
  removeCartItem: [];
}>();

const removeCartItem = () => {
    emits('removeCartItem');
};
</script>
<template>
    <slot name="remove-button">
        <UiButton variant="outline" size="icon" @click="removeCartItem">
            <slot name="remove-icon">
                <Icon name="mdi-close" class="size-4" />
            </slot>
        </UiButton>
    </slot>
</template>

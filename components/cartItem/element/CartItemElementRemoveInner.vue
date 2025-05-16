<script setup lang="ts">
const emits = defineEmits<{
  removeCartItem: [];
}>();

const removeCartItem = async () => {
    emits('removeCartItem');
};
</script>
<template>
    <slot name="removeButton">
        <UiButton variant="outline" size="icon" @click="removeCartItem">
            <slot name="removeIcon">
                <Icon name="mdi-close" class="size-4" />
            </slot>
        </UiButton>
    </slot>
</template>

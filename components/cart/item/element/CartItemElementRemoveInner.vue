<script setup lang="ts">
const emits = defineEmits<{
  'remove-cart-item': [];
}>();

const { t } = useI18n();
</script>

<template>
    <slot name="remove-button">
        <UiButton
            variant="outline"
            size="icon"
            :aria-label="t('checkout.removeCartItem')" 
            @click="emits('remove-cart-item')"
        >
            <slot name="remove-icon">
                <Icon name="mdi-close" class="size-4" />
            </slot>
        </UiButton>
    </slot>
</template>

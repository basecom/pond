<script setup lang="ts">
const emits = defineEmits<{
  'remove-cart-item': [];
}>();

const { t } = useI18n();
const { getStyle } = usePondStyle();
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
                <Icon name="mdi-close" :class="getStyle('cart.cartItemRemoveIcon')" />
            </slot>
        </UiButton>
    </slot>
</template>

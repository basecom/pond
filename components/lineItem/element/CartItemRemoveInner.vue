<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'],
      isLoading?: boolean
    }>(),
    {
        cartItem: undefined,
        isLoading: false,
    },
);
const { cartItem } = toRefs(props);
const {removeItem} = useCartItem(cartItem);
const emits = defineEmits<{
  isLoading: [boolean]
}>();
const removeCartItem = async () => {
    try {
        emits('isLoading', true);
        await removeItem();
        emits('isLoading', false);
    } catch (error) {
        console.log('error');
    }
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

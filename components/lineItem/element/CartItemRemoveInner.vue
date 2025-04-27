<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem']
    }>(),
    {
        cartItem: undefined,
    },
);
const { cartItem } = toRefs(props);
const {removeItem} = useCartItem(cartItem);

const removeCartItem = async () => {
    try {
        await removeItem();
        console.log('success');
    } catch (error) {
        console.log('error');
    }
};

</script>
<template>
    <UiButton variant="outline" size="icon" @click="removeCartItem">
        <Icon name="mdi-close" class="size-4" />
    </UiButton>

</template>

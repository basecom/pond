<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import UiNumberField from '../../ui/number-field/UiNumberField.vue';
import UiNumberFieldContent from '../../ui/number-field//UiNumberFieldContent.vue';
import UiNumberFieldDecrement from '../../ui/number-field//UiNumberFieldDecrement.vue';
import UiNumberFieldInput from '../../ui/number-field/UiNumberFieldInput.vue';
import UiNumberFieldIncrement from '../../ui/number-field/UiNumberFieldIncrement.vue';

const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem']
    }>(),
    {
        cartItem: undefined,
    },
);
const {cartItem} = toRefs(props);

const {
    itemQuantity,
    changeItemQuantity,
    itemStock,
} = useCartItem(cartItem);
const {refreshCart} = useCart();

const quantity = ref();
syncRefs(itemQuantity, quantity);

const changeCartItemQuantity = async (quantityInput: number) => {
    try {
        const response = await changeItemQuantity(Number(quantityInput));
        // Refresh cart after quantity update
        await refreshCart(response);
    } catch (error) {
    }

    quantity.value = itemQuantity.value;
};

</script>
<template>
    <label class="flex font-bold">{{ $t('checkout.quantity') }} </label>
    <div class="w-1/3">
        <UiNumberField
            v-model="quantity"
            :min="1"
            :default-value="itemQuantity"
            @update:model-value="changeCartItemQuantity"
        >
            <UiNumberFieldContent>
                <UiNumberFieldDecrement />
                <UiNumberFieldInput />
                <UiNumberFieldIncrement />
            </UiNumberFieldContent>
        </UiNumberField>
    </div>
</template>

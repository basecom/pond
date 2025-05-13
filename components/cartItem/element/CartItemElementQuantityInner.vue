<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import {toast} from '../../ui/toast';
const { t } = useI18n();

const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'],
    }>(),
    {
        cartItem: undefined,
    },
);
const {cartItem} = toRefs(props);

const {
    itemQuantity,
    changeItemQuantity,
} = useCartItem(cartItem);
const {refreshCart} = useCart();

const configStore = useConfigStore();
const quantity = ref();
syncRefs(itemQuantity, quantity);
const emits = defineEmits<{
  isLoading: [boolean]
}>();

const maxQuantityConfig = configStore.get('core.cart.maxQuantity') as number;
const changeCartItemQuantity = async (quantityInput: number) => {
    try {

        emits('isLoading', true);
        const response = await changeItemQuantity(Number(quantityInput));
        await refreshCart(response);
        toast({
            description: t('checkout.success'),
        });


    } catch (error: Error) {
        toast({
            title: t('error.generalHeadline'),
            description: t(`error.${ error.details.errors[0]?.code}`),
            variant: 'destructive',
        });
    }

    emits('isLoading', false);
    quantity.value = itemQuantity.value;
};

const isDigital = (computed(() => cartItem.value?.states && cartItem.value?.states.includes('is-download') && (cartItem.value?.states.includes('is-download') || cartItem.value.payload.maxPurchase === 1)));

</script>
<template>
    <slot name="quantityLabel">
        <label class="flex font-bold">{{ $t('checkout.quantity') }}</label>
    </slot>
    <slot name="quantityContainer">
        <div class="w-1/3">
            <UiNumberField
                v-model="quantity"
                :max="cartItem.payload.maxPurchase ?? maxQuantityConfig"
                :min="cartItem.payload.minPurchase ?? 1"
                :step="cartItem.payload.purchaseSteps"
                :disabled="!cartItem.stackable || isDigital"
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
    </slot>
</template>

<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import UiNumberField from '../../ui/number-field/UiNumberField.vue';
import UiNumberFieldContent from '../../ui/number-field//UiNumberFieldContent.vue';
import UiNumberFieldDecrement from '../../ui/number-field//UiNumberFieldDecrement.vue';
import UiNumberFieldInput from '../../ui/number-field/UiNumberFieldInput.vue';
import UiNumberFieldIncrement from '../../ui/number-field/UiNumberFieldIncrement.vue';
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
const {pushError, pushSuccess} = useNotifications();
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
        await pushSuccess(t('checkout.success'));

    } catch (error: Error) {
      await pushError(t('error.generalHeadline'));
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

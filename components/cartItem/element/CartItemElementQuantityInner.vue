<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';

const {t} = useI18n();

const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'],
      itemQuantity: number,
      quantity: number,

    }>(),
    {
      cartItem: undefined,
      itemQuantity: 1,
      quantity: 1,
    },
);
const {cartItem, quantity} = toRefs(props);

const configStore = useConfigStore();
const maxQuantityConfig = configStore.get('core.cart.maxQuantity') as number;

const isDigital = (computed(() => cartItem.value?.states && cartItem.value?.states.includes('is-download') && (cartItem.value?.states.includes('is-download') || cartItem.value.payload.maxPurchase === 1)));
const emits = defineEmits<{
  changeCartItemQuantity: [quantityInput: number]
}>();
const changeCartItemQuantity = async (quantityInput: number) => {
  emits('changeCartItemQuantity', quantityInput);
};
const quantityRef = ref();
watch(quantity, () => {
  quantityRef.value = quantity.value;
});
</script>
<template>
  <slot name="quantityLabel">
    <label class="flex font-bold">{{ $t('checkout.quantity') }}</label>
  </slot>
  <slot name="quantityContainer">
    <div class="w-1/3">
      <UiNumberField
          v-model="quantityRef"
          :max="cartItem.payload.maxPurchase ?? maxQuantityConfig"
          :min="cartItem.payload.minPurchase ?? 1"
          :step="cartItem.payload.purchaseSteps"
          :disabled="!cartItem.stackable || isDigital"
          :default-value="itemQuantity"
          @update:model-value="changeCartItemQuantity"
      >
        <UiNumberFieldContent>
          <UiNumberFieldDecrement/>
          <UiNumberFieldInput/>
          <UiNumberFieldIncrement/>
        </UiNumberFieldContent>
      </UiNumberField>
    </div>
  </slot>
</template>

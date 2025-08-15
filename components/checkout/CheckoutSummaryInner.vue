<script setup lang="ts">
import type {Schemas} from "@shopware/api-client/api-types";
import type { AcceptableValue } from 'reka-ui';

withDefaults(
    defineProps<{
        cart?: Schemas['Cart'];
        shippingCost?: Schemas["CartDelivery"];
        shippingMethods?: Schemas['ShippingMethod'][];
        selectedShippingMethod?: Schemas['ShippingMethod'];
        subtotal?: number;
        totalPrice?: number;
    }>(),
    {
        cart: undefined,
        shippingCost: undefined,
        shippingMethods: undefined,
        selectedShippingMethod: undefined,
        subtotal: undefined,
        totalPrice: undefined,
    },
);

const emits = defineEmits<{
    'set-selected-shipping-method': [shippingMethodId: AcceptableValue];
    'add-selected-promotion-code': [promotionCode: string];
}>();

const { getFormattedPrice } = usePrice();

const showSelectionSelect = ref(false);
</script>

<template>
    <div class="bg-gray-100 p-4 grid gap-4">
        <div class="grid grid-cols-2 gap-4 border-b pb-2 border-b-gray-200">
            <div>Subtotal</div>
            <div class="text-right">{{getFormattedPrice(subtotal)}}</div>
        </div>


        <div v-if="shippingCost.shippingCosts" class="grid grid-cols-2 gap-x-4 border-b pb-2 border-b-gray-200">
            <div>
                Shipping

                <UiButton class="!p-0" variant="ghost" @click="showSelectionSelect = !showSelectionSelect">({{
                        selectedShippingMethod?.translated?.name || $t('checkout.noShippingMethod')
                    }})
                </UiButton>
            </div>
            <div class="text-right">{{ getFormattedPrice(shippingCost.shippingCosts?.totalPrice) }}</div>

            <template v-if="showSelectionSelect">
                <UiSelect
                    :model-value="selectedShippingMethod?.id"
                    @update:model-value="(shippingMethodId: AcceptableValue) => emits('set-selected-shipping-method', shippingMethodId)"
                >
                    <UiSelectTrigger>
                        <UiSelectValue />
                    </UiSelectTrigger>

                    <UiSelectContent>
                        <UiSelectGroup>
                            <template v-for="shippingMethod in shippingMethods" :key="shippingMethod.id">
                                    <UiSelectItem :value="shippingMethod.id">
                                        {{ shippingMethod.translated.name }}
                                    </UiSelectItem>
                            </template>
                        </UiSelectGroup>
                    </UiSelectContent>
                </UiSelect>
            </template>
        </div>

        <div class="grid grid-cols-2 gap-4">
            <div class="font-bold">Order Total</div>
            <div class="text-right font-bold">{{getFormattedPrice(totalPrice)}}</div>
        </div>
    </div>
</template>
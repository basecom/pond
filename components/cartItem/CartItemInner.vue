<script setup lang="ts">
import type {Schemas} from '@shopware/api-client/api-types';
import {Loader2} from 'lucide-vue-next';

const props = withDefaults(
    defineProps<{
      cartItem?: Schemas['LineItem'];
      cartDeliveryPosition?: Schemas['CartDeliveryPosition']
    }>(),
    {
        cartItem: undefined,
        cartDeliveryPosition: undefined,
    },
);
const { cartItem } = toRefs(props);
const isLoading = ref(false);

const isProduct = computed(() => cartItem.value?.type === 'product');
const isDiscount = computed(() => ((!cartItem.value?.good && ((cartItem.value?.price?.totalPrice ?? 0) <= 0)) || cartItem.value?.type === 'discount'));

</script>
<template>
    <slot name="wrapper">
        <div :class="isLoading ? 'pointer-events-none opacity-50':''">
            <div class="relative">
                <div v-if="isLoading" class="absolute flex size-full items-center justify-center pb-4">
                    <slot name="loadingSpinner">
                        <Loader2 class="size-12 animate-spin" />
                    </slot>
                </div>
                <div class="flex flex-wrap border-b py-4">
                    <template v-if="isProduct">
                        <slot name="productWrapper">
                            <slot name="product">
                                <CartItemElementTypeProduct
                                    :cart-item="cartItem"
                                    :cart-delivery-position="cartDeliveryPosition"
                                    @is-loading="(isLoadingEmit: boolean) => isLoading = isLoadingEmit"
                                />
                            </slot>
                            <div class="order-2 flex w-1/6 justify-end">
                                <slot name="promotionRemove">
                                    <CartItemElementRemove
                                        :cart-item="cartItem"
                                        @is-loading="(isLoadingEmit: boolean) => isLoading = isLoadingEmit"
                                    />
                                </slot>
                            </div>
                        </slot>
                    </template>
                    <template v-else-if="isDiscount">
                        <slot name="discountWrapper">
                            <slot name="discount">
                                <CartItemElementTypeDiscount :cart-item="cartItem" />
                            </slot>
                            <div class="order-2 flex w-1/6 justify-end">
                                <slot name="discountRemove">
                                    <CartItemElementRemove
                                        :cart-item="cartItem"
                                        @is-loading="(isLoadingEmit: boolean) => isLoading = isLoadingEmit"
                                    />
                                </slot>
                            </div>
                        </slot>
                    </template>
                    <template v-else>
                        <slot name="genericWrapper">
                            <slot name="generic">
                                <CartItemElementTypeProduct :cart-item="cartItem" />
                            </slot>
                            <div class="order-2 flex w-1/6 justify-end">
                                <slot name="genericRemove">
                                    <CartItemElementRemove
                                        :cart-item="cartItem"
                                        @is-loading="(isLoadingEmit: boolean) => isLoading = isLoadingEmit"
                                    />
                                </slot>
                            </div>
                        </slot>
                    </template>
                </div>
            </div>
        </div>
    </slot>

</template>

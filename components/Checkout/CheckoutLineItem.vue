<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty, getProductRoute } from '@shopware-pwa/helpers-next';

const { getLineItemRoute } = useLineItemRoute();
const { getProductCover } = useMedia();
const { pushError, pushSuccess } = useNotifications();
const { handleError } = useHandleError();
const { t } = useI18n();

const props = withDefaults(
    defineProps<{
      lineItem: Schemas['LineItem'];
      product?: Schemas['Product'];
    }>(),
    {
        product: undefined,
    },
);

const { lineItem, product } = toRefs(props);
const isLoading = ref(false);

// Shopware's typing is wrong here. The cover of a LineItem is of type "Media" and not "ProductMedia"
// eslint-disable-next-line
// @ts-ignore
const lineItemCover = getProductCover(lineItem.value.cover, 'xs');

const lineItemSeoUrl = product.value ? getProductRoute(product.value) : await getLineItemRoute(lineItem.value);

const { getFormattedPrice } = usePrice();
const { refreshCart } = useCart();
const { trackAddToCart, trackRemoveFromCart } = useAnalytics();
const {
    itemOptions,
    removeItem,
    itemTotalPrice,
    itemQuantity,
    isPromotion,
    isRemovable,
    isStackable,
    isDigital,
    changeItemQuantity,
} = useCartItem(lineItem);

const quantity = ref();
syncRefs(itemQuantity, quantity);

const updateQuantity = async (quantityInput: number | undefined) => {
    if (quantityInput === itemQuantity.value) return;

    const addedProductsNumbers = Number(quantityInput) - (itemQuantity?.value ?? 0);
    isLoading.value = true;

    try {
        await changeItemQuantity(Number(quantityInput));

        if (product.value) {
            addedProductsNumbers > 0 ? trackAddToCart(product.value, addedProductsNumbers) : trackRemoveFromCart(product.value, Math.abs(addedProductsNumbers));
        }
        // Refresh cart after quantity update
        await refreshCart();

        pushSuccess(t('checkout.lineItem.updateQuantity.successMessage', { lineItemName: lineItem.value.label }));
    } catch (error) {
        pushError(t('checkout.lineItem.updateQuantity.errorMessage', { lineItemName: lineItem.value.label }));
        handleError(error);
    }

    // Make sure that quantity is the same as it is in the response
    quantity.value = itemQuantity.value;

    isLoading.value = false;
};

const removeCartItem = async () => {
    isLoading.value = true;

    try {
        await removeItem();

        // TODO: fix tracking giving an error when removing a promotion
        if (!isPromotion && product.value) {
            trackRemoveFromCart(product.value, lineItem.value?.quantity);
        }

        pushSuccess(t('checkout.lineItem.remove.successMessage', { lineItemName: lineItem.value.label }));
    } catch (error) {
        pushError(t('checkout.lineItem.remove.errorMessage', { lineItemName: lineItem.value.label }));
        handleError(error);
    }

    isLoading.value = false;
};

// allows the user to change the quantity multiple times before firing a single request
const debounceUpdate = useDebounceFn(updateQuantity, 600);
</script>

<template>
    <div class="mr-4 size-24 shrink-0 overflow-hidden rounded-md border border-gray-medium bg-gray-light">
        <LocaleLink
            v-if="!isPromotion"
            :to="lineItemSeoUrl"
        >
            <template v-if="lineItemCover.placeholder">
                <SharedImagePlaceholder :size="'sm'" />
            </template>

            <template v-else>
                <img
                    :src="lineItemCover.url"
                    :alt="
                        lineItemCover.alt ??
                            (getTranslatedProperty(lineItem, 'label') || getTranslatedProperty(product, 'name'))
                    "
                    :title="
                        lineItemCover.title ??
                            (getTranslatedProperty(lineItem, 'label') || getTranslatedProperty(product, 'name'))
                    "
                    class="size-full object-cover object-center"
                >
            </template>
        </LocaleLink>

        <div
            v-else-if="isPromotion"
            class="flex size-full items-center justify-center"
        >
            <FormKitIcon
                icon="percent"
                :title="t('icon.percent')"
                class="block size-16 text-gray"
            />
        </div>
    </div>

    <div class="flex flex-1 flex-col">
        <div>
            <div class="flex flex-col justify-between gap-4 lg:flex-row">
                <LocaleLink
                    v-if="!isPromotion"
                    :to="lineItemSeoUrl"
                >
                    <p>
                        {{ lineItem.label }}
                    </p>
                </LocaleLink>

                <p v-else-if="isPromotion">
                    {{ lineItem.label }}
                </p>

                <span v-if="itemTotalPrice">
                    {{ getFormattedPrice(itemTotalPrice) }}
                </span>
            </div>

            <span v-if="isDigital">
                {{ $t('checkout.lineItem.digitalProduct') }}
            </span>

            <p
                v-if="itemOptions"
                class="mt-1 text-sm"
            >
                <span
                    v-for="option in itemOptions"
                    :key="option.group"
                    class="mr-2"
                >
                    {{ option.group }}: {{ option.option }}
                </span>
            </p>

            <ProductAvailability :product="lineItem" />
        </div>

        <div class="flex flex-1 items-end justify-between text-sm">
            <SharedQuantityInput
                v-if="isStackable"
                v-model="quantity"
                :min-purchase="lineItem.quantityInformation?.minPurchase"
                :max-purchase="lineItem.quantityInformation?.maxPurchase"
                :steps="lineItem.quantityInformation?.purchaseSteps"
                :initial-value="lineItem.quantity"
                :is-loading="isLoading"
                @on-update="debounceUpdate"
            />

            <button
                v-if="isRemovable"
                type="button"
                class="ml-auto bg-transparent text-brand-primary-dark"
                :class="{ 'text-gray-medium': isLoading }"
                @click="removeCartItem"
            >
                {{ $t('checkout.lineItem.remove.buttonLabel') }}
            </button>
        </div>
    </div>
</template>

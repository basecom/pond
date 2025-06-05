<script setup lang="ts">
import type { PromotionCodeForm } from '~/types/form/CheckoutForm';
import type { CartErrors } from '~/types/checkout/CartErrors';
import type { Schemas } from '@shopware/api-client/api-types';

const { addPromotionCode, consumeCartErrors, cart } = useCart();
const { pushError, pushSuccess, pushInfo } = useNotifications();
const { handleError } = useHandleError();
const { t } = useI18n();

const cartErrors = ref<CartErrors|null>(null);

const addPromotion = async (promotionCodeForm: PromotionCodeForm) => {
    if (!promotionCodeForm.promotionCode) {
        return;
    }

    try {
        const response = await addPromotionCode(promotionCodeForm.promotionCode);
        if (response.errors) {
            cartErrors.value = consumeCartErrors();
            return;
        }

        // Ignore because the code field specific for promotions is missing in the type definition of LineItem
        // eslint-disable-next-line
        // @ts-ignore
        const cartPromotion = cart.value.lineItems.find((item: Schemas['LineItem']) => item.payload?.code === promotionCodeForm.promotionCode);

        if (cartPromotion) {
            pushSuccess(t('checkout.promotion.successMessage', { promotionCode: promotionCodeForm.promotionCode }));
        } else {
            pushInfo(t('checkout.promotion.criteriaNotMet', { promotionCode: promotionCodeForm.promotionCode }), { timeout: 4000 });
        }
    } catch (error) {
        handleError(error);
        pushError(t('checkout.promotion.errorMessage'));
    }
};
</script>

<template>
    <ul
        v-if="cartErrors && cartErrors['promotion-not-found']"
        class="validation-errors text-status-danger"
    >
        <li>
            {{ cartErrors['promotion-not-found'].message }}
        </li>
    </ul>

    <FormKit
        type="form"
        :submit-label="$t('checkout.promotion.submitLabel')"
        :submit-attrs="{
            wrapperClass: 'min-w-max',
        }"
        :classes="{
            form: 'w-full flex flex-row gap-4',
        }"
        name="promotion"
        @submit="addPromotion"
    >
        <FormKit
            type="text"
            :label="$t('checkout.promotion.code.label')"
            name="promotionCode"
            required="true"
            :classes="{
                outer: 'flex-grow',
            }"
        />
    </FormKit>
</template>

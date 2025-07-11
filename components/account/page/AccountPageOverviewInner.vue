<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  customer: Schemas['Customer'];
}>();

const configStore = useConfigStore();
const showTitle = configStore.get('core.loginRegistration.showTitleField') as boolean;
const showAdditionalAddressField1 = configStore.get('core.loginRegistration.showAdditionalAddressField1') as boolean;
const showAdditionalAddressField2 = configStore.get('core.loginRegistration.showAdditionalAddressField2') as boolean;

const { getStyle } = usePondStyle();
const pageDescriptionStyles = getStyle('account.pageDescription');
const outerStyles = getStyle('account.personalData.outer');
const headlineStyles = getStyle('account.personalData.headline');
const generalOuterStyles = getStyle('account.personalData.general.outer');
const generalLabelStyles = getStyle('account.personalData.general.label');
const paymentMethodDescriptionStyles = getStyle('account.personalData.paymentMethod.description');
const formPaddingStyles = getStyle('account.personalData.formPadding');
</script>

<template>
    <slot name="introduction">
        <h1>{{ $t('account.account') }}</h1>
        <p :class="pageDescriptionStyles">{{ $t('account.overview.description') }}</p>
    </slot>

    <div :class="outerStyles">
        <!-- personal data -->
        <slot name="personal-data">
            <div>
                <slot name="personal-data-headline">
                    <h3 :class="headlineStyles">
                        {{ $t('account.overview.personalData') }}
                    </h3>
                </slot>

                <slot name="personal-data-content">
                    <div :class="generalOuterStyles">
                        <span v-if="customer.salutation" :class="generalLabelStyles">{{ $t('account.customer.salutation.label') }}</span>
                        <span>{{ customer.salutation?.displayName }}</span>

                        <template v-if="showTitle && customer.title">
                            <span :class="generalLabelStyles">{{ $t('account.customer.title.label') }}</span>
                            <span>{{ customer.title }}</span>
                        </template>

                        <span :class="generalLabelStyles">{{ $t('account.customer.name') }}</span>
                        <span>{{ customer.firstName }} {{ customer.lastName }}</span>

                        <span :class="generalLabelStyles">{{ $t('account.customer.email.label') }}</span>
                        <span>{{ customer.email }}</span>

                        <template v-if="customer.accountType === 'business'">
                            <span :class="generalLabelStyles">{{ $t('account.customer.company.label') }}</span>
                            <span>{{ customer.company }}</span>

                            <span :class="generalLabelStyles">{{ $t('account.customer.vatId.label') }}</span>
                            <span>{{ customer.vatIds?.join(', ') }}</span>
                        </template>
                    </div>
                </slot>
            </div>
        </slot>

        <!-- default payment method -->
        <slot name="payment-method">
            <div>
                <slot name="payment-method-headline">
                    <h3 :class="headlineStyles">
                        {{ $t('account.overview.defaultPaymentMethod') }}
                    </h3>
                </slot>

                <slot name="payment-method-content">
                    <b>{{ customer.defaultPaymentMethod?.translated.name }}</b>
                    <p :class="paymentMethodDescriptionStyles">
                        {{ customer.defaultPaymentMethod?.translated.description }}
                    </p>
                </slot>
            </div>
        </slot>

        <!-- default billing address -->
        <slot name="billing-address">
            <div v-if="customer.defaultBillingAddress">
                <slot name="billing-address-headline">
                    <h3 :class="headlineStyles">
                        {{ $t('account.overview.defaultBillingAddress') }}
                    </h3>
                </slot>

                <slot name="billing-address-content">
                    <div :class="formPaddingStyles">
                        <p v-if="customer.accountType === 'business' && (customer.defaultBillingAddress.company || customer.defaultBillingAddress.department)" class="font-bold">
                            {{ customer.defaultBillingAddress.company }}
                            <template v-if="customer.defaultBillingAddress.department">
                                - {{ customer.defaultBillingAddress.department }}
                            </template>
                        </p>
                        <p>{{ customer.defaultBillingAddress.firstName }} {{ customer.defaultBillingAddress.lastName }}</p>
                        <p>{{ customer.defaultBillingAddress.street }}</p>
                        <p v-if="showAdditionalAddressField1 && customer.defaultBillingAddress.additionalAddressLine1">
                            {{ customer.defaultBillingAddress.additionalAddressLine1 }}
                        </p>
                        <p v-if="showAdditionalAddressField2 && customer.defaultBillingAddress.additionalAddressLine2">
                            {{ customer.defaultBillingAddress.additionalAddressLine2 }}
                        </p>
                        <p>{{ customer.defaultBillingAddress.zipcode }} {{ customer.defaultBillingAddress.city }}</p>
                        <p>
                            <template v-if="customer.defaultBillingAddress.countryState">
                                {{ customer.defaultBillingAddress.countryState.name }},
                            </template>
                            {{ customer.defaultBillingAddress.country?.name }}
                        </p>
                    </div>
                </slot>
            </div>
        </slot>

        <!-- default shipping address -->
        <slot name="shipping-address">
            <div v-if="customer.defaultShippingAddress">
                <slot name="shipping-address-headline">
                    <h3 :class="headlineStyles">
                        {{ $t('account.overview.defaultShippingAddress') }}
                    </h3>
                </slot>

                <slot name="shipping-address-content">
                    <div :class="formPaddingStyles">
                        <template v-if="customer.defaultBillingAddressId === customer.defaultShippingAddressId">
                            <slot name="shipping-address-identical">
                                {{ $t('account.overview.addressesIdentical') }}
                            </slot>
                        </template>

                        <template v-else>
                            <slot name="shipping-address-not-identical">
                                <p v-if="customer.accountType === 'business' && (customer.defaultShippingAddress.company || customer.defaultShippingAddress.department)" class="font-bold">
                                    {{ customer.defaultShippingAddress.company }}
                                    <template v-if="customer.defaultShippingAddress.department">
                                        - {{ customer.defaultShippingAddress.department }}
                                    </template>
                                </p>
                                <p>{{ customer.defaultShippingAddress.firstName }} {{ customer.defaultShippingAddress.lastName }}</p>
                                <p>{{ customer.defaultShippingAddress.street }}</p>
                                <p v-if="showAdditionalAddressField1 && customer.defaultShippingAddress.additionalAddressLine1">
                                    {{ customer.defaultShippingAddress.additionalAddressLine1 }}
                                </p>
                                <p v-if="showAdditionalAddressField2 && customer.defaultShippingAddress.additionalAddressLine2">
                                    {{ customer.defaultShippingAddress.additionalAddressLine2 }}
                                </p>
                                <p>{{ customer.defaultShippingAddress.zipcode }} {{ customer.defaultShippingAddress.city }}</p>
                                <p>
                                    <template v-if="customer.defaultShippingAddress.countryState">
                                        {{ customer.defaultShippingAddress.countryState.name }},
                                    </template>
                                    {{ customer.defaultShippingAddress.country?.name }}
                                </p>
                            </slot>
                        </template>
                    </div>
                </slot>
            </div>
        </slot>
    </div>
</template>

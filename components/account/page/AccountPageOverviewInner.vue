<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  customer: Schemas['Customer'];
}>();

const configStore = useConfigStore();
const showTitle = configStore.get('core.loginRegistration.showTitleField') as boolean;
</script>

<template>
    <slot name="introduction">
        <h1 class="text-xl font-bold md:text-2xl">{{ $t('account.account') }}</h1>
        <p class="my-2">{{ $t('account.overview.description') }}</p>
    </slot>

    <div class="mt-8 grid gap-8 md:grid-cols-2">
        <!-- personal data -->
        <slot name="personal-data">
            <div>
                <slot name="personal-data-headline">
                    <h3 class="mb-2 border-b border-gray-100 pb-2 text-lg font-bold">
                        {{ $t('account.overview.personalData') }}
                    </h3>
                </slot>

                <slot name="personal-data-content">
                    <div class="grid grid-cols-[4fr_8fr] gap-2">
                        <span v-if="customer.salutation" class="font-semibold">{{ $t('account.customer.salutation.label') }}</span>
                        <span>{{ customer.salutation?.displayName }}</span>

                        <template v-if="showTitle && customer.title">
                            <span class="font-semibold">{{ $t('account.customer.title.label') }}</span>
                            <span>{{ customer.title }}</span>
                        </template>

                        <span class="font-semibold">{{ $t('account.customer.name') }}</span>
                        <span>{{ customer.firstName }} {{ customer.lastName }}</span>

                        <span class="font-semibold">{{ $t('account.customer.email.label') }}</span>
                        <span>{{ customer.email }}</span>

                        <template v-if="customer.accountType === 'business'">
                            <span class="font-semibold">{{ $t('account.customer.company.label') }}</span>
                            <span>{{ customer.company }}</span>

                            <span class="font-semibold">{{ $t('account.customer.vatId.label') }}</span>
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
                    <h3 class="mb-2 border-b border-gray-100 pb-2 text-lg font-bold">
                        {{ $t('account.overview.defaultPaymentMethod') }}
                    </h3>
                </slot>

                <slot name="payment-method-content">
                    <b>{{ customer.defaultPaymentMethod?.translated.name }}</b>
                    <p class="text-sm">{{ customer.defaultPaymentMethod?.translated.description }}</p>
                </slot>
            </div>
        </slot>

        <!-- default billing address -->
        <slot name="billing-address">
            <template v-if="customer.defaultBillingAddress">
              <AddressCard :headline="$t('account.overview.defaultBillingAddress')" :address="customer.defaultBillingAddress" />
            </template>
        </slot>

        <!-- default shipping address -->
        <slot name="shipping-address">
            <template v-if="customer.defaultShippingAddress">
              <AddressCard
                  :headline="$t('account.overview.defaultShippingAddress')"
                  :address="customer.defaultShippingAddress"
                  :description="customer.defaultBillingAddressId === customer.defaultShippingAddressId ? $t('account.overview.addressesIdentical') : undefined"
              />
            </template>
        </slot>
    </div>
</template>

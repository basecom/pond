<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware/helpers';

withDefaults(
    defineProps<{
      headline?: string;
      address?: Schemas['CustomerAddress'];
      description?: string;
      isDefaultShippingAddress?: boolean;
      isDefaultBillingAddress?: boolean;
    }>(),
    {
        headline: undefined,
        address: undefined,
        description: undefined,
        isDefaultShippingAddress: false,
        isDefaultBillingAddress: false,
    },
);

const { getStyle } = usePondStyle();
const configStore = useConfigStore();
const showTitle = configStore.get('core.loginRegistration.showTitleField') as boolean;
const showAdditionalAddressField1 = configStore.get('core.loginRegistration.showAdditionalAddressField1') as boolean;
const showAdditionalAddressField2 = configStore.get('core.loginRegistration.showAdditionalAddressField2') as boolean;
const showPhoneNumberField = configStore.get('core.loginRegistration.showPhoneNumberField') as boolean;
</script>

<template>
    <div>
        <slot name="address-card-headline">
            <h3 v-if="headline" :class="getStyle('account.address.subHeadline')">
                {{ headline }}
            </h3>
        </slot>

        <slot name="description">
            <template v-if="description">
                {{ description }}
            </template>
        </slot>

        <slot name="address-card-fields">
            <div v-if="address" :class="getStyle('account.address.card.outer')">
                <div
                    v-if="isDefaultShippingAddress || isDefaultBillingAddress"
                    :class="{
                        [getStyle('account.address.badges.multiple')]: isDefaultShippingAddress && isDefaultBillingAddress,
                        [getStyle('account.address.badges.one')]: isDefaultShippingAddress || isDefaultBillingAddress
                    }"
                >
                    <UiBadge v-if="isDefaultBillingAddress" variant="outline" :class="getStyle('account.address.badge')">
                        <Icon name="mdi:list-box-outline" :class="getStyle('account.address.icon')" />
                        <span :class="getStyle('account.address.text')">
                            {{ $t('account.addressesTitleDefaultBillingAddress') }}
                        </span>
                    </UiBadge>

                    <UiBadge v-if="isDefaultShippingAddress" variant="outline" :class="getStyle('account.address.badge')">
                        <Icon name="mdi:truck-outline" :class="getStyle('account.address.icon')" />
                        <span :class="getStyle('account.address.text')">
                            {{ $t('account.addressesTitleDefaultShippingAddress') }}
                        </span>
                    </UiBadge>
                </div>

                <p
                    v-if="address.company"
                    :class="getStyle('account.address.boldText')"
                >
                    {{ address.company }}
                    <template v-if="address.department">
                        - {{ address.department }}
                    </template>
                </p>
                <p v-if="address.salutationId">
                    {{ getTranslatedProperty(address.salutation, 'displayName') }}
                </p>
                <p>
                    <template v-if="showTitle">
                        {{ address.title }}
                    </template>
                    {{ address.firstName }} {{ address.lastName }}
                </p>
                <p>
                    {{ address.street }}
                </p>
                <p v-if="address.additionalAddressLine1 && showAdditionalAddressField1">
                    {{ address.additionalAddressLine1 }}
                </p>
                <p v-if="address.additionalAddressLine2 && showAdditionalAddressField2">
                    {{ address.additionalAddressLine2 }}
                </p>
                <p>
                    {{ address.zipcode }} {{ address.city }}
                </p>
                <p>
                    <template v-if="address.countryStateId">
                        {{ getTranslatedProperty(address.countryState, 'name') }},
                    </template>
                    {{ getTranslatedProperty(address.country, 'name') }}
                </p>
                <p v-if="showPhoneNumberField && address.phoneNumber">
                    {{ address.phoneNumber }}
                </p>
            </div>
        </slot>
    </div>
</template>

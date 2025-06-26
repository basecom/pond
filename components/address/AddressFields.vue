<script setup lang="ts">
import type {Columns} from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      isDetail?: boolean;
      accountTypeConditions?: string[];
      streetCols?: Columns;
      zipCols?: Columns;
      cityCols?: Columns;
      additionalAddressLine1Cols?: Columns;
      additionalAddressLine2Cols?: Columns;
      countryCols?: Columns;
      stateCols?: Columns;
      phoneNumberCols?: Columns;
    }>(),
    {
        isDetail: false,
        accountTypeConditions: undefined,
        streetCols: undefined,
        zipCols: undefined,
        cityCols: undefined,
        additionalAddressLine1Cols: undefined,
        additionalAddressLine2Cols: undefined,
        countryCols: undefined,
        stateCols: undefined,
        phoneNumberCols: undefined,
    },
);
</script>

<template>
    <AddressFieldsInner
        :is-detail="isDetail"
        :account-type-conditions="accountTypeConditions"
        :street-cols="streetCols"
        :zip-cols="zipCols"
        :city-cols="cityCols"
        :additional-address-line1-cols="additionalAddressLine1Cols"
        :additional-address-line2-cols="additionalAddressLine2Cols"
        :country-cols="countryCols"
        :state-cols="stateCols"
        :phone-number-cols="phoneNumberCols"
    >
        <template #account-customer-fields>
            <slot name="account-customer-fields" />
        </template>

        <template #address-headline>
            <slot name="address-headline" />
        </template>

        <template #street>
            <slot name="street" />
        </template>

        <template #zip-code>
            <slot name="zip-code" />
        </template>

        <template #city>
            <slot name="city" />
        </template>

        <template #additional-address-line-1>
            <slot name="additional-address-line-1" />
        </template>

        <template #additional-address-line-2>
            <slot name="additional-address-line-2" />
        </template>

        <template #country>
            <slot name="country" />
        </template>

        <template #state>
            <slot name="state" />
        </template>

        <template #phone-number>
            <slot name="phone-number" />
        </template>
    </AddressFieldsInner>
</template>

<script setup lang="ts">
import type { Columns } from '~/types/vueForm/Columns.js';

withDefaults(
    defineProps<{
        isDetail?: boolean;
        accountTypeConditions?: string[][];
        /**
         * This component can be used multiple times in a form (e.g., registration form). To ensure that the form fields
         * are unique upon submission, it is possible to specify a prefix
         */
        prefix?: string;
        headlineClasses?: string;
        headline?: string;
        streetColumns?: Columns,
        zipColumns?: Columns,
        cityColumns?: Columns,
        additionalAddressLine1Columns?: Columns,
        additionalAddressLine2Columns?: Columns,
        countryColumns?: Columns,
        stateColumns?: Columns,
        phoneNumberColumns?: Columns,
        // Columns for AccountCustomerFields
        accountTypeColumns?: Columns;
        salutationColumns?: Columns;
        titleColumns?: Columns;
        firstNameColumns?: Columns;
        lastNameColumns?: Columns;
        birthdayColumns?: Columns;
        companyColumns?: Columns;
        vatIdColumns?: Columns;
        departmentColumns?: Columns;
        emailColumns?: Columns;
        passwordColumns?: Columns,
        inModal?: boolean // when the address fields are in a modal, we open the last two dropdowns to top (for accessibility reasons)
    }>(),
    {
        isDetail: false,
        accountTypeConditions: undefined,
        prefix: '',
        headlineClasses: undefined,
        headline: undefined,
        streetColumns: () => ({
            sm: 12,
            md: 6,
        }),
        zipColumns: () => ({
            sm: 12,
            md: 3,
        }),
        cityColumns: () => ({
            sm: 12,
            md: 3,
        }),
        additionalAddressLine1Columns: () => ({
            sm: 12,
            md: 6,
        }),
        additionalAddressLine2Columns: () => ({
            sm: 12,
            md: 6,
        }),
        countryColumns: () => ({
            sm: 12,
            md: 6,
        }),
        stateColumns: () => ({
            sm: 12,
            md: 6,
        }),
        phoneNumberColumns: () => ({
            sm: 12,
            md: 6,
        }),
        accountTypeColumns: () => ({
            sm: 12,
            md: 3,
        }),
        salutationColumns: () => ({
            sm: 12,
            md: 3,
        }),
        birthdayColumns: () => ({
            sm: 1,
            md: 2,
        }),
        titleColumns: () => ({
            sm: 12,
            md: 3,
        }),
        firstNameColumns: () => ({
            sm: 12,
            md: 6,
        }),
        lastNameColumns: () => ({
            sm: 12,
            md: 6,
        }),
        companyColumns: () => ({
            sm: 12,
            md: 6,
        }),
        vatIdColumns: () => ({
            sm: 12,
            md: 6,
        }),
        departmentColumns: () => ({
            sm: 12,
            md: 6,
        }),
        emailColumns: () => ({
            sm: 12,
            md: 6,
        }),
        passwordColumns: () => ({
            sm: 12,
            md: 6,
        }),
        inModal: false,
    },
);
</script>

<template>
    <AddressFieldsInner v-bind="$props">
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

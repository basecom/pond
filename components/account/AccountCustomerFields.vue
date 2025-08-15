<script setup lang="ts">
import type { Columns } from '~/types/vueForm/Form';

withDefaults(
    defineProps<{
        // The detail view includes the fields email, password, vat id and birthday
        isDetail?: boolean;
        accountTypeConditions?: string[][];
        /**
         * This component can be used multiple times in a form (e.g., registration form). To ensure that the form fields
         * are unique upon submission, it is possible to specify a prefix
         */
        prefix?: string;
        isVatIdRequiredBySelectedCountry?: boolean;
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
    }>(),
    {
        isDetail: false,
        accountTypeConditions: undefined,
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
        prefix: '',
        isVatIdRequiredBySelectedCountry: false,
    },
);
</script>

<template>
    <AccountCustomerFieldsInner v-bind="$props">
        <template #account-type>
            <slot name="account-type" />
        </template>

        <template #salutation>
            <slot name="salutation" />
        </template>

        <template #title>
            <slot name="title" />
        </template>

        <template #first-name>
            <slot name="first-name" />
        </template>

        <template #last-name>
            <slot name="last-name" />
        </template>

        <template #birthday>
            <slot name="birthday" />
        </template>

        <template #company>
            <slot name="company" />
        </template>

        <template #department>
            <slot name="department" />
        </template>

        <template #vat-id>
            <slot name="vat-id" />
        </template>

        <template #email>
            <slot name="email" />
        </template>

        <template #email-confirm>
            <slot name="email-confirm" />
        </template>

        <template #password>
            <slot name="password" />
        </template>

        <template #password-confirm>
            <slot name="password-confirm" />
        </template>
    </AccountCustomerFieldsInner>
</template>

<script setup lang="ts">
import type {Columns} from '~/types/vueForm/Columns';

withDefaults(
    defineProps<{
      // Additional fields (such as email, password, ...) are required for the registration form. These are displayed depending on this props
      isDetail?: boolean;
      // E.g. registration form wraps the addresses in group elements. To ensure that the conditions are applied correctly (they must include all group elements), this prop is required
      accountTypeConditions?: string[];
      titleCols?: Columns;
      firstNameCols?: Columns;
      lastNameCols?: Columns;
      companyCols?: Columns;
      vatIdCols?: Columns;
      departmentCols?: Columns;
      emailCols?: Columns;
      passwordCols?: Columns;
    }>(),
    {
        isDetail: false,
        accountTypeConditions: undefined,
        titleCols: undefined,
        firstNameCols: undefined,
        lastNameCols: undefined,
        companyCols: undefined,
        vatIdCols: undefined,
        departmentCols: undefined,
        emailCols: undefined,
        passwordCols: undefined,
    },
);
</script>

<template>
    <AccountCustomerFieldsInner
        :is-detail="isDetail"
        :account-type-conditions="() => accountTypeConditions"
        :title-cols="titleCols"
        :first-name-cols="firstNameCols"
        :last-name-cols="lastNameCols"
        :company-cols="companyCols"
        :vat-id-cols="vatIdCols"
        :department-cols="departmentCols"
        :email-cols="emailCols"
        :password-cols="passwordCols"
    >
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

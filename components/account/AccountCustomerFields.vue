<script setup lang="ts">

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

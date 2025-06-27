<script setup lang="ts">

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

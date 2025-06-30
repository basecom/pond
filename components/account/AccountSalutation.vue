<template>
    <AccountSalutationInner v-bind="$props">
        <template #salutation>
            <slot name="salutation" />
        </template>
    </AccountSalutationInner>
</template>

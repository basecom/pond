<script setup lang="ts">

</script>

<template>
    <AccountTypeInner v-bind="$props">
        <template #account-type>
            <slot name="account-type" />
        </template>
    </AccountTypeInner>
</template>

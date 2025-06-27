<script setup lang="ts">

</script>

<template>
    <AccountBirthdayInner v-bind="$props">
        <template #birthday>
            <slot name="birthday" />
        </template>

        <template #birthday-day>
            <slot name="birthday-day" />
        </template>

        <template #birthday-month>
            <slot name="birthday-month" />
        </template>

        <template #birthday-year>
            <slot name="birthday-year" />
        </template>
    </AccountBirthdayInner>
</template>

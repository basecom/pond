<template>
    <FormCheckboxElementInner v-bind="$props">
        <template #checkbox-element>
            <slot name="checkbox-element" />
        </template>
    </FormCheckboxElementInner>
</template>

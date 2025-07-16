<template>
    <FormCheckboxElementInner v-bind="$props">
        <template #checkbox-element>
            <slot name="checkbox-element" />
        </template>
        <template #checkbox-element-content>
            <slot name="checkbox-element-content" />
        </template>
    </FormCheckboxElementInner>
</template>

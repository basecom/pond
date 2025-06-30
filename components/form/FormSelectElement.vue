<template>
    <FormSelectElementInner v-bind="$props">
        <template #select-element>
            <slot name="select-element" />
        </template>
    </FormSelectElementInner>
</template>

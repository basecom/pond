<template>
    <FormButtonElementInner v-bind="$props">
        <template #button-element>
            <slot name="button-element" />
        </template>
    </FormButtonElementInner>
</template>

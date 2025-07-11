<template>
    <FormTextElementInner v-bind="$props">
        <template #text-element>
            <slot name="text-element" />
        </template>
    </FormTextElementInner>
</template>

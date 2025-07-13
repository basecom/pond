<template>
    <UiNumberField
        class="w-full flex justify-between items-center"
        :default-value="0"
    >
        <UiLabel class="flex font-bold" for="numberFieldInput"> Number field input</UiLabel>
        <UiNumberFieldContent class="w-32">
            <UiNumberFieldDecrement class="cursor-pointer" />
            <UiNumberFieldInput id="numberFieldInput" />
            <UiNumberFieldIncrement  class="cursor-pointer" />
        </UiNumberFieldContent>
    </UiNumberField>
</template>

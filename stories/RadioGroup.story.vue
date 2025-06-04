<template>
    <UiRadioGroup default-value="comfortable" :orientation="'vertical'">
        <div class="flex items-center space-x-2">
            <UiRadioGroupItem id="r1" value="default" />
            <UiLabel for="r1">Default</UiLabel>
        </div>
        <div class="flex items-center space-x-2">
            <UiRadioGroupItem id="r2" value="comfortable" />
            <UiLabel for="r2">Comfortable</UiLabel>
        </div>
        <div class="flex items-center space-x-2">
            <UiRadioGroupItem id="r3" value="disabled" disabled />
            <UiLabel for="r3">disabled</UiLabel>
        </div>
    </UiRadioGroup>
</template>

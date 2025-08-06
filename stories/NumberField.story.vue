<template>
    <div class="grid gap-4">
        <div class="grid w-full max-w-sm items-center gap-1.5">
            <UiNumberField id="age" :default-value="18" :min="0">
                <UiLabel for="age">Age</UiLabel>
                <UiNumberFieldContent>
                    <UiNumberFieldDecrement />
                    <UiNumberFieldInput />
                    <UiNumberFieldIncrement />
                </UiNumberFieldContent>
            </UiNumberField>
        </div>
    </div>
</template>

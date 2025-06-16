<script setup lang="ts">
defineProps<{
  componentField: { string: string };
  defaultValue?: number | null;
}>();
</script>

<template>
    <UiFormItem>
        <slot name="label" />
        <UiSelect v-bind="componentField" :default-value="defaultValue">
            <UiFormControl>
                <UiSelectTrigger>
                    <UiSelectValue :placeholder="$t('account.customer.birthday.dayPlaceholder')" />
                </UiSelectTrigger>
            </UiFormControl>

            <UiSelectContent>
                <UiSelectGroup>
                    <UiSelectItem
                        v-for="day in 31"
                        :key="day"
                        :value="day"
                    >
                        {{ day }}
                    </UiSelectItem>
                </UiSelectGroup>
            </UiSelectContent>
        </UiSelect>
        <UiFormMessage />
    </UiFormItem>
</template>

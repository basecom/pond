<script setup lang="ts">
defineProps<{
  componentField: { string: string };
  defaultValue?: number | null;
}>();

const possibleBirthdayYears = computed(() => {
    const years = [];
    const today = new Date();
    // we can not use a foreach here
    // eslint-disable-next-line no-restricted-syntax
    for (let i = (today.getFullYear() - 120); i <= today.getFullYear(); i++) years.push(i);
    return years;
});
</script>

<template>
    <UiFormItem>
        <slot name="label" />
        <UiSelect v-bind="componentField" :default-value="defaultValue">
            <UiFormControl>
                <UiSelectTrigger>
                    <UiSelectValue :placeholder="$t('account.customer.birthday.yearPlaceholder')" />
                </UiSelectTrigger>
            </UiFormControl>

            <UiSelectContent>
                <UiSelectGroup>
                    <UiSelectItem
                        v-for="year in possibleBirthdayYears"
                        :key="year"
                        :value="year"
                    >
                        {{ year }}
                    </UiSelectItem>
                </UiSelectGroup>
            </UiSelectContent>
        </UiSelect>
    </UiFormItem>
</template>

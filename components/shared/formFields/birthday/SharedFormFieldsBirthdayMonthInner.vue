<script setup lang="ts">
const props = defineProps<{
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
          <UiSelectValue :placeholder="$t('account.customer.birthday.monthPlaceholder')" />
        </UiSelectTrigger>
      </UiFormControl>

      <UiSelectContent>
        <UiSelectGroup>
          <UiSelectItem
              v-for="month in 12"
              :key="month"
              :value="month"
          >
            {{ month }}
          </UiSelectItem>
        </UiSelectGroup>
      </UiSelectContent>
    </UiSelect>
  </UiFormItem>

</template>
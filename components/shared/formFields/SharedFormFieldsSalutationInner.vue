<script setup lang="ts">
import { getTranslatedProperty } from '@shopware/helpers';

const props = defineProps<{
  componentField: { string: string };
  defaultValue?: string | null;
}>();

const { getSalutations: salutations } = useSalutations();

const defaultSalutation = ref(props.defaultValue);

if(!defaultSalutation.value) {
  defaultSalutation.value = salutations.value[0].id;
}
</script>

<template>
  <UiFormItem>
    <slot name="label" />
    <UiSelect v-bind="componentField" :default-value="defaultSalutation">
      <UiFormControl>
        <UiSelectTrigger>
          <UiSelectValue />
        </UiSelectTrigger>
      </UiFormControl>

      <UiSelectContent>

        <UiSelectGroup>
          <UiSelectItem
              v-for="salutation in salutations"
              :key="salutation.id"
              :value="salutation.id"
          >
            {{ getTranslatedProperty(salutation, 'displayName') }}
          </UiSelectItem>
        </UiSelectGroup>
      </UiSelectContent>
    </UiSelect>
    <UiFormMessage />
  </UiFormItem>
</template>
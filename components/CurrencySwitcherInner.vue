<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui';

const { currency, setCurrency } = useSessionContext();

const { handleError } = usePondHandleError();
const { getAvailableCurrencies } = usePondSalesChannel();
console.log('context', currency);
console.log('all', await getAvailableCurrencies());
// GET /store-api/currency

</script>

<template>
 <div>
   currrency
 </div>
  <!--<UiSelect :default-value="selectedLanguage" @update:model-value="onUpdate">
    <slot name="language-switcher-trigger">
      <UiSelectTrigger>
        <UiSelectValue  />
      </UiSelectTrigger>
    </slot>

    <slot name="language-switcher-content">
      <UiSelectContent>
        <UiSelectGroup>
          <UiSelectItem
              v-for="language in languages"
              :key="language.id"
              :value="language.id"
          >
            {{ language.name }}
          </UiSelectItem>
        </UiSelectGroup>
      </UiSelectContent>
    </slot>
  </UiSelect>-->
</template>
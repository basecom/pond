<script setup lang="ts">

const { getStyle } = usePondStyle();
const configStore = useConfigStore();
const { searchTerm, search, getProducts, getTotal, loading } =
    useProductSearchSuggest();

const minSearchTermLength = configStore.get('core.search.minSearchTermLength') as boolean;

const onInput = async (value: string) => {
  if (value.length >= minSearchTermLength) {
    // set search term
    searchTerm.value = value;
    // Perform search
    await search();
    console.log(getProducts);
  }
}
</script>

<template>
  <slot name="header-search">
    <!-- ToDo: Remove clientonly -->
    <ClientOnly>
      <Vueform
          id="header-search-form"
          :display-errors="false"
          class="w-max"
          @change="(value) => onInput(value.search)"
      >
        <UiTextElement
            id="header-search-input"
            name="search"
            icon="mdi:magnify"
            :iconClasses="getStyle('header.actions.search')"
            :debounce="300"
        >
        </UiTextElement>
      </Vueform>
    </ClientOnly>
  </slot>
</template>

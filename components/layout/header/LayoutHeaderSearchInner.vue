<script setup lang="ts">

const { getStyle } = usePondStyle();
const configStore = useConfigStore();
const { searchTerm, search, getProducts, getTotal, loading } =
    useProductSearchSuggest();
const { formatLink } = useInternationalization();
import { getProductRoute } from '@shopware/helpers';

const displayTotal = ref(5);

const minSearchTermLength = configStore.get('core.search.minSearchTermLength') as boolean;

const onInput = async (value: string) => {
  if (value.length >= minSearchTermLength) {
    // Set search term
    searchTerm.value = value;
    // Perform search
    await search();
    console.log(getProducts, getTotal);
  }
}

const navigateToSearchPage = () => {
  if(searchTerm.value.length >= minSearchTermLength) {
    console.log('hier');
    navigateTo(formatLink({ path: `/search`, query: { search: searchTerm.value } }))
  }
}
</script>

<template>
  <slot name="header-search">
    <div class="relative">
      <slot name="header-search-input">
        <!-- ToDo: Remove clientonly -->
        <ClientOnly>
          <Vueform
              id="header-search-form"
              :display-errors="false"
              class="w-max"
              @change="(value) => onInput(value.search)"
              :endpoint="false"
              @submit="navigateToSearchPage()"
          >
            <UiTextElement
                id="header-search-input"
                name="search"
                icon="mdi:magnify"
                :iconClasses="getStyle('header.actions.search')"
                :debounce="300"
                @click="navigateToSearchPage()"
            >
            </UiTextElement>
          </Vueform>
        </ClientOnly>
      </slot>
      <slot name="search-result">
        <div class="absolute top-10 bg-white border p-5 flex flex-col">
          <template v-if="loading">
            <UiSkeleton class="w-full p-5" />
          </template>
          <template v-else>
            <template v-if="getTotal > 0">
              <NuxtLinkLocale
                  v-for="product in getProducts?.slice(0, displayTotal)"
                  :key="product.id"
                  :to="formatLink(getProductRoute(product))"
                  class="p-5 border-b"
              >
                {{ product.translated.name }}
              </NuxtLinkLocale>
              <!-- All results -->
              <NuxtLinkLocale
                  :to="formatLink({ path: `/search`, query: { search: searchTerm } })"
                  class="p-5"
              >
                Alle Ergebnisse
              </NuxtLinkLocale>
            </template>
            <template v-else>
              NO products found
            </template>
          </template>
        </div>
      </slot>
    </div>
  </slot>
</template>

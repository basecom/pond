<script setup lang="ts">
import { getProductRoute } from '@shopware/helpers';
import type { SearchForm } from '~/types/vueForm/Search';
import type { Vueform } from '@vueform/vueform';

const { getStyle } = usePondStyle();
const { searchTerm, search, getProducts, getTotal, loading } =
    useProductSearchSuggest();
const { formatLink } = useInternationalization();
const route = useRoute();

const displayTotal = ref(5);
const displayResultsContainer = ref(false);
const minSearchTermLength = ref(3);
/**
 * inputValue represents the current form input, so that no outdated results are displayed if a product search has already
 * been performed and the search term has then been reduced/deleted
 */
const inputValue = ref('');
const form$: Ref<null | Vueform> = ref(null);

// Watcher is needed, because form is rendered only on client due to hydration mismatches
watch(() => form$.value, () => {
  // updates form data
  form$.value?.update({
    search: route.query.search,
  });
});

const onInput = async (value: string) => {
    inputValue.value = value;
    if (value.length >= minSearchTermLength.value) {
        displayResultsContainer.value = true;
        // Set search term
        searchTerm.value = value;
        // Perform search
        await search();
        return;
    }
};

const navigateToSearchPage = () => {
    if (inputValue.value.length >= minSearchTermLength.value) {
        navigateTo(formatLink({ path: '/search', query: { search: searchTerm.value } }));
        displayResultsContainer.value = false;
    }
};
</script>

<template>
    <slot name="header-search">
        <slot name="header-search-input">
            <ClientOnly>
                <UiPopover>
                    <UiPopoverTrigger>
                        <Vueform
                            ref="form$"
                            id="header-search-form"
                            :display-errors="false"
                            :endpoint="false"
                            @change="(value: SearchForm) => onInput(value.search)"
                            @submit="navigateToSearchPage()"
                        >
                            <UiTextElement
                                id="header-search-input"
                                name="search"
                                icon="mdi:magnify"
                                :icon-classes="getStyle('header.actions.search.icon')"
                                :debounce="300"
                                autocomplete="off"
                                @on-icon-click="navigateToSearchPage()"
                            />
                        </Vueform>
                    </UiPopoverTrigger>

                    <UiPopoverContent v-if="displayResultsContainer">
                        <slot name="header-search-results">
                            <div v-if="loading" :class="getStyle('header.actions.search.skeleton.wrapper')">
                                <slot name="header-search-results-loading">
                                    <div :class="getStyle('header.actions.search.skeleton.outer')">
                                        <UiSkeleton :class="getStyle('header.actions.search.skeleton.innerSmall')" />
                                        <UiSkeleton :class="getStyle('header.actions.search.skeleton.innerBig')" />
                                        <UiSkeleton :class="getStyle('header.actions.search.skeleton.innerSmall')" />
                                    </div>
                                    <UiSkeleton :class="getStyle('header.actions.search.skeleton.line')" />
                                </slot>
                            </div>

                            <template v-else>
                                <template v-if="getTotal > 0 && inputValue.length >= minSearchTermLength">
                                    <slot name="header-search-results-product-link">
                                        <NuxtLinkLocale
                                            v-for="product in getProducts?.slice(0, displayTotal)"
                                            :key="product.id"
                                            :to="formatLink(getProductRoute(product))"
                                            :class="getStyle('header.actions.search.results.outer')"
                                            :aria-label="$t('search.viewProduct')"
                                            :aria-description="`${product.translated.name} - ${product.calculatedPrice?.totalPrice}`"
                                        >
                                            <ProductCover
                                                :is-video="product.cover?.media?.mimeType?.includes('video')"
                                                :src-path="product.cover?.media?.url"
                                                :alt-text="product.cover?.media?.translated?.alt"
                                                :title="product.cover?.media?.translated?.title"
                                                :label="product.translated.name"
                                                :product-classes="getStyle('header.actions.search.results.product')"
                                                :fallback-classes="getStyle('header.actions.search.results.fallback')"
                                                :video-classes="getStyle('header.actions.search.results.video')"
                                            />

                                            {{ product.translated.name }}

                                            <SwSharedPrice :value="product.calculatedPrice?.totalPrice" />
                                        </NuxtLinkLocale>
                                    </slot>

                                    <slot name="header-search-results-all-products-link">
                                        <NuxtLinkLocale
                                            :to="formatLink({ path: `/search`, query: { search: searchTerm } })"
                                            :class="getStyle('header.actions.search.page.outer')"
                                            :aria-label="$t('search.allResults')"
                                            :aria-description="$t('search.allResultsDescription')"
                                        >
                                            <Icon name="material-symbols:arrow-forward-ios-rounded" :class="getStyle('header.actions.search.page.inner')" />

                                            {{ $t('search.allResults') }}
                                        </NuxtLinkLocale>
                                    </slot>
                                </template>
                                <template v-else>
                                    <slot name="header-search-results-no-products">
                                        {{ $t('search.noResult') }}
                                    </slot>
                                </template>
                            </template>
                        </slot>
                    </UiPopoverContent>
                </UiPopover>
            </ClientOnly>
        </slot>
    </slot>
</template>

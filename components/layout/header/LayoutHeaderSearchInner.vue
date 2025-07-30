<script setup lang="ts">
import { getProductRoute } from '@shopware/helpers';
import type { SearchForm } from '~/types/vueForm/Search';

const { getStyle } = usePondStyle();
const { searchTerm, search, getProducts, getTotal, loading } =
    useProductSearchSuggest();
const { formatLink } = useInternationalization();

const displayTotal = ref(5);
const displayResultsContainer = ref(false);
const minSearchTermLength = ref(3);

const onInput = async (value: string) => {
    if (value.length >= minSearchTermLength.value) {
        displayResultsContainer.value = true;
        // Set search term
        searchTerm.value = value;
        // Perform search
        await search();
        return;
    }

    displayResultsContainer.value = false;
};

const navigateToSearchPage = () => {
    if (searchTerm.value.length >= minSearchTermLength.value) {
        navigateTo(formatLink({ path: '/search', query: { search: searchTerm.value } }));
        displayResultsContainer.value = false;
    }
};
</script>

<template>
    <slot name="header-search">
        <slot name="header-search-input">
            <UiPopover>
                <UiPopoverTrigger>
                    <ClientOnly>
                        <Vueform
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
                                @click="navigateToSearchPage()"
                            />
                        </Vueform>
                    </ClientOnly>
                </UiPopoverTrigger>
                <UiPopoverContent v-if="displayResultsContainer">
                    <slot name="header-search-results">
                        <div v-if="loading" :class="getStyle('header.actions.search.skeleton.wrapper')">
                            <div :class="getStyle('header.actions.search.skeleton.outer')">
                                <UiSkeleton :class="getStyle('header.actions.search.skeleton.innerSmall')" />
                                <UiSkeleton :class="getStyle('header.actions.search.skeleton.innerBig')" />
                                <UiSkeleton :class="getStyle('header.actions.search.skeleton.innerSmall')" />
                            </div>
                            <UiSkeleton :class="getStyle('header.actions.search.skeleton.line')" />
                        </div>

                        <template v-else>
                            <template v-if="getTotal > 0">
                                <NuxtLinkLocale
                                    v-for="product in getProducts?.slice(0, displayTotal)"
                                    :key="product.id"
                                    :to="formatLink(getProductRoute(product))"
                                    :class="getStyle('header.actions.search.results.wrapper')"
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

                                <NuxtLinkLocale
                                    :to="formatLink({ path: `/search`, query: { search: searchTerm } })"
                                    :class="getStyle('header.actions.search.page.wrapper')"
                                >
                                    <Icon name="material-symbols:arrow-forward-ios-rounded" :class="getStyle('header.actions.search.page.inner')" />

                                    {{ $t('search.allResults') }}
                                </NuxtLinkLocale>
                            </template>
                            <template v-else>
                                {{ $t('search.noResult') }}
                            </template>
                        </template>
                    </slot>
                </UiPopoverContent>
            </UiPopover>
        </slot>
    </slot>
</template>

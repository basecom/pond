<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { ListingFilter } from '~/types/listing/Filter';
import type { ChangePriceFilter, ChangePropertyFilter } from '~/types/listing/FilterEvents';
import { useListingStore } from '~/stores/ListingStore';

const props = withDefaults(
    defineProps<{
        filters: ListingFilter[];
        selectedFilters: Schemas['ProductListingResult']['currentFilters']|null;
        showResetButton?: boolean;
        productListingStoreKey?: string;
    }>(),
    {
        productListingStoreKey: 'category',
    },
);

defineEmits<{
    'filter-changed': [event: ChangePriceFilter | ChangePropertyFilter];
}>();

const { componentsMappingOffcanvas } = useListingFiltersMapping();
const { isPropertyFilter } = useCheckType();
const { t } = useI18n();

const sideMenuController = useModal();
const displayedFilter: Ref<ListingFilter|null> = ref(null);

const name = computed(() => {
    if (!displayedFilter.value) {
        return null;
    }

    if (isPropertyFilter(displayedFilter.value)) {
        return displayedFilter.value.name;
    }

    return t(`listing.sidebar.filter.${displayedFilter.value.code}.title`);
});

const { listingState } = storeToRefs(useListingStore(props.productListingStoreKey));
</script>

<template>
    <FormKit
        type="button"
        :classes="{
            input: 'items-center',
        }"
        :title="t('icon.totalFilter')"
        @click="sideMenuController.open()"
    >
        <span>
            {{ $t('listing.sidebar.title') }}
        </span>

        <UtilityPill :number="listingState.filters.appliedTotal" />

        <FormKitIcon
            icon="filter"
            class="size-6"
        />
    </FormKit>

    <LayoutSidebar
        v-if="sideMenuController.isOpen"
        :controller="sideMenuController"
        side="bottom"
    >
        <template #header>
            <span v-if="!displayedFilter">
                {{ $t('listing.sidebar.title') }}
            </span>

            <button
                v-else
                class="flex items-center gap-2"
                :title="t('icon.leftArrow')"
                @click="displayedFilter = null"
            >
                <FormKitIcon
                    icon="chevron-left"
                    class="block size-4"
                />
                {{ name }}
            </button>
        </template>

        <template #content>
            <div class="size-full overflow-hidden">
                <div
                    class="flex size-full flex-row transition-transform duration-300"
                    :class="{
                        '-translate-x-full': displayedFilter,
                    }"
                >
                    <div class="flex size-full shrink-0 flex-col">
                        <template
                            v-for="filter in props.filters"
                            :key="filter.code"
                        >
                            <ProductListingOffcanvasFilterItem
                                v-if="componentsMappingOffcanvas[filter.code]"
                                :filter="filter"
                                :selected-filters="selectedFilters"
                                :product-listing-store-key="productListingStoreKey"
                                @click="displayedFilter = filter"
                            />
                        </template>
                    </div>

                    <div class="flex size-full shrink-0 flex-col">
                        <template v-if="displayedFilter?.code">
                            <component
                                :is="componentsMappingOffcanvas[displayedFilter?.code]"
                                :filter="displayedFilter"
                                :selected-values="props.selectedFilters"
                                :product-listing-store-key="productListingStoreKey"
                                @filter-changed="$emit('filter-changed', $event)"
                            />
                        </template>
                    </div>
                </div>
            </div>
        </template>
    </LayoutSidebar>
</template>

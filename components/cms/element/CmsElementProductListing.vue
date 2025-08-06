<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/public/cms/elements/CmsElementProductListing.vue
import type { CmsElementProductListing } from '@shopware/composables';
import { defu } from 'defu';
import { useRoute, useRouter } from 'vue-router';
import { useCategoryListing } from '#imports';
import type { Schemas, operations } from '@shopware/api-client/api-types';
import type { cssClasses, layoutStyles } from '~/types/cms';

const props = withDefaults(defineProps<{
    content: CmsElementProductListing;
    // Added optional props, as these are passed by the CmsGenericElement and otherwise lead to vue warnings in the console
    class?: cssClasses,
    style?: layoutStyles
}>(),
{
    class: null,
    style: undefined,
},
);

// Added showSorting-config
const data: Ref<boolean> | undefined = inject('showSorting');
if (data) {
    data.value = props.content.config.showSorting?.value ?? true;
}

// Changed: use snippets instead of provided translations
const defaultLimit = 15;
const defaultPage = 1;
const defaultOrder = 'name-asc';
const productListElement = useTemplateRef('productListElement');
// Changed: Use pond style config
const { getStyle } = usePondStyle();

const {
    changeCurrentPage,
    getCurrentPage,
    getElements,
    getTotalPagesCount,
    loading,
    setInitialListing,
} = useCategoryListing();
const route = useRoute();
const router = useRouter();
const limit = ref(
    route.query.limit
        ? Number(route.query.limit)
        : props.content?.data?.listing?.limit
            ? Number(props.content?.data?.listing?.limit)
            : defaultLimit,
);

// Corrected defu usage
const initalRoute = defu({}, route);

const isLoading = ref(true);

onMounted(() => {
    isLoading.value = loading.value;
});

watch(
    () => route,
    (newRoute) => {
        if (initalRoute.path !== newRoute.path) {
            return;
        }
        if (Object.keys(newRoute.query).length > 0) {
            return;
        }
        // this fires to reset the page when query are removed/empty on client side navigation for the same page (without hard reload)
        changeCurrentPage(defaultPage, {
            limit: defaultLimit,
            p: defaultPage,
            order: defaultOrder,
        } as unknown as operations['searchPage post /search']['body']);
    },
    { deep: true },
);

const changePage = async (page: number) => {
    await router.push({
        query: {
            ...route.query,
            p: page,
            limit: limit.value,
        },
    });
    await changeCurrentPage(
        page,
        route.query as unknown as operations['searchPage post /search']['body'],
    );
    productListElement.value?.scrollIntoView({ behavior: 'smooth' });
};

const changeLimit = async (limit: Event) => {
    const select = limit.target as HTMLSelectElement;

    await router.push({
        query: {
            ...route.query,
            limit: select.value,
            p: defaultPage,
        },
    });
    await changeCurrentPage(
        defaultPage,
        route.query as unknown as operations['searchPage post /search']['body'],
    );
    productListElement.value?.scrollIntoView({ behavior: 'smooth' });
};

// This is a workaround because vercel caching with the nuxt preset does not support query params at the moment
// @see https://github.com/shopware/frontends/issues/687#issuecomment-1988392091
const compareRouteQueryWithInitialListing = async () => {
    const limitListing = props?.content?.data?.listing.limit ?? defaultLimit;
    const pageListing = props?.content?.data?.listing.page ?? defaultPage;
    const orderListing = props?.content?.data?.listing.sorting ?? defaultOrder;

    const isChangePageNeeded =
        (route.query.limit && limit.value !== limitListing) ||
        (route.query.p && Number(route.query.p) !== pageListing) ||
        (route.query.order && route.query.order !== orderListing);

    if (isChangePageNeeded) {
        const limitQuery = route.query.limit
            ? Number(route.query.limit)
            : defaultLimit;
        const pageQuery = route.query.p ? Number(route.query.p) : defaultPage;
        const orderQuery = route.query.order
            ? (route.query.order as string)
            : defaultOrder;
        const newQuery = {
            limit: limitQuery,
            p: pageQuery,
            order: orderQuery,
        };
        console.warn(
            'The current route does not match the initial listing. Changing the route to match the initial listing.',
        );
        limit.value = limitQuery;
        await changeCurrentPage(
            pageQuery,
            newQuery as unknown as operations['searchPage post /search']['body'],
        );
    }
};

setInitialListing(
    props?.content?.data?.listing as Schemas['ProductListingResult'],
);

onMounted(async () => {
    // Call compareRouteQueryWithInitialListing within onMounted
    await compareRouteQueryWithInitialListing();
});
</script>

<template>
    <!-- changed: product card component, grid, translations, no products message -->
    <div v-if="!loading && getElements.length === 0">
        {{ $t('listing.noProducts') }}
    </div>
    <div
        v-if="!loading && getElements.length > 0"
        ref="productListElement"
        :class="getStyle('listing.outer')"
    >
        <ProductCard
            v-for="product in getElements"
            :key="product.id"
            :product="product"
            :layout-type="content.config.boxLayout.value"
        />
    </div>
    <div
        v-if="loading"
        data-testid="loading"
        :class="getStyle('listing.loading.outer')"
    >
        <UiSkeleton
            v-for="index in limit"
            :key="index"
            :class="getStyle('listing.loading.inner')"
        />
    </div>
    <div
        :class="getStyle('listing.pagination.outer')"
    >
        <div :class="getStyle('listing.pagination.inner')">
            <SwPagination
                :total="getTotalPagesCount"
                :current="Number(getCurrentPage)"
                @change-page="changePage"
            />
        </div>
        <div :class="getStyle('listing.pagination.page.outer')">
            <div
                :class="getStyle('listing.pagination.page.inner')"
                data-testid="listing-pagination-limit-box"
            >
                <label
                    for="limit"
                    :class="getStyle('listing.pagination.page.limit.label')"
                    data-testid="listing-pagination-limit-label"
                >{{ $t('listing.perPage') }}</label>
                <select
                    id="limit"
                    v-model="limit"
                    name="limitchoices"
                    :class="getStyle('listing.pagination.page.limit.select')"
                    data-testid="listing-pagination-limit-select"
                    @change="changeLimit"
                >
                    <option :value="1">1 {{ $t('listing.product', { count: 1 }) }}</option>
                    <option :value="15">
                        15 {{ $t('listing.product', { count: 2 }) }}
                    </option>
                    <option :value="30">
                        30 {{ $t('listing.product', { count: 2 }) }}
                    </option>
                    <option :value="45">
                        45 {{ $t('listing.product', { count: 2 }) }}
                    </option>
                </select>
                <div
                    :class="getStyle('listing.pagination.page.svg.outer')"
                >
                    <svg
                        :class="getStyle('listing.pagination.page.svg.inner')"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                        />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

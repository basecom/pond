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
// change: use i18n's t function instead of provided translations
const defaultLimit = 15;
const defaultPage = 1;
const defaultOrder = 'name-asc';
const productListElement = useTemplateRef('productListElement');

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
console.log(initalRoute);

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
        class="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-8 productListElement"
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
        class="flex justify-center flex-wrap p-4 md:p-6 lg:p-8"
    >
        <UiSkeleton
            v-for="index in limit"
            :key="index"
            class="w-full mb-8 sm:w-3/7 lg:w-2/7 2xl:w-7/24 mr-0 sm:mr-8 mb-8"
        />
    </div>
    <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 p-4 md:p-6 lg:p-8"
    >
        <div class="text-center place-self-center">
            <SwPagination
                :total="getTotalPagesCount"
                :current="Number(getCurrentPage)"
                @change-page="changePage"
            />
        </div>
        <div class="text-center place-self-center mt-2 lg:mt-0">
            <div
                class="inline-block align-top text-center md:text-left"
                data-testid="listing-pagination-limit-box"
            >
                <label
                    for="limit"
                    class="inline mr-4"
                    data-testid="listing-pagination-limit-label"
                >{{ $t('listing.perPage') }}</label>
                <select
                    id="limit"
                    v-model="limit"
                    name="limitchoices"
                    class="inline appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
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
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                >
                    <svg
                        class="fill-current h-4 w-4"
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

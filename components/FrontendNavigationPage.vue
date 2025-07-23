<script setup lang="ts">
const props = defineProps<{
    navigationId: string;
}>();

const { search } = useCategorySearch();
const { apiClient } = useShopwareContext();

const route = useRoute();
const { t } = useI18n();

const { data } = await useAsyncData(
    `navigation-${props.navigationId}`,
    async () => {
        const responses = await Promise.allSettled([
            search(props.navigationId, {
                withCmsAssociations: true,
                query: {
                    ...route.query,
                },
            }),

            apiClient.invoke('readBreadcrumb get /breadcrumb/{id}', {
                pathParams: {
                    id: props.navigationId,
                },
            }),
        ]);

        return {
            categoryResponse:
                responses[0].status === 'fulfilled' ? responses[0].value : null,
            breadcrumbs:
                responses[1].status === 'fulfilled' ? responses[1].value : null,
        };
    },
);

const categoryResponse = data.value?.categoryResponse;
if (!categoryResponse) {
    throw createError({ statusCode: 404, message: t('error.404.detail') });
}
const { category } = useCategory(categoryResponse);
createCategoryListingContext();

const { buildDynamicBreadcrumbs } = useBreadcrumbs();
if (data.value?.breadcrumbs) {
    buildDynamicBreadcrumbs(data.value.breadcrumbs.data);
}

useAnalytics({ trackPageView: true, pageType: 'navigation' });
</script>

<template>
    <LayoutBreadcrumbs />

    <CmsPage
        v-if="category?.cmsPage"
        :cms-page="category.cmsPage"
    />
</template>

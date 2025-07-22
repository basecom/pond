<script setup lang="ts">
import { getProductName } from '@shopware/helpers';
const { t } = useI18n();

const props = defineProps<{
    navigationId: string;
}>();

const { search } = useProductSearch();
const { apiClient } = useShopwareContext();

const { data } = await useAsyncData(
    `pdp-${props.navigationId}`,
    async () => {
        const responses = await Promise.allSettled([
            search(props.navigationId, {
                withCmsAssociations: true,
                criteria: {
                    associations: {
                        canonicalProduct: {},
                        options: {},
                        properties: {
                            associations: {
                                group: {},
                            },
                        },
                        manufacturer: {},
                        seoUrls: {},
                    },
                },
            }),

            apiClient.invoke('readBreadcrumb get /breadcrumb/{id}', {
                pathParams: {
                    id: props.navigationId,
                },
            }),
        ]);

        return {
            productResponse:
                responses[0].status === 'fulfilled' ? responses[0].value : null,
            breadcrumbs:
                responses[1].status === 'fulfilled' ? responses[1].value : null,
        };
    },
);

const productResponse = data.value?.productResponse;
if (!productResponse) {
    throw createError({ statusCode: 404, message: t('error.404.detail') });
}
const { product } = useProduct(productResponse.product, productResponse.configurator);

const { buildDynamicBreadcrumbs, pushBreadcrumb } = useBreadcrumbs();
if (data.value?.breadcrumbs) {
    buildDynamicBreadcrumbs(data.value.breadcrumbs.data);
}
pushBreadcrumb({
    name: getProductName({ product: productResponse.product }) ?? '',
    path: `/${productResponse.product.seoUrls?.[0]?.seoPathInfo}`,
});

useAnalytics({ pageType: 'pdp', trackPageView: true });
</script>

<template>
    <LayoutBreadcrumbs />

    <CmsPage
        v-if="product?.cmsPage"
        :cms-page="product.cmsPage"
    />
</template>

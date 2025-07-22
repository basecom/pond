<script setup lang="ts">
import { getCmsBreadcrumbs } from '@shopware/helpers';

const props = defineProps<{
    navigationId: string;
}>();

const { search } = useLandingSearch();
const { t } = useI18n();

const { data: landingResponse } = await useAsyncData(
    `landing${props.navigationId}`,
    async () =>
        await search(props.navigationId, {
            withCmsAssociations: true,
        }),
);

if (!landingResponse.value) {
    throw createError({ statusCode: 404, message: t('error.404.detail') });
}

const breadcrumbs = getCmsBreadcrumbs(landingResponse.value);
useBreadcrumbs(breadcrumbs);

useAnalytics({ trackPageView: true, pageType: 'landingpage' });
</script>

<template>
    <LayoutBreadcrumbs />

    <CmsPage
        v-if="landingResponse?.cmsPage"
        :cms-page="landingResponse.cmsPage"
    />
</template>

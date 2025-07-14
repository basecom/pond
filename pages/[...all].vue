<script setup lang="ts">
import { pascalCase } from 'scule';
import { ApiClientError } from '@shopware/api-client';

const { clearBreadcrumbs } = useBreadcrumbs();

const { resolvePath } = useNavigationSearch();
const route = useRoute();
const { t } = useI18n();

/**
 * Replace the locale value from the route path
 * but only if the locale is not the default locale
 * and only the first /${locale} will be replaced
 */
const { $i18n } = useNuxtApp();
const { locale } = useI18n();
const defaultLocale = $i18n.defaultLocale;
const routePath =
    locale.value !== defaultLocale
        ? route.path.replace(/^\/[^/]+/, '')
        : route.path;

const { data: seoResult } = await useAsyncData(`seoPath${routePath}`, async () => {
    try {
        // if the history state contains seo url information, we can omit the api call
        if (import.meta.client && history.state?.routeName) {
            return {
                routeName: history.state?.routeName,
                foreignKey: history.state?.foreignKey,
            };
        }

        const result = await resolvePath(routePath);

        if (!result?.routeName) {
            throw createError({
                statusCode: 404,
                message: t('error.404.detail'),
            });
        }

        return result;
    } catch (error) {
        if (error instanceof Error || typeof error === 'string') {
            return showError(error);
        }

        if (error instanceof ApiClientError) {
            return showError(error.details);
        }
    }
});

const { routeName, foreignKey } = useNavigationContext(seoResult);
const { componentExists } = useCmsUtils();

const componentName = computed(() => pascalCase(routeName.value));
const componentExistsWithName = computed(() => componentExists(componentName.value));

onBeforeRouteLeave(() => {
    clearBreadcrumbs();
});
</script>

<template>
    <component
        :is="componentName"
        v-if="componentExistsWithName"
        :navigation-id="foreignKey"
    />
</template>

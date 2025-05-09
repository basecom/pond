import { getCategoryBreadcrumbs } from '@shopware-pwa/helpers-next';
import type { Schemas } from '@shopware/api-client/api-types';

export function useCategoryBreadcrumbs() {
    const { apiClient } = useShopwareContext();
    const runtimeConfig = useRuntimeConfig();

    const _loadCategoryBreadcrumbsFromApi = async (categoryId: string): Promise<Breadcrumb[]> => {
        const response = await apiClient.invoke('readBreadcrumb get /breadcrumb/{id}', {
            pathParams: {
                id: categoryId,
            },
            query: {
                type: 'category',
            },
        });

        return response.data.breadcrumbs;
    };

    const _mapBreadcrumbsFromApi = (breadcrumbs: Breadcrumb[]): Breadcrumb[] => breadcrumbs.map(breadcrumb => ({
        ...breadcrumb,
        path: `/${breadcrumb.path}`,
    }));

    const getBreadcrumbs = async (category: Schemas['Category'], startIndex = 1): Promise<Breadcrumb[]> => {
        if (!runtimeConfig.public.pond.breadcrumb.enableDynamicLoading) {
            return getCategoryBreadcrumbs(category, {
                startIndex,
            });
        }

        try {
            const breadcrumbs = await _loadCategoryBreadcrumbsFromApi(category.id);

            return _mapBreadcrumbsFromApi(breadcrumbs);
        } catch (e) {
            return getCategoryBreadcrumbs(category, {
                startIndex,
            });
        }
    };

    return {
        getBreadcrumbs,
    };
}

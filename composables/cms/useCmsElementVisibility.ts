import type { Schemas } from '@shopware/api-client/api-types';
import type { CmsPageConfig } from '~/types/cms/cmsVisibility';

/**
 * On server:
 * It adds the element to the page config.
 * It adds the data attributes that will be used on client to get the SSR html.
 * It hides an element if a previous element has a lazy load configuration.
 *
 * On client:
 * It takes the HTML from the SSR, and it watches for lazy load configuration.
 * Once all the lazy load configurations are loaded for a particular element, the element is marked as loaded.
 * If an element has no lazy load configurations, it is loaded immediately.
 *
 * @param pageConfig
 */
export function useCmsElementVisibility(pageConfig: Ref<CmsPageConfig | null>) {
    const runtimeConfig = useRuntimeConfig();
    const { visibleElements, setCmsElement, getCmsElementById } = useCmsVisibilityConfig(pageConfig);
    const ssrCmsElementId = ref<string | null>(null);
    const { watchCsrElementsLoaded } = useCmsLazyLoad(pageConfig);

    const isProgressiveLoadingEnabled = runtimeConfig.public.pond.cms.enableProgressiveLoading;

    const getSsrElementAttributes = () => {
        if (!isProgressiveLoadingEnabled || import.meta.client || !ssrCmsElementId.value) {
            return;
        }

        const style = visibleElements.value.includes(ssrCmsElementId.value) ? '' : 'display: none;';

        return {
            'data-cms-element-id': ssrCmsElementId.value,
            style,
        };
    };

    const setSsrCmsElement = (cmsElement: Schemas['CmsSlot']) => {
        if (!isProgressiveLoadingEnabled || import.meta.client) {
            return;
        }

        ssrCmsElementId.value = cmsElement.id!;
        setCmsElement(cmsElement);
    };

    const showCsrCmsElement = (cmsElementId: string) => {
        if (import.meta.server) {
            return;
        }

        const element = document.querySelector<HTMLElement>(`[data-cms-element-id="${cmsElementId}"]`);

        if (!element) {
            return;
        }

        element.style.display = 'block';
    };

    const watchCsrElementVisibility = (cmsElementId: string, callback: () => void) => {
        if (!isProgressiveLoadingEnabled || import.meta.server) {
            return;
        }

        const element = document.querySelector<HTMLElement>(`[data-cms-element-id="${cmsElementId}"]`);
        const elementConfig = getCmsElementById(cmsElementId);

        if (!element || !elementConfig) {
            return;
        }

        if (!elementConfig.lazyLoad.length) {
            callback();
        }

        const loadedElements = [];

        elementConfig.lazyLoad.forEach(item => {
            watchCsrElementsLoaded(cmsElementId, item.id, () => {
                loadedElements.push(item.id);

                if (loadedElements.length === elementConfig.lazyLoad.length) {
                    elementConfig.loaded = true;
                    callback();
                }
            });
        });
    };

    return {
        setSsrCmsElement,
        getSsrElementAttributes,
        watchCsrElementVisibility,
        showCsrCmsElement,
    };
}

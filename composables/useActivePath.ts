import { useRoute } from 'vue-router';
import type { Schemas } from '@shopware/api-client/api-types';

export const useActivePath = () => {
    // useRoute needs to be called here and not inside the function to prevent loss of context when calling the function outside the initial rendering process
    const route = useRoute();

    const isActive = (path: Schemas['SeoUrl'][] | undefined, onlyExactMatch: boolean = false) => {
        if (!path) return false;

        const formattedPath = `/${path[0]?.seoPathInfo}`;
        const currentPath = route.path;

        return onlyExactMatch ? formattedPath === currentPath : currentPath.includes(formattedPath);
    };

    return { isActive };
};

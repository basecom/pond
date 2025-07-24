import type { Schemas } from '@shopware/api-client/api-types';

interface NavigationState {
    [salesChannelId: string]: {
        [type: string]: {
            [depth: number]: Schemas['NavigationRouteResponse'] | null;
        }
    }
}

export const useNavigationStore = defineStore('navigation', () => {
    const navigation = ref<NavigationState>({});

    function setNavigation(salesChannelId: string, type: string, depth: number, data: Schemas['NavigationRouteResponse']) {
        if (!navigation.value[salesChannelId]) {
            navigation.value[salesChannelId] = {};
        }

        if (!navigation.value[salesChannelId][type]) {
            navigation.value[salesChannelId][type] = {};
        }

        navigation.value[salesChannelId][type][depth] = data;
    }

    function getNavigation(salesChannelId: string, type: string, depth: number): Schemas['NavigationRouteResponse'] | null {
        const salesChannel = navigation.value[salesChannelId];
        // no data for this sales channel at all
        if (!salesChannel) return null;

        // no data stored matching the requested navigation type
        if (!salesChannel[type]) return null;

        // direct match found
        if (salesChannel[type]?.[depth]) {
            return salesChannel[type]?.[depth];
        }

        // find all available depths, sort them from deepest to shallowest
        const availableDepths = Object.keys(salesChannel[type]).map(Number).sort((a, b) => b - a);
        // find data that has a depth greater than or equal to what's requested
        const sufficientDepth = availableDepths.find(existingDepth => existingDepth >= depth);

        return sufficientDepth !== undefined
            ? salesChannel[type][sufficientDepth] as Schemas['NavigationRouteResponse']
            : null;
    }

    return {
        setNavigation,
        getNavigation,
    };
});

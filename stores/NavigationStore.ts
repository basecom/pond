type NavigationInstance = ReturnType<typeof useNavigation>;

export const useNavigationStore = defineStore('navigation', () => {
    const instances = ref<Record<string, NavigationInstance>>({});

    function loadNavigation(type: string, depth: number) {
        const key = `${type}-${depth}`;

        if (!instances.value[key]) {
            instances.value[key] = useNavigation({ type, depth });
        }

        return instances.value[key]?.navigationElements ?? [];
    }

    return {
        loadNavigation,
    };
});

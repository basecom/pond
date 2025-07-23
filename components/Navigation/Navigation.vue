<script setup lang="ts">
const { languageIdChain } = useSessionContext();

const navigationStore = useNavigationStore();
const mainNavigation = navigationStore.loadNavigation('main-navigation', 2);

const test2 = await navigationStore.loadNavigation('main-navigation', 3);
console.log(mainNavigation, test2);

watch(
    languageIdChain,
    async () => {
        navigationStore.loadNavigation('main-navigation', 2);
    },
    { immediate: false },
);
</script>

<template>
    <div class="relative hidden w-screen md:block md:bg-gray-light">
        <div class="container flex gap-4 overflow-x-auto">
            <NavigationMainItem
                v-for="navigationElement in mainNavigation"
                :key="`nav-item-${navigationElement.id}`"
                :navigation-element="navigationElement"
            />
        </div>
    </div>
</template>

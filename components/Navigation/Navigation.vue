<script setup lang="ts">
const { navigation: mainNavigation, loadNavigation } = useAdvancedNavigation('main-navigation', 2);
await loadNavigation();
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

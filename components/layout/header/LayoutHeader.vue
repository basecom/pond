<script setup lang="ts">
const { sessionContext, refreshSessionContext } = useSessionContext();
const { loadNavigationElements, navigationElements } = useNavigation();

await refreshSessionContext();
// we load per maximum four levels
const navigationCategoryDepth = sessionContext.value?.salesChannel.navigationCategoryDepth <= 4 ? sessionContext.value?.salesChannel.navigationCategoryDepth : 4;

onMounted(async () => {
    await loadNavigationElements({ depth: navigationCategoryDepth });
});
</script>

<template>
    <LayoutHeaderInner :navigation-elements="navigationElements" />
</template>

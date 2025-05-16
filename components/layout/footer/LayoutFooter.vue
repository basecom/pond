<script setup lang="ts">
const { loadNavigationElements: loadFooterNavigation, navigationElements: footerNavigationElements } = useNavigation({type: 'footer-navigation'});
const { loadNavigationElements: loadFooterServiceNavigation, navigationElements: footerServiceNavigationElements } = useNavigation({type: 'service-navigation'});

onMounted(async () => {
    await loadFooterNavigation({ depth: 1 });
    await loadFooterServiceNavigation({ depth: 1 });
});
</script>

<template>
    <LayoutFooterInner
        :navigation-elements="footerNavigationElements"
        :service-navigation-elements="footerServiceNavigationElements"
    />
</template>

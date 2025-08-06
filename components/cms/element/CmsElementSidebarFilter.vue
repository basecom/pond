<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/public/cms/elements/CmsElementSidebarFilter.vue
import type { CmsElementSidebarFilter } from '@shopware/composables';

defineProps<{
  content: CmsElementSidebarFilter;
}>();

// Added showSorting-config
const injectedShowSorting: Ref<boolean>|undefined = inject('showSorting');
const showSorting = ref(false);

onMounted(() => {
    if (injectedShowSorting) {
        showSorting.value = injectedShowSorting.value;
    }
});
</script>
<template>
    <!-- Changed styling -->
    <div class="grid sm:grid-cols-2">
        <SwProductListingFilters :content="content" />
        <!-- Added sorting component -->
        <ListingSorting v-if="showSorting" />
    </div>
</template>

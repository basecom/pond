<script setup lang="ts">
const searchVisible = ref(false);
const searchComponent = ref(null);
const toggleSearch = ref(null);
const { t } = useI18n();

onClickOutside(searchComponent, event => {
    if (event.target !== toggleSearch.value) {
        searchVisible.value = false;
    }
});

// If the user is on the result page automatically open the search bar
const route = useRoute();
if (route.path === '/search') {
    searchVisible.value = true;
}
</script>

<template>
    <button
        ref="toggleSearch"
        :title="t('icon.search')"
        @click="searchVisible = !searchVisible"
    >
        <FormKitIcon
            class="pointer-events-none block size-6"
            icon="magnifying-glass"
        />
    </button>

    <!-- Nuxt currently has SSR support only for teleports to #teleports, so other targets need to use a <ClientOnly> wrapper. See: https://nuxt.com/docs/api/components/teleports -->
    <ClientOnly>
        <teleport to="#flyouts">
            <LayoutHeaderSearchBar
                v-if="searchVisible"
                ref="searchComponent"
                @close-search="searchVisible = false"
            />
        </teleport>
    </ClientOnly>
</template>

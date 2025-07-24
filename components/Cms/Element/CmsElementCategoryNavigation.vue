<script setup lang="ts">
import type { CmsElementCategoryNavigation } from '@shopware/composables';
import { getCategoryRoute, getTranslatedProperty } from '@shopware/helpers';

defineProps<{
    element: CmsElementCategoryNavigation;
}>();

const mainNavigation = await useAdvancedNavigation('main-navigation', 2).loadNavigation();

const { isActive } = useActivePath();

const route = useRoute();
const listingStore = useListingStore(route.path === '/search' ? 'search' : 'category');
</script>

<template>
    <ul>
        <li
            v-for="item in mainNavigation"
            :key="item.id"
            class="mt-4 border-b border-gray pb-4 pl-2"
        >
            <LocaleLink
                :to="getCategoryRoute(item)"
                class="text-lg"
                :class="{ 'font-bold': isActive(item.seoUrls) }"
                @click="listingStore.isLoading = !isActive(item.seoUrls, true);"
            >
                {{ getTranslatedProperty(item, 'name') }}
            </LocaleLink>

            <ul v-if="item.children && item.children.length && isActive(item.seoUrls)">
                <li
                    v-for="child in item.children"
                    :key="child.id"
                    class="ml-3 mt-2 text-base"
                >
                    <LocaleLink
                        :to="getCategoryRoute(child)"
                        :class="{ 'font-bold': isActive(child.seoUrls) }"
                        @click="listingStore.isLoading = !isActive(child.seoUrls, true);"
                    >
                        {{ getTranslatedProperty(child, 'name') }}
                    </LocaleLink>
                </li>
            </ul>
        </li>
    </ul>
</template>

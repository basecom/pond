<script setup lang="ts">
import { getTranslatedProperty, getCategoryRoute } from '@shopware-pwa/helpers-next';

const navigationStore = useNavigationStore();
await navigationStore.loadNavigation('service-navigation', 1);
const { serviceNavigation } = storeToRefs(navigationStore);
</script>

<template>
    <div class="mt-auto">
        <footer class="mt-4 bg-gray-light md:mt-10">
            <div class="container py-5 md:pb-5 md:pt-10">
                <LayoutFooterActions />

                <!-- footer service navigation -->
                <div class="mt-4 grid gap-1 border-t-2 border-gray-medium pt-4 md:flex md:gap-6">
                    <template
                        v-for="navigationElement in serviceNavigation"
                        :key="navigationElement.id"
                    >
                        <LocaleLink
                            :target="navigationElement.externalLink || navigationElement.linkNewTab ? '_blank' : ''"
                            :to="getCategoryRoute(navigationElement)"
                            class="text-sm font-normal transition duration-200 hover:text-brand-primary hover:underline"
                        >
                            {{ getTranslatedProperty(navigationElement, 'name') }}
                        </LocaleLink>
                    </template>
                </div>
            </div>
        </footer>
    </div>
</template>

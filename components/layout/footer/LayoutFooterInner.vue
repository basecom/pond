<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    navigationElements?: Schemas['Category'][];
    serviceNavigationElements?: Schemas['Category'][];
}>();
</script>

<template>
    <footer class="mt-auto">
        <div class="mt-4 bg-gray-50 md:mt-10">
            <slot name="container">
                <div class="container py-5 md:pb-5 md:pt-10">
                    <!-- footer navigation -->
                    <slot name="footer-navigation">
                        <div class="grid gap-5 md:flex md:justify-between lg:justify-normal lg:gap-28">
                            <template
                                v-for="navigationElement in navigationElements"
                                :key="navigationElement.id"
                            >
                                <ul class="grid list-none gap-2">
                                    <slot name="footer-navigation-main-element">
                                        <li class="font-bold">
                                            <LazyLayoutHeaderNavigationLink
                                                :navigation-element="navigationElement"
                                                :classes="{ 'hover:text-gray-950 transition-colors': true }"
                                                :show-as-link="navigationElement.type === 'link' || navigationElement.type === 'page'"
                                                :show-icon="false"
                                            />
                                        </li>
                                    </slot>

                                    <slot name="footer-navigation-child-element">
                                        <li
                                            v-for="navigationChild in navigationElement.children"
                                            :key="navigationChild.id"
                                        >
                                            <LazyLayoutHeaderNavigationLink
                                                :navigation-element="navigationChild"
                                                :classes="{ 'text-gray-700 hover:text-gray-950 transition-colors': true }"
                                                :show-as-link="navigationChild.type === 'link' || navigationChild.type === 'page'"
                                                :show-icon="false"
                                            />
                                        </li>
                                    </slot>
                                </ul>
                            </template>
                        </div>
                    </slot>

                    <!-- footer service navigation -->
                    <slot name="footer-service-navigation">
                        <LayoutFooterSericeNavigation :navigation-elements="serviceNavigationElements" />
                    </slot>
                </div>
            </slot>
        </div>
    </footer>
</template>

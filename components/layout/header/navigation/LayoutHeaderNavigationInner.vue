<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { navigationMenuTriggerStyle } from '~/components/ui/navigation-menu';

defineProps<{
  navigationElements?: Schemas['Category'][];
}>();

const { getStyle } = usePondStyle();

const menuStyles = getStyle('header.navigation.menu');
const triggerStyles = getStyle('header.navigation.trigger');
const contentStyles = getStyle('header.navigation.content');
const listStyles = getStyle('header.navigation.list');
</script>

<template>
    <slot name="header-navigation">
        <UiNavigationMenu :class="menuStyles">
            <UiNavigationMenuList>
                <UiNavigationMenuItem
                    v-for="navigationElement in navigationElements"
                    :key="navigationElement.id"
                >
                    <UiNavigationMenuLink
                        v-if="navigationElement.visibleChildCount === 0"
                        :class="navigationMenuTriggerStyle()"
                    >
                        <slot name="header-navigation-link">
                            <LazyLayoutHeaderNavigationLink :navigation-element="navigationElement" />
                        </slot>
                    </UiNavigationMenuLink>

                    <template v-else>
                        <slot name="header-navigation-parent">
                            <UiNavigationMenuTrigger :class="triggerStyles">
                                <LazyLayoutHeaderNavigationLink
                                    :navigation-element="navigationElement"
                                    :show-as-link="navigationElement.type === 'link' || navigationElement.type === 'page'"
                                    :show-icon="false"
                                />
                            </UiNavigationMenuTrigger>

                            <UiNavigationMenuContent :class="contentStyles">
                                <ul :class="listStyles">
                                    <LayoutHeaderNavigationRecursiveLink :navigation-element="navigationElement" />
                                </ul>
                            </UiNavigationMenuContent>
                        </slot>
                    </template>
                </UiNavigationMenuItem>
            </UiNavigationMenuList>
        </UiNavigationMenu>
    </slot>
</template>

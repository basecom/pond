<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  navigationElements?: Schemas['Category'][];
}>();

const { getStyle } = usePondStyle();
</script>

<template>
    <slot name="header-navigation">
        <UiNavigationMenu :class="getStyle('header.navigation.menu')">
            <UiNavigationMenuList>
                <UiNavigationMenuItem
                    v-for="navigationElement in navigationElements"
                    :key="navigationElement.id"
                >
                    <UiNavigationMenuLink
                        v-if="navigationElement.visibleChildCount === 0"
                        :class="getStyle('ui.navigationMenu.triggerStyle')"
                    >
                        <slot name="header-navigation-link">
                            <LazyLayoutHeaderNavigationLink :navigation-element="navigationElement" />
                        </slot>
                    </UiNavigationMenuLink>

                    <template v-else>
                        <slot name="header-navigation-parent">
                            <UiNavigationMenuTrigger :class="getStyle('header.navigation.trigger')">
                                <LazyLayoutHeaderNavigationLink
                                    :navigation-element="navigationElement"
                                    :show-as-link="navigationElement.type === 'link' || navigationElement.type === 'page'"
                                    :show-icon="false"
                                />
                            </UiNavigationMenuTrigger>

                            <UiNavigationMenuContent :class="getStyle('header.navigation.content')">
                                <ul :class="getStyle('header.navigation.list')">
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

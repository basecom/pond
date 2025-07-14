<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
      navigationElement: Schemas['Category'];
      classes?: { [key: string]: boolean };
    }>(),
    {
        classes: undefined,
    },
);

const { getStyle } = usePondStyle();
</script>

<template>
    <li v-for="children in navigationElement.children" :key="children.id" :class="classes">
        <slot>
            <UiNavigationMenuLink :class="getStyle('ui.navigationMenu.triggerStyle')">
                <LazyLayoutHeaderNavigationLink :navigation-element="children" />
            </UiNavigationMenuLink>

            <LayoutHeaderNavigationRecursiveLink
                :navigation-element="children"
                :classes="{
                    'pl-2': true
                }"
            />
        </slot>
    </li>
</template>

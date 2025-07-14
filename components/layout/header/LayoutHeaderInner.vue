<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  navigationElements?: Schemas['Category'][];
}>();

const { getStyle } = usePondStyle();
</script>

<template>
    <slot name="header">
        <header :class="getStyle('header.outer')">
            <div :class="getStyle('header.container')">
                <slot name="wrapper">
                    <div :class="getStyle('header.wrapper')">
                        <div :class="getStyle('header.leftSection')">
                            <slot name="navigation-mobile">
                                <LayoutHeaderNavigationMobile :navigation-elements="navigationElements" />
                            </slot>

                            <slot name="logo">
                                <LayoutLogo :logo-classes="{ [getStyle('header.logo')]: true }" />
                            </slot>

                            <slot name="navigation-desktop">
                                <LayoutHeaderNavigation :navigation-elements="navigationElements" />
                            </slot>
                        </div>

                        <slot name="actions">
                            <LayoutHeaderActions />
                        </slot>
                    </div>
                </slot>
            </div>
        </header>
    </slot>
</template>

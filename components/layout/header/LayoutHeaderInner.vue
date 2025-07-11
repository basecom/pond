<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
  navigationElements?: Schemas['Category'][];
}>();

const { getStyle } = usePondStyle();

const outerStyles = getStyle('header.outer');
const containerStyles = getStyle('header.container');
const wrapperStyles = getStyle('header.wrapper');
const leftSectionStyles = getStyle('header.leftSection');
const logoStyles = getStyle('header.logo');
</script>

<template>
    <slot name="header">
        <header :class="outerStyles">
            <div :class="containerStyles">
                <slot name="wrapper">
                    <div :class="wrapperStyles">
                        <div :class="leftSectionStyles">
                            <slot name="navigation-mobile">
                                <LayoutHeaderNavigationMobile :navigation-elements="navigationElements" />
                            </slot>

                            <slot name="logo">
                                <LayoutLogo :logo-classes="{ [logoStyles]: true }" />
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

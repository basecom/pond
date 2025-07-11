<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    navigationElements?: Schemas['Category'][];
    serviceNavigationElements?: Schemas['Category'][];
}>();

const { getStyle } = usePondStyle();
const wrapperStyles = getStyle('footer.wrapper');
const outerStyles = getStyle('footer.outer');
const containerStyles = getStyle('footer.container');

const navigationWrapperStyles = getStyle('footer.navigation.wrapper');
const navigationListStyles = getStyle('footer.navigation.list');
const mainElementStyles = getStyle('footer.navigation.mainElement');
const mainLinkStyles = getStyle('footer.navigation.mainLink');
const childLinkStyles = getStyle('footer.navigation.childLink');
</script>

<template>
    <footer :class="wrapperStyles">
        <div :class="outerStyles">
            <slot name="container">
                <div :class="containerStyles">
                    <!-- footer navigation -->
                    <slot name="footer-navigation">
                        <div :class="navigationWrapperStyles">
                            <template
                                v-for="navigationElement in navigationElements"
                                :key="navigationElement.id"
                            >
                                <ul :class="navigationListStyles">
                                    <slot name="footer-navigation-main-element">
                                        <li :class="mainElementStyles">
                                            <LazyLayoutHeaderNavigationLink
                                                :navigation-element="navigationElement"
                                                :classes="{ [mainLinkStyles]: true }"
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
                                                :classes="{ [childLinkStyles]: true }"
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

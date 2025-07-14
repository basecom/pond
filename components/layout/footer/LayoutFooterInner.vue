<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    navigationElements?: Schemas['Category'][];
    serviceNavigationElements?: Schemas['Category'][];
}>();

const { getStyle } = usePondStyle();
</script>

<template>
    <footer :class="getStyle('footer.wrapper')">
        <div :class="getStyle('footer.outer')">
            <slot name="container">
                <div :class="getStyle('footer.container')">
                    <!-- footer navigation -->
                    <slot name="footer-navigation">
                        <div :class="getStyle('footer.navigation.wrapper')">
                            <template
                                v-for="navigationElement in navigationElements"
                                :key="navigationElement.id"
                            >
                                <ul :class="getStyle('footer.navigation.list')">
                                    <slot name="footer-navigation-main-element">
                                        <li :class="getStyle('footer.navigation.mainElement')">
                                            <LazyLayoutHeaderNavigationLink
                                                :navigation-element="navigationElement"
                                                :classes="{ [getStyle('footer.navigation.mainLink')]: true }"
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
                                                :classes="{ [getStyle('footer.navigation.childLink')]: true }"
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

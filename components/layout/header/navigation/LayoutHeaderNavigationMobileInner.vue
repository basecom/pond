<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getTranslatedProperty } from '@shopware/helpers';

defineProps<{
  navigationElements?: Schemas['Category'][];
  lastPreviousItem?: Schemas['Category'];
  open: boolean;
}>();

defineEmits<{
  click: [navigationElement?: Schemas['Category'], categoryLink?: string, options?: {open: {target: string}}];
  back: [];
  open: [value: boolean];
}>();

const { getStyle } = usePondStyle();
const outerStyles = getStyle('header.navigation.mobile.outer');
const triggerStyles = getStyle('header.navigation.mobile.trigger');
const iconStyles = getStyle('header.navigation.mobile.icon');
const headerStyles = getStyle('header.navigation.mobile.header');
const descriptionStyles = getStyle('header.navigation.mobile.description');
const categoryListStyles = getStyle('header.navigation.mobile.categoryList');
const categoryItemStyles = getStyle('header.navigation.mobile.categoryItem');
const backLinkStyles = getStyle('header.navigation.mobile.backLink');
</script>

<template>
    <div :class="outerStyles">
        <UiSheet :open="open" @update:open="(value: boolean) => $emit('open', value)">
            <slot name="mobile-menu-trigger">
                <UiSheetTrigger
                    id="mobile-open-navigation"
                    :class="triggerStyles"
                    aria-label="mobile-open-navigation"
                >
                    <slot name="mobile-menu-icon">
                        <Icon name="mdi:menu" :class="iconStyles" />
                    </slot>
                </UiSheetTrigger>
            </slot>

            <LazyUiSheetContent side="left">
                <LazyUiSheetHeader :class="headerStyles">
                    <LazyUiSheetTitle>
                        <slot name="mobile-menu-title">
                            <template v-if="lastPreviousItem">
                                {{ getTranslatedProperty(lastPreviousItem, 'name') }}
                            </template>
                            <template v-else>
                                {{ $t('general.categories') }}
                            </template>
                        </slot>
                    </LazyUiSheetTitle>

                    <LazyUiSheetDescription :class="descriptionStyles">
                        <slot name="mobile-menu-description">
                            <div v-auto-animate :class="categoryListStyles">
                                <!-- Back -->
                                <slot name="mobile-menu-back">
                                    <div
                                        v-if="lastPreviousItem"
                                        :class="backLinkStyles"
                                        @click="$emit('back')"
                                    >
                                        <Icon name="mdi:chevron-left" :class="iconStyles" />
                                        {{ $t('general.back') }}
                                    </div>
                                </slot>

                                <!-- Show all in current category -->
                                <slot name="mobile-menu-current">
                                    <LazyLayoutHeaderNavigationLink
                                        v-if="lastPreviousItem && (lastPreviousItem.type === 'link' || lastPreviousItem.type === 'page')"
                                        :navigation-element="lastPreviousItem"
                                        :alternative-name="$t('general.showAll')"
                                        :classes="categoryItemStyles"
                                        @click="(navigationElement, categoryLink, options) => $emit('click', lastPreviousItem, categoryLink, options)"
                                    />
                                </slot>

                                <!-- Visible categories -->
                                <slot name="mobile-menu-categories">
                                    <LazyLayoutHeaderNavigationLink
                                        v-for="navigationElement in navigationElements"
                                        :key="navigationElement.id"
                                        :class="categoryItemStyles"
                                        :navigation-element="navigationElement"
                                        :show-as-link="navigationElement.visibleChildCount === 0"
                                        @click="(navigationElement, categoryLink, options) => $emit('click', navigationElement, categoryLink, options)"
                                    />
                                </slot>
                            </div>
                        </slot>
                    </LazyUiSheetDescription>
                </LazyUiSheetHeader>
            </LazyUiSheetContent>
        </UiSheet>
    </div>
</template>

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
</script>

<template>
    <div :class="getStyle('header.navigation.mobile.outer')">
        <UiSheet :open="open" @update:open="(value: boolean) => $emit('open', value)">
            <slot name="mobile-menu-trigger">
                <UiSheetTrigger
                    id="mobile-open-navigation"
                    :class="getStyle('header.navigation.mobile.trigger')"
                    aria-label="mobile-open-navigation"
                >
                    <slot name="mobile-menu-icon">
                        <Icon name="mdi:menu" :class="getStyle('header.navigation.mobile.icon')" />
                    </slot>
                </UiSheetTrigger>
            </slot>

            <LazyUiSheetContent side="left">
                <LazyUiSheetHeader :class="getStyle('header.navigation.mobile.header')">
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

                    <LazyUiSheetDescription :class="getStyle('header.navigation.mobile.description')">
                        <slot name="mobile-menu-description">
                            <div v-auto-animate :class="getStyle('header.navigation.mobile.categoryList')">
                                <!-- Back -->
                                <slot name="mobile-menu-back">
                                    <div
                                        v-if="lastPreviousItem"
                                        :class="getStyle('header.navigation.mobile.backLink')"
                                        @click="$emit('back')"
                                    >
                                        <Icon name="mdi:chevron-left" :class="getStyle('header.navigation.mobile.icon')" />
                                        {{ $t('general.back') }}
                                    </div>
                                </slot>

                                <!-- Show all in current category -->
                                <slot name="mobile-menu-current">
                                    <LazyLayoutHeaderNavigationLink
                                        v-if="lastPreviousItem && (lastPreviousItem.type === 'link' || lastPreviousItem.type === 'page')"
                                        :navigation-element="lastPreviousItem"
                                        :alternative-name="$t('general.showAll')"
                                        :classes="{ [getStyle('header.navigation.mobile.categoryItem')]: true }"
                                        @click="(navigationElement, categoryLink, options) => $emit('click', lastPreviousItem, categoryLink, options)"
                                    />
                                </slot>

                                <!-- Visible categories -->
                                <slot name="mobile-menu-categories">
                                    <LazyLayoutHeaderNavigationLink
                                        v-for="navigationElement in navigationElements"
                                        :key="navigationElement.id"
                                        :class="getStyle('header.navigation.mobile.categoryItem')"
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

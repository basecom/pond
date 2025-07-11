<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import { getCategoryUrl, getTranslatedProperty } from '@shopware/helpers';

const props = withDefaults(
    defineProps<{
      navigationElement: Schemas['Category'];
      classes?: { [key: string]: boolean };
      showAsLink?: boolean;
      showIcon?: boolean;
    }>(),
    {
        classes: undefined,
        showAsLink: true,
        showIcon: true,
    },
);

const emits = defineEmits<{
  click: [navigationElement?: Schemas['Category'], categoryLink?: string, options?: {open: {target: string}}];
}>();

const { isExternalLink, isInternalLink, externalLink, loadInternalLink, path, linkNewTab } = usePondNavigationUtils(props.navigationElement);
if (isInternalLink) {
    await loadInternalLink();
}

const categoryLink = computed(() => {
    if (isExternalLink && externalLink) {
        return externalLink;
    }

    if (isInternalLink) {
        return path.value;
    }

    return getCategoryUrl(props.navigationElement);
});

const handleClick = () => {
    // if it's an external link: link to it
    if (isExternalLink && externalLink) {
        navigateTo(categoryLink.value, { external: true, open: { target: '_blank' } });
        return;
    }

    // internal? push event
    const options =linkNewTab ? { open: { target: '_blank' } } : undefined;
    emits('click', props.navigationElement, categoryLink.value, options);
};

const { getStyle } = usePondStyle();
const linkStyles = getStyle('header.navigation.linkItem.link');
const itemStyles = getStyle('header.navigation.linkItem.item');
const iconWrapperStyles = getStyle('header.navigation.linkItem.iconWrapper');
const iconStyles = getStyle('header.navigation.linkItem.icon');
</script>

<template>
    <LazyNuxtLinkLocale
        v-if="showAsLink && categoryLink"
        :to="categoryLink"
        :class="linkStyles"
        @click.prevent="handleClick"
    >
        <slot name="link-name">
            {{ getTranslatedProperty(navigationElement, 'name') }}
        </slot>
    </LazyNuxtLinkLocale>

    <div
        v-else
        :class="[itemStyles, showIcon ? iconWrapperStyles : '']"
        @click="$emit('click', navigationElement, undefined)"
    >
        <slot name="item-name">
            {{ getTranslatedProperty(navigationElement, 'name') }}
        </slot>

        <span v-if="showIcon" :class="iconStyles">
            <slot name="item-icon">
                <Icon name="mdi:chevron-right" class="size-5" />
            </slot>
        </span>
    </div>
</template>

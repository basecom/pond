<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    navigationElements?: Schemas['Category'][];
}>();

const { getStyle } = usePondStyle();
const configStore = useConfigStore();
const shopName = configStore.get('core.basicInformation.shopName') as string|null ?? 'pond';
</script>

<template>
    <div :class="getStyle('footer.serviceNavigation.outer')">
        <div :class="getStyle('footer.serviceNavigation.left')">
            <slot name="copyright">
                <span :class="getStyle('footer.serviceNavigation.copyright')">
                    {{ $t('footer.copyrightInfo', { 'companyName': shopName }) }}
                </span>
            </slot>
            <slot name="language-switcher">
                <div :class="getStyle('footer.serviceNavigation.languageSwitcher')">
                    <LayoutFooterLanguageSwitcher />
                </div>
            </slot>
            <slot name="currency-switcher">
                <div :class="getStyle('footer.serviceNavigation.currencySwitcher')">
                    <LayoutFooterCurrencySwitcher />
                </div>
            </slot>
        </div>

        <slot name="navigation-elements">
            <div :class="getStyle('footer.serviceNavigation.links')">
                <template
                    v-for="navigationElement in navigationElements"
                    :key="navigationElement.id"
                >
                    <LazyLayoutHeaderNavigationLink
                        :navigation-element="navigationElement"
                        :classes="{ [getStyle('footer.serviceNavigation.link')]: true }"
                        :show-as-link="navigationElement.type === 'link' || navigationElement.type === 'page'"
                        :show-icon="false"
                    />
                </template>
            </div>
        </slot>
    </div>
</template>

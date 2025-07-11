<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    navigationElements?: Schemas['Category'][];
}>();

const configStore = useConfigStore();
const shopName = configStore.get('core.basicInformation.shopName') as string|null ?? 'pond';

const { getStyle } = usePondStyle();
const serviceOuterStyles = getStyle('footer.serviceNavigation.outer');
const serviceLeftStyles = getStyle('footer.serviceNavigation.left');
const copyrightStyles = getStyle('footer.serviceNavigation.copyright');
const languageSwitcherStyles = getStyle('footer.serviceNavigation.languageSwitcher');
const currencySwitcherStyles = getStyle('footer.serviceNavigation.currencySwitcher');
const serviceLinksStyles = getStyle('footer.serviceNavigation.links');
const serviceLinkStyles = getStyle('footer.serviceNavigation.link');
</script>

<template>
    <div :class="serviceOuterStyles">
        <div :class="serviceLeftStyles">
            <slot name="copyright">
                <span :class="copyrightStyles">
                    {{ $t('general.copyright', { 'companyName': shopName }) }}
                </span>
            </slot>
            <slot name="language-switcher">
                <div :class="languageSwitcherStyles">
                    <LayoutFooterLanguageSwitcher />
                </div>
            </slot>
            <slot name="currency-switcher">
                <div :class="currencySwitcherStyles">
                    <LayoutFooterCurrencySwitcher />
                </div>
            </slot>
        </div>

        <slot name="navigation-elements">
            <div :class="serviceLinksStyles">
                <template
                    v-for="navigationElement in navigationElements"
                    :key="navigationElement.id"
                >
                    <LazyLayoutHeaderNavigationLink
                        :navigation-element="navigationElement"
                        :classes="{ [serviceLinkStyles]: true }"
                        :show-as-link="navigationElement.type === 'link' || navigationElement.type === 'page'"
                        :show-icon="false"
                    />
                </template>
            </div>
        </slot>
    </div>
</template>

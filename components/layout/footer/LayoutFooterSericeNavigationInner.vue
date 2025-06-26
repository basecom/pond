<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

defineProps<{
    navigationElements?: Schemas['Category'][];
}>();

const configStore = useConfigStore();
const shopName = configStore.get('core.basicInformation.shopName') as string|null ?? 'pond';
</script>

<template>
    <div class="mt-4 grid justify-between gap-6 border-t border-gray-500/70 pt-4 text-sm text-gray-700 md:mt-8 md:flex md:pt-8">
        <div class="flex gap-2 md:gap-4 items-center">
            <slot name="copyright">
                <span class="order-2 md:order-[unset]">
                    {{ $t('general.copyright', { 'companyName': shopName }) }}
                </span>
            </slot>
            <slot name="language-switcher">
              <div class="order-3 md:order-[unset]">
                <LanguageSwitcher />
              </div>
            </slot>
            <slot name="currency-switcher">
                <div class="order-4 md:order-[unset]">
                    <CurrencySwitcher />
                </div>
            </slot>
        </div>

        <slot name="navigation-elements">
            <div class="grid gap-2 md:flex md:gap-4">
                <template
                    v-for="navigationElement in navigationElements"
                    :key="navigationElement.id"
                >
                    <LazyLayoutHeaderNavigationLink
                        :navigation-element="navigationElement"
                        :classes="{ 'hover:text-gray-950 transition-colors': true }"
                        :show-as-link="navigationElement.type === 'link' || navigationElement.type === 'page'"
                        :show-icon="false"
                    />
                </template>
            </div>
        </slot>
    </div>
</template>

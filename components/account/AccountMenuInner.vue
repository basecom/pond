<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';

withDefaults(
    defineProps<{
      accountLinks?: {name: string, link: string}[];
      customer?: Schemas['Customer'];
    }>(),
    {
        accountLinks: undefined,
        customer: undefined,
    },
);

defineEmits<{
  logout: [];
}>();

const { getStyle } = usePondStyle();
const accordionOuterStyles = getStyle('account.menu.accordion.outer');
const accordionItemStyles = getStyle('account.menu.accordion.item');
const accordionTriggerStyles = getStyle('account.menu.accordion.trigger');
const accordionContentStyles = getStyle('account.menu.accordion.content');
const accordionLinksOuterStyles = getStyle('account.menu.accordion.links.outer');
const accordionLinksItemStyles = getStyle('account.menu.accordion.links.item');
const accordionLinksActiveItemStyles = getStyle('account.menu.accordion.links.activeItem');
const welcomeStyles = getStyle('account.menu.welcome');
const navigationOuterStyles = getStyle('account.menu.navigation.outer');
const navigationLinksOuterStyles = getStyle('account.menu.navigation.links.outer');
const navigationLinksItemStyles = getStyle('account.menu.navigation.links.item');
const navigationLinksActiveItemStyles = getStyle('account.menu.navigation.links.activeItem');
const navigationSeparatorStyles = getStyle('account.menu.navigation.separator');
const navigationLogoutStyles = getStyle('account.menu.navigation.logout');
</script>

<template>
    <div>
        <!-- mobile view -->
        <slot name="mobile-account-links">
            <UiAccordion :class="accordionOuterStyles" type="single" collapsible>
                <UiAccordionItem value="my-account" :class="accordionItemStyles">
                    <UiAccordionTrigger :class="accordionTriggerStyles">{{ $t('account.myAccount') }}</UiAccordionTrigger>
                    <UiAccordionContent :class="accordionContentStyles">
                        <slot name="account-links">
                            <div v-if="accountLinks" :class="accordionLinksOuterStyles">
                                <slot name="account-link">
                                    <NuxtLinkLocale
                                        v-for="accountLink in accountLinks"
                                        :key="accountLink.name"
                                        :to="accountLink.link"
                                        :active-class="accordionLinksItemStyles"
                                        :class="accordionLinksActiveItemStyles"
                                    >
                                        {{ $t(`account.${accountLink.name}`) }}
                                    </NuxtLinkLocale>
                                </slot>
                            </div>
                        </slot>
                    </UiAccordionContent>
                </UiAccordionItem>
            </UiAccordion>
        </slot>

        <!-- desktop view -->
        <slot name="desktop-account-links">
            <div :class="navigationOuterStyles">
                <slot name="welcome">
                    <h3 v-if="customer" :class="welcomeStyles">
                        {{ $t('account.welcome', { name: customer.firstName + ' ' + customer.lastName }) }}
                    </h3>
                </slot>

                <slot name="account-links">
                    <div v-if="accountLinks" :class="navigationLinksOuterStyles">
                        <slot name="account-link">
                            <NuxtLinkLocale
                                v-for="accountLink in accountLinks"
                                :key="accountLink.name"
                                :to="accountLink.link"
                                :active-class="navigationLinksActiveItemStyles"
                                :class="navigationLinksItemStyles"
                            >
                                {{ $t('account.'+accountLink.name) }}
                            </NuxtLinkLocale>
                        </slot>
                    </div>
                </slot>

                <UiDropdownMenuSeparator :class="navigationSeparatorStyles" />

                <slot name="action-logout">
                    <div :class="navigationLogoutStyles" @click="$emit('logout')">
                        <slot name="logout">
                            {{ $t('account.auth.logout') }}
                        </slot>
                    </div>
                </slot>
            </div>
        </slot>
    </div>
</template>

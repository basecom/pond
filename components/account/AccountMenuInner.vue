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
</script>

<template>
    <div>
        <!-- mobile view -->
        <slot name="mobile-account-links">
            <UiAccordion :class="getStyle('account.menu.accordion.outer')" type="single" collapsible>
                <UiAccordionItem value="my-account" :class="getStyle('account.menu.accordion.item')">
                    <UiAccordionTrigger :class="getStyle('account.menu.accordion.trigger')">
                        {{ $t('account.myAccount') }}
                    </UiAccordionTrigger>

                    <UiAccordionContent :class="getStyle('account.menu.accordion.content')">
                        <slot name="account-links">
                            <div v-if="accountLinks" :class="getStyle('account.menu.accordion.links.outer')">
                                <slot name="account-link">
                                    <NuxtLinkLocale
                                        v-for="accountLink in accountLinks"
                                        :key="accountLink.name"
                                        :to="accountLink.link"
                                        :active-class="getStyle('account.menu.accordion.links.item')"
                                        :class="getStyle('account.menu.accordion.links.activeItem')"
                                    >
                                        {{ $t(`account.${accountLink.name}Link`) }}
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
            <div :class="getStyle('account.menu.navigation.outer')">
                <slot name="welcome">
                    <h3 v-if="customer" :class="getStyle('account.menu.welcome')">
                        {{ $t('account.greetings') }} {{ customer.firstName }} {{ customer.lastName }}
                    </h3>
                </slot>

                <slot name="account-links">
                    <div v-if="accountLinks" :class="getStyle('account.menu.navigation.links.outer')">
                        <slot name="account-link">
                            <NuxtLinkLocale
                                v-for="accountLink in accountLinks"
                                :key="accountLink.name"
                                :to="accountLink.link"
                                :active-class="getStyle('account.menu.navigation.links.activeItem')"
                                :class="getStyle('account.menu.navigation.links.item')"
                            >
                                {{ $t(`account.${accountLink.name}Link`) }}
                            </NuxtLinkLocale>
                        </slot>
                    </div>
                </slot>

                <UiDropdownMenuSeparator :class="getStyle('account.menu.navigation.separator')" />

                <slot name="action-logout">
                    <div :class="getStyle('account.menu.navigation.logout')" @click="$emit('logout')">
                        <slot name="logout">
                            {{ $t('account.logout') }}
                        </slot>
                    </div>
                </slot>
            </div>
        </slot>
    </div>
</template>

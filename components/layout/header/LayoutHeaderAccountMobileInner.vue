<script setup lang="ts">
withDefaults(
    defineProps<{
      signedIn?: boolean;
      open?: boolean;
    }>(),
    {
        signedIn: false,
        open: false,
    },
);

defineEmits<{
  logout: [];
  open: [value: boolean];
  click: [];
}>();

const { getStyle } = usePondStyle();
const configStore = useConfigStore();
const wishlistEnabled = configStore.get('core.cart.wishlistEnabled') as boolean;
const dialogOpen = ref(false);

provide('closeDialog', () => {
    dialogOpen.value = false;
});
</script>

<template>
    <UiSheet :open="open" @update:open="(value: boolean) => $emit('open', value)">
        <slot name="mobile-account-trigger">
            <UiSheetTrigger
                id="open-account-menu-mobile"
                :class="getStyle('header.actions.account.mobile.trigger')"
                aria-label="open-account-menu"
            >
                <slot name="account-icon">
                    <Icon name="mdi:account-outline" :class="getStyle('header.actions.account.mobile.icon')" />
                </slot>
            </UiSheetTrigger>
        </slot>

        <UiSheetContent>
            <UiSheetHeader>
                <UiSheetTitle>{{ $t('account.myAccount') }}</UiSheetTitle>

                <LazyUiSheetDescription :class="getStyle('header.actions.account.mobile.description')">
                    <!-- user view -->
                    <template v-if="signedIn">
                        <slot name="signed-in">
                            <AccountActionLink link="/account" :label="$t('account.overviewLink')" @click="() => $emit('click')" />
                            <AccountActionLink link="/account/profile" :label="$t('account.profileLink')" @click="() => $emit('click')" />
                            <AccountActionLink link="/account/address" :label="$t('account.addressLink')" @click="() => $emit('click')" />
                            <AccountActionLink link="/account/payment" :label="$t('account.paymentLink')" @click="() => $emit('click')" />
                            <AccountActionLink link="/account/order" :label="$t('account.ordersLink')" @click="() => $emit('click')" />
                            <AccountActionLink
                                v-if="wishlistEnabled"
                                link="/account/wishlist"
                                :label="$t('account.wishlistLink')"
                                @click="() => $emit('click')"
                            />

                            <div :class="getStyle('header.actions.account.mobile.logoutWrapper')" @click="$emit('logout')">
                                <slot name="logout">
                                    <div :class="getStyle('header.actions.account.mobile.logout')">
                                        {{ $t('account.logout') }}
                                    </div>
                                </slot>
                            </div>
                        </slot>
                    </template>

                    <!-- guest view -->
                    <template v-else>
                        <slot name="guest">
                            <UiDialog v-model:open="dialogOpen">
                                <UiDialogTrigger :class="getStyle('header.actions.account.mobile.loginTrigger')">
                                    <slot name="action-login">
                                        <slot name="login">
                                            <div :class="getStyle('header.actions.account.mobile.logout')">
                                                {{ $t('account.login') }}
                                            </div>
                                        </slot>
                                    </slot>
                                </UiDialogTrigger>

                                <UiDialogContent>
                                    <UiDialogHeader>
                                        <UiDialogTitle>
                                            {{ $t('account.login') }}
                                        </UiDialogTitle>
                                    </UiDialogHeader>
                                    <AccountLogin :redirect-to="null" />
                                </UiDialogContent>
                            </UiDialog>

                            <slot name="action-register">
                                <AccountActionLink link="/account/register" :label="$t('account.register')" @click="() => $emit('click')" />
                            </slot>
                        </slot>
                    </template>
                </LazyUiSheetDescription>
            </UiSheetHeader>
        </UiSheetContent>
    </UiSheet>
</template>

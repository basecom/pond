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
                            <AccountActionLink link="/account" :label="$t('account.account')" @click="() => $emit('click')" />
                            <AccountActionLink link="/account/profile" :label="$t('account.profile')" @click="() => $emit('click')" />
                            <AccountActionLink link="/account/address" :label="$t('account.address')" @click="() => $emit('click')" />
                            <AccountActionLink link="/account/payment" :label="$t('account.payment')" @click="() => $emit('click')" />
                            <AccountActionLink link="/account/order" :label="$t('account.order')" @click="() => $emit('click')" />
                            <AccountActionLink link="/account/wishlist" :label="$t('account.wishlist')" @click="() => $emit('click')" />

                            <div :class="getStyle('header.actions.account.mobile.logoutWrapper')" @click="$emit('logout')">
                                <slot name="logout">
                                    <div :class="getStyle('header.actions.account.mobile.logout')">
                                        {{ $t('account.auth.logout') }}
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
                                                {{ $t('account.auth.login') }}
                                            </div>
                                        </slot>
                                    </slot>
                                </UiDialogTrigger>

                                <UiDialogContent>
                                    <UiDialogHeader>
                                        <UiDialogTitle>
                                            {{ $t('account.auth.login') }}
                                        </UiDialogTitle>
                                    </UiDialogHeader>
                                    <AccountLogin :redirect-to="null" />
                                </UiDialogContent>
                            </UiDialog>

                            <slot name="action-register">
                                <AccountActionLink link="/account/register" :label="$t('account.auth.register')" @click="() => $emit('click')" />
                            </slot>
                        </slot>
                    </template>
                </LazyUiSheetDescription>
            </UiSheetHeader>
        </UiSheetContent>
    </UiSheet>
</template>

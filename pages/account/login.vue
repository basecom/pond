<script setup lang="ts">
const { rerouteIfLoggedIn } = usePondAuthentication();
const { getStyle } = usePondStyle();
await rerouteIfLoggedIn();
</script>

<template>
    <div :class="getStyle('account.login.page.outer')">
        <div :class="getStyle('account.login.page.inner')">
            <AccountLogin>
                <template #headline>
                    <h1 :class="getStyle('account.login.page.headline')">
                        {{ $t('account.auth.login') }}
                    </h1>
                </template>
            </AccountLogin>
        </div>
    </div>
</template>

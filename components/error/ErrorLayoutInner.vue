<script setup lang="ts">
const { getStyle } = usePondStyle();
</script>

<template>
    <slot name="wrapper">
        <div :class="getStyle('error.outer')">
            <slot name="container">
                <h1 :class="getStyle('error.headline')">
                    <slot name="headline">{{ $t('error.generalHeadline') }}</slot>
                </h1>

                <p :class="getStyle('error.description')">
                    <slot name="description" />
                </p>

                <slot name="button">
                    <NuxtLinkLocale to="/">
                        <UiButton variant="link" :class="getStyle('error.button')">
                            {{ $t('error.generalButton') }}
                        </UiButton>
                    </NuxtLinkLocale>
                </slot>
            </slot>
        </div>
    </slot>
</template>

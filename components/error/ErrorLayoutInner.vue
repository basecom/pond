<script setup lang="ts">
const { getStyle } = usePondStyle();
const outerStyles = getStyle('error.outer');
const headlineStyles = getStyle('error.headline');
const descriptionStyles = getStyle('error.description');
const buttonStyles = getStyle('error.button');
</script>

<template>
    <slot name="wrapper">
        <div :class="outerStyles">
            <slot name="container">
                <h1 :class="headlineStyles">
                    <slot name="headline">{{ $t('error.generalHeadline') }}</slot>
                </h1>

                <p :class="descriptionStyles">
                    <slot name="description" />
                </p>

                <slot name="button">
                    <NuxtLinkLocale to="/">
                        <UiButton variant="link" :class="buttonStyles">
                            {{ $t('error.generalButton') }}
                        </UiButton>
                    </NuxtLinkLocale>
                </slot>
            </slot>
        </div>
    </slot>
</template>

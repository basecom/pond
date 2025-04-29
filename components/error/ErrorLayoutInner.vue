<template>
    <slot name="wrapper">
        <div class="container mt-12">
            <slot name="container">
                <h1 class="mb-4 text-center text-4xl uppercase">
                    <slot name="title">{{ $t('error.generalHeadline') }}</slot>
                </h1>
                <p class="mb-4 text-center">
                    <slot name="subTitle" />
                </p>
                <div class="text-center">
                    <slot name="button">
                        <NuxtLinkLocale to="/">
                            <UiButton variant="link">{{ $t('error.generalButton') }}</UiButton>
                        </NuxtLinkLocale>
                    </slot>
                </div>
            </slot>
        </div>
    </slot>
</template>

<template>
    <LayoutLanguageSwitcherInner>
        <template #language-switcher-trigger>
            <slot name="language-switcher-trigger" />
        </template>
        <template #language-switcher-content>
            <slot name="language-switcher-content" />
        </template>
    </LayoutLanguageSwitcherInner>
</template>

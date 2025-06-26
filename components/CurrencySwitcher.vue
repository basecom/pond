<template>
    <CurrencySwitcherInner>
        <template #currency-switcher-trigger>
            <slot name="currency-switcher-trigger" />
        </template>
        <template #currency-switcher-content>
            <slot name="currency-switcher-content" />
        </template>
    </CurrencySwitcherInner>
</template>

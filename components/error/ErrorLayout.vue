<template>
    <ErrorLayoutInner>
        <template #wrapper>
            <slot name="wrapper" />
        </template>
        <template #container>
            <slot name="container" />
        </template>
        <template #title>
            <slot name="title" />
        </template>
        <template #description>
            <slot name="description" />
        </template>
        <template #button>
            <slot name="button" />
        </template>
    </ErrorLayoutInner>
</template>

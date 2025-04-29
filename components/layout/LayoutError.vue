<template>
    <LayoutErrorInner>
        <template #wrapper>
            <slot name="wrapper" />
        </template>
        <template #container>
            <slot name="container" />
        </template>
        <template #title>
            <slot name="title" />
        </template>
        <template #subTitle>
            <slot name="subTitle" />
        </template>
        <template #button>
            <slot name="button" />
        </template>
    </LayoutErrorInner>
</template>

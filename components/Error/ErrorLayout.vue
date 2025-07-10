<template>
    <LayoutHeaderMinimal />

    <main
        class="container mt-4 flex flex-col items-center justify-center md:mt-10"
    >
        <slot />
    </main>

    <LayoutFooterMinimal />

    <CookieBanner />
</template>

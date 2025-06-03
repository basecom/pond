<script setup lang="ts">
import { pascalCase } from 'scule';

const { clearBreadcrumbs } = useBreadcrumbs();
const { resolvePath } = useNavigationSearch();
const route = useRoute();
const { t } = useI18n();

/**
 * Replace the locale value from the route path
 * but only if the locale is not the default locale
 * and only the first /${locale} will be replaced
 */
const { $i18n } = useNuxtApp();
const { locale } = useI18n();
const defaultLocale = $i18n.defaultLocale;
const routePath =
    locale.value !== defaultLocale
        ? route.path.replace(/^\/[^/]+/, '')
        : route.path;

const { data: seoResult } = await usePondCacheAsyncData(`seoPath-${routePath}`, async () => {
    // For client links if the history state contains seo url information we can omit the api call
    if (import.meta.client) {
        if (history.state?.routeName) {
            return {
                routeName: history.state?.routeName,
                foreignKey: history.state?.foreignKey,
            };
        }
    }

    return await resolvePath(routePath);
});

const { routeName, foreignKey } = useNavigationContext(seoResult);
const { componentExists } = usePondCmsUtils();

if (!routeName.value) {
    throw createError({ statusCode: 404, message: t('error.404.heading') });
}

onBeforeRouteLeave(() => {
    clearBreadcrumbs();
});
</script>

<template>
    <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
            <UiButton>
                Open
            </UiButton>
        </UiDropdownMenuTrigger>

        <UiDropdownMenuContent class="w-56">
            <UiDropdownMenuLabel>My Account</UiDropdownMenuLabel>

            <UiDropdownMenuSeparator />

            <UiDropdownMenuGroup>
                <UiDropdownMenuItem>
                    <span>Pond Status</span>
                    <UiDropdownMenuShortcut>⇧⌘P</UiDropdownMenuShortcut>
                </UiDropdownMenuItem>

                <UiDropdownMenuItem disabled>
                    <span>Delete Pond</span>
                </UiDropdownMenuItem>
            </UiDropdownMenuGroup>

            <UiDropdownMenuSeparator />

            <UiDropdownMenuGroup>
                <UiDropdownMenuItem>
                    <span>Animal of the Month</span>
                </UiDropdownMenuItem>

                <UiDropdownMenuSub>
                    <UiDropdownMenuSubTrigger>
                        <span>Favorite Animals</span>
                    </UiDropdownMenuSubTrigger>
                    <UiDropdownMenuPortal>
                        <UiDropdownMenuSubContent>
                            <UiDropdownMenuItem>
                                <span>Frog</span>
                            </UiDropdownMenuItem>
                            <UiDropdownMenuItem>
                                <span>Snail</span>
                            </UiDropdownMenuItem>
                            <UiDropdownMenuItem>
                                <span>Fish</span>
                            </UiDropdownMenuItem>
                        </UiDropdownMenuSubContent>
                    </UiDropdownMenuPortal>
                </UiDropdownMenuSub>

                <UiDropdownMenuItem>
                    <span>Add Animal</span>
                    <UiDropdownMenuShortcut>⌘+A</UiDropdownMenuShortcut>
                </UiDropdownMenuItem>
            </UiDropdownMenuGroup>
        </UiDropdownMenuContent>
    </UiDropdownMenu>
    <component
        :is="pascalCase(routeName)"
        v-if="componentExists(pascalCase(routeName))"
        :navigation-id="foreignKey"
    />
</template>

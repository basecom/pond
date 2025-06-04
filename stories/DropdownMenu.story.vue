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

                <UiDropdownMenuItem>
                    <span>Add Animal</span>
                    <UiDropdownMenuShortcut>⌘+A</UiDropdownMenuShortcut>
                </UiDropdownMenuItem>
            </UiDropdownMenuGroup>
        </UiDropdownMenuContent>
    </UiDropdownMenu>
</template>

<script setup lang="ts">

withDefaults(
    defineProps<{
      link?: string;
      label?: string;
    }>(),
    {
        link: '/',
        label: '',
    },
);

defineEmits<{
  click: [];
}>();

</script>

<template>
    <slot name="account-action-link">
        <NuxtLinkLocale :to="link" @click="() => $emit('click')">
            <slot name="account-action-link-inner">
                <div class="flex cursor-pointer items-center gap-2 border-b-2 border-gray-100 py-3">
                    {{ label }}
                </div>
            </slot>
        </NuxtLinkLocale>
    </slot>
</template>

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
    <AccountActionLinkInner :link="link" :label="label" @click="$emit('click')">
        <template #account-action-link>
            <slot name="account-action-link" />
        </template>
        <template #account-action-link-inner>
            <slot name="account-action-link-inner" />
        </template>
    </AccountActionLinkInner>
</template>

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

const { getStyle } = usePondStyle();
const actionLinkStyles = getStyle('account.actionLink');
</script>

<template>
    <slot name="account-action-link">
        <NuxtLinkLocale
            :to="link"
            :aria-label="label || 'Account action link'"
            role="button"
            @click="() => $emit('click')"
        >
            <slot name="account-action-link-inner">
                <div :class="actionLinkStyles">
                    {{ label }}
                </div>
            </slot>
        </NuxtLinkLocale>
    </slot>
</template>

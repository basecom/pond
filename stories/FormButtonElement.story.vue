<script setup lang="ts">
// set onMounted flag, otherwise hydration mismatched may occur
const isMounted = ref(false);

onMounted(() => isMounted.value = true);
</script>

<template>
    <Vueform v-if="isMounted" id="story-button-form">
        <p class="col-span-12"> I am a primary button </p>
        <FormButtonElement
            id="form-button-element-story-default"
            name="form-button-element-story-default"
            :label="$t('account.auth.register')"
        />

        <p class="col-span-12"> I am a full width primary button </p>
        <FormButtonElement
            id="form-button-element-story-is-full"
            name="form-button-element-story-is-full"
            :label="$t('account.auth.register')"
            :is-full="true"
        />

        <p class="col-span-12"> I am a primary disabled button </p>
        <FormButtonElement
            id="form-button-element-story-is-disabled"
            name="form-button-element-story-is-disabled"
            :label="$t('account.auth.register')"
            :is-disabled="true"
        />

        <p class="col-span-12"> I am a primary loading button </p>
        <FormButtonElement
            id="form-button-element-story-is-loading"
            name="form-button-element-story-is-loading"
            :label="$t('account.auth.register')"
            :is-loading="true"
        />

        <p class="col-span-12"> I am a secondary button </p>
        <FormButtonElement
            id="form-button-element-story-is-secondary"
            name="form-button-element-story-is-secondary"
            :label="$t('account.auth.register')"
            :is-secondary="true"
        />

        <p class="col-span-12"> I am a secondary disabled button </p>
        <FormButtonElement
            id="form-button-element-story-is-secondary-and-disabled"
            name="form-button-element-story-is-secondary-and-disabled"
            :label="$t('account.auth.register')"
            :is-secondary="true"
            is-disabled="true"
        />

        <p class="col-span-12"> I am a secondary loading button </p>
        <FormButtonElement
            id="form-button-element-story-is-secondary-and-loading"
            name="form-button-element-story-is-secondary-and-loading"
            :label="$t('account.auth.register')"
            :is-secondary="true"
            :is-loading="true"
        />
    </Vueform>
</template>

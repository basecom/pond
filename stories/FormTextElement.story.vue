<script setup lang="ts">
// set onMounted flag, otherwise hydration mismatched may occur
const isMounted = ref(false);

onMounted(() => isMounted.value = true);
</script>

<template>
    <div class="grid gap-4">
        <Vueform v-if="isMounted" id="story-text-form">
            <UiTextElement
                id="form-text-element-story-default"
                label="I'm a default text element"
                name="default_text_element"
                placeholder="Enter Text ..."
            />

            <UiTextElement
                id="form-text-element-story-email"
                label="I'm a email text field"
                name="email_text_element"
                placeholder="Enter Email ..."
                type="email"
                :rules="['email']"
            />

            <UiTextElement
                id="form-text-element-story-password"
                label="I'm a password text element"
                name="password_text_element"
                placeholder="Enter password ..."
                type="password"
                :rules="[
                    'required',
                    'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/',
                    'confirmed'
                ]"
                :debounce="300"
                :messages="{
                    regex: 'The Password must at least 8 characters long and contain at least one number, one uppercase and one lowercase character.'
                }"
            />

            <UiTextElement
                id="form-text-element-story-first-name"
                label="I'm a text field"
                name="first_name"
                placeholder="Enter first name ..."
                :rules="['confirmed']"
            />

            <UiTextElement
                id="form-text-element-story-first-name-confirm"
                label="I'm a confirm text field"
                name="first_name_confirmation"
                placeholder="Confirm first name ..."
            />
        </Vueform>
    </div>
</template>

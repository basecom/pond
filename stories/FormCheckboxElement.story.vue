<script setup lang="ts">
// set onMounted flag, otherwise hydration mismatched may occur
const isMounted = ref(false);

onMounted(() => isMounted.value = true);
</script>

<template>
    <Vueform v-if="isMounted" id="story-checkbox-form">
        <FormCheckboxElement
            id="form-checkbox-element-default"
            name="form-checkbox-element-default"
            label="I'm a checkbox"
        />
    </Vueform>
</template>

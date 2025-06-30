<script setup lang="ts">
import {onMounted} from 'vue';

// set onMounted flag, otherwise hydration mismatched may occur
const isMounted = ref(false);

onMounted(() => isMounted.value = true);
</script>

<template>
    <Vueform v-if="isMounted" id="story-button-form">
        <FormCheckboxElement
            id="form-checkbox-element-default"
            name="form-checkbox-element-default"
            label="I'm a checkbox"
        />
    </Vueform>
</template>

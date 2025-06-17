<script setup lang="ts">

const { languages, changeLanguage, replaceToDevStorefront, getLanguageCodeFromId } =
    useInternationalization();

const { languageIdChain } = useSessionContext();


const selectedLanguage = ref(languageIdChain);

const onUpdate = async (selectedLanguageId: string) => {
    const response = await changeLanguage(selectedLanguageId);
    const redirectUrl = response.redirectUrl;

    if (redirectUrl) {
        window.location.replace(replaceToDevStorefront(redirectUrl));
    } else {
        window.location.reload();
    }
};
</script>

<template>
    <UiSelect :default-value="selectedLanguage" @update:model-value="onUpdate">
        <UiSelectTrigger>
            <UiSelectValue  />
        </UiSelectTrigger>

        <UiSelectContent>
            <UiSelectGroup>
                <UiSelectItem
                    v-for="language in languages"
                    :key="language.id"
                    :value="language.id"
                >
                    {{ language.name }}
                </UiSelectItem>
            </UiSelectGroup>
        </UiSelectContent>
    </UiSelect>
</template>

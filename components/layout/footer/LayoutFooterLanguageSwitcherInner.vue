<script setup lang="ts">
import type { Schemas } from '@shopware/api-client/api-types';
import type { AcceptableValue } from 'reka-ui';

const { languages, changeLanguage, replaceToDevStorefront, getAvailableLanguages } =
    useInternationalization();
const { languageIdChain } = useSessionContext();
const { handleError } = usePondHandleError();
const { getStyle } = usePondStyle();

const selectedLanguage: Ref<undefined | Schemas['Language']> = ref(undefined);
const selectedLanguageId = ref(languageIdChain);

onMounted(async () => {
    await getAvailableLanguages();
    if(selectedLanguageId.value) {
        selectedLanguage.value = languages.value.find(language => language.id === selectedLanguageId.value);
    }
});

const onUpdate = async (selectedValue: AcceptableValue): Promise<void> =>  {
    if (typeof selectedValue === 'string') {
        try {
            const response = await changeLanguage(selectedValue);
            // Update language
            selectedLanguage.value = languages.value.find(language => language.id === selectedValue);
            const redirectUrl = response.redirectUrl;
            window.location.replace(replaceToDevStorefront(redirectUrl));
        } catch {
            handleError('Language switch failed');
        }
    }
};
</script>

<template>
    <UiSelect :model-value="selectedLanguageId" @update:model-value="onUpdate">
        <slot name="language-switcher-trigger">
            <UiSelectTrigger
                id="language-switch"
                :class="getStyle('footer.languageSwitcherComponent.trigger')"
                aria-label="language-switch"
            >
                <UiSelectValue>
                    <template v-if="selectedLanguage">
                        <div :class="getStyle('footer.languageSwitcherComponent.valueWrapper')">
                            <Icon :name="`custom-icons:${selectedLanguage?.translationCode?.code}`" />
                            {{ selectedLanguage?.name }}
                        </div>
                    </template>
                </UiSelectValue>
            </UiSelectTrigger>
        </slot>

        <slot name="language-switcher-content">
            <UiSelectContent>
                <UiSelectGroup>
                    <UiSelectItem
                        v-for="language in languages"
                        :key="language.id"
                        :value="language.id"
                    >
                        <div :class="getStyle('footer.languageSwitcherComponent.item')">
                            <template v-if="language.translationCode.code">
                                <Icon :name="`custom-icons:${language.translationCode.code}`" />
                            </template>
                            {{ language.name }}
                        </div>
                    </UiSelectItem>
                </UiSelectGroup>
            </UiSelectContent>
        </slot>
    </UiSelect>
</template>

<script setup lang="ts">
//change: add confirmation logic
// Overrides node_modules/@shopware/cms-base-layer/components/public/cms/element/CmsElementYoutubeVideo.vue
const props = defineProps<{
  content: CmsElementVimeoVideo;
}>();
const { getConfigValue } = useCmsElementConfig(props.content);

type CmsElementVimeoVideoConfigKey = keyof CmsElementVimeoVideo['config'];

const vimeoConfigMapping = {
    byLine: 'byline',
    color: 'color',
    doNotTrack: 'dnt',
    loop: 'loop',
    mute: 'mute',
    title: 'title',
    portrait: 'portrait',
    controls: 'controls',
    videoID: 'videoID',
    autoplay: 'autoplay',
    previewMedia: 'previewMedia',
};

const videoUrl: Ref<string> = ref(
    `https://player.vimeo.com/video/${getConfigValue('videoID')}?`,
);

const convertAttr = (
    value: string,
    configKey: CmsElementVimeoVideoConfigKey,
) => {
    if (configKey === 'color')
        return value ? `${vimeoConfigMapping[configKey]}=${value}&`.replace('#', '') : '';
    // @ts-expect-error - This is copied from the original code
    return value ? `${vimeoConfigMapping[configKey]}=${value}&` : '';
};

for (const key in props.content.config) {
    if (Object.prototype.hasOwnProperty.call(vimeoConfigMapping, key)) {
        videoUrl.value += convertAttr(
      props.content.config[key as CmsElementVimeoVideoConfigKey]
          .value as string,
      key as CmsElementVimeoVideoConfigKey,
        );
    }
}
const needsConfirmation = getConfigValue('needsConfirmation');
const confirmed = ref(false);
</script>

<template>
    <!--change: add needsConfirmation logic-->
    <CmsElementVideoConfirmation
        v-if="needsConfirmation && !confirmed"
        :preview-url="content?.data?.media?.url"
        :alt="$t('component.cms.video.vimeo.alt')"
        @confirm="(hasConfirmed: boolean) => confirmed = hasConfirmed"
    />
    <template v-else>
        <div class="cms-element-vimeo-video">
            <iframe
                class="w-full inset-0 aspect-video"
                :src="videoUrl.replace(/ /g, '')"
                :title="$t('component.cms.video.vimeo.title')"
            />
        </div>
    </template>
</template>

<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/public/cms/element/CmsElementYoutubeVideo.vue
import type { CmsElementYoutubeVideo } from '@shopware/composables';
import { computed, ref } from 'vue';
import CmsElementVideoConfirmation from './CmsElementVideoConfirmation.vue';

const props = defineProps<{
  content: CmsElementYoutubeVideo;
}>();

const { getConfigValue } = useCmsElementConfig(props.content);

//change: fix showControls logic
const config = computed(() => ({
    videoID: getConfigValue('videoID'),
    relatedVideos: 'rel=0&',
    loop: getConfigValue('loop')
        ? `loop=1&playlist=${getConfigValue('videoID')}&`
        : '',
    showControls: getConfigValue('showControls') ? 'controls=1&' : 'controls=0&',
    start:
      Number.parseInt(getConfigValue('start')) !== 0
          ? `start=${getConfigValue('start')}&`
          : '',
    end:
      Number.parseInt(getConfigValue('end')) !== 0
          ? `end=${getConfigValue('end')}&`
          : '',
    disableKeyboard: 'disablekb=1',
    needsConfirmation: getConfigValue('needsConfirmation'),
}));

//change: fix change domain based on advancedPrivacyMode config
const YOUTUBE_URL = 'https://www.youtube.com/embed/';
const YOUTUBE_NOCOOKIE_URL = 'https://www.youtube-nocookie.com/embed/';
const videoDomain = getConfigValue('advancedPrivacyMode')
    ? YOUTUBE_NOCOOKIE_URL
    : YOUTUBE_URL;

const videoUrl = `${videoDomain}\
            ${config.value.videoID}?\
            ${config.value.relatedVideos}\
            ${config.value.loop}\
            ${config.value.showControls}\
            ${config.value.start}\
            ${config.value.end}\
            ${config.value.disableKeyboard}`.replace(/ /g, '');

const confirmed = ref(false);
</script>
<template>
  <CmsElementVideoConfirmation
    v-if="config.needsConfirmation && !confirmed"
    :preview-url="content.data.media.url"
    :alt="'Video preview'"
    v-model="confirmed"
  />
  <template v-else>
    <div class="cms-element-youtube-video">
      <iframe class="inset-0 aspect-video w-full" :src="videoUrl" />
    </div>
  </template>
</template>

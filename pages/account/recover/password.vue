<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast';

const { toast } = useToast();
const route = useRoute();
const { t } = useI18n();

const hashQuery: Ref<undefined | string> = ref(route.query.hash?.toString() || undefined);

onMounted(() => {
  if(!hashQuery.value) {
    toast({
      title: t('account.recover.hash.missing'),
    });
  }
})

</script>

<template>
  <div class="container relative flex justify-center py-4">
    <div class="w-full md:w-2/3 xl:w-1/2">
      <AccountPageRecoverPassword v-if="hashQuery" />
      <AccountPageRecover v-else />
    </div>
  </div>
</template>
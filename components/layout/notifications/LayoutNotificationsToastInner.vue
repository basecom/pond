<script setup lang="ts">
import {useToast} from "../../ui/toast";
import type { Notification } from '@shopware/composables';

const { toast } = useToast();
const { t } = useI18n();
const prop = withDefaults(
    defineProps<{
      notification?: Notification,
    }>(),
    {
      notification: undefined,
    },

);

const isError = prop.notification?.type === 'danger';
  toast({variant: isError ? 'destructive': 'default',
    title: isError? t('error.generalTitle'): '', description: prop.notification?.message});
</script>
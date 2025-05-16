<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast';

const { toast } = useToast();

const click = () => {
    toast({
        title: 'Scheduled: Catch up',
        description: 'Friday, February 10, 2023 at 5:57 PM',
    });
};
</script>

<template>
    <div class="grid gap-4">
        <UiButton
            variant="outline"
            @click="() => click()"
        >
            Add to calendar
        </UiButton>
    </div>
</template>

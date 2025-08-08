<script setup lang="ts">
// Overrides node_modules/@shopware/cms-base-layer/components/public/SwPagination.vue
// Added cursor-pointer to all buttons & replaced snippets

defineProps<{
  total: number;
  current: number;
}>();

defineEmits<(e: 'changePage', page: number) => void>();
</script>
<template>
    <nav
        class="relative z-0 inline-flex rounded-md shadow-sm space-x-px"
        aria-label="Pagination"
    >
        <button
            v-if="current - 1 >= 2"
            class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border border-secondary-300 bg-white text-sm font-medium text-secondary-500 hover:bg-secondary-50"
            @click="$emit('changePage', current - 1)"
        >
            <span class="sr-only">{{ $t('general.pagination.prev') }}</span>
            <!-- Heroicon name: solid/chevron-left -->
            <div class="w-5 h-5 i-carbon-chevron-left" />
        </button>
        <button
            v-if="current > 2"
            class="cursor-pointer bg-white border-secondary-300 text-secondary-500 hover:bg-secondary-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            @click="$emit('changePage', 1)"
        >
            <span class="sr-only">{{ $t('general.pagination.page') }} </span>1
        </button>
        <span
            v-if="current - 1 > 2"
            class="relative inline-flex items-center px-4 py-2 border border-secondary-300 bg-white text-sm font-medium text-secondary-700"
        >
            ...
        </span>
        <button
            v-if="current > 1"
            class="cursor-pointer bg-white border-secondary-300 text-secondary-500 hover:bg-secondary-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            :class="[current == 2 ? 'rounded-l-md border border-secondary-300' : '']"
            @click="$emit('changePage', current - 1)"
        >
            <span class="sr-only">{{ $t('general.pagination.page') }} </span>{{ current - 1 }}
        </button>
        <button
            aria-current="page"
            class="cursor-pointer bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            :class="[
                current - 1 >= 1 ? '' : 'rounded-l-md border border-secondary-300',
                total == current ? 'rounded-r-md border border-secondary-300' : '',
            ]"
        >
            <span class="sr-only">{{ $t('general.pagination.page') }} </span>{{ current }}
        </button>
        <button
            v-if="current < total"
            class="cursor-pointer bg-white border-secondary-300 text-secondary-500 hover:bg-secondary-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            :class="[
                total == current + 1 ? 'rounded-r-md border border-secondary-300' : '',
            ]"
            @click="$emit('changePage', current + 1)"
        >
            <span class="sr-only">{{ $t('general.pagination.page') }} </span>{{ current + 1 }}
        </button>
        <span
            v-if="total - current > 2"
            class="relative inline-flex items-center px-4 py-2 border border-secondary-300 bg-white text-sm font-medium text-secondary-700"
        >
            ...
        </span>
        <button
            v-if="total - current > 1"
            class="cursor-pointer bg-white border-secondary-300 text-secondary-500 hover:bg-secondary-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            @click="$emit('changePage', total)"
        >
            {{ total }}
        </button>
        <button
            v-if="total > current + 1"
            class="cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border border-secondary-300 bg-white text-sm font-medium text-secondary-500 hover:bg-secondary-50"
            @click="$emit('changePage', current + 1)"
        >
            <span class="sr-only">{{ $t('general.pagination.next') }}</span>
            <!-- Heroicon name: solid/chevron-right -->
            <div class="w-5 h-5 i-carbon-chevron-right" />
        </button>
    </nav>
</template>

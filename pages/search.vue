<script setup lang="ts">
const route = useRoute();
const router = useRouter();



</script>

<template>
  <h1>
    Suchergebnisse für {{ route.query.search }}
  </h1>

  <template v-if="3 > 0">
    Ergebnisse
  </template>
  <template v-else>
    <h1>
      Keine Produkte gefunden
    </h1>
  </template>
</template>
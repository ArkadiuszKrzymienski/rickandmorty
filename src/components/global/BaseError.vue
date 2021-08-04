<template>
  <p class="error">{{ error }}</p>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";

export default defineComponent({
  props: {
    error: {
      type: Error || String,
    },
  },
});
</script>

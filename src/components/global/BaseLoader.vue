<template>
  <div class="loader" :style="{ height: sizeContainer + 'px' }">
    <div class="loader__circle" :style="{ height: sizeCircle + 'px', width: sizeCircle + 'px' }"></div>
  </div>
</template>

<script lang="ts">
import { PropType } from "@vue/composition-api";

export default {
  props: {
    sizeContainer: {
      type: Number as PropType<number>,
    },

    sizeCircle: {
      type: Number as PropType<number>,
    },
  },
};
</script>

<template>
  <div class="emptyList">
    <img class="emptyList__face" src="../../assets/face.png" alt="" />
    <p class="emptyList__text">There is nothing here...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";

export default defineComponent({
  props: {
    error: {
      type: String as PropType<string>,
    },
  },
});
</script>

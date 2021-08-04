<template>
  <div class="footer">
    <button class="footer__btn" @click="setActive(page - 1)" :disabled="page === 1">
      <img :src="arrowSrc('left')" alt="" />
    </button>

    <PageBtn :number="page - 4 + n" :maxPages="maxPages" :page="page" v-for="n in 7" :key="n" @clicked="setActive" />

    <button class="footer__btn" @click="setActive(page + 1)" :disabled="page === maxPages">
      <img :src="arrowSrc('right')" alt="" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/composition-api";

import PageBtn from "./PageBtn.vue";

export default defineComponent({
  name: "list",

  components: {
    PageBtn,
  },

  props: {
    page: {
      type: Number as PropType<number>,
    },
    maxPages: {
      type: Number as PropType<number>,
    },
  },

  setup(props, context) {
    function arrowSrc(dir: "left" | "right") {
      if ((props.page === 1 && dir === "left") || (props.page === props.maxPages && dir === "right")) {
        return require("../../assets/svg/" + dir + "Arrow.svg");
      } else {
        return require("../../assets/svg/" + dir + "ArrowActive.svg");
      }
    }

    function setActive(number: number): void {
      context.emit("setActivePage", number);
    }

    return { setActive, arrowSrc };
  },
});
</script>

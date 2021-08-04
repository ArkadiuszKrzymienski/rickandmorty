<template>
  <button
    v-if="number > 0 && number < maxPages + 1"
    class="footer__btn"
    @click="handleClick(btnNumber)"
    :class="{ 'footer__btn--active': number === page }"
  >
    {{ btnValue }}
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from "@vue/composition-api";
import { PropType } from "vue";

export default defineComponent({
  name: "PageBtn",

  props: {
    number: {
      type: Number as PropType<number>,
    },
    maxPages: {
      type: Number as PropType<number>,
    },
    page: {
      type: Number as PropType<number>,
    },
  },

  setup(props, context) {
    function handleClick(number) {
      context.emit("clicked", number);
    }

    const btnValue = computed((props) => {
      if (
        (props.number === props.page - 2 || props.number === props.page + 2) &&
        props.number !== 1 &&
        props.number !== 34
      ) {
        return "...";
      }

      if (props.number === props.page - 3) {
        return 1;
      }

      if (props.number === props.page + 3) {
        return props.maxPages;
      }

      return props.number;
    });

    const btnNumber = computed((props) => {
      if (props.number === props.page - 3) {
        return 1;
      }

      if (props.number === props.page + 3) {
        return props.maxPages;
      }

      return props.number;
    });

    return { handleClick, btnNumber, btnValue };
  },
});
</script>

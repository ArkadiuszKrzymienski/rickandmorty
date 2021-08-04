<template>
  <div class="select" :class="{ select__active: isActive }">
    <div @click="showOptionsList" class="select__value">
      <p class="select__value__text">{{ activeOption }}</p>

      <img class="select__value__arrow" src="../../assets/svg/selectArrow.svg" alt="" />
    </div>

    <div class="select__list">
      <div
        class="select__list__item"
        v-for="(option, index) in optionsList"
        :key="index"
        @click="changeActiveItem(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "@vue/composition-api";

import { selectType } from "../../types";

export default defineComponent({
  props: {
    optionsList: {
      type: Array as PropType<string[]>,
    },
  },

  setup(props, context) {
    const activeOption = ref<selectType>("name");
    const isActive = ref<boolean>(false);

    function changeActiveItem(value: selectType): void {
      activeOption.value = value;
      showOptionsList();

      context.emit("activeSelectValue", activeOption.value);
    }

    function showOptionsList(): void {
      isActive.value = !isActive.value;
    }

    return { activeOption, isActive, showOptionsList, changeActiveItem };
  },
});
</script>

<template>
  <div class="header">
    <div class="header__top">
      <div class="header__top__logo">
        <img src="../../assets/logo.png" alt="logo of serial Rick and Morty" class="header__top__logo__img" />
      </div>

      <div class="header__top__search">
        <p class="header__top__search__label">Search by</p>

        <BaseSelect :optionsList="['name', 'indentifier', 'episode']" @activeSelectValue="emitSelectValue" />

        <div class="header__top__search__container">
          <input type="text" class="header__top__search__container__input" v-model="inputValue" />

          <img class="header__top__search__icon" src="../../assets/svg/searchIcon.svg" alt="" />
        </div>
      </div>
    </div>

    <div class="header__bottom">
      <button class="header__bottom__btn" :class="{ 'header__bottom__btn--active': isAll }" @click="emitFavBtn('all')">
        All Characters
      </button>

      <button class="header__bottom__btn" :class="{ 'header__bottom__btn--active': !isAll }" @click="emitFavBtn('fav')">
        Favourites
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from "@vue/composition-api";

import BaseSelect from "../global/BaseSelect.vue";
import { selectType, favType } from "../../types";

export default defineComponent({
  name: "Header",

  components: {
    BaseSelect,
  },

  setup(props, context) {
    const inputValue = ref<string>("");

    watchEffect(() => {
      if (inputValue.value) {
        context.emit("inputValue", inputValue.value, "input");
      }
    });

    function emitSelectValue(value: selectType): void {
      inputValue.value = "";

      context.emit("selectValue", value, "select");
    }

    const isAll = ref<boolean>(true);

    function emitFavBtn(value: favType): void {
      isAll.value = value === "all" ? true : false;

      context.emit("favBtn", value, "fav");
    }

    return { inputValue, emitSelectValue, emitFavBtn, isAll };
  },
});
</script>

<template>
  <div class="list">
    <div class="list__header">
      <div class="list__header__column list__header__column--noLeftPadding">
        <p class="list__text">Photo</p>
      </div>

      <div class="list__header__column">
        <p class="list__text">Character ID</p>
      </div>

      <div class="list__header__column">
        <p class="list__text">Name</p>
      </div>

      <div class="list__header__column">
        <p class="list__text">Gender</p>
      </div>

      <div class="list__header__column">
        <p class="list__text">Species</p>
      </div>

      <div class="list__header__column">
        <p class="list__text">Last Episode</p>
      </div>

      <div class="list__header__column">
        <p class="list__text">Favourites</p>
      </div>
    </div>

    <BaseError v-if="error" :error="error"></BaseError>

    <BaseLoader v-if="isLoading" :sizeContainer="550" :sizeCircle="150" />

    <p
      class="list__table__noMatches"
      v-if="!list.length && !error && !isLoading"
    >
      No matches...
    </p>

    <div class="list__table" v-if="list.length && !isLoading && !error">
      <div
        class="list__table__row"
        v-for="character in filteredList"
        :key="character.id"
      >
        <div
          class="
            list__table__row__column
            list__table__row__column__avatar
            list__table__row__column--noPaddingLeft
          "
        >
          <img class="list__table__image" :src="character.image" alt="" />
        </div>
        <div class="list__table__row__column list__table__row__column__id">
          <p class="list__text list__text--marginRight">ID:</p>
          <p class="list__text">{{ character.id }}</p>
        </div>
        <div class="list__table__row__column list__table__row__column__name">
          <p class="list__text list__text--marginRight">Name:</p>

          <p class="list__text">{{ character.name }}</p>
        </div>
        <div class="list__table__row__column list__table__row__column__gender">
          <p class="list__text list__text--marginRight">Gender:</p>

          <img
            :src="
              require('../../assets/svg/' +
                character.gender.toLowerCase() +
                '.svg')
            "
            alt="gender icon"
            class="list__table__row__column__img"
          />
          <p class="list__text">
            {{ character.gender === "Alien" ? "unknown" : character.gender }}
          </p>
        </div>
        <div class="list__table__row__column list__table__row__column__species">
          <p class="list__text list__text--marginRight">Species:</p>

          <p class="list__text">{{ character.species }}</p>
        </div>
        <div class="list__table__row__column list__table__row__column__episode">
          <p class="list__text list__text--marginRight">Episode:</p>

          <p class="list__text">
            {{ "episode " + lastEpisode(character.episode) }}
          </p>
        </div>
        <div class="list__table__row__column list__table__row__column__fav">
          <div
            class="list__table__favourite"
            :class="{
              'list__table__favourite--fav': isFavourite(character.id),
            }"
            @click="toggleFavourite(character.id)"
          >
            <img
              src="../../assets/svg/star.svg"
              alt=""
              class="list__table__favourite__img"
              :class="{
                'list__table__favourite__img--fav': isFavourite(character.id),
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  computed,
} from "@vue/composition-api";

import BaseError from "../global/BaseError.vue";
import BaseLoader from "../global/BaseLoader.vue";

import { character } from "../../types";
import { PropType } from "vue";

export default defineComponent({
  name: "list",

  components: {
    BaseError,
    BaseLoader,
  },

  props: {
    list: { type: Array as any },
    isLoading: { type: Boolean },
    error: { type: String },
    isFav: { type: String },
  },

  setup(props) {
    function lastEpisode(episodeList: string[]): string {
      const number = episodeList[episodeList.length - 1].slice(-1);

      return number;
    }

    const filteredList = computed(() => {
      if (props.isFav === "fav") {
        return props.list.filter((elList: any) => {
          return idFavList.value.includes(elList.id);
        });
      }
      return props.list;
    });

    const idFavList: { value: number[] } = ref([]);

    function isFavourite(id: number): boolean {
      return idFavList.value.indexOf(id) !== -1;
    }

    function toggleFavourite(id: number): void {
      const index: number = idFavList.value.indexOf(id);

      if (index === -1) {
        idFavList.value.push(id);
        localStorage.setItem("favId", JSON.stringify(idFavList.value));
      } else {
        idFavList.value.splice(index, 1);
        localStorage.setItem("favId", JSON.stringify(idFavList.value));
      }
    }

    onMounted(() => {
      if (typeof localStorage.getItem("favId") === "string") {
        idFavList.value = JSON.parse(localStorage.getItem("favId") || "");
      }
    });

    return { lastEpisode, toggleFavourite, isFavourite, filteredList };
  },
});
</script>

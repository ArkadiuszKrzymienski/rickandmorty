<template>
  <div>
    <Header @selectValue="setValue" @inputValue="setValue" @favBtn="setValue" />

    <List
      :list="filteredList"
      :isLoading="isLoading"
      :error="error"
      :isFav="values.favValue.value"
    />

    <Footer :page="page" :maxPages="maxPages" @setActivePage="setActivePage" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch,
  computed,
} from "@vue/composition-api";
import { createLogger } from "vuex";

import Footer from "./components/footer/Footer.vue";
import Header from "./components/header/Header.vue";
import List from "./components/list/List.vue";

import { fetchCharacterList } from "./request/request";

import { selectType, favType, character } from "./types";

export default defineComponent({
  name: "App",
  components: {
    Footer,
    Header,
    List,
  },

  setup() {
    const values: {
      selectValue: { value: selectType };
      inputValue: { value: string };
      favValue: { value: favType };
    } = {
      selectValue: ref("name"),
      inputValue: ref(""),
      favValue: ref("all"),
    };

    function setValue(
      value: selectType | string | favType,
      type: "select" | "input" | "fav"
    ): void {
      values[type + "Value"].value = value;
    }

    watch(values.inputValue, () => {
      const value =
        values.selectValue.value === "indentifier"
          ? values.inputValue.value.replace(/\s/g, ",")
          : values.inputValue.value;

      getCharacterList(values.selectValue.value, value, page.value);
    });

    const list: { value: character[] } = ref([]);
    const isLoading: { value: boolean } = ref(true);
    const error: { value: string } = ref("");
    const page: { value: number } = ref(1);
    const maxPages: { value: number } = ref(1);

    function getCharacterList(
      filter: string,
      value: string | number,
      page: number
    ): void {
      isLoading.value = true;
      error.value = "";

      fetchCharacterList(filter, value, page)
        .then((res): void => {
          console.log(res);

          if (filter === "name") {
            maxPages.value = res.data.info.pages;
            list.value = setCharacterList(res.data.results, filter);
            isLoading.value = false;
          }

          if (filter === "indentifier") {
            list.value = setCharacterList(res.data, filter);
            isLoading.value = false;
          }

          if (filter === "episode") {
            let charactersID = "";
            res.data.characters.forEach((character: string): void => {
              charactersID =
                charactersID +
                character.substr(42, character.length - 42) +
                ",";
            });

            fetchCharacterList("indentifier", charactersID).then(
              (resID): void => {
                console.log(resID);
                list.value = setCharacterList(resID.data, "name");
                isLoading.value = false;
              }
            );
          }
        })
        .catch((err: Error): void => {
          error.value = err.toString();
          isLoading.value = false;
        });
    }

    function setCharacterList(
      res: any,
      filter: "indentifier" | "name"
    ): character[] {
      const characterList: character[] = [];

      if (filter === "indentifier") {
        const character: character = {
          episode: res.episode[res.episode.length - 1].slice(40),
          gender: res.gender,
          id: res.id,
          image: res.image,
          name: res.name,
          species: res.species,
        };
        characterList.push(character);

        return characterList;
      }

      res.forEach(
        ({ episode, gender, id, image, name, species }: character): void => {
          const character: character = {
            episode,
            gender,
            id,
            image,
            name,
            species,
          };

          characterList.push(character);
        }
      );

      return characterList;
    }

    const filteredList = computed(() => {
      if (values.favValue.value === "fav") {
        const favID = JSON.parse(localStorage.getItem("favId") || "");

        return list.value.filter((elList: character) => {
          return favID.includes(elList.id);
        });
      }
      return list.value;
    });

    function setActivePage(number: number) {
      page.value = number;
      getCharacterList(
        values.selectValue.value,
        values.inputValue.value,
        number
      );
    }

    onMounted(() => {
      getCharacterList("name", "", 1);
    });

    return {
      setValue,
      list,
      error,
      isLoading,
      filteredList,
      values,
      page,
      maxPages,
      setActivePage,
    };
  },
});
</script>

<style lang="scss">
@import "@/scss/app.scss";
</style>

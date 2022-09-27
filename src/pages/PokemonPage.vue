<template>
  <h2 v-if="!pokemon">Cargando...</h2>
  <div v-else>
    <h1>¿Quién es este pokemon?</h1>
    <PokemonImage :pokemonId="pokemon.id" :showPokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer($event)" />

    <h2 v-if="showAnswer">{{ message }}</h2>
    <button @click="newGame" class="button-31" role="button">Mezclar de nuevo</button>
  </div>
</template>

<script>
import PokemonImage from "@/components/PokemonImage.vue";
import PokemonOptions from "@/components/PokemonOptions.vue";
import getPokemonOptions from "@/helpers/getPokemonOptions";

export default {
  name: "PokemonPage",
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: true,
      showAnswer: false,
      message: "",
    };
  },
  components: {
    PokemonImage,
    PokemonOptions,
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();
      const randomInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[randomInt];
    },

    checkAnswer(pokemonId) {
      if (pokemonId === this.pokemon.id) {
        this.showPokemon = false;
        this.showAnswer = true;
        this.message = `¡Correcto! es ${this.pokemon.name}`;
      } else {
        this.showAnswer = true;
        this.showPokemon = false;
        this.message = `¡Incorrecto! es ${this.pokemon.name}`;
      }

      setTimeout(() => {
        this.mixPokemonArray();
        this.showPokemon = true;
        this.showAnswer = false;
      }, 2000);
    },

    newGame() {
      this.mixPokemonArray();
      this.showPokemon = true;
      this.showAnswer = false;
      this.message = "";
    },
  },

  mounted() {
    this.mixPokemonArray();
  },
};
</script>

<style scoped>
.button-31 {
  background-color: #222;
  border-radius: 4px;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: "Farfetch Basis", "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.5;
  margin: 0;
  max-width: none;
  min-height: 44px;
  min-width: 10px;
  outline: none;
  overflow: hidden;
  padding: 9px 20px 8px;
  position: relative;
  text-align: center;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 20rem;
}

.button-31:hover,
.button-31:focus {
  opacity: 0.75;
}
</style>

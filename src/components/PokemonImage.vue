<template>
  <div class="pokemon-container">
    <img class="fade-in front" :src="imageSrc" alt="Pokemon" />
    <img v-if="showPokemon" class="hidden-pokemon fade-in back" :src="imageSrc" alt="Pokemon" />
  </div>
</template>

<script>
export default {
  props: {
    pokemonId: Number,
    showPokemon: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  computed: {
    imageSrc() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`;
    },
  },
};
</script>

<style scoped>
/* Pokemon Picture */
.pokemon-container {
  display: grid;
  grid-template-areas: "poke";
  justify-items: center;
  margin: 2rem 0;
}

img {
  height: 200px;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}

.front {
  grid-area: poke;
  z-index: 10;
}
.back {
  grid-area: poke;
  z-index: 20;
}
.hidden-pokemon {
  filter: brightness(0);
}
</style>

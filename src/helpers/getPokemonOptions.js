import pokeApi from "@/api/pokemonApi";

const getPokemons = () => {
  const pokemons = Array.from({ length: 650 }, (_, i) => i + 1);

  return pokemons;
};

const getPokemonOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);

  const pokemons = await getPokemonName(mixedPokemons.slice(0, 4));

  return pokemons;
};

const getPokemonName = async ([pokemon1, pokemon2, pokemon3, pokemon4]) => {
  const promiseArr = [
    pokeApi.get(`/${pokemon1}`),
    pokeApi.get(`/${pokemon2}`),
    pokeApi.get(`/${pokemon3}`),
    pokeApi.get(`/${pokemon4}`),
  ];
  const [pokemonName1, pokemonName2, pokemonName3, pokemonName4] = await Promise.all(promiseArr);

  return [
    parsePokemonName(pokemonName1),
    parsePokemonName(pokemonName2),
    parsePokemonName(pokemonName3),
    parsePokemonName(pokemonName4),
  ];
};

const parsePokemonName = (pokemon) => {
  const pokemonName = pokemon.data.name;
  const pokemonNameCapitalized = pokemonName[0].toUpperCase() + pokemonName.slice(1);
  const pokemonId = pokemon.data.id;

  return { name: pokemonNameCapitalized, id: pokemonId };
};

export default getPokemonOptions;

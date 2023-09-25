const sectionContainer = document.querySelector(".pokemon-container");
const pokemonList = [];

document.addEventListener("DOMContentLoaded", () => {
  fetchPokemon();
});

const fetchPokemon = async () => {
  sectionContainer.innerHTML = "<p>Loading...</p>";
  try {
    for (let i = 1; i <= 100; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await response.json();
      pokemonList.push(data);
    }

    displayCardPokemon(pokemonList);
  } catch (err) {
    console.log("error : " + err);
  }
};

const displayCardPokemon = (data) => {
  const displayed = data
    .map((pokemon) => {
      return `<article class="pokemon-item">
        <img src=${pokemon.sprites.front_default} alt=${pokemon.name} />
        <p>${pokemon.name}</p>
    </article>`;
    })
    .join("");

  sectionContainer.innerHTML = displayed;
};

const inputSearch = document.querySelector(".input-search");

inputSearch.addEventListener("keyup", (e) => {
  const inputValues = e.currentTarget.value;

  if (inputValues.trim() !== "") {
    const searchValues = pokemonList.filter((pokemon) => {
      return pokemon.name.includes(inputValues);
    });

    if (searchValues.length === 0) {
      sectionContainer.innerHTML =
        "<p>The information you were looking for was not found.</p>";
    } else {
      displayCardPokemon(searchValues);
    }
  } else {
    displayCardPokemon(pokemonList);
  }
});

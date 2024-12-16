import "@ionic/core/css/ionic.bundle.css";
import "./style.css";

// Import PWA elements (for web capabilities)
import { defineCustomElements } from "@ionic/core/loader/index.js";
// Initialize PWA elements
defineCustomElements(window);

// Importa el archivo JSON directamente
import artistasData from "./data/artistas.json";

// Función para forzar el modo oscuro
document.body.classList.add("dark");

// Función para cargar datos del JSON
const modal = document.querySelector("ion-modal");

const artistList = document.getElementById("artist-list");
const searchBar = document.getElementById("search-artist");
const noArtistsMessage = document.getElementById("no-artists");

const renderArtists = (filter = " ") => {
  artistList.innerHTML = "";
  const filteredArtists = artistasData.artistas.filter((artist) =>
    artist.artista.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredArtists.length === 0) {
    noArtistsMessage.style.display = "block";
  } else {
    noArtistsMessage.style.display = "none";
    filteredArtists.forEach((artist) => {
      const item = document.createElement("ion-item");
      const thumbnail = document.createElement("ion-thumbnail");
      const img = document.createElement("img");
      const label = document.createElement("p");
      const button = document.createElement("ion-button");

      img.src = artist.foto;
      thumbnail.slot = "start";
      thumbnail.appendChild(img);

      label.textContent = artist.artista;

      button.textContent = "Ver canciones";
      button.className = "botones-c";
      button.addEventListener("click", () => showSongs(artist));

      item.appendChild(thumbnail);
      item.appendChild(label);
      item.appendChild(button);
      artistList.appendChild(item);
    });
  }
};

const showSongs = (artist) => {
  modal.isOpen = true;
  let contenido = document.getElementById("contenido-modal");
  let htmlC = '<div class="scrollable-list"> <ion-list>';
  artist.canciones.forEach((cancion) => {
    htmlC +=
      "<ion-item><p>" +
      cancion.nombreC +
      "</p> <ion-button style='margin-left:auto'>Enviar</ion-button></ion-item>";
  });
  htmlC += "</ion-list></div>";
  contenido.innerHTML = htmlC;
};

searchBar.addEventListener("ionInput", (event) => {
  renderArtists(event.target.value);
});

renderArtists(" ");

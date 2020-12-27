import './styles.css';
import { alert, defaultModules } from '@pnotify/core';
const debounce = require('lodash.debounce');

const container = document.querySelector('.block-country__list');

function fetchCountries(searchQuery) {
  `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=номер_страницы&per_page=12&key=19680039-e1175c59e60ae330767a22687`
  
  fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => response.status === 200 ? response.json() : response)
      .then(data => {
        if (data.status === 404) {
          alert({
  text: 'Zero matches found. Plese enter a more specific query!'
        });
        container.innerHTML = '';
        } else if (data.length === 1) {
          <div class="photo-card">
  <img src="" alt="" />

  <div class="stats">
    <p class="stats-item">
      <i class="material-icons">thumb_up</i>
      1108
    </p>
    <p class="stats-item">
      <i class="material-icons">visibility</i>
      320321
    </p>
    <p class="stats-item">
      <i class="material-icons">comment</i>
      129
    </p>
    <p class="stats-item">
      <i class="material-icons">cloud_download</i>
      176019
    </p>
  </div>
</div>
         const name = `<h1>${data[0]['name']}</h1>`;
        const capital = `<p>Capital: ${data[0]['capital']}</p>`;
        const population = `<p>Population: ${data[0]['population']}</p>`;
        const languages = `<ul>Languages: ${data[0]['languages'].map(value => '<li>' + value['name'] + '</li>').join('')}</ul>`;
        const flag = `<img width="100" height="100" src=${data[0]['flag']} />`
        container.innerHTML = `${name}${flag}${capital}${population}${languages}`;
      } else if (data.length <= 10) {
        container.innerHTML = `<h1>${data.map(value => '<li>' + value['name'] + '</li>').join('')}</ul>`;

      } else if (data.length > 10) {
        alert({
          text: 'Too many matches found. Plese enter a more specific query!'
        });
        container.innerHTML = '';
      } else { 
        alert({
  text: 'Zero matches found. Plese enter a more specific query!'
        });
        container.innerHTML = '';
      }
  });
};

  
const input = document.querySelector('#country-input');

input.addEventListener('input', debounce(function (event) {
  fetchCountries(event.target.value);
 }, 500))





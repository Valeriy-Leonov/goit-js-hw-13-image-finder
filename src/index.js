import './styles.css';
import { alert, defaultModules } from '@pnotify/core';
const debounce = require('lodash.debounce');

const apiKey = '19680039-e1175c59e60ae330767a22687';

let page = 1;
let globSerchQuery = '';

const container = document.querySelector('.gallery');

function getUrl() {
  return `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${globSerchQuery}&page=${page}&per_page=12&key=${apiKey}`;
}

function loadMore() {
  fetchData(globSerchQuery);
}

window.loadMore = loadMore;

function fetchData(searchQuery) {
  if (globSerchQuery === searchQuery) {
    page += 1;
  } else {
    page = 1;
  }
  globSerchQuery = searchQuery;
  const url = getUrl();
  
  fetch(url)
    .then(response => response.status === 200 ? response.json() : response)
    .then(data => {
      console.log('test data!', data);
        if (data.status === 404) {
          alert({
  text: 'Zero matches found. Plese enter a more specific query!'
        });
        container.innerHTML = '';
        } else if (data.hits.length) {
          let allContent = '';
          for (let item of data.hits) {
            const thumbUp = `<p class="stats-item"><i class="material-icons">thumb_up</i>${item.likes}</p>`;
            const visibility = ` <p class="stats-item"><i class="material-icons">visibility</i>${item.views}</p>`;
            const comment = ` <p class="stats-item"><i class="material-icons">comment</i>${item.comments}</p>`;
            const cloud_download = `<p class="stats-item"><i class="material-icons">cloud_download</i>${item.downloads}</p>`;
            const content = `<li><div class="photo-card"><img src="${item.webformatURL}" alt="" /><div class="stats">
                            ${thumbUp}${visibility}${comment}${cloud_download}</div></div></li>`;
            allContent += content;
          }

          allContent += `<button class="load-more" onclick="window.loadMore()">Load More</button>`
          

          container.innerHTML = allContent;
      } else { 
        alert({
  text: 'Zero matches found. Plese enter a more specific query!'
        });
        container.innerHTML = '';
      }
  });
};

  
const input = document.querySelector('input');

input.addEventListener('input', debounce(function (event) {
  fetchData(event.target.value);
 }, 500))





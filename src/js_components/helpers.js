import { genres } from '../Genres/genres.json';

export function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

export function getGenres(genre_ids, short = false) {
  const genresArray = [];

  genre_ids.map(id => {
    return genres.find(el => {
      if (el.id === id) return genresArray.push(el.name);
    });
  });

  if (genresArray.length > 2 && short) {
    return `${genresArray[0]}, ${genresArray[1]}, Other`;
  } else {
    return `${genresArray.join(', ')}`;
  }
}

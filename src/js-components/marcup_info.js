export default function createMarkup({
   overview,
   backdrop_path,
   genres,
   tagline,
   poster_path,
   title,
   vote_average,
   vote_count,
   popularity,
   original_title
}) {
   const url_img = 'https://image.tmdb.org/t/p/w500'
   return ` <div class="gallery__item">
          <a class="gallery__link" href=${url_img}${backdrop_path}>
              <img class="gallery__image" src="${poster_path}" alt="${title}" loading="lazy" />
          </a>
          <div class="gallery__info">
           <p class="gallery__info-item">
                  <b>original_title</b>${original_title}
              </p>
              <p class="gallery__info-item">
                  <b>popularity</b>${popularity}
              </p>
              <p class="gallery__info-item">
                  <b>vote_count</b>${vote_count}
              </p>
              <p class="gallery__info-item">
                  <b>vote_average</b>${vote_average}
              </p>
              <p class="gallery__info-item">
                  <b>Downloads</b>${overview}
              </p> <p class="gallery__info-item">
                  <b>Downloads</b>${genres}
              </p> <p class="gallery__info-item">
                  <b>Downloads</b>${tagline}
              </p> <p class="gallery__info-item">
                  <b>Downloads</b>${poster_path}
              </p>
          </div>
      </div>`
   // )
   // .join('');
}
// /    {
//    overview,
//    backdrop_path,
//    genres,
//    tagline,
//    poster_path,
//    title,
//    vote_average,
//    vote_count,
//    popularity,
//    original_title
// } =
import MovieList from './components/movie-list';

import moviesService from './movies-service';

const input = document.querySelector('.search-input');
const movieList = document.querySelector('.movies');

input.addEventListener('input', e => {
	const searchText = e.target.value;

	if(!searchText) {
		movieList.innerHTML = '';
		return;
	}

	moviesService.getVideoByText(searchText)
		.then(result => {
			const list = new MovieList(result);

			list.drawToDom(movieList);
		});
});
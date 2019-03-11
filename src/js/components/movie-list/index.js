import movie from '../movie';

export default class MovieList {
	constructor(data) {
		this.data = data;
		this.renderMovies();
	}
	
	drawToDom(selector) {
		this.clearList(selector);
		selector.appendChild(this.fragment);
	}

	renderMovies() {
		this.fragment = document.createDocumentFragment();

		this.data.results.forEach(data => {
			const article = document.createElement('article');
			article.classList.add('movie');
			article.innerHTML = movie(data); 
			this.fragment.appendChild(article);
		});
	}

	clearList(selector) {
		selector.innerHTML = '';
	}
}
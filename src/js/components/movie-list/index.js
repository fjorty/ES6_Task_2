import movie from '../movie';

export default class MovieList {
	init(data) {
		this.data = data;
	}

	drawToDom(selector) {
		this.selector = selector;
		this.clearList(selector);
		selector.appendChild(this.fragment);
		selector.classList.remove('hidden');
	}

	renderMovies(data) {
		this.fragment = document.createDocumentFragment();

		data.forEach(data => {
			const article = document.createElement('article');
			article.classList.add('movie', 'movie-hover', 'col-md-4');
			article.innerHTML = movie(data); 
			this.fragment.appendChild(article);
		});
	}

	clearList(selector) {
		selector.innerHTML = '';
		selector.classList.add('hidden');
	}

	sort(filter) {
		const data = [...this.data.results];

		if(filter === 'raiting-max') {
			this.sortByMaxRaiting(data);
		}

		if(filter === 'raiting-min') {
			this.sortByMinRaiting(data);
		}

		if(filter === 'date-new') {
			this.sortByNew(data);
		}

		if(filter === 'date-old') {
			this.sortByOld(data);
		}
	}

	sortByMaxRaiting(data) {
		data.sort((a, b) => {
			if(a.vote_average < b.vote_average) {
				return 1;
			} 
			
			if(a.vote_average > b.vote_average) {
				return -1;
			}
		});
		
		this.renderMovies(data);
		this.drawToDom(document.querySelector('.movies'));
	}
	sortByMinRaiting(data) {
		data.sort((a, b) => {
			if(a.vote_average > b.vote_average) {
				return 1;
			} 
			
			if(a.vote_average < b.vote_average) {
				return -1;
			}
		});

		this.renderMovies(data);
		this.drawToDom(document.querySelector('.movies'));
	}
	sortByNew(data) {
		
		console.log(data);
		data.sort((a, b) => {
			if(new Date(a.first_air_date) < new Date(b.first_air_date)) {
				return 1;
			} 
			
			if(new Date(a.first_air_date) > new Date(b.first_air_date)) {
				return -1;
			}
		});

		this.renderMovies(data);
		this.drawToDom(document.querySelector('.movies'));
	}
	sortByOld(data) {
		console.log(data);
		data.sort((a, b) => {
			if(new Date(a.first_air_date) > new Date(b.first_air_date)) {
				return 1;
			} 
			
			if(new Date(a.first_air_date) < new Date(b.first_air_date)) {
				return -1;
			}
		});

		this.renderMovies(data);
		this.drawToDom(document.querySelector('.movies'));
	}

	hide() {
		this.selector.style.display = 'none';
	}
}
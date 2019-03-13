import config from '../../config';
const listWrapper = document.querySelector('.list-wrapper');
const movieWrapper = document.querySelector('.movie-wrapper');

function renderMovie(data) {
	const mappingData = mapData(data);

    const html = `
        <a class="back">Back</a>
        <h2 class="movie-title">${mappingData.title}</h2>
        <div class="row">
            <div class="picture col-md-5 col-sm-3"><img src='${mappingData.img}'></div>
            <div class="info-wrapper col-md-7 col-sm-9">
                <data class="date"><b>First air date:</b> ${mappingData.date}</data>
                <div class="language"><b>Language:</b> ${mappingData.language}</div>
                <div class="status"><b>Status:</b> ${mappingData.status}</div>
                <div class="genres"><b>Genres:</b> ${mappingData.genres}</div>
                <div class="seasons"><b>Seasons:</b> ${mappingData.seasons}</div>
                <div class="episodes"><b>Episodes:</b> ${mappingData.episodes}</div>
                <div class="runtime"><b>Episode run time:</b> ${mappingData.runtime}</div>
                <div class="popularity"><b>Popularity:</b> ${mappingData.popularity}</div>
                <div class="voteaverage"><b>Vote average:</b> ${mappingData.vote}</div>
                <div class="homepage"><b>Homepage:</b> <a href="${mappingData.homepage}">${mappingData.homepage}</a></div>
            </div>
        </div>
        <div class="overview"><b>Overview:</b></br>${mappingData.overview}</div>	
	`;

	render(html);
}

function mapData(data) {
    const defaultValue = 'unknown';

	return {
		title: data.original_name || data.name || 'Unknown',
		date: data.first_air_date || data.release_date || defaultValue,
		img: getPictureUrl(),
		language: data.original_language || defaultValue,
		overview: data.overview || defaultValue,
		popularity: data.popularity || defaultValue,
		vote: data.vote_average || defaultValue,
        id: data.id,
        episodes: data.number_of_episodes || defaultValue,
        seasons: data.number_of_seasons || defaultValue,
        runtime: data.episode_run_time[0] || defaultValue,
        genres: getGenres(data.genres),
        homepage: data.homepage || defaultValue,
        status: data.status || defaultValue
	}

	function getPictureUrl() {
		const url = data.poster_path || data.backdrop_path;

		if(url) {
			return config.imageSrc + url;
		} else {
			return config.noImageSrc;
		}
    }
    
    function getGenres(genres) {
        let newGenres = [];
        for(let i = 0; i < genres.length; i++) {
            newGenres.push(genres[i].name);
        }
        return newGenres;
    }
}

function render(html) {
    const element = document.createElement('article');
    
    element.classList.add('movie');
    element.innerHTML = html;
    movieWrapper.style.display = 'block'
    listWrapper.style.display = 'none';
    movieWrapper.innerHTML = '';
    movieWrapper.appendChild(element);

    const backButton = document.querySelector('.back');
    backButton.addEventListener('click', back);
}

function back() {
    listWrapper.style.display = 'block';
    movieWrapper.style.display = 'none'
}

export default {
    renderMovie,
    back
}
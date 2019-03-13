import config from '../../config';

export default function movie(data) {
	const mappingData = mapData(data);

	const html = `
		<a href="${mappingData.id}" class="movie-link">
			<h2 class="movie-title">${mappingData.title}</h2>
			<div class="row">
				<div class="picture col-md-5 col-sm-3"><img src='${mappingData.img}'></div>
				<div class="info-wrapper col-md-7 col-sm-9">
					<div class="mediatype"><b>Media type:</b> ${mappingData.mediatype}</div>
					<data class="date"><b>First air date:</b> ${mappingData.date}</data>
					<div class="language"><b>Language:</b> ${mappingData.language}</div>
					<div class="popularity"><b>Popularity:</b> ${mappingData.popularity}</div>
					<div class="voteaverage"><b>Vote average:</b> ${mappingData.vote}</div>
				</div>
			</div>
			<div class="overview"><b>Overview:</b></br>${mappingData.overview}</div>
		</a>		
	`;

	return html;
}

function mapData(data) {
	const defaultValue = 'unknown';

	return {
		title: data.original_title || data.title || data.original_name || data.name || 'Unknown',
		date: data.first_air_date || data.release_date || defaultValue,
		mediatype: data.media_type || defaultValue,
		img: getPictureUrl(),
		language: data.original_language || defaultValue,
		overview: data.overview || defaultValue,
		popularity: data.popularity || defaultValue,
		vote: data.vote_average || defaultValue,
		id: data.id
	}

	function getPictureUrl() {
		const url = data.poster_path || data.backdrop_path;

		if(url) {
			return config.imageSrc + url;
		} else {
			return config.noImageSrc;
		}
	}
}
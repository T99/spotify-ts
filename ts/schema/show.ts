/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 4:20 PM -- March 2nd, 2022
 * Project: spotify-ts
 */

export type Show = {
	id: string,
	type: string,
	name: string,
	description: string,
	explicit: boolean,
	publisher: string,
	total_episodes: number,
	href: string,
	uri: string,
	available_markets: string[],
	copyrights: any[],
	images: any[],
	episodes: {
		href: string,
		items: any[],
		limit: number,
		next: null,
		offset: number,
		previous: null,
		total: number
	},
	external_urls: {
		spotify: string
	},
	html_description: string,
	is_externally_hosted: boolean,
	languages: string[],
	media_type: string,
};

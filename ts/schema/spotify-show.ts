/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 10:29 AM -- March 8th, 2022
 * Project: @t99/spotify
 */

import { SpotifyPagination } from "./spotify-pagination";
import { SpotifyEpisode } from "./spotify-episode";
import { SpotifyCopyright } from "./spotify-copyright";
import { SpotifyBaseAudioObject } from "./spotify-base-audio-object";

export interface SpotifyShow extends SpotifyBaseAudioObject {
	
	/**
	 * A description of the show. HTML tags are stripped away from this field, use html_description field in case HTML
	 * tags are needed.
	 */
	readonly description: string;
	
	/**
	 * A description of the show. This field may contain HTML tags.
	 */
	readonly html_description: string;
	
	/**
	 * Whether or not the show has explicit content (true = yes it does; false = no it does not OR unknown).
	 */
	readonly explicit: boolean;
	
	readonly is_externally_hosted: boolean;
	
	readonly languages: string[];
	
	readonly media_type: string;
	
	readonly publisher: string;
	
	readonly episodes: SpotifyPagination<SpotifyEpisode>;
	
	readonly copyrights: SpotifyCopyright[];
	
}

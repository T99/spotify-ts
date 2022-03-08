/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 9:20 AM -- March 8th, 2022
 * Project: spotify-api
 */

import { SpotifyBaseObject } from "./spotify-base-object";

/**
 * The object format for an artist, as provided by the Spotify API.
 * 
 * @author Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/)
 * @version v0.1.0
 * @since v0.1.0
 */
export interface SpotifyArtist extends SpotifyBaseObject {
	
	readonly type: "artist";
	
	/**
	 * The popularity of the artist. The value will be between 0 and 100, with 100 being the most popular. The artist's
	 * popularity is calculated from the popularity of all the artist's tracks.
	 */
	readonly popularity: number;
	
	/**
	 * Information about the followers of the artist.
	 */
	readonly followers: {
		
		/**
		 * This will always be set to null, as the Web API does not support it at the moment.
		 */
		readonly href: null;
		
		/**
		 * The total number of followers.
		 */
		readonly total: number;
		
	};
	
	/**
	 * A list of the genres the artist is associated with. If not yet classified, the array is empty.
	 */
	readonly genres: string[];
	
}

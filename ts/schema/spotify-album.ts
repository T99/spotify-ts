/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 9:32 AM -- March 8th, 2022
 * Project: spotify-api
 */

import { SpotifyBaseObject } from "./spotify-base-object";
import { SpotifyArtist } from "./spotify-artist";
import { SpotifyPagination } from "./spotify-pagination";
import { SpotifyTrack } from "./spotify-track";

export interface SpotifyAlbum extends SpotifyBaseObject {
	
	readonly type: "album";
	
	/**
	 * The type of the album.
	 * 
	 * Allowed values: 'album', 'single', or 'compilation'.
	 */
	readonly album_type: "album" | "single" | "compilation";
	
	/**
	 * The number of tracks in the album.
	 */
	readonly total_tracks: number;
	
	/**
	 * The date the album was first released.
	 */
	readonly release_date: string;
	
	/**
	 * The precision with which <code>release_date</code> value is known.
	 * 
	 * Allowed values: 'year', 'month', or 'day'.
	 */
	readonly release_date_precision: "year" | "month" | "day";
	
	/**
	 * Included in the response when a content restriction is applied.
	 */
	readonly restrictions: {
		
		/**
		 * The reason for the restriction. Albums may be restricted if the content is not available in a given market,
		 * to the user's subscription type, or when the user's account is set to not play explicit content. Additional
		 * reasons may be added in the future.
		 * 
		 * Allowed values: 'market', 'production', or 'explicit'.
		 */
		readonly reason: "market" | "production" | "explicit";
		
	};
	
	/**
	 * The artists of the album.
	 */
	readonly artists: SpotifyArtist[];
	
	/**
	 * The tracks of the album.
	 */
	readonly tracks: SpotifyPagination<SpotifyTrack>;
	
}

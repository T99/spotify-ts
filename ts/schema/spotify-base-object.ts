/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 9:12 AM -- March 8th, 2022
 * Project: @t99/spotify
 */

import { SpotifyImage } from "./spotify-image";

export interface SpotifyBaseObject {
	
	/**
	 * The <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify ID</a> of the
	 * object.
	 */
	readonly id: string;
	
	/**
	 * The object type.
	 */
	readonly type: "album" | "artist" | "episode" | "show" | "track" | "user";
	
	/**
	 * A link to the Web API endpoint providing full details for this object.
	 */
	readonly href: string;
	
	/**
	 * The <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify URI</a> for the
	 * object.
	 */
	readonly uri: string;
	
	/**
	 * Images relevant to this object, widest first.
	 */
	readonly images: SpotifyImage[];
	
	/**
	 * Known external URLs for this album.
	 */
	readonly external_urls: {
		
		/**
		 * The <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify URL</a> for
		 * the object.
		 */
		spotify: string;
		
	};
	
}

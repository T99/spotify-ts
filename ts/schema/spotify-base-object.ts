/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 9:12 AM -- March 8th, 2022
 * Project: spotify-api
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
	readonly type: "album" | "artist" | "episode" | "show" | "track";
	
	/**
	 * The name of this object.
	 */
	readonly name: string;
	
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
	 * The markets in which the album is available: <a href="http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1
	 * alpha-2 country codes</a>.
	 */
	readonly available_markets: string[];
	
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

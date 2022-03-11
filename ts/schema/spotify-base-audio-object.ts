/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 1:07 PM -- March 11th, 2022
 * Project: @t99/spotify
 */

import { SpotifyBaseObject } from "./spotify-base-object";

export interface SpotifyBaseAudioObject extends SpotifyBaseObject {
	
	/**
	 * The name of this object.
	 */
	readonly name: string;
	
	/**
	 * The markets in which the album is available: <a href="http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1
	 * alpha-2 country codes</a>.
	 */
	readonly available_markets: string[];

	
	
}

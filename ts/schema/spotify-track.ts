/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 9:11 AM -- March 8th, 2022
 * Project: @t99/spotify
 */

import { SpotifyBaseObject } from "./spotify-base-object";
import { SpotifyArtist } from "./spotify-artist";
import { SpotifyAlbum } from "./spotify-album";

/**
 * The object format for a track, as provided by the Spotify API.
 * 
 * @author Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/)
 * @version v0.1.0
 * @since v0.1.0
 */
export interface SpotifyTrack extends SpotifyBaseObject {
	
	readonly type: "track";
	
	/**
	 * The album on which the track appears.
	 */
	readonly album: SpotifyAlbum;
	
	/**
	 * The artists who performed the track.
	 */
	readonly artists: SpotifyArtist[];
	
	/**
	 * The disc number (usually 1 unless the album consists of more than one disc).
	 */
	readonly disc_number: number;
	
	/**
	 * The track length in milliseconds.
	 */
	readonly duration_ms: number;
	
	/**
	 * Whether or not the track has explicit lyrics (true = yes it does; false = no it does not OR unknown).
	 */
	readonly explicit: boolean;
	
	/**
	 * Known external IDs for the track.
	 */
	readonly external_ids: {
		
		/**
		 * <a href="http://en.wikipedia.org/wiki/International_Standard_Recording_Code">International Standard Recording
		 * Code</a>
		 */
		readonly isrc: string;
		
		/**
		 * <a href="http://en.wikipedia.org/wiki/International_Article_Number_%28EAN%29">International Article
		 * Number</a>
		 */
		readonly ean: string;
		
		/**
		 * <a href="http://en.wikipedia.org/wiki/Universal_Product_Code">Universal Product Code</a>
		 */
		readonly upc: string;
		
	};
	
	/**
	 * Part of the response when Track Relinking is applied. If true, the track is playable in the given market.
	 * Otherwise false.
	 */
	readonly is_playable: boolean;
	
	/**
	 * Part of the response when
	 * <a href="https://developer.spotify.com/documentation/general/guides/track-relinking-guide/">Track Relinking</a>
	 * is applied, and the requested track has been replaced with different track. The track in the linked_from object
	 * contains information about the originally requested track.
	 */
	readonly linked_from: SpotifyTrack; // TODO [3/8/2022 @ 9:56 AM] Might this be potentially undefined?
	
	/**
	 * Included in the response when a content restriction is applied. See <a
	 * href="https://developer.spotify.com/documentation/web-api/reference/#object-trackrestrictionobject">Restriction
	 * Object</a> for more details.
	 */
	readonly restrictions: {
		
		/**
		 * The reason for the restriction.
		 * 
		 * Supported values:
		 *  - 'market': The content item is not available in the given market.
		 *  - 'product': The content item is not available for the user's subscription type.
		 *  - 'explicit': The content item is explicit and the user's account is set to not play explicit content.
		 */
		reason: string
		
	},
	
	/**
	 * The popularity of the track. The value will be between 0 and 100, with 100 being the most popular.
	 * 
	 * The popularity of a track is a value between 0 and 100, with 100 being the most popular. The popularity is
	 * calculated by algorithm and is based, in the most part, on the total number of plays the track has had and how
	 * recent those plays are.
	 * 
	 * Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were
	 * played a lot in the past. Duplicate tracks (e.g. the same track from a single and an album) are rated
	 * independently. Artist and album popularity is derived mathematically from track popularity. Note: the popularity
	 * value may lag actual popularity by a few days: the value is not updated in real time.
	 */
	readonly popularity: number,
	
	/**
	 * A link to a 30 second preview (MP3 format) of the track. Can be null.
	 */
	readonly preview_url: string | null;
	
	/**
	 * The number of the track. If an album has several discs, the track number is the number on the specified disc.
	 */
	readonly track_number: number;
	
	/**
	 * Whether or not the track is from a local file.
	 */
	readonly is_local: boolean;
	
}

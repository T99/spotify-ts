/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 2:27 PM -- February 25th, 2022
 * Project: spotify-api
 */

import { request, RequestResponse } from "./request";
import { SpotifyShow } from "./schema/spotify-show";
import { SpotifyPagination } from "./schema/spotify-pagination";
import { SpotifyAlbum } from "./schema/spotify-album";
import { SpotifySingleKeyObject } from "./schema/spotify-single-key-object";
import { SpotifyTrack } from "./schema/spotify-track";
import { SpotifyArtist } from "./schema/spotify-artist";

export type MarketSpecifier = {
	
	/**
	 * An <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 alpha-2 country code</a>.
	 * 
	 * If a country code is specified, only content that is available in that market will be returned.
	 * 
	 * If a valid user access token is specified in the request header, the country associated with the user account
	 * will take priority over this parameter.
	 * 
	 * Note: If neither market or user country are provided, the content is considered unavailable for the client. Users
	 * can view the country that is associated with their account in the account settings.
	 * 
	 * Example value: "ES"
	 */
	market?: string;

};

export type CountrySpecifier = {
	
	/**
	 * A country: an <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 alpha-2 country code</a>.
	 *
	 * Provide this parameter if you want the list of returned items to be relevant to a particular country. If omitted,
	 * the returned items will be relevant to all countries.
	 * 
	 * Example value: "SE"
	 */
	country?: string;
	
};

export type PaginationSpecifier = {
	
	/**
	 * The maximum number of items to return.
	 * 
	 * Default: 20
	 * Minimum: 1
	 * Maximum: 50
	 */
	limit?: number;
	
	/**
	 * The index of the first item to return. Use with limit to get the next set of items.
	 * 
	 * Default: 0 (the first item)
	 */
	offset?: number;
	
};

export type AlbumGroupsSpecifier = {
	
	/**
	 * A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types
	 * will be returned.
	 * 
	 * Valid values are:
	 *  - album
	 *  - single
	 *  - appears_on
	 *  - compilation
	 *  
	 * Example value: "single,appears_on"
	 */
	include_groups?: string;
	
};

export class SpotifyAPI {
	
	public static readonly BASE_API_URL: string = "https://api.spotify.com/";
	
	protected accessToken: string;
	
	public constructor(accessToken: string) {
		
		this.accessToken = accessToken;
		
	}
	
	public static async createWithClientInfo(clientID: string, clientSecret: string): Promise<SpotifyAPI> {
		
		let authHeaderValue: string = Buffer.from(`${clientID}:${clientSecret}`).toString("base64");
		let formData: URLSearchParams = new URLSearchParams();
		
		formData.append("grant_type", "client_credentials");
		
		let response: RequestResponse = await request("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": `Basic ${authHeaderValue}`
			},
		}, formData.toString());
		
		if (response.status === 200) return new SpotifyAPI(response.body.access_token);
		else throw new Error(`Failed to initialize a connection with the Spotify API. Response body: ${response.body}`);
		
	}
	
	protected getAuthorizationHeaderValue(): string {
		
		return `Bearer ${this.accessToken}`;
		
	}
	
	protected getBaseRequestHeaders(): object {
		
		return {
			"Authorization": this.getAuthorizationHeaderValue(),
			"Content-Type": "application/json"
		};
		
	}
	
	protected async query<T>(method: string, endpoint: string, parameters: { [param: string]: any } = {}): Promise<T> {
		
		let url: URL = new URL(endpoint, SpotifyAPI.BASE_API_URL);
		
		for (let key of Object.keys(parameters)) {
			
			if (parameters[key] !== undefined) url.searchParams.append(key, parameters[key].toString());
			
		}
		
		let response: RequestResponse = await request(url, {
			method,
			headers: {
				...this.getBaseRequestHeaders()
			}
		});
		
		if (response.status === 200) return response.body as T;
		else throw new Error(`Failed to query the Spotify API. Error/response body: ${response.body}`);
		
	}
	
	// ===== ALBUM ENDPOINTS =====
	
	/**
	 * Get Spotify catalog information for a single album.
	 * 
	 * @param {string} albumID The
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify ID</a> of the album.
	 * @param {MarketSpecifier} options Optional parameters for this endpoint. See the documentation for the individual
	 * parameter types for more information.
	 * @returns {Promise<SpotifyAlbum>} A Promise that resolves to Spotify catalog information for a single album.
	 */
	public getAlbum(albumID: string, options: MarketSpecifier = {}): Promise<SpotifyAlbum> {

		return this.query("GET", `/albums/${albumID}`, options);

	}
	
	/**
	 * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
	 * 
	 * @param {string[]} albumIDs A comma-separated list of the
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify IDs</a> for the
	 * albums. Maximum: 20 IDs.
	 * @param {MarketSpecifier} options Optional parameters for this endpoint. See the documentation for the individual
	 * parameter types for more information.
	 * @returns {Promise<SpotifySingleKeyObject<"albums", SpotifyAlbum[]>>} A Promise that resolves to Spotify catalog
	 * information for multiple albums. 
	 */
	public getSeveralAlbums(albumIDs: string[], options: MarketSpecifier = {}):
		Promise<SpotifySingleKeyObject<"albums", SpotifyAlbum[]>> {
		
		return this.query("GET", `/albums`, options);
		
	}
	
	/**
	 * Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of
	 * tracks returned.
	 * 
	 * @param {string} albumID The
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify ID</a> of the album.
	 * @param {MarketSpecifier & PaginationSpecifier} options Optional parameters for this endpoint. See the
	 * documentation for the individual parameter types for more information.
	 * @returns {Promise<SpotifyPagination<SpotifyTrack>>} A Promise that resolves to Spotify catalog information about
	 * an album’s tracks.
	 */
	public getAlbumTracks(albumID: string, options: MarketSpecifier & PaginationSpecifier = {}):
		Promise<SpotifyPagination<SpotifyTrack>> {
		
		return this.query("GET", `/albums/${albumID}/tracks`, options);
		
	}
	
	/**
	 * Get a list of the albums saved in the current Spotify user's 'Your Music' library.
	 * 
	 * @param {MarketSpecifier & PaginationSpecifier} options Optional parameters for this endpoint. See the
	 * documentation for the individual parameter types for more information.
	 * @returns {Promise<SpotifyPagination<SpotifyAlbum>>} A Promise that resolves to a list of the albums saved in the
	 * current Spotify user's 'Your Music' library.
	 */
	public getSavedAlbums(options: MarketSpecifier & PaginationSpecifier = {}): Promise<SpotifyPagination<SpotifyAlbum>> {
		
		return this.query("GET", `/me/albums`, options);
		
	}
	
	// TODO [3/8/2022 @ 4:53 PM] - Endpoint 'Save Albums'
	
	// TODO [3/8/2022 @ 4:53 PM] - Endpoint 'Remove Albums'
	
	/**
	 * Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
	 * 
	 * @param {string[]} albumIDs A comma-separated list of the
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify IDs</a> for the
	 * albums. Maximum: 20 IDs.
	 * @returns {Promise<boolean[]>} A Promise that resolves to an array of booleans that each respectively match back
	 * the list provided input array of album IDs to indicate whether or not the album with that album ID is already
	 * saved in the current Spotify user's 'Your Music' library.
	 */
	public checkSavedAlbums(albumIDs: string[]): Promise<boolean[]> {
		
		return this.query("GET", `/me/albums/contains`, { ids: albumIDs });
		
	}
	
	/**
	 * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
	 * 
	 * @param {CountrySpecifier & PaginationSpecifier} options Optional parameters for this endpoint. See the
	 * documentation for the individual parameter types for more information.
	 * @returns {Promise<SpotifySingleKeyObject<"albums", SpotifyPagination<SpotifyAlbum>>>} A Promise that resolves to
	 * a list of new album releases featured in Spotify.
	 */
	public getNewReleases(options: CountrySpecifier & PaginationSpecifier = {}):
		Promise<SpotifySingleKeyObject<"albums", SpotifyPagination<SpotifyAlbum>>> {
		
		return this.query("GET", `/browse/new-releases`, options);
		
	}
	
	// ===== ARTIST ENDPOINTS =====
	
	/**
	 * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
	 * 
	 * @param {string} artistID The
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify ID</a> of the artist.
	 * @returns {Promise<SpotifyArtist>} A Promise that resolves to Spotify catalog information for a single artist.
	 */
	public getArtist(artistID: string): Promise<SpotifyArtist> {
		
		return this.query("GET", `/artist/${artistID}`);
		
	}
	
	/**
	 * Get Spotify catalog information for several artists based on their Spotify IDs.
	 * 
	 * @param {string[]} artistIDs A comma-separated list of the
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify IDs</a> for the
	 * artists. Maximum: 50 IDs.
	 * @returns {Promise<SpotifySingleKeyObject<"artists", SpotifyArtist[]>>} A Promise that resolves to Spotify catalog
	 * information for several artists.
	 */
	public getSeveralArtists(artistIDs: string[]): Promise<SpotifySingleKeyObject<"artists", SpotifyArtist[]>> {
		
		return this.query("GET", `/artists`, { ids: artistIDs });
		
	}
	
	/**
	 * Get Spotify catalog information about an artist's albums.
	 * 
	 * @param {string} artistID The
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify ID</a> of the artist.
	 * @param {AlbumGroupsSpecifier & MarketSpecifier & PaginationSpecifier} options Optional parameters for this
	 * endpoint. See the documentation for the individual parameter types for more information.
	 * @returns {Promise<SpotifyPagination<SpotifyAlbum>>} A Promise that resolves to Spotify catalog information about
	 * an artist's albums.
	 */
	public getArtistsAlbums(artistID: string,
							options: AlbumGroupsSpecifier & MarketSpecifier & PaginationSpecifier = {}):
		Promise<SpotifyPagination<SpotifyAlbum>> {
		
		return this.query("GET", `/artists/${artistID}/albums`, options);
		
	}
	
	/**
	 * Get Spotify catalog information about an artist's top tracks by country.
	 * 
	 * @param {string} artistID The
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify ID</a> of the artist.
	 * @param {MarketSpecifier} options Optional parameters for this endpoint. See the documentation for the individual
	 * parameter types for more information.
	 * @returns {Promise<SpotifySingleKeyObject<"tracks", SpotifyTrack[]>>} A Promise that resolves to Spotify catalog
	 * information about an artist's top tracks by country.
	 */
	public getArtistsTopTracks(artistID: string, options: MarketSpecifier = {}):
		Promise<SpotifySingleKeyObject<"tracks", SpotifyTrack[]>> {
		
		return this.query("GET", `/artists/${artistID}/top-tracks`, options);
		
	}
	
	/**
	 * Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the
	 * Spotify community's <a href="http://news.spotify.com/se/2010/02/03/related-artists/">listening history</a>.
	 * 
	 * @param {string} artistID The
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify ID</a> of the artist.
	 * @returns {Promise<SpotifySingleKeyObject<"artists", SpotifyArtist[]>>} A Promise that resolves to Spotify catalog
	 * information about artists similar to a given artist.
	 */
	public getArtistsRelatedArtists(artistID: string): Promise<SpotifySingleKeyObject<"artists", SpotifyArtist[]>> {
		
		return this.query("GET", `/artists/${artistID}/related-artists`);
		
	}
	
	// ===== SHOW ENDPOINTS =====
	
	/**
	 * Get Spotify catalog information for a single show identified by its unique Spotify ID.
	 *
	 * @param {string} showID The
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify ID</a> for the show.
	 * @param {MarketSpecifier} options Optional parameters for this endpoint. See the documentation for the individual
	 * parameter types for more information.
	 * @returns {Promise<SpotifyShow>} A Promise that resolves to Spotify catalog information for a single show.
	 */
	public getShow(showID: string, options: MarketSpecifier = {}): Promise<SpotifyShow> {
		
		return this.query("GET", `/v1/shows/${showID}`, options);
		
	}
	
	/**
	 * Get Spotify catalog information for several shows based on their Spotify IDs.
	 * 
	 * @param {string[]} showIDs A comma-separated list of the
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify IDs</a> for the
	 * shows. Maximum: 50 IDs.
	 * @param {MarketSpecifier} options Optional parameters for this endpoint. See the documentation for the individual
	 * parameter types for more information.
	 * @returns {Promise<SpotifySingleKeyObject<"shows", SpotifyShow[]>>} A Promise that resolves to Spotify catalog
	 * information for several shows.
	 */
	public getSeveralShows(showIDs: string[], options: MarketSpecifier = {}):
		Promise<SpotifySingleKeyObject<"shows", SpotifyShow[]>> {
		
		return this.query("GET", `/shows`, options);
		
	}
	
	/**
	 * Get Spotify catalog information about a show’s episodes. Optional parameters can be used to limit the number of
	 * episodes returned.
	 * 
	 * @param {string} showID The
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify ID</a> for the show.
	 * @param {MarketSpecifier & PaginationSpecifier} options Optional parameters for this endpoint. See the
	 * documentation for the individual parameter types for more information.
	 * @returns {Promise<SpotifyPagination<SpotifyShow>>} A Promise that resolves to Spotify catalog information about a
	 * show’s episodes.
	 */
	public getShowEpisodes(showID: string, options: MarketSpecifier & PaginationSpecifier = {}):
		Promise<SpotifyPagination<SpotifyShow>> {
		
		return this.query("GET", `/shows/${showID}/episodes`, options);
		
	}
	
	/**
	 * Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.
	 * 
	 * @param {PaginationSpecifier} options Optional parameters for this endpoint. See the documentation for the
	 * individual parameter types for more information.
	 * @returns {Promise<SpotifyPagination<SpotifyShow>>} A Promise that resolves to a list of shows saved in the
	 * current Spotify user's library.
	 */
	public getUsersSavedShows(options: PaginationSpecifier = {}): Promise<SpotifyPagination<SpotifyShow>> {
		
		return this.query("GET", `/me/shows`, options);
		
	}
	
	// TODO [3/8/2022 @ 4:49 PM] - Endpoint: 'Save Shows for Current User'
	
	// TODO [3/8/2022 @ 4:50 PM] - Endpoint 'Remove User's Saved Shows'
	
	/**
	 * Check if one or more shows is already saved in the current Spotify user's library.
	 * 
	 * @param {string[]} showIDs A comma-separated list of the
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify IDs</a> for the
	 * shows. Maximum: 50 IDs.
	 * @returns {Promise<boolean[]>} A Promise that resolves to an array of booleans that each respectively match back
	 * the list provided input array of show IDs to indicate whether or not the show with that show ID is already
	 * saved in the current Spotify user's library.
	 */
	public checkUsersSavedShows(showIDs: string[]): Promise<boolean[]> {
		
		return this.query("GET", `/me/shows/contains`, { ids: showIDs });
		
	}
	
	// ===== EPISODE ENDPOINTS =====
	
	// ===== TRACK ENDPOINTS =====
	
	// ===== SEARCH ENDPOINTS =====
	
	// ===== USER ENDPOINTS =====
	
	// ===== PLAYLIST ENDPOINTS =====
	
	// ===== CATEGORY ENDPOINTS =====
	
	// ===== GENRE ENDPOINTS =====
	
	// ===== PLAYER ENDPOINTS =====
	
	// ===== MARKET ENDPOINTS =====
	
}

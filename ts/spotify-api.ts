/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 2:27 PM -- February 25th, 2022
 * Project: @t99/spotify
 */

import util from "util";
import { request, RequestResponse } from "./request";
import { SpotifyShow } from "./schema/spotify-show";
import { SpotifyPagination } from "./schema/spotify-pagination";
import { SpotifyAlbum } from "./schema/spotify-album";
import { SpotifySingleKeyObject } from "./schema/spotify-single-key-object";
import { SpotifyTrack } from "./schema/spotify-track";
import { SpotifyArtist } from "./schema/spotify-artist";
import { SpotifyEpisode } from "./schema/spotify-episode";
import { SpotifyAudioFeatures } from "./schema/spotify-audio-features";
import { SpotifyAudioAnalysis } from "./schema/spotify-audio-analysis";
import { SpotifyRecommendations } from "./schema/spotify-recommendations";
import { SpotifySearchResults } from "./schema/spotify-search-results";
import {
	AlbumGroupsSpecifier, CountrySpecifier, LimitSpecifier,
	MarketSpecifier,
	PaginationSpecifier,
	RecommendationsSpecifier, SearchSpecifier
} from "./spotify-specifiers";
import { SpotifyScope } from "./spotify-scopes";

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
	
	public static async createWithLogin(clientID: string, redirectURI: string, scopes: SpotifyScope[]): Promise<any> {
		
		let authorizationURL: URL = new URL("https://accounts.spotify.com/authorize");
		let state: string = "rand16charstring";
		
		authorizationURL.searchParams.append("response_type", "code");
		authorizationURL.searchParams.append("client_id", clientID);
		authorizationURL.searchParams.append("scope", scopes.join(" "));
		authorizationURL.searchParams.append("redirect_uri", redirectURI);
		authorizationURL.searchParams.append("state", state);
		
		console.log(authorizationURL.href);
		
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
		
		let url: URL = new URL(`/v1${endpoint}`, SpotifyAPI.BASE_API_URL);
		
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
		else throw new Error(`Failed to query the Spotify API. Error/response body: ${util.inspect(response.body, false, null, true)}`);
		
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
		
		return this.query("GET", `/shows/${showID}`, options);
		
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
	
	/**
	 * Get Spotify catalog information for a single episode identified by its unique Spotify ID.
	 * 
	 * @param {string} episodeID The
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify ID</a> for the
	 * episode.
	 * @param {MarketSpecifier} options Optional parameters for this endpoint. See the documentation for the individual
	 * parameter types for more information.
	 * @returns {Promise<SpotifyEpisode>} A Promise that resolves to Spotify catalog information for a single episode.
	 */
	public getEpisode(episodeID: string, options: MarketSpecifier = {}): Promise<SpotifyEpisode> {
		
		return this.query("GET", `/episodes/${episodeID}`, options);
		
	}
	
	/**
	 * Get Spotify catalog information for several episodes based on their Spotify IDs.
	 * 
	 * @param {string[]} episodeIDs A comma-separated list of the
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify IDs</a> for the
	 * episodes. Maximum: 50 IDs.
	 * @param {MarketSpecifier} options Optional parameters for this endpoint. See the documentation for the individual
	 * parameter types for more information.
	 * @returns {Promise<SpotifySingleKeyObject<"episodes", SpotifyEpisode[]>>} A Promise that resolves to Spotify
	 * catalog information for several episodes.
	 */
	public getSeveralEpisodes(episodeIDs: string[], options: MarketSpecifier = {}):
		Promise<SpotifySingleKeyObject<"episodes", SpotifyEpisode[]>> {
		
		return this.query("GET", `/episodes`, { ids: episodeIDs, ...options });
		
	}
	
	/**
	 * Get a list of the episodes saved in the current Spotify user's library.
	 * 
	 * This API endpoint is in beta and could change without warning. Please share any feedback that you have, or issues
	 * that you discover, in our
	 * <a href="https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer">developer community
	 * forum.</a>
	 * 
	 * @param {MarketSpecifier & PaginationSpecifier} options Optional parameters for this endpoint. See the
	 * documentation for the individual parameter types for more information.
	 * @returns {Promise<SpotifyPagination<SpotifyEpisode>>} A Promise that resolves to a list of the episodes saved in
	 * the current Spotify user's library.
	 */
	public getUsersSavedEpisodes(options: MarketSpecifier & PaginationSpecifier = {}):
		Promise<SpotifyPagination<SpotifyEpisode>> {
		
		return this.query("GET", `/me/episodes`, options);
		
	}
	
	// TODO [3/10/2022 @ 12:01 PM] - Endpoint: 'Save Episodes for User'
	
	// TODO [3/10/2022 @ 12:01 PM] - Endpoint: 'Remove User's Saved Episodes'
	
	/**
	 * Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.
	 * 
	 * This API endpoint is in beta and could change without warning. Please share any feedback that you have, or issues
	 * that you discover, in our
	 * <a href="https://community.spotify.com/t5/Spotify-for-Developers/bd-p/Spotify_Developer">developer community
	 * forum.</a>
	 * 
	 * @param {string[]} episodeIDs A comma-separated list of the
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify IDs</a> for the
	 * episodes. Maximum: 50 IDs.
	 * @returns {Promise<boolean[]>} A Promise that resolves to an array of booleans that each respectively match back
	 * the list provided input array of episode IDs to indicate whether or not the episode with that episode ID is
	 * already saved in the current Spotify user's 'Your Episodes' library.
	 */
	public checkUsersSavedEpisodes(episodeIDs: string[]): Promise<boolean[]> {
		
		return this.query("GET", `/me/episodes/contains`, { ids: episodeIDs });
		
	}
	
	// ===== TRACK ENDPOINTS =====
	
	/**
	 * Get Spotify catalog information for a single track identified by its unique Spotify ID.
	 * 
	 * @param {string} trackID The
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify ID</a> for the
	 * track.
	 * @param {MarketSpecifier} options Optional parameters for this endpoint. See the documentation for the individual
	 * parameter types for more information.
	 * @returns {Promise<SpotifyTrack>} A Promise that resolves to Spotify catalog information for a single track.
	 */
	public getTrack(trackID: string, options: MarketSpecifier = {}): Promise<SpotifyTrack> {
		
		return this.query("GET", `/tracks/${trackID}`, options);
		
	}
	
	/**
	 * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
	 * 
	 * @param {string[]} trackIDs A comma-separated list of the
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify IDs</a> for the
	 * tracks. Maximum: 50 IDs.
	 * @param {MarketSpecifier} options Optional parameters for this endpoint. See the documentation for the individual
	 * parameter types for more information.
	 * @returns {Promise<SpotifySingleKeyObject<"tracks", SpotifyTrack[]>>} A Promise that resolves to Spotify catalog
	 * information for multiple tracks.
	 */
	public getSeveralTracks(trackIDs: string[], options: MarketSpecifier = {}):
		Promise<SpotifySingleKeyObject<"tracks", SpotifyTrack[]>> {
		
		return this.query("GET", `/tracks`, options);
		
	}
	
	/**
	 * Get a list of the songs saved in the current Spotify user's 'Your Music' library.
	 * 
	 * @param {MarketSpecifier & PaginationSpecifier} options Optional parameters for this endpoint. See the
	 * documentation for the individual parameter types for more information.
	 * @returns {Promise<SpotifyPagination<SpotifyTrack>>} A Promise that resolves to a list of the songs saved in the
	 * current Spotify user's 'Your Music' library.
	 */
	public getUsersSavedTracks(options: MarketSpecifier & PaginationSpecifier = {}):
		Promise<SpotifyPagination<SpotifyTrack>> {
		
		return this.query("GET", `/me/tracks`, options);
		
	}
	
	// TODO [3/10/2022 @ 12:06 PM] - Endpoint: 'Save Tracks for Current User'
	
	// TODO [3/10/2022 @ 12:06 PM] - Endpoint: 'Remove Tracks for Current User'
	
	/**
	 * Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.
	 * 
	 * @param {string[]} trackIDs A comma-separated list of the
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify IDs</a> for the
	 * tracks. Maximum: 50 IDs.
	 * @returns {Promise<boolean[]>} A Promise that resolves to an array of booleans that each respectively match back
	 * the list provided input array of track IDs to indicate whether or not the track with that track ID is already
	 * saved in the current Spotify user's 'Your Music' library.
	 */
	public checkUsersSavedTracks(trackIDs: string[]): Promise<boolean[]> {
		
		return this.query("GET", `/me/tracks/contains`, { ids: trackIDs });
		
	}
	
	/**
	 * Get audio features for multiple tracks based on their Spotify IDs.
	 * 
	 * @param {string[]} trackIDs A comma-separated list of the
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify IDs</a> for the
	 * tracks. Maximum: 100 IDs.
	 * @returns {Promise<SpotifySingleKeyObject<"audio_features", SpotifyAudioFeatures[]>>} A Promise that resolves to
	 * audio features for multiple tracks.
	 */
	public getSeveralTracksAudioFeatures(trackIDs: string[]):
		Promise<SpotifySingleKeyObject<"audio_features", SpotifyAudioFeatures[]>> {
		
		return this.query("GET", `/audio-features`, { ids: trackIDs });
		
	}
	
	/**
	 * Get audio feature information for a single track identified by its unique Spotify ID.
	 * 
	 * @param {string} trackID The
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify ID</a> for the
	 * track.
	 * @returns {Promise<SpotifyAudioFeatures>} A Promise that resolves to audio feature information for a single track.
	 */
	public getTracksAudioFeatures(trackID: string): Promise<SpotifyAudioFeatures> {
		
		return this.query("GET", `/audio-features/${trackID}`);
		
	}
	
	/**
	 * Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s
	 * structure and musical content, including rhythm, pitch, and timbre.
	 * 
	 * @param {string} trackID The
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify ID</a> for the
	 * track.
	 * @returns {Promise<SpotifyAudioAnalysis>} A Promise that resolves to a low-level audio analysis for a track in the
	 * Spotify catalog.
	 */
	public getTracksAudioAnalysis(trackID: string): Promise<SpotifyAudioAnalysis> {
		
		return this.query("GET", `/audio-analysis/${trackID}`);
		
	}
	
	/**
	 * Recommendations are generated based on the available information for a given seed entity and matched against
	 * similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be
	 * returned together with pool size details.
	 *
	 * For artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.
	 * 
	 * @param {MarketSpecifier & LimitSpecifier & RecommendationsSpecifier} options Optional parameters for this
	 * endpoint. See the documentation for the individual parameter types for more information.
	 * @returns {Promise<SpotifyRecommendations>} A Promise that resolves to a list of tracks, together with pool size
	 * details.
	 */
	public getRecommendations(options: MarketSpecifier & LimitSpecifier & RecommendationsSpecifier = {}):
		Promise<SpotifyRecommendations> {
		
		return this.query("GET", `/recommendations`, options);
		
	}
	
	// ===== SEARCH ENDPOINTS =====
	
	/**
	 * Get Spotify catalog information about albums, artists, playlists, tracks, shows or episodes that match a keyword
	 * string.
	 * 
	 * @param {MarketSpecifier & PaginationSpecifier & SearchSpecifier} options Optional parameters for this endpoint.
	 * See the documentation for the individual parameter types for more information.
	 * @returns {Promise<SpotifySearchResults>}
	 */
	public searchForItem(options: MarketSpecifier & PaginationSpecifier & SearchSpecifier = {}):
		Promise<SpotifySearchResults> {
		
		return this.query("GET", `/search`, options);
		
	}
	
	// ===== USER ENDPOINTS =====
	
	// ===== PLAYLIST ENDPOINTS =====
	
	// ===== CATEGORY ENDPOINTS =====
	
	// ===== GENRE ENDPOINTS =====
	
	/**
	 * Retrieve a list of available genres seed parameter values for
	 * <a href="https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendations">
	 * recommendations</a>.
	 * 
	 * @returns {Promise<SpotifySingleKeyObject<"genres", string[]>>} A Promise that resolves to a list of available
	 * genres seed parameter values.
	 */
	public getAvailableGenreSeeds(): Promise<SpotifySingleKeyObject<"genres", string[]>> {
		
		return this.query("GET", `/recommendations/available-genre-seeds`);
		
	}
	
	// ===== PLAYER ENDPOINTS =====
	
	/**
	 * 
	 * @param {string} deviceID
	 * @returns {Promise<void>}
	 */
	public pausePlayback(deviceID?: string): Promise<void> {
		
		return this.query("PUT", `/me/player/pause`, { device_id: deviceID });
		
	}
	
	// ===== MARKET ENDPOINTS =====
	
	/**
	 * 
	 * @returns {Promise<SpotifySingleKeyObject<"markets", string[]>>}
	 */
	public getAvailableMarkets(): Promise<SpotifySingleKeyObject<"markets", string[]>> {
		
		return this.query("GET", `/markets`);
		
	}
	
}

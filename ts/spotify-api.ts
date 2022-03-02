/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 2:27 PM -- February 25th, 2022
 * Project: spotify-api
 */

import { request, RequestResponse } from "./request";
import { Show } from "./schema/show";

export class SpotifyAPI {
	
	public static readonly BASE_API_URL: string = "https://api.spotify.com/";
	
	protected accessToken: string;
	
	protected constructor(accessToken: string) {
		
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
	
	public static createWithAccessToken(accessToken: string): SpotifyAPI {
		
		return new SpotifyAPI(accessToken);
		
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
	
	/**
	 * Get Spotify catalog information for a single show identified by its unique Spotify ID.
	 * 
	 * @param {string} showID The
	 * <a href="https://developer.spotify.com/documentation/web-api/#spotify-uris-and-ids">Spotify ID</a> for the show.
	 * @param {string} market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is
	 * available in that market will be returned. If a valid user access token is specified in the request header, the
	 * country associated with the user account will take priority over this parameter.
	 * @returns {Promise<Show>} A Spotify {@link Show} object.
	 */
	public async getShow(showID: string, market?: string): Promise<Show> {
		
		let url: URL = new URL(`/v1/shows/${showID}`, SpotifyAPI.BASE_API_URL);
		
		if (market) url.searchParams.append("market", market);
		
		let response: RequestResponse = await request(url, {
			method: "GET",
			headers: {
				...this.getBaseRequestHeaders()
			}
		});
		
		if (response.status === 200) return response.body as Show;
		else throw new Error(`Failed to fetch Show information from the Spotify API. Error/response body: ${response.body}`);
		
	}
	
}

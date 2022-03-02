/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 2:27 PM -- February 25th, 2022
 * Project: spotify-api
 */

import { request, RequestResponse } from "./request";

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
	
}

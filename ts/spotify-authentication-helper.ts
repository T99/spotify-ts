/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 10:44 AM -- March 14th, 2022
 * Project: @t99/spotify
 */

import crypto from "crypto";
import { SpotifyAPI } from "./spotify-api";
import { SpotifyScope } from "./spotify-scopes";
import { request, RequestResponse } from "./request";

export class SpotifyAuthenticationHelper {
	
	public static readonly SPOTIFY_ACCOUNTS_URL: string = "https://accounts.spotify.com/";
	
	protected readonly clientID: string;
	
	protected readonly clientSecret: string;
	
	protected readonly redirectURI: string;
	
	protected readonly scopes: SpotifyScope[];
	
	protected readonly state: string;
	
	public constructor(clientID: string, clientSecret: string, redirectURI: string, scopes: SpotifyScope[] = []) {
		
		this.clientID = clientID;
		this.clientSecret = clientSecret;
		this.redirectURI = redirectURI;
		this.scopes = scopes;
		this.state = crypto.randomBytes(8).toString("hex");
		
	}
	
	public getAuthorizationURL(): URL {
		
		let url: URL = new URL("/authorize", SpotifyAuthenticationHelper.SPOTIFY_ACCOUNTS_URL);
		
		url.searchParams.append("response_type", "code");
		url.searchParams.append("client_id", this.clientID);
		url.searchParams.append("redirect_uri", this.redirectURI);
		url.searchParams.append("state", this.state);
		
		if (this.scopes.length > 0) url.searchParams.append("scope", this.scopes.join(" "));
		
		return url;
		
	}
	
	public async finishAuthorization(code: string, state?: string): Promise<SpotifyAPI> {
		
		return SpotifyAPI.authorize(this.clientID, this.clientSecret, {
			grant_type: "authorization_code",
			code,
			redirect_uri: this.redirectURI
		});
		
	}
	
}

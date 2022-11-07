/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 10:53 PM -- June 11th, 2019.
 * Project: @t99/spotify
 * 
 * @t99/spotify - A TypeScript/JavaScript library for accessing the Spotify API.
 * Copyright (C) 2022 Trevor Sears
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

// import util from "util";
import { SpotifyAPI } from "./spotify-api";
import { Credentials, getCredentials } from "./credentials";
// import { SpotifyShow } from "./schema/spotify-show";

/**
 * NPM main class used for exporting this package's contents.
 *
 * @author Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/)
 * @version v<version>
 * @since v<version>
 */

// export { ClassName } from "./class-location";

// const TUESDAY_TALKS_SHOW_ID: string = "5aEsPtN61qhf1mxTrrcgOt";

export async function main(): Promise<void> {
	
	let credentials: Credentials = await getCredentials();
	
	// let api: SpotifyAPI = await SpotifyAPI.createWithClientInfo(credentials.clientId, credentials.clientSecret);
	let api: SpotifyAPI = await SpotifyAPI.createWithLogin(
		credentials.clientId,
		"https://raptors1711.com/",
		[ "user-library-modify", "app-remote-control" ]
	);
	
	api;
	
	// await api.pausePlayback();
	
	// let result: SpotifyShow = await api.getShow(TUESDAY_TALKS_SHOW_ID, "US");
	//
	// console.log(util.inspect(result, false, null, true));
	
}

main().catch(console.error);

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

import { SpotifyAPI } from "./spotify-api";
import { Credentials, getCredentials } from "./credentials";

/**
 * NPM main class used for exporting this package's contents.
 *
 * @author Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/)
 * @version v<version>
 * @since v<version>
 */

// export { ClassName } from "./class-location";

const TUESDAY_TALKS_SHOW_ID: string = "5aEsPtN61qhf1mxTrrcgOt";

export async function main(): Promise<void> {
	
	let credentials: Credentials = await getCredentials();
	
	let api: SpotifyAPI = await SpotifyAPI.createWithClientInfo(credentials.clientId, credentials.clientSecret);
	
	console.log(JSON.stringify(await api.getShow(TUESDAY_TALKS_SHOW_ID, "US")));
	
}

main().catch(console.error);

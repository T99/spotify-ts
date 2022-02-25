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

/**
 * NPM main class used for exporting this package's contents.
 *
 * @author Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/)
 * @version v<version>
 * @since v<version>
 */

// export { ClassName } from "./class-location";

export async function main(): Promise<void> {
	
	let api: SpotifyAPI = await SpotifyAPI.createWithClientInfo(
		"5d34ac821e4a438391f309c37a529b90",
		"a6b0bc3347444d1eab1e4dd4c25d2af9"
	);
	
	api;
	
}

main().catch(console.error);

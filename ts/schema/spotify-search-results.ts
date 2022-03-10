/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 1:26 PM -- March 10th, 2022
 * Project: @t99/spotify
 */

import { SpotifyPagination } from "./spotify-pagination";
import { SpotifyTrack } from "./spotify-track";
import { SpotifyArtist } from "./spotify-artist";
import { SpotifyAlbum } from "./spotify-album";
import { SpotifyShow } from "./spotify-show";
import { SpotifyEpisode } from "./spotify-episode";

export interface SpotifySearchResults {
	
	readonly tracks?: SpotifyPagination<SpotifyTrack>,
	
	readonly artists?: SpotifyPagination<SpotifyArtist>,
	
	readonly albums?: SpotifyPagination<SpotifyAlbum>,
	
	// TODO [3/10/2022 @ 2:45 PM] Add a 'SpotifyPlaylist' type.
	readonly playlists?: SpotifyPagination<any>,
	
	readonly shows?: SpotifyPagination<SpotifyShow>,
	
	readonly episodes?: SpotifyPagination<SpotifyEpisode>
	
}

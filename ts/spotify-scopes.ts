/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 4:02 PM -- March 11th, 2022
 * Project: @t99/spotify
 */

/**
 * Scopes provide Spotify users using third-party apps the confidence that only the information they choose to share
 * will be shared, and nothing more.
 * 
 * @see https://developer.spotify.com/documentation/general/guides/authorization/scopes/
 */
export type SpotifyScope =
	| "ugc-image-upload"
	| "user-read-playback-state"
	| "user-modify-playback-state"
	| "user-read-currently-playing"
	| "user-read-private"
	| "user-read-email"
	| "user-follow-modify"
	| "user-follow-read"
	| "user-library-modify"
	| "user-library-read"
	| "streaming"
	| "app-remote-control"
	| "user-read-playback-position"
	| "user-top-read"
	| "user-read-recently-played"
	| "playlist-modify-private"
	| "playlist-read-collaborative"
	| "playlist-read-private"
	| "playlist-modify-public";

export const SPOTIFY_SCOPE_IMAGES: SpotifyScope[] = [
	"ugc-image-upload"
];

export const SPOTIFY_SCOPE_SPOTIFY_CONNECT: SpotifyScope[] = [
	"user-read-playback-state",
	"user-modify-playback-state",
	"user-read-currently-playing"
];

export const SPOTIFY_SCOPE_USERS: SpotifyScope[] = [
	"user-read-private",
	"user-read-email"
];

export const SPOTIFY_SCOPE_FOLLOW: SpotifyScope[] = [
	"user-follow-modify",
	"user-follow-read"
];

export const SPOTIFY_SCOPE_LIBRARY: SpotifyScope[] = [
	"user-library-modify",
	"user-library-read"
];

export const SPOTIFY_SCOPE_PLAYBACK: SpotifyScope[] = [
	"streaming",
	"app-remote-control"
];

export const SPOTIFY_SCOPE_LISTENING_HISTORY: SpotifyScope[] = [
	"user-read-playback-position",
	"user-top-read",
	"user-read-recently-played"
];

export const SPOTIFY_SCOPE_PLAYLISTS: SpotifyScope[] = [
	"playlist-modify-private",
	"playlist-read-collaborative",
	"playlist-read-private",
	"playlist-modify-public"
];

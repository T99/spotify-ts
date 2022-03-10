/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 9:24 AM -- March 8th, 2022
 * Project: @t99/spotify
 */

/**
 * The object format for an image, as provided by the Spotify API.
 * 
 * @author Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/)
 * @version v0.1.0
 * @since v0.1.0
 */
export interface SpotifyImage {
	
	/**
	 * The source URL of the image.
	 */
	readonly url: string;
	
	/**
	 * The image height in pixels.
	 */
	readonly height: number;
	
	/**
	 * The image width in pixels.
	 */
	readonly width: number;
	
}

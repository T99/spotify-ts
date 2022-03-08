/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 10:32 AM -- March 8th, 2022
 * Project: spotify-api
 */

/**
 * The object format for a copyright notice, as provided by the Spotify API.
 * 
 * @author Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/)
 * @version v0.1.0
 * @since v0.1.0
 */
export interface SpotifyCopyright {
	
	/**
	 * The copyright text for this content.
	 */
	readonly text: string;
	
	/**
	 * The type of copyright.
	 * 
	 * Supported values:
	 *  - 'C': The copyright.
	 *  - 'P': The sound recording (performance) copyright.
	 */
	readonly type: "C" | "P";
	
}

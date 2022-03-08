/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 10:25 AM -- March 8th, 2022
 * Project: spotify-api
 */

export interface SpotifyPagination<T> {
	
	/**
	 * A link to the Web API endpoint returning the full result of the request
	 */
	readonly href: string;
	
	/**
	 * The requested content.
	 */
	readonly items: T[];
	
	/**
	 * The maximum number of items in the response (as set in the query or by default).
	 */
	readonly limit: number;
	
	/**
	 * URL to the next page of items. (null if none)
	 */
	readonly next: string | null;
	
	/**
	 * The offset of the items returned (as set in the query or by default).
	 */
	readonly offset: number;
	
	/**
	 * URL to the previous page of items. (null if none)
	 */
	readonly previous: string | null
	
	/**
	 * The total number of items available to return.
	 */
	readonly total: number;
	
}

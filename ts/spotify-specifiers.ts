/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 4:47 PM -- March 11th, 2022
 * Project: @t99/spotify
 */

export type MarketSpecifier = {
	
	/**
	 * An <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 alpha-2 country code</a>.
	 *
	 * If a country code is specified, only content that is available in that market will be returned.
	 *
	 * If a valid user access token is specified in the request header, the country associated with the user account
	 * will take priority over this parameter.
	 *
	 * Note: If neither market or user country are provided, the content is considered unavailable for the client. Users
	 * can view the country that is associated with their account in the account settings.
	 *
	 * Example value: "ES"
	 */
	market?: string;
	
};

export type CountrySpecifier = {
	
	/**
	 * A country: an <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 alpha-2 country code</a>.
	 *
	 * Provide this parameter if you want the list of returned items to be relevant to a particular country. If omitted,
	 * the returned items will be relevant to all countries.
	 *
	 * Example value: "SE"
	 */
	country?: string;
	
};

export type LimitSpecifier = {
	
	/**
	 * The maximum number of items to return.
	 *
	 * Default: 20
	 * Minimum: 1
	 * Maximum: 50
	 */
	limit?: number;
	
};

export type PaginationSpecifier = LimitSpecifier & {
	
	/**
	 * The index of the first item to return. Use with limit to get the next set of items.
	 *
	 * Default: 0 (the first item)
	 */
	offset?: number;
	
};

export type AlbumGroupsSpecifier = {
	
	/**
	 * A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types
	 * will be returned.
	 *
	 * Valid values are:
	 *  - album
	 *  - single
	 *  - appears_on
	 *  - compilation
	 *
	 * Example value: "single,appears_on"
	 */
	include_groups?: string;
	
};

export type RecommendationsSpecifier = {
	
	// TODO [3/10/2022 @ 1:10 PM] Compile the recommendations specifier type from the documentation.
	
};

export type SearchSpecifier = {
	
	/**
	 * Your search query.
	 *
	 * You can narrow down your search using field filters. The available filters are album, artist, track, year, upc,
	 * tag:hipster, tag:new, isrc, and genre. Each field filter only applies to certain result types.
	 *
	 * - The artist filter can be used while searching albums, artists or tracks.
	 * - The album and year filters can be used while searching albums or tracks. You can filter on a single year or a
	 *   range (e.g. 1955-1960).
	 * - The genre filter can be use while searching tracks and artists.
	 * - The isrc and track filters can be used while searching tracks.
	 * - The upc, tag:new and tag:hipster filters can only be used while searching albums. The tag:new filter will
	 *   return albums released in the past two weeks and tag:hipster can be used to return only albums with the lowest
	 *   10% popularity.
	 *
	 * You can also use the NOT operator to exclude keywords from your search.
	 *
	 * Example value: "remaster%20track:Doxy+artist:Miles%20Davis"
	 */
	q?: string;
	
	/**
	 * A comma-separated list of item types to search across. Search results include hits from all the specified item
	 * types. For example: q=name:abacab&type=album,track returns both albums and tracks with "abacab" included in their
	 * name.
	 *
	 * Allowed values:
	 *  - "album"
	 *  - "artist"
	 *  - "playlist"
	 *  - "track"
	 *  - "show"
	 *  - "episode"
	 *
	 * Example value: "track,artist"
	 */
	type?: string;
	
	/**
	 * If include_external=audio is specified it signals that the client can play externally hosted audio content, and
	 * marks the content as playable in the response. By default externally hosted audio content is marked as unplayable
	 * in the response.
	 */
	include_external?: "audio";
	
};

export type TimeRangeSpecifier = {
	
	/**
	 * Over what time frame the affinities are computed.
	 *
	 * Valid values:
	 *  - "short_term": Approximately last 4 weeks.
	 *  - "medium_term": Approximately last 6 months.
	 *  - "long_term": Calculated from several years of data and including all new data as it becomes available.
	 *
	 * Default: "medium_term"
	 */
	time_range?: "short_term" | "medium_term" | "long_term";
	
};

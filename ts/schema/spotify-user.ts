/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 12:58 PM -- March 11th, 2022
 * Project: @t99/spotify
 */

import { SpotifyBaseObject } from "./spotify-base-object";

export interface SpotifyUser extends SpotifyBaseObject {
	
	readonly type: "user";
	
	/**
	 * The name displayed on the user's profile. <pre>null</pre> if not available.
	 */
	readonly display_name: string | null;
	
	/**
	 * The user's email address, as entered by the user when creating their account. Important! This email address is
	 * unverified; there is no proof that it actually belongs to the user. This field is only available when the current user has granted access to the user-read-email scope.
	 */
	readonly email: string;
	
	/**
	 * The country of the user, as set in the user's account profile. An
	 * <a href="http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2">ISO 3166-1 alpha-2 country code</a>. This field is only
	 * available when the current user has granted access to the
	 * <a href="https://developer.spotify.com/documentation/general/guides/authorization-guide/#list-of-scopes">
	 * user-read-private</a> scope.
	 */
	readonly country?: string;
	
	readonly product?: "open" | "free" | "premium";
	
	readonly explicit_content: {
		
		readonly filter_enabled: false;
		
		readonly filter_locked: false;
		
	};
	
	/**
	 * Information about the followers of this user.
	 */
	readonly followers: {
		
		/**
		 * This will always be set to null, as the Web API does not support it at the moment.
		 */
		readonly href: null;
		
		/**
		 * The total number of followers.
		 */
		readonly total: number;
		
	};
	
}

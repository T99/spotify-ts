/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 12:01 PM -- March 8th, 2022
 * Project: @t99/spotify
 */

export type SpotifySingleKeyObject<K extends string, T> = {
	
	[N in K]: T
	
};

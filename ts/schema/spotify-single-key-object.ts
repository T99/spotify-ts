/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 12:01 PM -- March 8th, 2022
 * Project: spotify-api
 */

export type SpotifySingleKeyObject<K extends string, T> = {
	
	[N in K]: T
	
};

/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 10:28 AM -- March 8th, 2022
 * Project: @t99/spotify
 */

import { SpotifyBaseObject } from "./spotify-base-object";
import { SpotifyShow } from "./spotify-show";

export interface SpotifyEpisode extends SpotifyBaseObject {
	
	"audio_preview_url": "https://p.scdn.co/mp3-preview/2f37da1d4221f40b9d1a98cd191f4d6f1646ad17",
	
	"description": "A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.\n",
	
	"html_description": "<p>A Spotify podcast sharing fresh insights on important topics of the moment—in a way only Spotify can. You’ll hear from experts in the music, podcast and tech industries as we discover and uncover stories about our work and the world around us.</p>\n",
	
	"duration_ms": 1686230,
	
	"explicit": true,
	
	"is_externally_hosted": true,
	
	"is_playable": true,
	
	"language": "en",
	
	"languages": [
		
		"fr",
		
		"en"
	
	],
	
	"release_date": "1981-12-15",
	
	"release_date_precision": "day",
	
	"resume_point": {
		
		"fully_played": true,
		
		"resume_position_ms": 0
		
	},
	
	"type": "episode",
	
	"restrictions": {
		
		"reason": "string"
		
	},
	
	readonly show: SpotifyShow
	
}

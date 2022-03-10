/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 12:47 PM -- March 10th, 2022
 * Project: @t99/spotify
 */

export type SpotifyAudioAnalysisMeta = {
	
	readonly analyzer_version: string,
	
	readonly platform: string,
	
	readonly detailed_status: string,
	
	readonly status_code: number,
	
	readonly timestamp: number,
	
	readonly analysis_time: number,
	
	readonly input_process: string
	
};

export type SpotifyAudioAnalysisTrack = {
	
	readonly num_samples: number,
	
	readonly duration: number,
	
	readonly sample_md5: string,
	
	readonly offset_seconds: number,
	
	readonly window_seconds: number,
	
	readonly analysis_sample_rate: number,
	
	readonly analysis_channels: number,
	
	readonly end_of_fade_in: number,
	
	readonly start_of_fade_out: number,
	
	readonly loudness: number,
	
	readonly tempo: number,
	
	readonly tempo_confidence: number,
	
	readonly time_signature: number,
	
	readonly time_signature_confidence: number,
	
	readonly key: number,
	
	readonly key_confidence: number,
	
	readonly mode: number,
	
	readonly mode_confidence: number,
	
	readonly codestring: string,
	
	readonly code_version: number,
	
	readonly echoprintstring: string,
	
	readonly echoprint_version: number,
	
	readonly synchstring: string,
	
	readonly synch_version: number,
	
	readonly rhythmstring: string,
	
	readonly rhythm_version: number
	
};

export type SpotifyAudioAnalysisAudioSpan = {
	
	readonly start: number;
	
	readonly duration: number;
	
	readonly confidence: number;
	
};

export type SpotifyAudioAnalysisSection = SpotifyAudioAnalysisAudioSpan & {
	
	readonly loudness: number,
	
	readonly tempo: number,
	
	readonly tempo_confidence: number,
	
	readonly key: number,
	
	readonly key_confidence: number,
	
	readonly mode: number,
	
	readonly mode_confidence: number,
	
	readonly time_signature: number,
	
	readonly time_signature_confidence: number
	
};

export type SpotifyAudioAnalysisSegment = SpotifyAudioAnalysisAudioSpan & {
	
	readonly loudness_start: number,
	
	readonly loudness_max: number,
	
	readonly loudness_max_time: number,
	
	readonly loudness_end: number,
	
	readonly pitches: number[],
	
	readonly timbre: number[]
	
};

export interface SpotifyAudioAnalysis {
	
	readonly meta: SpotifyAudioAnalysisMeta,
	
	readonly track: SpotifyAudioAnalysisTrack,
	
	readonly bars: SpotifyAudioAnalysisAudioSpan[],
	
	readonly beats: SpotifyAudioAnalysisAudioSpan[],
	
	readonly sections: SpotifyAudioAnalysisSection[],
	
	readonly segments: SpotifyAudioAnalysisSegment[],
	
	readonly tatums: SpotifyAudioAnalysisAudioSpan[]
	
}

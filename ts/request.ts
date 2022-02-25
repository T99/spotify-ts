/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 2:51 PM -- February 25th, 2022
 * Project: spotify-api
 */

import http from "http";
import https, { RequestOptions } from "https";
import { URL } from "node:url";

export type RequestResponse = {
	status: number,
	headers: {
		[header: string]: string | string[] | undefined
	},
	body: any
}

export function request(url: string | URL, options: RequestOptions, body?: string): Promise<RequestResponse> {
	
	return new Promise<RequestResponse>((resolve: (value: RequestResponse) => void,
											  reject: (reason?: Error) => void): void => {
		
		let request: http.ClientRequest = https.request(url, options, (response: http.IncomingMessage): void => {
				
			let rawBody: string = "";
			
			response.on("data", (data: any): any => rawBody += data);
			
			response.on("end", (): void => {
				
				let body: any;
				
				try {
					
					body = JSON.parse(rawBody);
					
				} catch (error: any) {
					
					body = rawBody;
					
				}
				
				resolve({
					status: response.statusCode as number,
					headers: response.headers,
					body
				});
				
			});
			
			response.on("error", (): void => reject(new Error("Failed to build/receive response.")));
			
		});
		
		if (body) request.write(body);
		
		request.end();
		
	});
	
}

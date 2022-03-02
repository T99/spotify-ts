/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 3:50 PM -- March 2nd, 2022
 * Project: api.raptors1711.com
 */

import fs from "fs/promises";
import path from "path";

export type Credentials = {
	clientId: string,
	clientSecret: string
};

const credentialsPath: string = "credentials.json";
const credentialsAbsolutePath: string = path.resolve(credentialsPath);
const requiredKeys: string[] = ["clientId", "clientSecret"];

export async function getCredentials(): Promise<Credentials> {
	
	let rawContents: string;
	
	try {
		
		rawContents = await fs.readFile(credentialsPath, "utf-8");
		
	} catch (error: any) {
		
		throw new Error(`Failed to read the contents of the file at: '${credentialsAbsolutePath}'.`);
		
	}
	
	let jsonContents: any;
	
	try {
		
		jsonContents = JSON.parse(rawContents);
		
	} catch (error: any) {
		
		throw new Error(`Failed to parse the file located at '${credentialsAbsolutePath}' as JSON.`);
		
	}
	
	if (requiredKeys.every((requiredKey: string): boolean => requiredKey in jsonContents)) return jsonContents;
	else throw new Error(`The JSON file located at '${path.resolve(credentialsPath)}' did not contain the expected keys.`);
	
}

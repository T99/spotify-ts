# Access Spotify with TypeScript

A TypeScript/JavaScript library for accessing the Spotify API.

### [Find @t99/spotify on NPM.](https://www.npmjs.com/package/@t99/spotify)

## Table of Contents

 - [Installation](#installation)
 - [Basic Usage](#basic-usage)
 - [Documentation](#documentation)
 - [License](#license)

## Installation

Install from NPM with

```
$ npm install --save @t99/spotify
```

## Basic Usage

### Using a `clientId` and a `clientSecret`

If you are using the `clientId` and `clientSecret` strings that were provided to you upon creating a new Spotify app
within the [Spotify for Developers dashboard](https://developer.spotify.com/dashboard/applications)...

```typescript
// Import the class from this package.
import { SpotifyAPI } from "@t99/spotify";

// Don't worry, these are dummy values, but they SHOULD resemble the format of the real thing.
const myClientId: string = "c6047d38e2aea339835cf434d04db031";
const myClientSecret: string = "967a78f13d081aa07131f60b92258924";

// Initialize the SpotifyAPI instance. Remember to `await` it or otherwise handle the promise!
let spotify: SpotifyAPI = await SpotifyAPI.createWithClientInfo(myClientId, myClientSecret);

// All set! Now you can do whatever you want with the API.
await spotify.pausePlayback();
```

### Using a pre-prepared access token

If you somehow already have a pre-prepared access token ready-to-go, all you need to do is pass it directly into a new
`SpotifyAPI` instance and you're ready to go!

```typescript
// Import the class from this package.
import { SpotifyAPI } from "@t99/spotify";

// Don't worry, these are dummy values, but they SHOULD resemble the format of the real thing.
const myAccessToken: string = "IJE_qGI6nQjRfQR8cxmqiG6KTtw5g4gnfU5m64lJGLqFPtVmRWlxzN5Tl7tOCIQ71B28-Bvf4cnyk4i8B_E";

// Initialize the SpotifyAPI instance. Remember to `await` it or otherwise handle the promise!
let spotify: SpotifyAPI = new SpotifyAPI(myAccessToken);

// All set! Now you can do whatever you want with the API.
await spotify.pausePlayback();
```

## Documentation

The core `SpotifyAPI` class attempts to match the current Spotify Web API documentation as closely as possible.

Currently, that documentation can be found here:
[Spotify Web API](https://developer.spotify.com/documentation/web-api/reference)

For each endpoint listed within the reference documentation linked above, a matching method should be available on
`SpotifyAPI` instances. The name of the method should be the camelCase version of the given name of the endpoint. For
example, the "Get Artist's Related Artists" endpoint can be accessed via the `SpotifyAPI#getArtistsRelatedArtists`
method.

## License

@t99/spotify is made available under the GNU General Public License v3.

Copyright (C) 2022 Trevor Sears

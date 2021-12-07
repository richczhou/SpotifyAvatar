const clientId = '0a27d5791f40466eb89d61b73c5deb4c';
const clientSecret = '8a91d1ad713546b1a458bf79903c8f07';

const _getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    //use access token to retrieve playlists
    return data.access_token;
}

//lizzo spotify ID
const lizzoId = '56oDRnqbIiwx4mymNEv7dS'

const getArtistData = async (id, token) => {
    const result = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    })
    console.log(result);
    //result.json makes it prettier
    const data = await result.json();
    return data
}

async function getLizzoData() {
    const token = await _getToken();
    // console.log(token);
    const data = await getArtistData(lizzoId, token);
    // console.log(data)
    return data;
}

const getTrack = async (token, trackEndPoint) => {
    const result = await fetch(`${trackEndPoint}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
    const data = await result.json();
    return data;
}

async function getTruthHurtsReccs() {
    const token = await _getToken();
    console.log(token);
    const result = await fetch(`https://api.spotify.com/v1/recommendations?seed_artists=56oDRnqbIiwx4mymNEv7dS&seed_genres=pop&seed_tracks=3HWzoMvoF3TQfYg4UPszDq&max_acousticness=0.4`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token},
    });
    // console.log(result);
    const data = await result.json();
    console.log(data)
    return data;
}

// getLizzoData();
getTruthHurtsReccs();

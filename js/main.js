// Set up global variables for our song
let song;
let playSong;

// Function to get Song info when image has been clidked
/** 
 * @param img_index
 * @param item_index
 * @param JS_event
 * 
 * Function gets song from spotify using the image index of our gallery.
 * Which then, find the correct item_index inside of the JSON data
 * to produce the preview_URL
 */

//  We will use the async/await syntax to tell the JavaScript
// Event loop to wait for this function to return/give a value
    // async like promise but STOPS/HOLD UP whole code until it is called
async function clickedEvent(img_index, item_index, JS_event) {
    // Grab the track title
    let track = document.getElementsByTagName('img')[img_index].attributes[2].value;

    // Add Security headers fo the Api call to spotify
    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
        ['Authorization', 'Bearer  SPOTIFY API KEY GOES HERE']
    ])
    // as on Spotify console sample, show that to make a call you need
    // a few headers (denoted by -H in their example)
    // Reminder, spotify API needs to be refreshed every hour

    // Create a new Request Object to send API Call to Spotify
    let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`, {
        method: 'GET',
        headers: headers
    })

    // Await for the spotify data to return back after
    // Sending a request to the API (nothing else on page will happen
    // until the await is fullfilled)
    await fetch(request)
    .then((response) => response.json())
    .then((rawData) => {
        console.log(rawData)
        song = rawData.tracks.items[item_index].preview_url
    })
    console.log(song);
    songSnippet(song);

}

// Get Song Function -- Getting Song Data based on Image Clicked

/**
 * @param id
 * @param Event
 * 
 * ID = image id for gallery image
 * event = Mouse Event given by action from the user
 * 
 * GetSong Function produces songs from the clickedEvent
 * based on the index of the image that was clicked.
 */

function getSong(id, event) {
    // Switched figures based on id
    switch(id) {
        // difference second number because that is corr
        case 'fig1': {
            event.stopPropagation();
            // this stopProp is called her and in HTML
            // its just acting as a safety so 100% it stops
            clickedEvent(0, 3)
            break;
        }
        case 'fig2': {
            event.stopPropagation();
            clickedEvent(1, 3);
            break;
        }
        case 'fig3': {
            event.stopPropagation();
            clickedEvent(2, 0);
            break;
        }
        case 'fig4': {
            event.stopPropagation();
            clickedEvent(3, 4);
            break;
        }
        case 'fig5': {
            event.stopPropagation();
            clickedEvent(4, 0);
            break;
        }
        case 'fig6': {
            event.stopPropagation();
            clickedEvent(5, 1);
            break;
        }
    }
}

// Play Song Function
// Funtion will play song from preview_url given from spotify

/**
 * @param url
 * 
 * url = Song preview url
 * 
 * Function will return an audio clip given by the 
 * preview_url
 */
function songSnippet(url) {
    // from global variable
    playSong = new Audio(url)
    return playSong.play()
}

// Function to stop the song from playing

/**
 * NO PARAMS
 * 
 * Function returns event to stop song snippet
 */
function stopSnippet() {
    return playSong.pause();
}
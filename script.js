const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// photo array
let photosArray = []

// Unsplash API
const apiKey = 'WDDYPDtW_1Y6TAwEFmZ0sc8YyMvKaSEpVuW29QBeU1U';
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    console.log(imagesLoaded)
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}


// Helper Function to set Attributes on DOM Elements
function setAttributes(element,attrubutes){
    for(const key in attrubutes){
        element.setAttribute(key,attrubutes[key]);
    }
}


// Create Elements for links & phots, add To Dom
function displayPhotos(){
    imagesLoaded=0;
    totalImages = photosArray.length;
    // Run function for each object in photoArray
    photosArray.forEach((photo)=>{
        // create <a> to link to full photo
       const item =  document.createElement('a');
    //    item.setAttribute('href',photo.links.html)
    //    item.setAttribute('target','_black')
    setAttributes(item,{
        href:photo.links.html,
        target:'_blank',
    });

    //create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src',photo.urls.regular)
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        });

        // Event Listner, check when Each is finished loading
        img.addEventListener('load',imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
} 


// Get photos from unsplash API
async function getPhotos(){
    try {
     const response = await fetch(apiUrl);
     photosArray = await response.json();
     console.log(photosArray)
     displayPhotos();
    } catch (error) {
        console.log(error.message)
    }
}


// Check ot see if scrolling near bottom of page, laod more photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})

getPhotos()
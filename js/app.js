/*jshint esversion: 6 */

var mainBody = document.getElementsByTagName('body')[0];
var mainContainer = document.querySelector('#container');

function createRequest(url, listener) {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', listener);
  oReq.open('GET', url);
  oReq.send();
}

function getRedditData() {
  var response = JSON.parse(this.responseText);

  for ( var i = 0; i < response.data.children.length; i++ ) {
    var redditData = response.data.children[i].data;

    if ( redditData.url.match(/\.(jpeg|jpg|gif|png)$/) === null ) {
        continue;
    }

    // console.log(`https://www.reddit.com/${redditData.permalink}`)

    var postBox = document.createElement('a');
    postBox.className = 'postBox';
    postBox.setAttribute('href', `https://www.reddit.com/${redditData.permalink}`);
    mainContainer.appendChild(postBox);

    var imgBox = document.createElement('div');
    imgBox.className = 'imgBox';
    postBox.appendChild(imgBox);

    var images = document.createElement('img');
    images.className = 'images';
    images.src = redditData.url;
    imgBox.appendChild(images);

    var title = document.createElement('a');
    title.className = 'title';
    title.innerHTML = redditData.title;
    title.setAttribute('href', `https://www.reddit.com/${redditData.permalink}`);
    postBox.appendChild(title);
    var decodeDate = new Date(redditData.created_utc * 1000);
    var date = decodeDate.toLocaleDateString();

    var postInfo = document.createElement('p');
    postInfo.className = 'postInfo';
    postInfo.innerHTML = `by ${redditData.author}, ${date}, ${redditData.ups} upvotes`;
    postBox.appendChild(postInfo);

    }
  }

  document.querySelector('#randomLink').addEventListener('click', () => {
    mainContainer.innerHTML = '';
    var randomArray = ['https://www.reddit.com/r/travel.json','https://www.reddit.com/r/dataisbeautiful.json', 'https://www.reddit.com/r/NatureIsFuckingLit.json', 'https://www.reddit.com/r/wholesomememes.json', 'https://www.reddit.com/r/Art.json'];
    var randomSubreddit = randomArray[Math.floor(randomArray.length * Math.random())];
    console.log(randomSubreddit);
    createRequest(randomSubreddit, getRedditData);
  });

  document.querySelector('#myBoardsLink').addEventListener('click', () => {
    mainContainer.innerHTML = '';
    createRequest('https://www.reddit.com/r/StreetArt.json', getRedditData);
  });

  document.querySelector('#getAppLink').addEventListener('click', () => {
    mainContainer.innerHTML = '';
    createRequest('https://www.reddit.com/r/Castleporn.json', getRedditData);
  });

  document.querySelector('#getAppLink').addEventListener('click', () => {
    mainContainer.innerHTML = '';
    createRequest('https://www.reddit.com/r/Castleporn.json', getRedditData);
  });

  createRequest('https://www.reddit.com/r/StreetArt.json', getRedditData);
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

    if ( redditData.url.match(/\.(jpeg|jpg|gif|png)$/) !== null ) {
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

      // var author = document.createElement('a');
      // author.className = 'author';
      // author.setAttribute('href', `https://www.reddit.com/user/${redditData.author}`);

      var postInfo = document.createElement('p');
      postInfo.className = 'postInfo';
      postInfo.innerHTML = `by ${redditData.author} &centerdot; ${date} &centerdot; ${redditData.ups} upvotes`;
      postBox.appendChild(postInfo);

      var descriptionArr = ['Worth a follow on insta.', 'This is what I live for.', 'How far will you fall down this rabbit hole?', 'Please click this link and follow me and like me and tweet me and social media me everything.', 'I always wondered what this would look like upside down.', 'Please send me gold.'];
      var randomDescriptions = descriptionArr[Math.floor(descriptionArr.length * Math.random())];

      var description = document.createElement('p');
      description.className = 'description';
      description.innerHTML = randomDescriptions;
      postBox.appendChild(description);
    }
  }
}

document.querySelector('#randomLink').addEventListener('click', () => {
  mainContainer.innerHTML = '';
  var randomArray = ['https://www.reddit.com/r/dataisbeautiful.json', 'https://www.reddit.com/r/NatureIsFuckingLit.json', 'https://www.reddit.com/r/wholesomememes.json', 'https://www.reddit.com/r/Art.json'];
  var randomSubreddit = randomArray[Math.floor(randomArray.length * Math.random())];
  createRequest(randomSubreddit, getRedditData);
});

document.querySelector('#myBoardsLink').addEventListener('click', () => {
  mainContainer.innerHTML = '';
  createRequest('https://www.reddit.com/r/travel.json', getRedditData);
});

document.querySelector('#getAppLink').addEventListener('click', () => {
  mainContainer.innerHTML = '';
  createRequest('https://www.reddit.com/r/Castleporn.json', getRedditData);
});

createRequest('https://www.reddit.com/r/StreetArt.json', getRedditData);
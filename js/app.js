/*jshint esversion: 6 */

(function() {
  var mainBody = document.getElementsByTagName('body')[0];
  var mainContainer = document.querySelector('#container');

  function createRequest(url) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', getRedditData);
    oReq.open('GET', url);
    oReq.send();

    function getRedditData() {
      var response = JSON.parse(this.responseText);

      for ( var i = 1; i < 5; i++ ) {
        var redditData = response.data.children[i].data;
        if ( redditData.url.match(/\.(jpeg|jpg|gif|png)$/) === null ) {
          continue;
        }

        var postBox = document.createElement('div');
        postBox.className = 'postBox';
        mainContainer.appendChild(postBox);

        var imgBox = document.createElement('div');
        imgBox.className = 'imgBox';
        postBox.appendChild(imgBox);

        var images = document.createElement('img');
        images.className = 'images';
        images.src = redditData.url;
        postBox.appendChild(images);

        var title = document.createElement('a');
        title.className = 'title';
        title.innerHTML = redditData.title;
        title.setAttribute('href', redditData.url);
        postBox.appendChild(title);

        var decodeDate = new Date(redditData.created_utc);
        var date = decodeDate.toLocaleDateString();

        var postInfo = document.createElement('p');
        postInfo.className = 'postInfo';
        postInfo.innerHTML = `by ${redditData.author} &centerdot; ${date} &centerdot; ${redditData.ups} upvotes`;
        postBox.appendChild(postInfo);

      }
    } // getRedditData
  } // createRequest

  createRequest('https://www.reddit.com/r/travel.json');

})();
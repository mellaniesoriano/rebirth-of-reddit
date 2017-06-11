console.log('sanity check');

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
      // console.log(response.data);
      // console.log(response.data.children[1].data.preview.images.length);

      function makeElems(type, className, content, appendTarget, name, value) {
        var newElement = document.createElement(type);
        newElement.className = className;
        newElement.setAttribute(name, value);
        newElement.innerHTML = content;
        appendTarget.appendChild(newElement);
      }


      // main data : response.data.children
      for ( var i = 1; i < response.data.children.length; i++ ) {
        // console.log(response.data.children[i].data);
        var redditData = response.data.children[i].data;

        var postBox = document.createElement('div');
        postBox.className = 'postBox';
        mainContainer.appendChild(postBox);

        var infoBox = document.createElement('div');
        infoBox.className = 'infoBox';
        postBox.appendChild(infoBox);

        var imgBox = document.createElement('div');
        imgBox.className = 'imgBox';
        postBox.appendChild(imgBox);

        makeElems('a', 'title', redditData.title, infoBox, 'href', redditData.url);
        makeElems('div', 'author', redditData.author, infoBox);
        makeElems('div', 'time', redditData.created_utc, infoBox);

        for ( var key1 in redditData.media ) {
          for ( var key2 in redditData.media[key1] ) {
            if ( key2 === 'description' ) {
              var description = document.createElement('div');
              description.id = 'description';
              description.innerHTML = redditData.media[key1][key2];
              infoBox.appendChild(description);
            }
          }
        }

        var thumbnail = document.createElement('img');
        thumbnail.className = 'thumbnailImg';
        thumbnail.src = redditData.thumbnail;
        thumbnail.setAttribute('href', redditData.url);
        imgBox.appendChild(thumbnail);




      }// data.children for loop

      // for ( var k = 0; k < response.data.children.data.media.length)

    } // getRedditData
  } // createRequest

  createRequest('https://www.reddit.com/r/ChildrenFallingOver.json');
  // createRequest('https://www.reddit.com/r/ChildrenFallingOver.json', 'thumbnail');

})();
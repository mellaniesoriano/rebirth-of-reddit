console.log('sanity check');

(function() {
  var mainContainer = document.querySelector('#container');

  function makeDomElems(type, id, content, appendTarget) {
    var newElement = document.createElement(type);
    newElement.id = id;
    newElement.innerHTML = content;
    appendTarget.appendChild(newElement);
  }

  makeDomElems('div', 'titleHeader', 'titleHeader', mainContainer);
  makeDomElems('nav', 'navBar', 'navigation', mainContainer);
  makeDomElems('div', 'mainPostContainer', 'main post box', mainContainer);
  makeDomElems('div', 'postBox', 'indiv post box', mainPostContainer);
  makeDomElems('div', 'imgBox', 'image goes here', postBox);
  makeDomElems('div', 'infoBox', 'info goes here', postBox);
  makeDomElems('footer', 'footer', 'footer goes here', mainContainer);

  function createRequest(url) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', getRedditData);
    oReq.open('GET', url);
    oReq.send();

    function getRedditData() {
      var response = JSON.parse(this.responseText);
      // console.log(response.data);
      // console.log(response.data.children[1].data.preview.images.length);

      function makeElems(type, id, content, appendTarget, name, value) {
        var newElement = document.createElement(type);
        newElement.id = id;
        newElement.setAttribute(name, value);
        newElement.innerHTML = content;
        appendTarget.appendChild(newElement);
      }


      // main data : response.data.children
      for ( var i = 0; i < response.data.children.length; i++ ) {
        // console.log(response.data.children[i].data);
        var redditData = response.data.children[i].data;


        makeElems('a', 'title', redditData.title, postBox, 'href', redditData.url);
        makeElems('div', 'author', redditData.author, infoBox);
        makeElems('div', 'time', redditData.created_utc, infoBox);

        var thumbnail = document.createElement('img');
        thumbnail.className = 'thumbnailImg';
        thumbnail.src = response.data.children[i].data.thumbnail;
        postBox.appendChild(thumbnail);

        for ( var key1 in redditData.media ) {
          for ( var key2 in redditData.media[key1] ) {
            if ( key2 === 'description' ) {
              var description = document.createElement('div');
              description.id = 'description';
              description.innerHTML = redditData.media[key1][key2];
              postBox.appendChild(description);
            }
          }
        }
      }// data.children for loop

      // for ( var k = 0; k < response.data.children.data.media.length)

    } // getRedditData
  } // createRequest

  createRequest('https://www.reddit.com/r/ChildrenFallingOver.json');
  // createRequest('https://www.reddit.com/r/ChildrenFallingOver.json', 'thumbnail');

})();
console.log('sanity check');

(function() {
  var mainContainer = document.querySelector('#container');

  function makeElems(type, id, content, appendTarget) {
    var newElement = document.createElement(type);
    newElement.id = id;
    newElement.innerHTML = content;
    appendTarget.appendChild(newElement);
  }

  makeElems('div', 'titleHeader', 'titleHeader', mainContainer);
  makeElems('nav', 'navBar', 'navigation', mainContainer);
  makeElems('div', 'mainPostContainer', 'main post box', mainContainer);
  makeElems('div', 'postBox', 'indiv post box', mainPostContainer);
  makeElems('div', 'imgBox', 'image goes here', postBox);
  makeElems('div', 'infoBox', 'info goes here', postBox);
  makeElems('footer', 'footer', 'footer goes here', mainContainer);

  function createRequest(url, propertyName) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', getRedditData);
    oReq.open('GET', url);
    oReq.send();

    function getRedditData() {
      var response = JSON.parse(this.responseText);
      // console.log(response.data);
      console.log(response.data.children[1].data.preview.images.length);

      // main data : response.data.children
      for ( var i = 1; i < response.data.children.length; i++ ) {
        // console.log(response.data.children[i].data);

        var title = document.createElement('div');
        title.id = 'showData';
        title.innerHTML = response.data.children[i].data[propertyName];
        mainContainer.appendChild(title);

      } // data.children for loop
    } // getRedditData
  } // createRequest

  createRequest('https://www.reddit.com/r/ChildrenFallingOver.json', 'title');
  // createRequest('https://www.reddit.com/r/ChildrenFallingOver.json', 'thumbnail');

})();
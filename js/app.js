console.log('sanity check');

(function() {
  var mainContainer = document.querySelector('#container');

  function createRequest(url) {
    var oReq = new XMLHttpRequest();
    oReq.addEventListener('load', getRedditData);
    oReq.open('GET', url);
    oReq.send();

    function getRedditData() {
      var response = JSON.parse(this.responseText);
      // console.log(response.data);

      for ( var i = 0; i < response.data.children.length; i++ ) {console.log(response.data.children[i].data.preview);
        var showData = document.createElement('div');
        showData.id = 'showData';
        showData.innerHTML = response.data.children[i].data.title;
        mainContainer.appendChild(showData);
      }
    } // getRedditData
  } // createRequest

  createRequest('https://www.reddit.com/r/ChildrenFallingOver.json');

})();
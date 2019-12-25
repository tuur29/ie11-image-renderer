let prevRenderTime = 0;

let getRenderTime = function() {
  return new Date().getTime();
};

let updateTitle = function(title) {
    window.title = title;
    document.querySelector("title").innerHTML = title;
};

let render = function(url) {
  let width = window.innerWidth;
  let height = window.innerHeight;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let json = JSON.parse(xhr.responseText);

      let element = document.querySelector("#image");
      element.setAttribute("src", json.image);
      updateTitle(json.title);
    }
  };
  let data = JSON.stringify({
    url: url,
    width: width,
    height: height
  });

  xhr.send(data);
  prevRenderTime = getRenderTime();
};

render(initialUrl);

let renderTimeout = null;
let renderLimit = 2 * 1000;
window.onresize = function() {
  if (getRenderTime() > prevRenderTime + renderLimit) {
    clearTimeout(renderTimeout);
    renderTimeout = null;
    render(initialUrl);
  } else if (!renderTimeout) {
    renderTimeout = setTimeout(function() {
      render(initialUrl);
    }, renderLimit);
  }
};

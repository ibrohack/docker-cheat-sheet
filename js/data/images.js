(window.CHEATSHEET = window.CHEATSHEET || []).push({
  id:"images", h:"Images", note:"Pull, build, tag.",
  groups:[
    { items:[
      ["docker images","Local images"],
      ["docker pull <img>:<tag>","Download a specific version"],
      ["docker build -t <img>:<tag> .","Build from the Dockerfile in the current directory"],
      ["docker build --no-cache -t <img> .","Build ignoring the cache"],
      ["docker build -f Dockerfile.dev -t <img> .","Use a different Dockerfile"],
      ["docker tag <img>:<tag> <repo>/<img>:<tag>","Retag before publishing"],
      ["docker push <repo>/<img>:<tag>","Push to the registry"],
      ["docker history <img>","Image layers and their size"],
      ["docker rmi <img>","Delete an image","care"],
      ["docker save -o img.tar <img>","Export an image to a file"],
      ["docker load -i img.tar","Import an image from a file"]
    ]}
  ]
});

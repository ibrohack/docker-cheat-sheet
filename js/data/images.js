window.CHEATSHEET = window.CHEATSHEET || [];
window.CHEATSHEET.push({
  id:"images", h:"Images", note:"Pull, build, tag.",
  groups:[
    { label:"List and inspect", items:[
      ["docker images","Local images"],
      ["docker images -a","All images, intermediate layers included"],
      ["docker images <img>","Only the images of one repository"],
      ["docker images --digests","Show the sha256 digest of each image"],
      ["docker images --format 'table {{.Repository}}\\t{{.Tag}}\\t{{.Size}}'","Compact view: name, tag, size"],
      ["docker image inspect <img>","Full details as JSON"],
      ["docker image inspect -f '{{.Config.Env}}' <img>","Environment variables baked into the image"],
      ["docker history <img>","Image layers and their size"],
      ["docker history --no-trunc <img>","Full command of every layer"]
    ]},
    { label:"Build", items:[
      ["docker build -t <img>:<tag> .","Build from the Dockerfile in the current directory"],
      ["docker build --no-cache -t <img> .","Build ignoring the cache"],
      ["docker build -f Dockerfile.dev -t <img> .","Use a different Dockerfile"],
      ["docker build --pull -t <img> .","Refresh the base image before building"],
      ["docker build --build-arg KEY=value -t <img> .","Pass a build argument (ARG in the Dockerfile)"],
      ["docker build --target <stage> -t <img> .","Build only up to one stage of a multi-stage Dockerfile"],
      ["docker build --platform linux/amd64 -t <img> .","Build for another CPU architecture"],
      ["docker buildx build --platform linux/amd64,linux/arm64 -t <repo>/<img>:<tag> --push .","Multi-architecture build, pushed straight to the registry"],
      ["docker commit <ct> <img>:<tag>","Save a container's current state as an image"],
      ["docker tag <img>:<tag> <repo>/<img>:<tag>","Retag before publishing"]
    ]},
    { label:"Registry", items:[
      ["docker login","Sign in to Docker Hub or a registry"],
      ["docker logout","Forget the stored credentials"],
      ["docker search <term>","Search Docker Hub from the terminal"],
      ["docker pull <img>:<tag>","Download a specific version"],
      ["docker pull --platform linux/amd64 <img>:<tag>","Download the image for a specific architecture"],
      ["docker manifest inspect <repo>/<img>:<tag>","Check that a tag exists and which platforms it has"],
      ["docker push <repo>/<img>:<tag>","Push to the registry"]
    ]},
    { label:"Export, import and remove", items:[
      ["docker save -o img.tar <img>","Export an image to a file"],
      ["docker load -i img.tar","Import an image from a file"],
      ["docker export -o ct.tar <ct>","Export a container's filesystem (no history, no metadata)"],
      ["docker import ct.tar <img>:<tag>","Create an image from an exported filesystem"],
      ["docker rmi <img>","Delete an image","care"],
      ["docker images -q -f dangling=true | xargs -r docker rmi","Delete every dangling image","care"]
    ]}
  ]
});

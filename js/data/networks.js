(window.CHEATSHEET = window.CHEATSHEET || []).push({
  id:"networks", h:"Networks", note:"How containers see each other.",
  groups:[
    { items:[
      ["docker network ls","List networks"],
      ["docker network create <network>","Create your own bridge network"],
      ["docker run --network <network> --name db <img>","Join a network: the name becomes the host"],
      ["docker network connect <network> <ct>","Add a container to another network"],
      ["docker network disconnect <network> <ct>","Remove it from the network"],
      ["docker network inspect <network>","See which containers and IPs are inside"]
    ]}
  ]
});

window.CHEATSHEET = window.CHEATSHEET || [];
window.CHEATSHEET.push({
  id:"networks", h:"Networks", note:"How containers see each other.",
  groups:[
    { label:"Manage networks", items:[
      ["docker network ls","List networks"],
      ["docker network ls -q","Only the IDs"],
      ["docker network ls --filter driver=bridge","Only one kind of network (bridge, host, overlay...)"],
      ["docker network create <network>","Create your own bridge network"],
      ["docker network create --subnet 172.28.0.0/16 <network>","Pick the IP range yourself"],
      ["docker network create --internal <network>","A network with no access to the outside world"],
      ["docker network inspect <network>","See which containers and IPs are inside"],
      ["docker network inspect -f '{{range .Containers}}{{.Name}} {{.IPv4Address}}{{println}}{{end}}' <network>","Just name and IP of each container in it"],
      ["docker network rm <network>","Delete a network that has no containers attached","care"]
    ]},
    { label:"Join and connect", items:[
      ["docker run --network <network> --name db <img>","Join a network: the name becomes the host"],
      ["docker run --network <network> --network-alias db <img>","Join with an extra name other containers can use"],
      ["docker run --network host <img>","Share the host's network stack (Linux only)"],
      ["docker run --network none <img>","No network at all"],
      ["docker run --add-host=host.docker.internal:host-gateway <img>","Reach services running on the host (needed on Linux)"],
      ["docker run --dns 8.8.8.8 <img>","Use a specific DNS server"],
      ["docker network connect <network> <ct>","Add a container to another network"],
      ["docker network connect --alias db <network> <ct>","Add it under an alias"],
      ["docker network disconnect <network> <ct>","Remove it from the network"]
    ]},
    { label:"Debug connectivity", items:[
      ["docker inspect -f '{{json .NetworkSettings.Networks}}' <ct>","Networks a container is attached to, with its IP in each"],
      ["docker exec <ct> getent hosts <ct2>","Does the other container's name resolve?"],
      ["docker exec <ct> bash -c 'echo > /dev/tcp/<ct2>/5432 && echo open'","Is the port reachable? Needs nothing but bash (5432 = Postgres)"],
      ["docker exec <ct> cat /etc/resolv.conf","DNS servers the container uses"],
      ["docker run --rm -it --network <network> nicolaka/netshoot","Toolbox container (ping, curl, dig, tcpdump) on that network"]
    ]}
  ]
});

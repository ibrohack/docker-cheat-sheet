window.CHEATSHEET = window.CHEATSHEET || [];
window.CHEATSHEET.push({
  id:"cleanup", h:"Space and cleanup", note:"What you recover when the disk fills up.",
  groups:[
    { label:"Disk usage", items:[
      ["docker system df","How much space images, containers and volumes use"],
      ["docker system df -v","Detailed breakdown, item by item"],
      [String.raw`docker system df --format 'table {{.Type}}\t{{.Size}}\t{{.Reclaimable}}'`,"Summary: type, size, how much is reclaimable"],
      [String.raw`docker ps -as --format 'table {{.Names}}\t{{.Size}}'`,"Writable-layer size of every container"],
      ["docker buildx du","Space taken by the build cache"],
      ["docker info --format '{{.DockerRootDir}}'","Where Docker keeps its data on disk"],
      ["sudo sh -c 'du -sh /var/lib/docker/containers/*/*-json.log | sort -h'","Size of every container log file, biggest last (Linux host, json-file driver)"],
      ["sudo truncate -s 0 $(docker inspect --format='{{.LogPath}}' <ct>)","Empty one container's log file without stopping it (json-file driver)","danger"]
    ]},
    { label:"Orphans: list only, nothing is deleted", items:[
      ["docker ps -a -f status=exited -f status=created -f status=dead","Containers that exited, died or were created but never started"],
      ["docker volume ls -f dangling=true","Volumes no container uses, running or stopped"],
      ["docker volume ls -q | grep -E '^[0-9a-f]{64}$'","Anonymous volumes (64-character hash names), used or not"],
      ["docker ps -a --filter volume=<vol>","Containers that still reference a volume"],
      ["docker network ls -f dangling=true","Networks with no running container (what network prune deletes)"],
      [String.raw`comm -23 <(docker network ls --filter type=custom --format '{{.Name}}' | sort -u) <(docker ps -a --format '{{.Networks}}' | tr ',' '\n' | sort -u)`,"Networks no container references at all, stopped ones included (bash)"],
      ["docker images -f dangling=true","Dangling images: untagged leftovers of old builds"],
      ["comm -23 <(docker image ls -q --no-trunc | sort -u) <(docker ps -aq | xargs -r docker inspect -f '{{.Image}}' | sort -u)","Image IDs no container uses (what image prune -a would delete) (bash)"]
    ]},
    { label:"Prune: this deletes", items:[
      ["docker container prune","Delete all stopped containers","care"],
      ["docker container prune --filter \"until=24h\"","Only those stopped more than a day ago","care"],
      ["docker image prune","Delete dangling (untagged) images","care"],
      ["docker image prune -a","Delete every image without an associated container","danger"],
      ["docker image prune -a --filter \"until=720h\"","The same, but only images created more than 30 days ago","danger"],
      ["docker network prune","Delete networks with no running container","care"],
      ["docker builder prune","Empty the build cache","care"],
      ["docker builder prune -a","Also the cache that recent builds still use","care"],
      ["docker volume prune","Delete unused anonymous volumes (named ones are kept)","danger"],
      ["docker volume prune -a","Delete every unused volume, named ones too","danger"],
      ["docker system prune","Stopped containers, unused networks, dangling images and build cache in one go","care"],
      ["docker system prune -a --volumes","Wipes out everything unused","danger"]
    ]},
    { label:"Daemon", items:[
      ["docker info","Storage driver, root directory, number of containers and images"],
      ["docker version","Client and daemon versions"],
      ["docker events","Real-time stream of daemon events"],
      ["docker events --since 1h --until 1s","What happened in the last hour, then exit"],
      ["docker events --filter event=die","Watch containers exit (spot crash loops)"]
    ]}
  ]
});

window.CHEATSHEET = window.CHEATSHEET || [];
window.CHEATSHEET.push({
  id:"volumes", h:"Volumes and files", note:"Where the things you can't lose live.",
  groups:[
    { items:[
      ["docker volume ls","List volumes"],
      ["docker volume inspect <vol>","Details, including the real path on the host"],
      ["docker volume create <vol>","Create a named volume"],
      ["docker run -v <vol>:/path <img>","Mount a named volume"],
      ["docker run -v \"$PWD\":/path <img>","Mount a host folder (bind mount)"],
      ["docker run -v <vol>:/path:ro <img>","Mount read-only"],
      ["docker run --rm -it -v <vol>:/data alpine sh","Explore a volume without its container"],
      ["docker cp <ct>:/path ./destination","Copy files out of the container"],
      ["docker cp ./file <ct>:/path","Copy files into the container"],
      ["docker run --rm -v <vol>:/d -v \"$PWD\":/b alpine tar czf /b/backup.tar.gz -C /d .","Back up the volume"],
      ["docker volume rm <vol>","Delete a volume and its data","danger"]
    ]}
  ]
});

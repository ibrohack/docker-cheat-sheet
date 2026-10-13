window.CHEATSHEET = window.CHEATSHEET || [];
window.CHEATSHEET.push({
  id:"volumes", h:"Volumes and files", note:"Where the things you can't lose live.",
  groups:[
    { label:"Manage volumes", items:[
      ["docker volume ls","List volumes"],
      ["docker volume ls -q","Only the names"],
      ["docker volume ls --filter name=odoo","Volumes whose name contains \"odoo\""],
      ["docker volume ls --filter label=project=odoo","Volumes with a given label"],
      ["docker volume inspect <vol>","Details, including the real path on the host"],
      ["docker volume inspect -f '{{.Mountpoint}}' <vol>","Only the path on the host (inside the VM on Docker Desktop)"],
      ["docker ps -a --filter volume=<vol> --format '{{.Names}} {{.Status}}'","Which containers use this volume"],
      ["docker volume create <vol>","Create a named volume"],
      ["docker volume create --label project=odoo <vol>","Create it with a label you can filter on later"],
      ["docker volume rm <vol>","Delete a volume and its data","danger"]
    ]},
    { label:"Mount into a container", items:[
      ["docker run -v <vol>:/path <img>","Mount a named volume"],
      ["docker run -v \"$PWD\":/path <img>","Mount a host folder (bind mount)"],
      ["docker run -v <vol>:/path:ro <img>","Mount read-only"],
      ["docker run --mount type=volume,src=<vol>,dst=/path <img>","Same as -v, explicit syntax"],
      ["docker run --mount type=bind,src=\"$PWD\",dst=/path <img>","Bind mount that fails if the folder doesn't exist (-v would create it)"],
      ["docker run --tmpfs /tmp <img>","In-memory folder, gone when the container stops"],
      ["docker run --rm -it -v <vol>:/data alpine sh","Explore a volume without its container"]
    ]},
    { label:"Copy and back up", items:[
      ["docker cp <ct>:/path ./destination","Copy files out of the container"],
      ["docker cp ./file <ct>:/path","Copy files into the container"],
      ["docker run --rm -v <vol>:/d alpine ls -la /d","List the files of a volume"],
      ["docker run --rm -v <vol>:/d alpine du -sh /d","Total size of a volume"],
      ["docker run --rm -v <vol>:/d -v \"$PWD\":/b alpine tar czf /b/backup.tar.gz -C /d .","Back up the volume"],
      ["docker run --rm -v <vol>:/d -v \"$PWD\":/b alpine tar xzf /b/backup.tar.gz -C /d","Restore a backup into a volume (overwrites files with the same name)","care"],
      ["docker run --rm -v <vol>:/from -v <vol_new>:/to alpine cp -a /from/. /to/","Copy the contents of one volume into another","care"]
    ]}
  ]
});

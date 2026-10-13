window.CHEATSHEET = window.CHEATSHEET || [];
window.CHEATSHEET.push({
  id:"containers", h:"Containers", note:"Start, look inside, stop.",
  groups:[
    { label:"List and inspect", items:[
      ["docker ps","Running containers"],
      ["docker ps -a","All of them, including stopped ones"],
      ["docker ps -q","Only the IDs, handy inside $(...)"],
      ["docker ps -s","Adds the disk size of each container"],
      ["docker ps -a -f status=exited","Only the stopped ones (also created, paused, dead)"],
      ["docker ps --format 'table {{.Names}}\\t{{.Status}}\\t{{.Ports}}'","Compact view: name, status, ports"],
      ["docker stats","Live CPU and memory usage"],
      ["docker stats --no-stream","One snapshot instead of a live view"],
      ["docker top <ct>","Processes inside the container"],
      ["docker inspect <ct>","Full configuration as JSON"],
      ["docker inspect -f '{{.State.Health.Status}}' <ct>","Healthcheck status only"],
      ["docker inspect -f '{{.State.ExitCode}}' <ct>","Exit code of a stopped container"],
      ["docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}} {{end}}' <ct>","IP address on each network"],
      ["docker inspect -f '{{json .Mounts}}' <ct>","Volumes and bind mounts it uses"],
      ["docker port <ct>","Which ports are mapped"],
      ["docker diff <ct>","Files changed compared to the image"]
    ]},
    { label:"Run", items:[
      ["docker run -d --name <ct> <img>","Start in the background with a name"],
      ["docker run --rm -it <img> sh","Disposable session: removed on exit"],
      ["docker run -d -p 8069:8069 <img>","Publish a port host:container"],
      ["docker run -d -e KEY=value <img>","Pass an environment variable"],
      ["docker run -d --env-file .env <img>","Load environment variables from a file"],
      ["docker run -d --restart unless-stopped --name <ct> <img>","Come back after a crash or a reboot"],
      ["docker run -d --memory 1g --cpus 2 <img>","Cap memory and CPU"],
      ["docker run --rm -v \"$PWD\":/work -w /work <img> <cmd>","Run one command against the current folder"],
      ["docker create --name <ct> <img>","Create the container without starting it"]
    ]},
    { label:"Exec and logs", items:[
      ["docker exec -it <ct> bash","Open a shell inside a running container"],
      ["docker exec -u root -it <ct> bash","Enter as root (install packages, permissions)"],
      ["docker exec <ct> env","Environment variables as the container sees them"],
      ["docker logs -f --tail 100 <ct>","Follow the log starting from the last 100 lines"],
      ["docker logs --since 10m <ct>","Only the last 10 minutes"],
      ["docker logs -t --tail 50 <ct>","Last 50 lines with timestamps"],
      ["docker logs --since 2h --until 1h <ct>","A time window: from 2 hours ago to 1 hour ago"],
      ["docker logs <ct> 2>&1 | grep -i error","Search the log (many apps write to stderr)"],
      ["docker events --filter container=<ct>","Start, stop and die events for one container"]
    ]},
    { label:"Lifecycle", items:[
      ["docker start <ct>","Start a stopped container"],
      ["docker stop <ct>","Graceful stop (SIGTERM, then SIGKILL)"],
      ["docker restart <ct>","Restart"],
      ["docker pause <ct>","Freeze all its processes"],
      ["docker unpause <ct>","Resume a paused container"],
      ["docker kill <ct>","Stop immediately with SIGKILL, no grace period","care"],
      ["docker rename <ct> <new>","Give it a new name"],
      ["docker update --restart unless-stopped <ct>","Change the restart policy of an existing container"],
      ["docker wait <ct>","Block until it stops, then print the exit code"],
      ["docker stop $(docker ps -q)","Stop every running container","care"],
      ["docker rm <ct>","Delete a stopped container","care"],
      ["docker rm -f <ct>","Force delete while running","care"],
      ["docker rm -v <ct>","Delete it with its anonymous volumes (otherwise they stay behind as orphans)","care"]
    ]}
  ]
});

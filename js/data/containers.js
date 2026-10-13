window.CHEATSHEET = window.CHEATSHEET || [];
window.CHEATSHEET.push({
  id:"containers", h:"Containers", note:"Start, look inside, stop.",
  groups:[
    { items:[
      ["docker ps","Running containers"],
      ["docker ps -a","All of them, including stopped ones"],
      ["docker run -d --name <ct> <img>","Start in the background with a name"],
      ["docker run --rm -it <img> sh","Disposable session: removed on exit"],
      ["docker run -d -p 8069:8069 <img>","Publish a port host:container"],
      ["docker run -d -e KEY=value <img>","Pass an environment variable"],
      ["docker exec -it <ct> bash","Open a shell inside a running container"],
      ["docker exec -u root -it <ct> bash","Enter as root (install packages, permissions)"],
      ["docker logs -f --tail 100 <ct>","Follow the log starting from the last 100 lines"],
      ["docker logs --since 10m <ct>","Only the last 10 minutes"],
      ["docker stop <ct>","Graceful stop (SIGTERM, then SIGKILL)"],
      ["docker restart <ct>","Restart"],
      ["docker rm <ct>","Delete a stopped container","care"],
      ["docker rm -f <ct>","Force delete while running","care"],
      ["docker stats","Live CPU and memory usage"],
      ["docker top <ct>","Processes inside the container"],
      ["docker inspect <ct>","Full configuration as JSON"],
      ["docker inspect -f '{{.State.Health.Status}}' <ct>","Healthcheck status only"],
      ["docker port <ct>","Which ports are mapped"],
      ["docker diff <ct>","Files changed compared to the image"]
    ]}
  ]
});

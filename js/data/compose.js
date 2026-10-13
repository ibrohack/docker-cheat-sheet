window.CHEATSHEET = window.CHEATSHEET || [];
window.CHEATSHEET.push({
  id:"compose", h:"Docker Compose", note:"Run it from the folder containing docker-compose.yml.",
  groups:[
    { items:[
      ["docker compose up -d","Start all services in the background"],
      ["docker compose up -d --build","Rebuild images before starting"],
      ["docker compose ps","Service status"],
      ["docker compose logs -f <service>","Follow a service's log"],
      ["docker compose exec <service> bash","Shell inside a service"],
      ["docker compose run --rm <service> <cmd>","Run a one-off command in a new container"],
      ["docker compose restart <service>","Restart a single service"],
      ["docker compose stop","Stop without deleting anything"],
      ["docker compose down","Stop and delete containers and network","care"],
      ["docker compose down -v","Also deletes volumes: you lose the data","danger"],
      ["docker compose config","Show the resolved YAML with variables"],
      ["docker compose pull","Update the declared images"],
      ["docker compose -f compose.prod.yml up -d","Use a different compose file"]
    ]}
  ]
});

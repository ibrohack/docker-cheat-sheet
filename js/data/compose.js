window.CHEATSHEET = window.CHEATSHEET || [];
window.CHEATSHEET.push({
  id:"compose", h:"Docker Compose", note:"Run it from the folder containing docker-compose.yml.",
  groups:[
    { label:"Up, stop and down", items:[
      ["docker compose up -d","Start all services in the background"],
      ["docker compose up -d --build","Rebuild images before starting"],
      ["docker compose up -d <service>","Start one service (plus the ones it depends on)"],
      ["docker compose up -d --no-deps <service>","Only that service, ignoring its dependencies"],
      ["docker compose up -d --force-recreate","Recreate the containers even if nothing changed"],
      ["docker compose up -d --scale <service>=3","Run several replicas of a service"],
      ["docker compose up --abort-on-container-exit","In the foreground; stop everything when one container exits"],
      ["docker compose start","Start containers that were stopped"],
      ["docker compose stop","Stop without deleting anything"],
      ["docker compose stop <service>","Stop a single service"],
      ["docker compose restart <service>","Restart a single service"],
      ["docker compose down","Stop and delete containers and network","care"],
      ["docker compose down --remove-orphans","Also delete containers of services no longer in the file","care"],
      ["docker compose down --rmi local","Also delete the images compose built","care"],
      ["docker compose down -v","Also deletes volumes: you lose the data","danger"]
    ]},
    { label:"Build and update", items:[
      ["docker compose build <service>","Build the image of one service"],
      ["docker compose build --no-cache <service>","Build ignoring the cache"],
      ["docker compose pull","Update the declared images"],
      ["docker compose pull <service>","Update the image of one service"]
    ]},
    { label:"Inspect", items:[
      ["docker compose ps","Service status"],
      ["docker compose ps -a","Include stopped containers"],
      ["docker compose ps --services","Only the service names"],
      ["docker compose ls","Every compose project on this machine"],
      ["docker compose top","Processes of every service"],
      ["docker compose images","Image used by each service"],
      ["docker compose port <service> 8069","Host port published for a container port"],
      ["docker compose logs -f <service>","Follow a service's log"],
      ["docker compose logs --tail 100 -f","Last 100 lines of every service, then follow"],
      ["docker compose logs -t <service>","A service's log with timestamps"],
      ["docker compose events","Real-time stream of events from the project"]
    ]},
    { label:"Run and exec", items:[
      ["docker compose exec <service> bash","Shell inside a service"],
      ["docker compose exec -u root <service> bash","Shell as root inside a service"],
      ["docker compose exec -T <service> <cmd>","No TTY: needed for pipes, redirects and cron jobs"],
      ["docker compose run --rm <service> <cmd>","Run a one-off command in a new container"],
      ["docker compose run --rm --no-deps <service> <cmd>","Same, without starting the services it depends on"],
      ["docker compose cp <service>:/path ./destination","Copy files out of a service"]
    ]},
    { label:"Config and files", items:[
      ["docker compose config","Show the resolved YAML with variables"],
      ["docker compose config -q","Only validate: silent when the file is correct"],
      ["docker compose config --services","List the service names"],
      ["docker compose -f compose.prod.yml up -d","Use a different compose file"],
      ["docker compose --env-file .env.prod up -d","Read variables from another env file"],
      ["docker compose -p <project> up -d","Run under another project name (a second copy side by side)"],
      ["docker compose --profile <name> up -d","Also start the services of a profile"]
    ]}
  ]
});

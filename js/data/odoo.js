window.CHEATSHEET = window.CHEATSHEET || [];
window.CHEATSHEET.push({
  id:"odoo", h:"Odoo recipes", note:"Shortcuts for day-to-day work with instances.",
  groups:[
    { label:"Odoo container", items:[
      ["docker exec -it <ct> ls -lh /var/lib/odoo/filestore","See the filestore per database"],
      ["docker exec <ct> sh -c 'du -sh /var/lib/odoo/filestore/*'","Attachment size of each database (sh -c: the * has to be expanded inside the container)"],
      ["docker exec <ct> odoo --version","Odoo version running in the container"],
      ["docker exec <ct> cat /etc/odoo/odoo.conf","Configuration file the container is using"],
      ["docker exec <ct> ls /mnt/extra-addons","Custom modules available to Odoo"],
      ["docker compose logs -f <service> | grep -i error","Filter errors from the Odoo log"],
      ["docker compose logs --since 1h <service> | grep -iE \"error|critical|traceback\"","Errors, criticals and tracebacks of the last hour"],
      ["docker logs --since 1h <ct> 2>&1 | grep -iE \"error|critical|traceback\"","The same for a container without compose"],
      ["docker compose restart <service> && docker compose logs -f --tail 20 <service>","Restart Odoo after editing odoo.conf and watch it come up"],
      ["docker compose up -d --force-recreate <service>","Apply changes to the environment or the compose file (a restart doesn't)"],
      ["docker cp ./my_module <ct>:/mnt/extra-addons/","Copy a module into the container (it arrives owned by root; restart and update it afterwards)"],
      ["docker exec <ct> odoo scaffold <module> /mnt/extra-addons","Generate the skeleton of a new module"]
    ]},
    { label:"Shell, modules and tests",
      note:"docker compose run starts a new container through the image entrypoint, which hands Odoo the database settings. docker exec skips the entrypoint, so the same settings are passed from the container's own HOST, USER and PASSWORD variables.",
      items:[
      ["docker compose run --rm <service> odoo shell -d <db>","Odoo shell in a throwaway container"],
      ["docker exec -it <ct> sh -c 'PGHOST=$HOST PGUSER=$USER PGPASSWORD=$PASSWORD odoo shell -d <db>'","Odoo shell inside the running container"],
      ["docker compose run --rm <service> odoo -u <module> -d <db> --stop-after-init","Update a module and exit"],
      ["docker exec <ct> sh -c 'PGHOST=$HOST PGUSER=$USER PGPASSWORD=$PASSWORD odoo -u <module> -d <db> --stop-after-init'","Update a module inside the running container"],
      ["docker compose run --rm <service> odoo -i <module> -d <db> --stop-after-init","Install a module and exit"],
      ["docker compose run --rm <service> odoo -u all -d <db> --stop-after-init","Update every installed module (slow)","care"],
      ["docker compose run --rm <service> odoo -u <module> -d <db> --test-enable --test-tags /<module> --stop-after-init","Update a module and run its tests"],
      ["docker exec <ct> sh -c 'PGHOST=$HOST PGUSER=$USER PGPASSWORD=$PASSWORD odoo i18n export -d <db> -o /tmp/<module>.pot <module>'","Export a module's translation template (written inside the container)"],
      ["docker cp <ct>:/tmp/<module>.pot ./","Copy the exported file to your machine"],
      ["docker exec -i <ct> sh -c 'PGHOST=$HOST PGUSER=$USER PGPASSWORD=$PASSWORD odoo shell -d <db>' <<< \"env['res.users'].browse(2).write({'password': 'newpass'}); env.cr.commit()\"","Set a new password for user id 2 (usually admin)","care"]
    ]},
    { label:"PostgreSQL", items:[
      ["docker exec -it <ct_db> psql -U odoo -l","List the databases"],
      ["docker compose exec <service_db> psql -U odoo -l","The same with compose"],
      ["docker exec -it <ct_db> psql -U odoo -d <db>","SQL console on one database"],
      ["docker compose exec <service_db> psql -U odoo -d <db>","The same with compose"],
      ["docker exec <ct_db> pg_isready -U odoo","Is PostgreSQL accepting connections?"],
      ["docker exec <ct_db> psql -U odoo -d postgres -c \"SELECT version();\"","PostgreSQL version"],
      ["docker exec <ct_db> psql -U odoo -d postgres -c \"SELECT datname, pg_size_pretty(pg_database_size(datname)) AS size FROM pg_database ORDER BY pg_database_size(datname) DESC;\"","Size of every database, biggest first"],
      ["docker exec <ct_db> psql -U odoo -d <db> -c \"SELECT relname, pg_size_pretty(pg_total_relation_size(relid)) AS size FROM pg_catalog.pg_statio_user_tables ORDER BY pg_total_relation_size(relid) DESC LIMIT 15;\"","The 15 biggest tables of a database"],
      ["docker exec <ct_db> psql -U odoo -d postgres -c \"SELECT datname, count(*) FROM pg_stat_activity GROUP BY datname;\"","Open connections per database"],
      ["docker exec <ct_db> psql -U odoo -d postgres -c \"SELECT pid, now() - query_start AS runtime, state, left(query, 60) AS query FROM pg_stat_activity WHERE state <> 'idle' ORDER BY runtime DESC;\"","Queries running right now, longest first"],
      ["docker exec <ct_db> psql -U odoo -d postgres -c \"SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = '<db>' AND pid <> pg_backend_pid();\"","Disconnect everyone from a database (needed to rename, drop or duplicate it)","care"],
      ["docker exec <ct_db> createdb -U odoo <db_new>","Create an empty database"],
      ["docker exec <ct_db> createdb -U odoo -T <db> <db_new>","Duplicate a database (nobody can be connected to it; copy the filestore too)"],
      ["docker exec <ct_db> psql -U odoo -d postgres -c \"ALTER DATABASE <db> RENAME TO <db_new>;\"","Rename a database (rename its filestore folder too)","care"],
      ["docker exec <ct_db> dropdb -U odoo <db>","Delete a database (its filestore stays on disk)","danger"],
      ["docker exec <ct_db> vacuumdb -U odoo -d <db> --full --analyze","Reclaim space and refresh statistics (locks tables while it runs)","care"],
      ["docker exec -i <ct_db> psql -U odoo -d <db> < script.sql","Run a SQL file against a database (-i, never -t)"],
      ["docker logs --tail 100 <ct_db>","Last lines of the PostgreSQL log"]
    ]}
  ]
});

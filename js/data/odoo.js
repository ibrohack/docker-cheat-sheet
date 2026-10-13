(window.CHEATSHEET = window.CHEATSHEET || []).push({
  id:"odoo", h:"Odoo recipes", note:"Shortcuts for day-to-day work with instances.",
  groups:[
    { items:[
      ["docker exec -it <ct> ls -lh /var/lib/odoo/filestore","See the filestore per database"],
      ["docker exec -it <ct> du -sh /var/lib/odoo/filestore/*","Attachment size of each database"],
      ["docker exec -it <ct_db> psql -U odoo -l","List the databases"],
      ["docker exec <ct_db> pg_dump -U odoo <db> > db.sql","Dump the database (no -t: a TTY would corrupt the file)"],
      ["docker compose logs -f odoo | grep -i error","Filter errors from the Odoo log"],
      ["docker compose restart odoo","Restart Odoo after editing odoo.conf"],
      ["docker compose exec odoo odoo -u <module> -d <db> --stop-after-init","Update a module and exit"],
      ["docker compose exec odoo odoo shell -d <db>","Odoo shell against a database"]
    ]}
  ]
});

# Docker cheat sheet

A searchable, click-to-copy cheat sheet of Docker, Docker Compose and Odoo commands, grouped by what you are trying to do. It is a plain static site: no build step, no dependencies, no framework.

- **Containers, Images, Volumes and files, Networks, Docker Compose**: the everyday commands, each section split into small groups (list, run, build, back up...).
- **Space and cleanup**: disk usage, a list-only group of **orphans** (containers, volumes, networks and images that nothing uses) and the prune commands.
- **Odoo recipes**: working with an Odoo container and its PostgreSQL container: shell, module updates, SQL and filestore backups and restores, the Odoo 19 `db` commands and the database manager HTTP endpoints.

## Using it

Open `index.html` in a browser. It works straight from the file system, so no server is needed.

To serve it like a real site, or to host it anywhere that serves static files (GitHub Pages, nginx, S3...), publish the folder as it is:

```sh
python -m http.server 8000     # then open http://localhost:8000
```

| Do this | To |
| --- | --- |
| Click a row, or focus it and press `Enter` / `Space` | copy the command |
| Type in the search box (`/` focuses it, `Esc` clears it) | filter by command, description, group or section name; `orphans` or `odoo` match a whole group or section |
| Click a section in the bar under the search box | jump to it |
| Toggle theme | switch light and dark (it starts with your system setting) |

Rows tagged **careful** change or delete something you could get back (stopped containers, caches, a restart); **destructive** ones delete data or images that are gone unless you have a backup.

The page loads IBM Plex from Google Fonts. Offline it falls back to system fonts and everything else keeps working.

## Reading the commands

Anything in angle brackets is a placeholder to replace before you run the command. They are highlighted on the page and listed in the footer: `<ct>` a container, `<ct_db>` the PostgreSQL container, `<img>` an image, `<vol>` a volume, `<service>` / `<service_db>` the Compose services, `<db>` / `<db_new>` databases, and so on.

- Commands are written for **bash** (Linux, macOS, or Git Bash and WSL on Windows).
- The Odoo rows assume the official images' defaults: database user `odoo`, filestore in `/var/lib/odoo`, addons in `/mnt/extra-addons`, configuration in `/etc/odoo/odoo.conf`.
- `docker exec` skips the Odoo image's entrypoint, so the Odoo rows that need a database connection pass `PGHOST=$HOST PGUSER=$USER PGPASSWORD=$PASSWORD` from the container's own environment. `docker compose run` goes through the entrypoint and needs nothing extra.
- The `odoo db ...` rows need Odoo 19. The `pg_dump` and HTTP backup rows work on older versions too.

## How it is organised

```text
index.html            page markup, footer legend and the list of scripts to load
css/style.css         all styles (light and dark themes are CSS variables)
js/app.js             renders the sections, search, copy-to-clipboard, theme toggle
js/data/<section>.js  the commands, one file per section
```

`js/app.js` contains no commands. Each file in `js/data/` adds one section to `window.CHEATSHEET`, and the page renders whatever is there. The order of the `<script>` tags in `index.html` is the order of the sections on the page.

### Adding or changing a command

Edit the data file of the section and add a row to the right group:

```js
window.CHEATSHEET = window.CHEATSHEET || [];
window.CHEATSHEET.push({
  id:"cleanup", h:"Space and cleanup", note:"What you recover when the disk fills up.",
  groups:[
    { label:"Prune: this deletes",
      note:"Optional text shown under the group caption.",
      items:[
        ["docker network prune", "Delete networks with no running container", "care"],
        ["docker volume prune -a", "Delete every unused volume, named ones too", "danger"]
      ]}
  ]
});
```

- A row is `[command, description]` or `[command, description, flag]`, where `flag` is `"care"` or `"danger"`.
- The description is plain text; it is escaped, so `<` and `&` are safe.
- `label` and `note` on a group are optional. A section with a single unlabelled group looks like one plain list.
- Use placeholders that already exist in the footer legend. If you introduce a new one, add it to the legend in `index.html`. A placeholder is lower case letters, digits, `_` or `-` inside `<>`.
- Keep every command copy-pasteable as one line, and flag anything that deletes or overwrites data.

### Adding a section

1. Create `js/data/<id>.js` as above.
2. Add `<script src="js/data/<id>.js" defer></script>` to `index.html`, before `js/app.js`, at the position where the section should appear.

The jump link and the search pick it up automatically.

### Quick check after editing

```sh
node --check js/data/odoo.js     # syntax of the file you touched
```

Then open `index.html` and make sure the section renders and the search finds your row.

## License

Released under the [MIT License](LICENSE).

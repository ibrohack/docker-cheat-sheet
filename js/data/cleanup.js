(window.CHEATSHEET = window.CHEATSHEET || []).push({
  id:"cleanup", h:"Space and cleanup", note:"What you recover when the disk fills up.",
  groups:[
    { items:[
      ["docker system df","How much space images, containers and volumes use"],
      ["docker system df -v","Detailed breakdown, item by item"],
      ["docker container prune","Delete all stopped containers","care"],
      ["docker image prune","Delete dangling (untagged) images","care"],
      ["docker image prune -a","Delete every image without an associated container","danger"],
      ["docker builder prune","Empty the build cache","care"],
      ["docker volume prune","Delete volumes nobody uses","danger"],
      ["docker system prune -a --volumes","Wipes out everything unused","danger"],
      ["docker events","Real-time stream of daemon events"],
      ["docker version","Client and daemon versions"]
    ]}
  ]
});

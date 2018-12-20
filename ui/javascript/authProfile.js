function showProfile(element) {
 const profile = document.querySelector("#profile-sumary");
 const stats = document.querySelector("#statistics");
 if ('profile' in element.dataset) {
  toggleDisplay(stats, 'none');
  toggleDisplay(profile, 'block');
 } else if ('stats' in element.dataset) {
  toggleDisplay(profile, 'none');
  toggleDisplay(stats, 'block');
 }
}
require('./src/styles/styles.css')
var ahoy = require('ahoy.js').default
ahoy.configure({
  urlPrefix: process.env.API_URL,
  visitsUrl: "/stats/visits",
  eventsUrl: "/stats/events",
  page: null,
  platform: "Web",
  useBeacon: false,
  startOnReady: true,
  trackVisits: true
});
ahoy.trackAll()

exports.onClientEntry = () => {
  // Load Roboto font to support Material Design
  const pathRoboto = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500';
  const linkRoboto = document.createElement('link');
  linkRoboto.setAttribute('rel', 'stylesheet');
  linkRoboto.setAttribute('href', pathRoboto);
  document.head.appendChild(linkRoboto);

  // Load Material Icons
  const pathIcons = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  const linkIcons = document.createElement('link');
  linkIcons.setAttribute('rel', 'stylesheet');
  linkIcons.setAttribute('href', pathIcons);
  document.head.appendChild(linkIcons);
}

exports.onRouteUpdate = function({ location }) {
  ahoy.track('$view', {
    url: location.href,
    title: document.title,
    page: location.pathname
  });
}

exports.onClientEntry = () => { 
}

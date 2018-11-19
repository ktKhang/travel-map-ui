export default {
  items: [
    {
      divider: true,
    },
    {
      title: true,
      name: '',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      divider: true,
    },
    {
      name: 'EXPLORE',
      url: '/explore',
      icon: 'icon-tralvelmap-custom icon-travelmap-home',
    },
    {
      name: 'YOUR ADVENTURE',
      url: '/adventure',
      icon: 'icon-tralvelmap-custom icon-travelmap-adventure',
    }, {
      name: 'ABOUT US',
      url: '/about',
      icon: 'icon-tralvelmap-custom icon-travelmap-aboutus',
    },
  ],
};

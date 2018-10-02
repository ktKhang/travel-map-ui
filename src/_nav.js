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
      name: 'MAP',
      url: '/map',
      icon: 'icon-map',
    },
    {
      title: true,
      name: '',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'DIRECT',
      url: '/base/cards',
      icon: 'icon-pencil',
    },
  ],
};

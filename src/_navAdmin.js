export default {
   items: [
      {
         divider: true,
      },
      {
         title: true,
         name: '',
         wrapper: {
            element: '',
            attributes: {}
         },
         class: ''
      },
      {
         divider: true,
      },

      {
         name: 'DASHBOARD',
         url: '/admin/dashboard',
         icon: 'icon-tralvelmap-custom icon-travelmap-home',
      },
      {
         name: 'USERS',
         url: '/admin/users',
         icon: 'icon-tralvelmap-custom icon-travelmap-home',
      }, {
         name: 'REGIONS',
         url: '/admin/regions',
         icon: 'icon-tralvelmap-custom icon-travelmap-home',
      }, {
         name: 'ADD PLACE',
         url: '/admin/addPlace',
         icon: 'icon-tralvelmap-custom icon-travelmap-home',
      }
   ],
};


if (document.querySelectorAll('body').length) {
    require.ensure([], () => {
        require('./modules/api.js');
        // require('./components/WorldMap');
        // require('./components/WorldMaps2');
        require('./components/world3.js');
        require('./components/Time');
        require('./components/Total');
        require('./components/AdvertiserTop5');
        require('./components/ImpressionTop5');

       
        // const WorldMap2 = require('./components/WorldMaps2').default;
                
        
    })
}
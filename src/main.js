
if (document.querySelectorAll('body').length) {
    require.ensure([], () => {
        const WorldMap = require('./components/WorldMap').default;
        const Time = require('./components/Time').default;
        const Total = require('./components/Total').default;
        const AdvertiserTop5 = require('./components/AdvertiserTop5').default;
        const ImpressionTop5 = require('./components/ImpressionTop5').default;
        const mapdata = new WorldMap().render();
        // var map = AmCharts.makeChart("mapdiv",mapdata);

        const WorldMap2 = require('./components/WorldMaps2').default;
        // new WorldMap2().render();       
        new WorldMap().render('body');
        new Time().render('.wrapper');
        new ImpressionTop5().render('.wrapper');
        
        new AdvertiserTop5().init();
        let total = new Total();
        total.render('.wrapper');
        total.init();

        
    })
}
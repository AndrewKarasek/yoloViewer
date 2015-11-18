pc.script.create('readInfo', function (app) {
    // Creates a new ReadInfo instance
    var ReadInfo = function (entity) {
        this.entity = entity;
    };

    ReadInfo.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {


        },

        set: function () {
            var root = app.root.findByName("Root");
            var ui = root.script.ui.setSelected(this.entity);            
        },
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
        }
    };

    return ReadInfo;
});
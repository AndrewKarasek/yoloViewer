pc.script.attribute('html', 'asset', [], {
    max: 1,
    type: 'html'
});
pc.script.attribute('css', 'asset', [], {
    max: 1,
    type: 'css'
});

pc.script.create('ui', function (app) {
    // Creates a new Ui instance
    var Ui = function (entity) {
        this.entity = entity;
        
        console.log(entity);
    };

    Ui.prototype = {
        // Called once after all resources are loaded and before the first update
        initialize: function () {
            // Get asset from registry by id
            var htmlAsset = app.assets.get(this.html);

            // Create div element
            var div = document.createElement('div');
            div.innerHTML = htmlAsset.resource || '';
            document.body.appendChild(div);

            // When asset resource loads/changes, update html of element
            htmlAsset.on('load', function () {
                div.innerHTML = htmlAsset.resource;
                
                this.populateMenu();
            });

            // Make sure asset loads
            app.assets.load(htmlAsset);

            // Create style element and append to head element
            var style = document.createElement('style');
            document.head.appendChild(style);

            // Get asset from registry by id
            var cssAsset = app.assets.get(this.css);
            style.innerHTML = cssAsset.resource || '';

            // When asset resource loads/changes, update html of element
            cssAsset.on('load', function () {
                style.innerHTML = cssAsset.resource;
            });

            // Make sure asset loads
            app.assets.load(cssAsset);
            
            this.updateValue();
        },
        
        updateValue: function(){
            if(this.selectedEntity){
                var entityTypeField = document.getElementById('entityType');
                var xField = document.getElementById('x');
                var zField = document.getElementById('z');
                var yField = document.getElementById('y');             
                entityTypeField.value = this.selectedEntity.name;
                xField.value = this.selectedEntity.localPosition.x;
                yField.value = this.selectedEntity.localPosition.y;
                zField.value = this.selectedEntity.localPosition.z;
                
            }

        },
        
        setSelected: function(entity){
            this.selectedEntity = entity;
            console.log('selecting: ', entity);
        },
       
        // Called every frame, dt is time in seconds since last update
        update: function (dt) {
                this.updateValue();
               
        }
    };

    return Ui;
});
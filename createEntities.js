pc.script.attribute("materials", "asset", [], {type: "material"});
pc.script.attribute('cubes', 'number', 1000);


function getRand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

pc.script.create('entity_creator', function (app) {

    var MAX_X = 100;
    var MIN_X = -100;
    var MAX_Y = 10;
    var MIN_Y = 0;
    var MAX_Z = 100;
    var MIN_Z = -100;

    var NUM_CUBES = 1000;

    var EntityCreator = function (entity) {
        this.entity = entity;
        this.entities = [];
    };

    EntityCreator.prototype = {
        initialize: function () {
            for (var i = 0; i < NUM_CUBES; i++) {
                this.spawnCube(i);
            }
            
            
        },

        update: function (dt) {
            if(this.entities){
               this.entities.forEach(function(entity, i){
                    entity.move(dt);  
               });
            }
      
        },

        randomMovement: function(){
            var pick = getRand(1, 2);
            console.log(pick);
            if(pick === 1){
               return function(i){
                   return Math.sin(i);
               };
            }
            if(pick === 2){
               return function(i){
                   return Math.cos(i);
               };
            }                     
        },
        
        spawnCube: function (i) {
            var entity = new pc.Entity();
            
            // Add a new Model Component and add it to the Entity.
            entity.addComponent("model", {
                type: 'box'
            });
            //var red = app.assets.getAssetByResourceId(this.materials[0]).resource;
           // entity.model.model.meshInstances[0].material = red;
            var x = pc.math.random(MIN_X, MAX_X);
            var y = pc.math.random(MIN_Y, MAX_Y);
            var z = pc.math.random(MIN_Z, MAX_Z);
            
            entity.originalPosition = { x: x, y: y, z: z };
            entity.movement = { x: this.randomMovement(), y: this.randomMovement(), z: this.randomMovement()};
            entity.speed = { x: getRand(1,4), y: getRand(1,4), z: getRand(1,4)};
            // Move to a random position
            entity.setLocalPosition(x, y ,z);
            
            entity.set = function () {
              var root = app.root.findByName("Root");
              var ui = root.script.ui.setSelected(this);            
            },
                
            entity.name = "Cube "+i;
            
            entity.clickable = true;
            // Add to the Hierarchy
            app.root.addChild(entity);

            // Store in a list for some random duration before deleting
            this.entities.push(
                entity
            );
            
            entity.time = 0;
            entity.move = function(dt){
                 // increment the time value by the frametime
                this.time += dt;

                // Calculate the new value
                var x = this.speed.x * this.movement.x(this.time) + this.originalPosition.x;
                var y = this.speed.y + this.movement.y(this.time) + this.originalPosition.y;
                var z = this.speed.z * this.movement.z(this.time) + this.originalPosition.z;
                // Update the x position of the Entity
              
              entity.setLocalPosition(x, y, z);
          /*     entity.setLocalPosition(
                    pc.math.random(MIN_X, MAX_X),
                    pc.math.random(MIN_Y, MAX_Y),
                    pc.math.random(MIN_Z, MAX_Z)
                ); */
            };
            
            
        }
    };

    return EntityCreator;
});
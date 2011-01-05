(function () {

    var Obj = {
        //merge
        merge: function (object, properties, clobber) {
            for (var property in properties) {
                if (properties.hasOwnProperty(property) && (!object[property] || clobber)) {
                    object[property] = properties[property];
                }
            }
            return object;
        },
        
        //shallow copy
        copy: function(object) {
            return Obj.merge({}, object);
        }
    };

    Obj.merge(Object.prototype, {
        isFunction: function () {
            return Object.prototype.toString.call(this) === '[object Function]';
        }
    })

    Obj.merge(Array, {
        test: function(array) {
            return Object.prototype.toString.apply(array) === '[object Array]';
        }
    });

    Obj.merge(Object.prototype, {
        
        each: function (fun, scope) {
            for (var property in this) {
                if (this.hasOwnProperty(property)) {
                    fun.call(scope || this, property, this[property]);
                }
            }
        },
        
        eachKey: function (fun, scope) {
            for (var property in this) {
                if (this.hasOwnProperty(property)) {
                    fun.call(scope || this, property);
                }
            }
        },
        
        eachValue: function (fun, scope) {
            for (var property in this) {
                if (this.hasOwnProperty(property)) {
                    fun.call(scope || this, this[property]);
                }
            }
        },
        
        update: function (properties, dontClobber) {
            for (var property in properties) {
                if (properties.hasOwnProperty(property) && (!this[property] || !dontClobber)) {
                    this[property] = properties[property];
                }
            }
            return this;
        },
        
        merge: function (properties, dontClobber) {
            var object = Obj.copy(this);
            for (var property in properties) {
                if (properties.hasOwnProperty(property) && (!object[property] || !dontClobber)) {
                    object[property] = properties[property];
                }
            }
            return object;
        },
        
        remove: function (key, not_found_callback, scope) {
            if (this.hasOwnProperty(key)) {
                var value = this[key];
                delete this[key];
                return value;
            }
            return not_found_callback ? not_found_callback.call(scope || this, key) : null;
        },
        
        deleteIf: function (fun, scope) {
            for (var property in this) {
                this.hasOwnProperty(property) && fun.call(scope || this, property, this[property]) && delete this[property];
            }
            return this;
        }
    });

})();


(function() {
    class List extends Array {
        constructor() {
            super();
            for (let i = 0; i < arguments.length; i++) {
                this[i] = arguments[i]
            }
        }

        delete(val) {
            this.splice(this.indexOf(val), 1);
        }

        shuffle(num) {

            if (arguments.length === 0) {
                return this[Math.floor(Math.random() * this.length)];
            } else if (arguments.length > 1) {

                throw new Error("Shuffle function only allows a single argument.");

            } else {
                let result = new List();
                let temp_list = new List();
                this.forEach(function(i) {
                    temp_list.push(i);
                })
                for (let i = 0; i < arguments[0]; i++) {
                    let random_val = temp_list[Math.floor(Math.random() * temp_list.length)];
                    result.push(random_val);
                    temp_list.delete(random_val);
                }
                return result;
            }


        }

    }
    class Iguana {
        constructor() {
            this.List = class extends Array {
                constructor() {
                    super();
                    this.origin = new List()
                    for (let i = 0; i < arguments.length; i++) {
                        this[i] = arguments[i]
                        this.origin.push(arguments[i]);

                    }

                }

                delete(val) {
                    this.splice(this.indexOf(val), 1);
                }

                shuffle(num) {

                    if (arguments.length === 0) {
                        return this[Math.floor(Math.random() * this.length)];
                    } else if (arguments.length > 1) {

                        throw new Error("Shuffle function only allows a single argument.");

                    } else {
                        let result = new List();
                        let temp_list = new List();
                        this.forEach(function(i) {
                            temp_list.push(i);
                        })
                        for (let i = 0; i < arguments[0]; i++) {
                            let random_val = temp_list[Math.floor(Math.random() * temp_list.length)];
                            result.push(random_val);
                            temp_list.delete(random_val);
                        }
                        return result;
                    }


                }

            }
        }
    }

    module.exports = Iguana;

})();
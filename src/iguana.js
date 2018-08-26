    /**
     * List class
     * @example
     * let myList = new Iguana.List(1, 2, "foo", "bar");
     * console.log(myList[0])
     * => 1
     * 
     */
    class List extends Array {
        constructor() {
            super();
            /**
             * List.origin
             * @desc a List containing all of the elements added at the start of the list
             * @example
             * let myList = new Iguana.List(1, 2, "foo", "bar");
             * myList.push("fizz");
             * // "fizz" is not printed to the console because it was added to the List after it was defined.
             * myList.origin.forEach(function(element){ console.log(element) });
             * => 1
             * => 2
             * => "foo"
             * => "bar"
             */
            this.origin = [];
            for (let i = 0; i < arguments.length; i++) {
                this[i] = arguments[i];
                this.origin.push(arguments[i]);

            }
        }
        /**
         * This function removes an element from a list
         * @returns void.
         * @example
         * let myList = new Iguana.List(1, 2, "foo", "bar");
         * myList.delete("bar");
         * myList.forEach(function(element){ console.log(element) });
         * => 1
         * => 2
         * => "foo"
         */
        delete(element) {
            this.splice(this.indexOf(element), 1);
        }

        /**
         * This function returns a random element from a List.
         * @param {number} num optional parameter, if given this function will return a new List with randomized elements this parameter will define the number of elements that will be in the shuffled list.
         * @returns {any}
         * @returns {List}
         * @example
         * let myList = new Iguana.List(1, 2, "foo", "bar", "fizz", 3);
         * console.log(myList.shuffle())
         * => "foo"
         * // If shuffle is given a number as a parameter
         * // This will return a new a list with 3 random elements from the original list
         * console.log(myList.shuffle(3))
         * => List ["fizz", 1, "bar"]
         */
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
                });
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
                    this.origin = new List();
                    for (let i = 0; i < arguments.length; i++) {
                        this[i] = arguments[i];
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
                        });
                        for (let i = 0; i < arguments[0]; i++) {
                            let random_val = temp_list[Math.floor(Math.random() * temp_list.length)];
                            result.push(random_val);
                            temp_list.delete(random_val);
                        }
                        return result;
                    }


                }

            };
        }
    }

module.exports = Iguana;
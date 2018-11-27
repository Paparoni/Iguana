class Iguana {
    constructor() {
        this.List = List;
        this.HTTP = HTTP;
        this.isNode = isNode;
    }
}
/**
 * isNode
 * Returns true or false whether the enviroment is NodeJS
 * @returns {boolean}
 * @example
 * const ig = require('iguana')
 * iguana = new ig();
 * console.log(iguana.isNode());
 * => true
 * 
 * 
 */
const isNode = function() {
    try {
        return this === global;
    } catch (e) {
        return false;
    }
};

/**
 * List class
 * @namespace List
 * @example
 * const ig = require('iguana')
 * iguana = new ig();
 * let myList = new iguana.List(1, 2, "foo", "bar");
 * console.log(myList[0]);
 * => 1
 * 
 */
class List extends Array {
    constructor() {
        super();

        let origin_place = [];
        for (let i = 0; i < arguments.length; i++) {
            this[i] = arguments[i];
            origin_place.push(arguments[i]);

        }
        /**
         * @readonly
         * @name origin
         * @memberof List
         * @instance
         * @desc a List containing all of the elements added at the start of a list
         * @example
         * const ig = require('iguana')
         * iguana = new ig();
         * let myList = new iguana.List(1, 2, "foo", "bar");
         * myList.push("fizz");
         * // "fizz" is not printed to the console because it was added to the List after it was defined.
         * myList.origin.forEach(function(element){ console.log(element) });
         * => 1
         * => 2
         * => "foo"
         * => "bar"
         */
        Object.defineProperty(this, "origin", {
            value: origin_place,
            writable: false
        });
    }
    /**
     * this.delete
     * @memberof List
     * @instance
     * @description This function removes an element from a list
     * @returns void.
     * @example
     * const ig = require('iguana')
     * iguana = new ig();
     * let myList = new iguana.List(1, 2, "foo", "bar");
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
     * this.limit
     * @memberof List
     * @instance
     * @description Sets a limit an element can be present in a list and deletes the excess
     * @param {element} e any element present in the list
     * @param {number} n limit amount, the amount of the element that should be present in the list.
     * @returns void.
     * @example
     * const ig = require('iguana')
     * iguana = new ig();
     * let myList = new iguana.List(1, 2, 3, 3, 3, 4);
     * myList.limit(3, 1);
     * myList.forEach(function(element){ console.log(element) });
     * => 1
     * => 2
     * => 3
     * => 4
     */
    limit(e, n){
        let c = 0;
        this.forEach(function(x){
            if (x == e){
                c++;
            }
        });
        if (c > n){
            let removeAmt = Math.abs(c - n);
            for(let i = 0; i < removeAmt; i++){
                this.delete(e);
            }
        }
    }
    /**
     * this.intersection
     * @memberof List
     * @instance
     * @description Returns the intersection of the two given objects, returns a List of the elements that are commmon in both Objects.
     * @param {Object} object a List or an Array to intersect with
     * @returns List
     * @example
     * const ig = require('iguana')
     * iguana = new ig();
     * let myList = new iguana.List(1, 2, 3, 4, 6, 8, 10);
     * let mySecondList = new iguana.List(5, 3, 4, 2, 12)
     * console.log(myList.intersection(mySecondList))
     * => List [3, 4, 2]
     */
    intersection(object){
        let r = new List();
        let list = this;
        object.forEach(function(v){
            if(list.includes(v)){
                r.push(v);
            }
        });
        return r;
        
    }
    /**
     * this.shuffle
     * @memberof List
     * @instance
     * @description This function returns a random element from a List.
     * @param {number} num optional parameter, if given this function will return a new List with randomized elements this parameter will define the number of elements that will be in the shuffled list.
     * @returns {any}
     * @returns {List}
     * @example
     * const ig = require('iguana')
     * iguana = new ig();
     * let myList = new iguana.List(1, 2, "foo", "bar", "fizz", 3);
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
/**
 * HTTP class
 * @description A useful class for simplifying xmlhttp requests and posts.
 * NOTE: This is not availiable in a NodeJS environment.
 * @param {string} server The server or url you will be making your requests or posts to. 
 * @example
 * let myHttp = new Iguana.HTTP("https://jsonplaceholder.typicode.com/todos/1");
 * console.log(myHttp.server);
 * => https://jsonplaceholder.typicode.com/todos/1
 * 
 */
class HTTP {
    constructor(server) {
        this.server = server;

        let isNode = function() {
            try {
                return this === global;
            } catch (e) {
                return false;
            }
        };
        if (isNode()) {
            throw new Error("HTTP Class not availiable in a node environment.");
        }
    }
    /**
     * this.request
     * @description This function performs an asyncronous http get request on the {server}
     * @async
     * @returns {promise}
     * @param {object} header optional parameter to attach a header to the request
     * @example
     * let myHttp = new Iguana.HTTP("https://jsonplaceholder.typicode.com/todos/1");
     * // This function returns a promise which you can access the data using then
     * myHttp.request().then(function(data){
     *      console.log(data)
     *      }, function(error){
     *  console.log(error);
     * })
     * => {
     * "userId": 1,
     * "id": 1,
     * "title": "delectus aut autem",
     * "completed": false
     * }
     * // Headers must be placed in a dictionary object.
     * myHttp.request({'User-Agent': 'Mozilla/5.0'}).then(function(data){
     *      console.log(data)
     *      }, function(error){
     *  console.log(error);
     * })
     * => {
     * "userId": 1,
     * "id": 1,
     * "title": "delectus aut autem",
     * "completed": false
     * }
     */
    request(header) {
        let url = this.server;
        header = header || {};
        return new Promise(function(success, error) {
            let http = new XMLHttpRequest();
            http.onreadystatechange = function() {
                if (http.readyState == 4 && http.status == 200) {
                    success(http.responseText);
                }
                http.onerror = function(e) {
                    error(new Error("Something with wrong. Status: " + http.status));
                };
            };

            http.open("GET", url, true);
            if (Object.keys(header).length !== 0) {
                let h = "";
                let v = "";
                for (let key in Object.keys(header)) {
                    h = key;
                    v = header[key];
                }
                http.setRequestHeader(h, v);
            }
            http.send(null);

        });
    }
    post(params, header){
        let url = this.server;
        header = header || {};
        params = params || '';
        return new Promise(function(success, error){
            let http = new XMLHttpRequest();
            http.open("POST", url, true);
            if (Object.keys(header).length !== 0) {
                let h = "";
                let v = "";
                for (let key in Object.keys(header)) {
                    h = key;
                    v = header[key];
                }
                http.setRequestHeader(h, v);
            }
          http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200){
                success(http.responseText);
            }
            http.onerror = function(e){
                error(new Error("Error submitting post request "));
            };
        };
        if(params.length > 0){
            http.send(params);
        }
        });

        
    }
}
if (isNode()) {
    module.exports = Iguana;
}
// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0; 
let customerId = 0;
let mealId = 0; 
let deliveryId = 0; 

class Neighborhood {

    constructor(name) {
        this.id = ++neighborhoodId;
        this.name = name;

        store.neighborhoods.push(this);
    }

    deliveries() {
        return store.deliveries.filter(
            function (delivery) {
                return delivery.neighborhoodId === this.id;
            }.bind(this)
        )
    }

    customers() {
        return store.customers.filter(
            function (customer) {
                return customer.neighborhoodId === this.id;
            }.bind(this)
        )
    }


    meals() {
        const meal_dupe = this.deliveries().map(
            function (delivery) {
                return delivery.meal();
            }  
        )

        return meal_dupe.reduce((unique, o) => {
            if(!unique.some(obj => obj.title === o.title)) {
              unique.push(o);
            }
            return unique;
        },[]);

    }

}

class Customer {

    constructor(name, neighborhoodId) {
        this.id = ++customerId;
        this.name = name; 
        this.neighborhoodId = neighborhoodId;

        store.customers.push(this); 
    }

    deliveries() {
        return store.deliveries.filter(
            function (delivery) {
                return delivery.customerId === this.id; 
            }.bind(this)
        )
    }

    meals() {
        return this.deliveries().map(
            function (delivery) {
                return delivery.meal();
            }
        )
    } 

    totalSpent() {
        return this.meals().reduce(function (acc, obj) { return acc + obj.price; }, 0);
        }  
        

}

class Meal {

    constructor(title, price) {
        this.id = ++mealId; 
        this.title = title;
        this.price = price; 

        store.meals.push(this);
    }

    deliveries() {
        return store.deliveries.filter(
            function (delivery) {
                return delivery.mealId === this.id; 
            }.bind(this)
        )
    } 

    customers() {
        return this.deliveries().map(
            function (delivery) {
                return delivery.customer();
            }
        )
    } 

    static byPrice() {
        return store.meals.sort(
            function (a,b) {
                return b.price - a.price
            }
        )       
    }

}

class Delivery {

    constructor(meal, neighborhood, customer) {
        this.id = ++deliveryId;
        this.neighborhoodId = neighborhood;
        this.customerId = customer;
        this.mealId = meal;

        store.deliveries.push(this);
    } 

    meal() {
        return store.meals.find(
            function (meal) {
                return meal.id === this.mealId;
            }.bind(this)
        )
    } 

    customer() {
        return store.customers.find(
            function (customer) {
                return customer.id === this.customerId; 
            }.bind(this)
        )
    } 

    neighborhood() {
        return store.neighborhoods.find(
            function (neighborhood) {
                return neighborhood.id === this.neighborhoodId; 
            }.bind(this)
        )
     }

}


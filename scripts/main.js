// window.onload = function(){
//   var app = {
//     models: {}
//   };
//
//   app.models.Product = Backbone.Model.extend({
//     defaults: {
//       id: 0,
//       title: '',
//       price: ''
//     }
//   });
//
//   var product1 = new Product({id: 1, title: 'book',price: '400p'}, {collection: Products});
//   var product2 = new Product({id: 2, title: 'oil',price: '150p'}, {collection: Products});
//   var product3 = new Product({id: 3, title: 'meat',price: '200p'}, {collection: Products});
//
//   app.models.Products = new Backbone.Collection([product1, product2, product3]);
//
//   app.models.ProductView = new Backbone.View.extand({
//     tagname: 'div',
//     className: 'product',
//
//     render: function(){
//       var data = this.model.toJSON();
//       var self = this;
//       $(this.el).html('');
//       $(this.el).append($('<div></div>').text(data.title));
//       $(this.el).append($('<div></div>').text(data.price));
//       return this;
//     }
//   });
//
//   app.models.Page = new Backbone.View.extend({
//     el: null,
//     Products: null,
//
//     initialize: function(){
//       this.bind('page:load', this.pageLoad, this)
//       this.Products = app.models.Products;
//       return this;
//     },
//
//     pageLoad: function(data){
//       var self = this;
//       this.el = ($('.wrapper'));
//     },
//
//     render: function(ret){
//
//     }
//   });
//
//   app.models.Page.trigger('page:load');
// };

$(function() {
    var Router = Backbone.Router.extend({
        routes: {
            "": 'start',
            '!/': 'start',
            "!/add": 'addProduct'
        },
        start: function(){

        },
        addProduct: function(){

        }
    });

    var router = new Router();

    Backbone.history.start();

    var Product = Backbone.Model.extend({
        defaults: {
          title: '',
          price: ''
        }
    });

    var ProductsList = Backbone.Collection.extend({
        model: Product
    });

    var Products = new ProductsList([
        new Product({title: 'book',price: '400p'}),
        new Product({title: 'oil',price: '150p'}),
        new Product({title: 'meat',price: '200p'})
    ]);

    var MainView = Backbone.View.extend({
        el: $('.wrapper'),
        initialize: function(){
            this.$el.append('something');

        },
        render: function(){
            this.$el.append('something');
        }
    });

    var App = new AppView();
});

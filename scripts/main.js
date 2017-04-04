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

        },
        events: {
          "click button": "onClickAdd",
          "click li": "editProduct"
        },
        render: function(){
          this.$el.html('');

          this.$el.append('<ul>' + Products.map(function(item){
            return '<li id = ' + item.cid + '><div>' + item.get('title') + '</div><div>' + item.get('price') + '</div></li>'
          }).join('') + '</ul>');

          this.$el.append('<button>Добавить</button>');

        },
        onClickAdd(e){
          router.navigate("/add", {trigger: true});
        },
        editProduct(e){
          router.navigate('/edit/' + e.currentTarget.id, {trigger: true});
        }
    });

    var AddView= Backbone.View.extend({
      el: $('.wrapper'),
      events: {
        "click button": "addFunction"
      },
      addFunction: function(e){
        var title = $('#title').val();
        var price = $('#price').val();

        Products.add(new Product({title: title, price: price}))

        router.navigate('/', {trigger: true});
      },
      render: function(){
        this.$el.html('');
        this.$el.append('<div><div>Название</div><input id = "title" type = "text"></div>');
        this.$el.append('<div><div>Цена</div><input id = "price" type = "text"></div>');
        this.$el.append('<button>Добавить</div>');
      }
    });

    var EditView = Backbone.View.extend({
      el: $('.wrapper'),
      events: {
        "click button": "onClickEdit"
      },
      cid: '',
      onClickEdit: function(){
        var title = this.$el.find('#title').val();
        var price = this.$el.find('#price').val();
        Products.get(this.cid).set({title: title, price: price});
        router.navigate('/', {trigger: true});
      },
      render: function(id){
        this.$el.html('');
        this.$el.append('<div><div>Название</div><input id = "title" type = "text"></div>');
        this.$el.append('<div><div>Цена</div><input id = "price" type = "text"></div>');
        this.$el.find('#title').val(Products.get(id).get('title'));
        this.$el.find('#price').val(Products.get(id).get('price'));
        this.$el.append('<button>Изменить</div>');
        this.cid = id;
      }
    })

    var Router = Backbone.Router.extend({
        routes: {
            "": 'start',
            "add": 'addProduct',
            "edit/:id": "editProduct"
        },
        start: function(){
          var mainView = new MainView;
          mainView.render();
        },
        addProduct: function(){
          var addView = new AddView;
          addView.render();
        },
        editProduct: function(id){
          var editView = new EditView;
          editView.render(id)
        }
    });

    var router = new Router();

    Backbone.history.start();
});

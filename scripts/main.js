window.onload = function(){
  var app = {
    models: {}
  };

  var Product = Backbone.Model.extend({
    defaults: {
      id: 0,
      title: '',
      price: ''
    }
  })

  var product1 = new Product({id: 1, title: 'book',price: '400p'}, {collection: Products});
  var product2 = new Product({id: 2, title: 'oil',price: '150p'}, {collection: Products});
  var product3 = new Product({id: 3, title: 'meat',price: '200p'}, {collection: Products});

  var Products = new Backbone.Collection([product1, product2, product3]);

  var ProductView = new Backbone.View.extand({
    tagname: 'div',
    className: 'product',

    render: function(){
      var data = this.model.toJSON();

      $(this.el).html('').data('rowId', data.id);
      
    }
  })
}

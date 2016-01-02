import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return Ember.RSVP.hash({
      books: this.store.findAll('book')
    });
  },

  setupController: function(controller, models) {
    return controller.setProperties(models);

  },
  actions: {
    createBook: function(book) {
      var _this = this;
      this.store.createRecord('book', book).save().then(function(book) {
        _this.transitionTo('books.book', book);
      });
    },
    updateBook: function(book) {
      var _this = this;
      book.save().then(function(){
        _this.transitionTo('books.book', book);
      });
    },
    deleteBook: function(book) {
      var _this = this;
      book.destroyRecord().then(function() {
        _this.transitionTo('books');
      });
    }
  }
});

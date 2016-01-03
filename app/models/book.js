import DS from 'ember-data';
//import EmberValidations from 'ember-validations';

export default DS.Model.extend( {
  title: DS.attr(),
  author: DS.attr(),
  description: DS.attr()

  //validations: {
  //  title: { presence: true, length: { minimum: 2} },
  //  author: { presence: true, length: { minimum: 2} },
  //  description: { presence: true }
  //}
});

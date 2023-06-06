import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Eduardo Jasso',
      email: 'newguyonthemarket@gmail.com',
      password: bcrypt.hashSync('EDU210687a3b'),
      isAdmin: true,
    },
    {
      name: 'Pepe Pecas',
      email: 'pica@gmail.com',
      password: bcrypt.hashSync('papas'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'Ember Men Flip Flop',
      slug: 'ember-men-flipflop',
      cathegory: 'men',
      image: '/images/p1.png',
      price: 120,
      countInStock: 10,
      brand: 'Ember',
      rating: 5,
      reviews: 10,
      description: 'High quality flip flops',
    },
    {
      // _id: '2',
      name: 'Ember Woman Flip Flop',
      slug: 'ember-woman-flipflop',
      cathegory: 'woman',
      image: '/images/p2.png',
      price: 110,
      countInStock: 0,
      brand: 'Ember',
      rating: 4.5,
      reviews: 10,
      description: 'High quality flip flops',
    },
    {
      // _id: '3',
      name: 'Ember Kids Flip Flop',
      slug: 'ember-kids-flipflop',
      cathegory: 'kids',
      image: '/images/p3.png',
      price: 90,
      countInStock: 10,
      brand: 'Ember',
      rating: 3.5,
      reviews: 10,
      description: 'High quality flip flops',
    },
  ],
};

export default data;

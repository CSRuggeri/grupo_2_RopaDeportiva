const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const localStorage = require('localStorage');
const db = require ('../database/models')

const userService = {
  register: async (name, password, email, birthDate, address, avatar) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database using Sequelize
      const newUser = await db.User.create({
        name,
        password: hashedPassword,
        email,
        birthDate,
        address,
        avatar,
      });

      console.log('User registered successfully:', newUser); // Agrega un registro de consola

      return newUser;
    } catch (error) {
      console.error('Error registering user:', error); // Agrega un registro de consola para capturar el error
      throw new Error('Internal Server Error');
    }
  },

  authenticate: async (email, password) => {
    try {
      const user = await db.User.findOne({ where: { email }});
      if (!user) {
        return null;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return user;
      } else {
        return console.error("Contraseña incorrecta");
      }
    } catch (error) {
      console.error('Error authenticating user:', error); // Agrega un registro de consola para capturar el error
      throw new Error('Internal Server Error');
    }
  },

  findUserByEmail: async (email) =>{
    const user = await db.User.findOne({ where: { email } })
    return user 
  },

  saveUserSession: async (req, res, user) => {
    localStorage.setItem('USER_INFO', JSON.stringify(user));
    const activeOrder = await db.Order.findOne({ where: {user_id: user.id, status:{[Op.like]: '%Comprando%'}}})
    if (activeOrder) {
      req.session.activeOrder = activeOrder
      const cart = await db.OrderProduct.findAll({ where: { orderId: activeOrder.id }, include:['orderProducts'] })
      if (cart) {
        req.session.cart = cart
      }
    }
    const processOrder = await db.Order.findAll({ where: {
      user_id: user.id, status:{[Op.ne]: 'Comprando'}
    },include:{
      model: db.Product,
      as: 'orderP',
    through: {
      attributes: ['Product_quantity', 'subtotal']
    }
    }
  })
    
    req.session.processOrder = processOrder
    req.session.loggedUser = user;

    if (req.body.remember !== undefined) {
      res.cookie('remember', user.email, { maxAge: 1000 * 60 * 15 });
    }
  },
  getProcessOrders: async (req,user) => {
    const processOrder = await db.Order.findAll({ where: {
      user_id: user.id, status:{[Op.ne]: 'Comprando'}
    },include:{
      model: db.Product,
      as: 'orderP',
    through: {
      attributes: ['Product_quantity', 'subtotal']
    }
    }
  })
    req.session.processOrder = processOrder
  },

  logout: (req, res) => {
    console.log('Función de logout ejecutándose');
    req.session.destroy();
    localStorage.removeItem('USER_INFO');
    res.clearCookie('remember');
    console.log('Redireccionando a /login');
    res.redirect('/users/login');
  },

  editUser : async (req, userToEdit) => {
    try {
      const { name, password, email, birth_date, address } = req.body;
      let filename;
      req.file ? filename = `/images/avatars/${req.file.filename}` : filename = userToEdit.avatar
      
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.User.update({
        name,
        password: hashedPassword,
        email,
        birthDate: birth_date,
        address,
        avatar: filename,
      },{where: {id: req.params.id}});

      const editedUser = await db.User.findByPk(req.params.id) 

      console.log('User updated successfully:', editedUser); // Agrega un registro de consola
      return editedUser;
    } catch (error) {
      console.error('Error updating user:', error); // Agrega un registro de consola para capturar el error
      throw new Error('Internal Server Error');
    }
  },
  
 getAll : async () => {
    try {
        return await db.User.findAll();
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
  },
  destroyUserByPk : async (id) => {
    try {
        const deletedUser = await db.User.findByPk(id);
        await db.User.destroy({ where: { id } });
        return { msg: `User ${id} successfully removed`, deletedUser };
    } catch (error) {
        throw error;
    }
  },
  createCart: async (req) =>{
    const order = await db.Order.create({
      user_id: req.session.loggedUser.id,
      status: 'Comprando',
    })
    req.session.activeOrder = order
    req.session.cart = []
  },

  addProductToCart: async (product,req,quantity) =>{
    const verifyIfItem = await db.OrderProduct.findOne({where:{
      orderId: req.session.activeOrder.id,
      Product_id: product.id
    },include:['orderProducts']})
    if (verifyIfItem) {
      if (!quantity) {
        if (verifyIfItem.orderProducts.stock > verifyIfItem.Product_quantity) {
          let subtotal = Number(verifyIfItem.subtotal) + product.price*(1-(product.discount)/100)
          await db.OrderProduct.update({
            Product_quantity: verifyIfItem.Product_quantity+1,
            subtotal: subtotal,
          },{
            where:{orderId: req.session.activeOrder.id,
              Product_id: product.id}
          })
        }
      } else if(verifyIfItem.orderProducts.stock > verifyIfItem.Product_quantity+quantity) {
        let subtotal = Number(verifyIfItem.subtotal) + (product.price*(1-(product.discount)/100))*quantity
        await db.OrderProduct.update({
          Product_quantity: verifyIfItem.Product_quantity+quantity,
          subtotal: subtotal,
        },{
          where:{orderId: req.session.activeOrder.id,
            Product_id: product.id}
        })
      } else {
        let subtotal = (product.price*(1-(product.discount)/100))*verifyIfItem.orderProducts.stock
        await db.OrderProduct.update({
          Product_quantity: verifyIfItem.orderProducts.stock,
          subtotal: subtotal,
        },{
          where:{orderId: req.session.activeOrder.id,
            Product_id: product.id}
        })
      }
    } else {
      if(quantity) {
        let subtotal = (product.price*(1-(product.discount)/100))*quantity;
        console.log(subtotal)
        await db.OrderProduct.create({
          Product_id: product.id,
          Product_quantity: quantity || 1,
          subtotal: subtotal,
          orderId: req.session.activeOrder.id
        })
      } else {
        let subtotal = (product.price*(1-(product.discount)/100));
        console.log(subtotal)
        await db.OrderProduct.create({
          Product_id: product.id,
          Product_quantity: 1,
          subtotal: subtotal,
          orderId: req.session.activeOrder.id
        })
      }
      
    }
    const cart = await db.OrderProduct.findAll(({ where: { orderId: req.session.activeOrder.id }, include:['orderProducts'] }))
    req.session.cart = cart
    console.log(cart)
  },

  updateCart: async (cantidad,req) =>{
    for(let i=0;i<cantidad.length;i++){ 
      try {
        let element = cantidad[i]
        if(req.session.cart[i].Product_quantity != element.quantity) {
        const verifyIfItem = await db.OrderProduct.findOne({where:{
          orderId: req.session.activeOrder.id,
          Product_id: element.row_productId
        },include:['orderProducts']})
        await db.OrderProduct.update({
          Product_quantity: element.quantity,
          subtotal: element.quantity * (Number(verifyIfItem.orderProducts.price)*(1-(verifyIfItem.orderProducts.discount)/100))
        },{
          where:{orderId: req.session.activeOrder.id,
            Product_id: element.row_productId}
        })
      }
      } catch (error) {
        console.log(`Error al subir el elemento ${cantidad[i]}`)
      }
    };
    const cart = await db.OrderProduct.findAll(({ where: { orderId: req.session.activeOrder.id }, include:['orderProducts'] }))
    req.session.cart = cart
  },

  endBuying: async(req) =>{
    let cart = req.session.cart
    let total =0;
    cart.forEach(element => {
      total += Number(element.subtotal)
    });
    await db.Order.update({
      status: 'A pagar',
      total: total
    },{
      where:{
        user_id: req.session.loggedUser.id,
        id: req.session.activeOrder.id,
        status:{[Op.like]: '%Comprando%'}
      }
    })
    const processOrder = await db.Order.findAll({ where: {
      user_id: req.session.loggedUser.id, status:{[Op.ne]: 'Comprando'}
    },include:{
      model: db.Product,
      as: 'orderP',
    through: {
      attributes: ['Product_quantity', 'subtotal']
    }
    }
  })
    req.session.processOrder = processOrder
    delete req.session.activeOrder
    delete req.session.cart
  },
  getAllOrders: async () => {
    return await db.Order.findAll({
      where: {
        status: {[Op.ne]: 'Comprando'}
      },
      include: [
        {
          model: db.Product,
          as: 'orderP',
          through: {
            attributes: ['Product_quantity', 'subtotal']
          }
        },
        {
          model: db.User, // Include the User model
          attributes: ['id', 'name'], // Specify the attributes you want to include from the User model
          as: 'userOrder' // Alias for the User model
        }
      ]
    });
  },
  deleteOrderById: async(id) => {
    await db.OrderProduct.destroy({
      where: {orderId: id}
    })
    await db.Order.destroy({
      where: {id: id}
    })
  },
  deleteFromCart: async (id, req) =>{
    await db.OrderProduct.destroy({
      where: {orderId: req.session.activeOrder.id, Product_id: id}
    })
  },
  getCart: async (req) => {
    const cart = await db.OrderProduct.findAll({ where: {
      orderId: req.session.activeOrder.id
    }, include:['orderProducts'] 
  })
    req.session.cart = cart
  },
  endOrder: async (id,req) => {
    await db.Order.update({
      status: 'Entregado',
    },{
      where:{
        id: id
      }
    })
    await db.OrderProduct.update({
      status: 1,
    },{
      where:{
        orderId: id
      }
    })
    const orderProducts = await db.OrderProduct.findAll({ where: { orderId: id }, include:['orderProducts'] })
    for(let i =0; i<orderProducts.length;i++){
      const orderProduct = orderProducts[i]
      await db.Product.decrement('stock', { by: orderProduct.Product_quantity, where: { id: orderProduct.Product_id } })
      const product = await db.Product.findByPk(orderProduct.Product_id)
      const orderWithProduct = await db.OrderProduct.findAll({where: {Product_id: product.id, orderId: {[Op.ne]: id}}})
      for(let j =0; j<orderWithProduct.length;j++){
        if(orderWithProduct[j].Product_quantity > product.stock) {
          await db.OrderProduct.update({
            Product_quantity: product.stock,
            subtotal: (Number(product.price)*(1-(product.discount)/100))*product.stock
          },{
            where: {Product_id: product.id, id: orderWithProduct[j].id}}
          )
        }
      }
    }
    await db.OrderProduct.destroy({
      where: {
        Product_quantity: 0
      }
    })
  },
  updateTotals: async () => {
    let order = await db.Order.findAll({where:{status:{[Op.ne]: 'Entregado'}}})
    
    for(let i=0; i<order.length; i++) {
      const orderProducts = await db.OrderProduct.findAll({where:{orderId: order[i].id}})
      let total =0;
      orderProducts.forEach(element => {
        total += Number(element.subtotal)
      });
      await db.Order.update({total: total},{where: {id: order[i].id}})
    }
  },
  findUserById: async (id) =>{
    try { const user = await db.User.findOne({ where: { id } })
    return user   
    } catch (error) {
     return user=[]  }
  }
};

module.exports = userService;

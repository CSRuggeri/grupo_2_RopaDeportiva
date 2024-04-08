const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const localStorage = require('localStorage');
const db = require ('../database/models')

const userService = {
  register: async (name, password, email, birthDate, address, profile, avatar) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database using Sequelize
      const newUser = await db.User.create({
        name,
        password: hashedPassword,
        email,
        birthDate,
        address,
        profile,
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

  editUser : async (req) => {
    try {
        const { name, password, email, birth_date, address, profile } = req.body;
        const { filename } = req.file;

        console.log(req.body);
        console.log(req.file);

        // Validate required fields
        if (!email) {
            throw new Error('Email is missing');
        }

        // Find user by email
        const userInstance = await db.User.findOne({ where: { email } });
        if (!userInstance) {
            throw new Error('User not found');
        }

        // Update the user using Sequelize
        const editedUser = await db.User.update({
            name,
            password,
            birth_date,
            address,
            profile,
            avatar: `/images/avatars/${filename}`
        }, { where: { id: userInstance.id } });

        return { msg: `User ${userInstance.id} updated successfully` };
    } catch (error) {
        console.error('Error editing user:', error);
        throw error;
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

  addProductToCart: async (product,req) =>{
    const verifyIfItem = await db.OrderProduct.findOne({where:{
      orderId: req.session.activeOrder.id,
      Product_id: product.id
    },include:['orderProducts']})
    if (verifyIfItem) {
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
    } else {
      let subtotal = product.price*(1-(product.discount)/100);
      await db.OrderProduct.create({
        Product_id: product.id,
        Product_quantity: 1,
        subtotal: subtotal,
        orderId: req.session.activeOrder.id
      })
      
    }
    const cart = await db.OrderProduct.findAll(({ where: { orderId: req.session.activeOrder.id }, include:['orderProducts'] }))
    req.session.cart = cart
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
    return await db.Order.findAll({ where: {
      status:{[Op.ne]: 'Comprando'}
    },include:{
      model: db.Product,
      as: 'orderP',
    through: {
      attributes: ['Product_quantity', 'subtotal']
    }
    }
  })
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
  findUserById: async (id) =>{
    try { const user = await db.User.findOne({ where: { id } })
    return user   
    } catch (error) {
     return user=[]  
                    }},
  

};

module.exports = userService;

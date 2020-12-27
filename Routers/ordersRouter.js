const { Router } = require('express');

const {ordersController}= require('../Controllers/orders.ctrl');

const OrdersRouter= new Router;

 //OrdersRouter.get('/', ordersController.getOrders);
// OrdersRouter.get('/:id', ordersController.getOrder);
//OrdersRouter.post('/', ordersController.addOrder);
// OrdersRouter.put('/:id', ordersController.updateOrder);
// OrdersRouter.delete('/:id', ordersController.deleteOrder);

exports.OrdersRouter = OrdersRouter;
const express = require("express");
const router = express.Router();

const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth");
const { newOrder, myOrders, getSingleOrder, getAllOrders, deleteOrder, updateOrder} = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/me").get(isAuthenticatedUser, myOrders);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.route("/admin/order/:id")
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)
.put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)

module.exports = router

const router = require("express").Router({ mergeParams: true });
const controller = require("./controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

/*GET AND POST FROM ROOT PATH (ALL DATA)*/
router.route("/").post(controller.addVehicles).get(controller.getVehicles).all(methodNotAllowed);

/*UPDATE OR DELETE FROM SPECIFIC PATH*/
router.route("/:vehicle_id").put(controller.updateVehicles).delete(controller.deleteVehicle).all(methodNotAllowed)



module.exports = router;

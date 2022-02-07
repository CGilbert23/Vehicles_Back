const { validationResult } = require("express-validator");
const { queryInstance } = require("../db/connection");


/*GET ALL DATE REQUEST*/
const getVehicles = async (req, res) => {
  try {
    const vehicles = await queryInstance('SELECT * from vehicles');
    res.json({ vehicles });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

/*UPDATE STATUS DATA REQUEST*/
const updateVehicles = async (req, res) => {
  try {
    const vehicle_id  = req.params.vehicle_id;
    
    const {location, notes } = req.body
   
    const vehicles = await queryInstance(`UPDATE vehicles SET location = '${location}', notes='${notes}' WHERE vehicle_id = '${vehicle_id}' returning *`);
    
    res.json({ vehicles })
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

/*ADD NEW VEHICLE REQUEST*/
const addVehicles = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { location, stock, year, make, model, notes,date_in } = req.body;

  try {
    const vehicles = await queryInstance(`INSERT INTO vehicles (location, stock, year, make, model, notes,date_in ) VALUES ('${location}', '${stock}', '${year}', '${make}', '${model}', '${notes}', '${date_in}') RETURNING *`);
    res.json({ vehicles });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
}; 


/*DELETE VEHICLE REQUEST*/
const deleteVehicle = async (req, res) => {
  try {
    const vehicle_id = req.params.vehicle_id;
    const vehicles = await queryInstance(`DELETE FROM vehicles WHERE vehicle_id = '${vehicle_id}' RETURNING *`);
    res.json({ vehicles });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};



module.exports = 
{deleteVehicle,getVehicles,updateVehicles,addVehicles}

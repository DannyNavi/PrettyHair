const express = require('express');
const {
  registerClient,
  deleteClient,
  getAllClients,
  updateClient,
  getClientById,
  getClientFromPhone
} = require('../controllers/clientController');

const router = express.Router();

router.post('/register', registerClient);

router.get('/getClientFromPhone/:cell', getClientFromPhone)


router.get('/', getAllClients); // GET /api/clients
router.get('/:id', getClientById);

router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

module.exports = router;

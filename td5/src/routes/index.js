import { Router } from 'express';
import { getAllContacts, getContactById, updateContact, removeContact, addContact } from '../controllers/contactController.js';
import { registerUser , loginUser} from '../controllers/authController.js';
import { getAllUsers} from '../controllers/userController.js';

const router = Router();

router.get('/', function (req, res) {
    res.status(200).json({
        status: 'API is Working',
        message: 'Welcome!',
    });
});

/**
 * @openapi
 * /contacts:
 *   get:
 *     description: All contacts
 *     responses:
 *       '200':
 *         description: Returns all the contacts
 *   post:
 *     description: Add a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               age:
 *                 type: number
 *                 example: 30
 *     responses:
 *       '200':
 *         description: Returns the newly created contact
 *       '404':
 *         description: Error while adding the contact
 */
router.route('/contacts').get(async (req, res) => {
    let response = await getAllContacts();
    if (response.success == true) {
        res.status(200).json(response);
    } else {
        res.status(404).json(response);
    }
});

/**
 * @openapi
 * /contacts/{id}:
 *   get:
 *     description: Get contact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the contact
 *     responses:
 *       '200':
 *         description: Returns the contact with the specified ID
 *       '404':
 *         description: Contact not found
 *   put:
 *     description: Update a contact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               age:
 *                 type: number
 *                 example: 25
 *     responses:
 *       '200':
 *         description: Returns the updated contact
 *       '404':
 *         description: Contact not found
 *   delete:
 *     description: Remove a contact by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the contact
 *     responses:
 *       '200':
 *         description: Contact removed successfully
 *       '404':
 *         description: Contact not found
 */
router.route('/contacts/:id')
    .get(async (req, res) => {
        let response = await getContactById(req.params.id);
        if (response.success == true) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    })
    .put(async (req, res) => {
        let response = await updateContact(req.params.id, req.body.name, req.body.age);
        if (response.success == true) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    })
    .delete(async (req, res) => {
        let response = await removeContact(req.params.id);
        if (response.success == true) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    });

router.route('/contacts')
    .post(async (req, res) => {
        let response = await addContact(req.body);
        if (response.success == true) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    });

/**
 * @openapi 
 * /auth/register:
 *   post:
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       '200':
 *         description: Returns the registered user
 *       '400':
 *         description: Error registering user
 */
router.route('/auth/register')
    .post(async (req, res) => {
        let response = await registerUser(req.body);
        if (response.success == true) {
            res.status(200).json(response);
        } else {
            res.status(400).json(response);
        }
    });
/**
 * @openapi
 * /auth/login:
 *   post:
 *     description: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       '200':
 *         description: Returns the logged in user and token
 *       '400':
 *         description: Error logging in user
 */
router.route('/auth/login')
    .post(async (req, res) => {
        let response = await loginUser(req.body);
        if (response.success == true) {
            res.status(200).json(response);
        } else {
            res.status(400).json(response);
        }
    });
/**
 * @openapi
 * /users:
 *   get:
 *     description: Get all users
 *     responses:
 *       '200':
 *         description: Returns all users
 *       '404':
 *         description: Error fetching users
 */
router.route('/users')
    .get(async (req, res) => {
        let response = await getAllUsers();
        if (response.success == true) {
            res.status(200).json(response);
        } else {
            res.status(404).json(response);
        }
    });

export default router;
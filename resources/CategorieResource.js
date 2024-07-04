const express = require('express')
const AutorisationAdmin = require('../config/AutorisationAdmin')
const router = express.Router()
const { ajoutCategorie, miseJourCategorie, supprimerCategorie, toutCategorie, unCategorie } = require('../controllers/CategorieContr')




/**
 * @swagger
 * /api/categorie/ajout:
 *   post:
 *     summary: Ajouter une nouvelle catégorie
 *     description: >
 *       Cette route nécessite un token d'authentification JWT.
 *       Pour l'utiliser dans Swagger UI :
 *       1. Obtenez un token JWT en vous authentifiant via l'endpoint `/auth/connexion` en tant qu'Admin.
 *       2. Cliquez sur le bouton "Authorize" dans la documentation Swagger.
 *       3. Entrez le token JWT dans le champ `BearerAuth`.
 *       4. Cliquez sur "Authorize" pour enregistrer le token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Catégorie
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *             required:
 *               - nom
 *     responses:
 *       200:
 *         description: succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: L'Id de la catégorie
 *                   example: 2
 *                 nom:
 *                   type: string
 *                   description: Nom de la catégorie
 *                   example: Fiction
 *       401:
 *        description:  Non autorisé - Authentification requise
 *       500:
 *        description:  Erreur interne du serveur
 */
router.post('/categorie/ajout' , AutorisationAdmin, ajoutCategorie)

/**
 * @swagger
 * /api/categorie/modifier/{id}:
 *   put:
 *     summary: Ajouter une nouvelle catégorie
 *     description: >
 *       Cette route nécessite un token d'authentification JWT.
 *       Pour l'utiliser dans Swagger UI :
 *       1. Obtenez un token JWT en vous authentifiant via l'endpoint `/auth/connexion` en tant qu'Admin.
 *       2. Cliquez sur le bouton "Authorize" dans la documentation Swagger.
 *       3. Entrez le token JWT dans le champ `BearerAuth`.
 *       4. Cliquez sur "Authorize" pour enregistrer le token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Catégorie
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id de la catégorie à modifier
 *         schema:
 *           type: integer
 *           example: 1
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: nouveau nom
 *             required:
 *               - nom
 *     responses:
 *       200:
 *         description: succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 serverSuccessMsg:
 *                   type: string
 *                   example: Mise à jour réussie!
 *       401:
 *        description:  Non autorisé - Authentification requise
 *       500:
 *        description:  Erreur interne du serveur
 */
router.put('/categorie/modifier/:id', AutorisationAdmin, miseJourCategorie)

/**
 * @swagger
 * /api/categorie/suppression/{id}:
 *   delete:
 *     summary: Supprimer une  catégorie
 *     description: >
 *       Cette route nécessite un token d'authentification JWT.
 *       Pour l'utiliser dans Swagger UI :
 *       1. Obtenez un token JWT en vous authentifiant via l'endpoint `/auth/connexion` en tant qu'Admin.
 *       2. Cliquez sur le bouton "Authorize" dans la documentation Swagger.
 *       3. Entrez le token JWT dans le champ `BearerAuth`.
 *       4. Cliquez sur "Authorize" pour enregistrer le token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Catégorie
 *     parameters:
 *       - in: path
 *         name: id
 *         description: id de la catégorie à supprimer
 *         schema:
 *           type: integer
 *           example: 1
 *         required: true
 *     responses:
 *       200:
 *         description: succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 serverSuccessMsg:
 *                   type: string
 *                   example: Supprimé avec succès!
 *       401:
 *        description:  Non autorisé - Authentification requise
 *       500:
 *        description:  Erreur interne du serveur
 */
router.delete('/categorie/suppression/:id',AutorisationAdmin, supprimerCategorie)

/**
 * @swagger
 * /api/categorie/tout:
 *   get:
 *     summary: Récupérer toutes les catégories
 *     tags:
 *       - Catégorie
 *     responses:
 *       200:
 *         description: succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: Données renvoyées (liste des catégories)
 *                   items:
 *                      type: object
 *                      example: {id: 1 ,nom: Histoire }
 *       500:
 *           description: Erreur interne du serveur
 *                   
 */
router.get('/categorie/tout' , toutCategorie)


module.exports = router
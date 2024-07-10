const express = require('express')
const AutorisationAdmin = require('../config/AutorisationAdmin')
const router = express.Router()


const { 

    ajoutAdmin , 
    modifAdmin,
    suppprimerUtilisateur,
    voirToutMembre,
    voirToutAdmin,
    voirUnMembre,
    voirUnAdmin, 
    } = require('../controllers/AdminContr')
  
   
router.use(AutorisationAdmin)


/**
 * @swagger
 * /admin/liste-admin:
 *   get:
 *     summary: récupérer tous les admins
 *     description: >
 *       Cette route nécessite un token d'authentification JWT.
 *       Pour l'utiliser dans Swagger UI :
 *       1. Obtenez un token JWT en vous authentifiant via l'endpoint `/auth/connexion` en tant qu'admin.
 *       2. Cliquez sur le bouton "Authorize" dans la documentation Swagger.
 *       3. Entrez le token JWT dans le champ `BearerAuth`.
 *       4. Cliquez sur "Authorize" pour enregistrer le token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *      - Admin
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: Données renvoyées (liste des admin)
 *                   items:
 *                     type: object
 *                     example: {id: 2 , nom: Harry , prenom: Potter , badge: admin , email: test@gmail.com , photo:  FILE-1719504882569.jpg }
 *       401:
 *         description: Non autorisé - Authentification requise
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/liste-admin' , voirToutAdmin)

/**
 * @swagger
 * /admin/liste-membre:
 *   get:
 *     summary: récupérer tous les membres actifs
 *     description: >
 *       Cette route nécessite un token d'authentification JWT.
 *       Pour l'utiliser dans Swagger UI :
 *       1. Obtenez un token JWT en vous authentifiant via l'endpoint `/auth/connexion` en tant qu'admin.
 *       2. Cliquez sur le bouton "Authorize" dans la documentation Swagger.
 *       3. Entrez le token JWT dans le champ `BearerAuth`.
 *       4. Cliquez sur "Authorize" pour enregistrer le token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *      - Admin
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: Données renvoyées (liste des admin)
 *                   items:
 *                     type: object
 *                     example: {id: 2 , nom: test , prenom: test , badge: membre , statut: actif , email: test@membre@gmail.com , photo:  FILE-1719504882569.jpg }
 *       401:
 *         description: Non autorisé - Authentification requise
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/liste-membre' ,   voirToutMembre)

/**
 * @swagger
 * /admin/membre/{id}:
 *   get:
 *     summary: récupérer un membre actif
 *     description: >
 *       Cette route nécessite un token d'authentification JWT.
 *       Pour l'utiliser dans Swagger UI :
 *       1. Obtenez un token JWT en vous authentifiant via l'endpoint `/auth/connexion` en tant qu'admin.
 *       2. Cliquez sur le bouton "Authorize" dans la documentation Swagger.
 *       3. Entrez le token JWT dans le champ `BearerAuth`.
 *       4. Cliquez sur "Authorize" pour enregistrer le token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *      - Admin
 *     parameters:
 *      - in: path
 *        name: id
 *        description: id du membre à récupérer
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              data:
 *               type: object
 *               properties:
 *                id: 
 *                 type: integer
 *                nom:
 *                 type: string
 *                prenom:
 *                 type: string
 *                email:
 *                 type: string
 *                badge:
 *                 type: string
 *                photo:
 *                 type: string                
 *       401:
 *         description: Non autorisé - Authentification requise
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/membre/:id' ,  voirUnMembre)


/**
 * @swagger
 * /admin/{id}:
 *   get:
 *     summary: récupérer un admin
 *     description: >
 *       Cette route nécessite un token d'authentification JWT.
 *       Pour l'utiliser dans Swagger UI :
 *       1. Obtenez un token JWT en vous authentifiant via l'endpoint `/auth/connexion` en tant qu'admin.
 *       2. Cliquez sur le bouton "Authorize" dans la documentation Swagger.
 *       3. Entrez le token JWT dans le champ `BearerAuth`.
 *       4. Cliquez sur "Authorize" pour enregistrer le token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *      - Admin
 *     parameters:
 *      - in: path
 *        name: id
 *        description: id de l'admin à récupérer
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              data:
 *               type: object
 *               properties:
 *                id: 
 *                 type: integer
 *                nom:
 *                 type: string
 *                prenom:
 *                 type: string
 *                email:
 *                 type: string
 *                badge:
 *                 type: string
 *                photo:
 *                 type: string                
 *       401:
 *         description: Non autorisé - Authentification requise
 *       500:
 *         description: Erreur interne du serveur
 */
router.get('/:id' ,  voirUnAdmin)

/**
 * @swagger
 * /admin/ajout-admin:
 *   post:
 *     summary: Ajouter un admin 
 *     description: >
 *       Cette route nécessite un token d'authentification JWT.
 *       Pour l'utiliser dans Swagger UI :
 *       1. Obtenez un token JWT en vous authentifiant via l'endpoint `/auth/connexion` en tant qu'admin.
 *       2. Cliquez sur le bouton "Authorize" dans la documentation Swagger.
 *       3. Entrez le token JWT dans le champ `BearerAuth`.
 *       4. Cliquez sur "Authorize" pour enregistrer le token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               mot_de_passe:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *             required:
 *               - nom
 *               - prenom
 *               - email
 *               - mot_de_passe
 *               - photo
 *     responses:
 *       200:
 *         description: succès
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              serverMsgSuccess:
 *                type: string
 *                example: Nouveau admin ajouté
 *              passAdmin: 
 *                type: string
 *                description: mot de passe du nouveau admin, 
 *       401:
 *        description:  Non autorisé - Authentification requise
 *       500:
 *        description:  Erreur interne du serveur
 */


router.post('/ajout-admin' , ajoutAdmin )


/**
 * @swagger
 * /admin/modifier-admin/{id}:
 *   put:
 *     summary: Modifier un admin existant
 *     description: >
 *       Cette route nécessite un token d'authentification JWT.
 *       Pour l'utiliser dans Swagger UI :
 *       1. Obtenez un token JWT en vous authentifiant via l'endpoint `/auth/connexion` en tant qu'admin.
 *       2. Cliquez sur le bouton "Authorize" dans la documentation Swagger.
 *       3. Entrez le token JWT dans le champ `BearerAuth`.
 *       4. Cliquez sur "Authorize" pour enregistrer le token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Admin
 *     parameters:
 *      - in: path
 *        name: id
 *        description: id de l'admin à modifier
 *        schema:
 *          type: integer
 *          example: 1
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               mot_de_passe:
 *                 type: string
 *               photo:
 *                 type: string
 *                 format: binary
 *             required:
 *               - nom
 *               - prenom
 *               - email
 *               - mot_de_passe
 *               - photo
 *     responses:
 *       200:
 *         description: succès
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              serverSuccessMsg:
 *                type: string
 *                example: Mise à jour réussie!
 *       401:
 *        description:  Non autorisé - Authentification requise
 *       500:
 *        description:  Erreur interne du serveur
 */

router.put('/modifier-admin/:id' , modifAdmin )

/**
 * @swagger
 * /admin/suppression-admin/{id}:
 *   delete:
 *     summary: supprimer un admin
 *     description: >
 *       Cette route nécessite un token d'authentification JWT.
 *       Pour l'utiliser dans Swagger UI :
 *       1. Obtenez un token JWT en vous authentifiant via l'endpoint `/auth/connexion` en tant qu'admin.
 *       2. Cliquez sur le bouton "Authorize" dans la documentation Swagger.
 *       3. Entrez le token JWT dans le champ `BearerAuth`.
 *       4. Cliquez sur "Authorize" pour enregistrer le token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Admin
 *     parameters:
 *      - in: path
 *        name: id
 *        description: id de l'admin à supprimer
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: succès
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              serverSuccessMsg:
 *                type: string
 *                example: Supprimé avec succès!
 *       401:
 *        description:  Non autorisé - Authentification requise
 *       500:
 *        description:  Erreur interne du serveur
 */
router.delete('/suppression-admin/:id' ,  suppprimerUtilisateur)

module.exports = router
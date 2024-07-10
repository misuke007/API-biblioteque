const express = require("express");
const AutorisationAdmin = require("../config/AutorisationAdmin");
const AutorisationMembre = require("../config/AutorisationMembre");
const router = express.Router();

const {
  ajoutLivre,
  supprimerLivre,
  miseJourLivre,
  toutLivre,
  unLivre,
  rechercheLivre,
  trierParCategorie,
  popularite,
  nouveauteLivre,
  ajoutCommentaire,
  ajoutReponseComs,
  toutCommentaire,
  toutReponseComs,
  ajoutNote,
} = require("../controllers/LivreContr");


/**
 * @swagger
 * /api/livre/tout:
 *   get:
 *     summary: Afficher tous les livres
 *     tags:
 *      - Livre
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         required: true
 *         description: Numéro de la page à récupérer
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           example: 15
 *         required: true
 *         description: Taille de la page (nombre de livres  à afficher par page)
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   description: Page actuelle
 *                   example: 1
 *                 data:
 *                   type: array
 *                   description: Données renvoyées (liste des livres)
 *                   items:
 *                     type: object
 *                     example: {id: 2 , titre: HP , auteur: JK ,  date: 2024-06-01 , popularite: 100}
 *                 totalPage:
 *                   type: integer
 *                   description: Nombre total de pages
 *                   example: 10
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/livre/tout", toutLivre);

/**
 * @swagger
 * /api/livre/nouveaute:
 *   get:
 *     summary: Récupère les 8 premiers nouveaux livres
 *     tags:
 *      - Livre
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
 *                   description: Données renvoyées (liste des livres)
 *                   items:
 *                     type: object
 *                     example: {id: 2 , titre: HP , auteur: JK ,  date: 2024-06-01 , popularite: 100 , nouveaute: 1}
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/livre/nouveaute", nouveauteLivre);

/**
 * @swagger
 * /api/livre/un/{id}:
 *   get:
 *     summary: Afficher un livre
 *     tags:
 *      - Livre
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           example: 1
 *         required: true
 *         description: Numéro du livre à récupérer
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *              data:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  titre:
 *                    type: string
 *                  auteur:
 *                    type: string
 *                  CategorieId:
 *                    type: integer
 *                  annee_publication:
 *                    type: string
 *                  popularite: 
 *                    type: integer
 *                  couverture:
 *                    type: string
 *                  exemplaire: 
 *                    type: integer
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/livre/un/:id", unLivre);

/**
 * @swagger
 * /api/livre/tri-par-categorie/{categorieId}:
 *   get:
 *     summary: Afficher des livres par catégorie
 *     tags:
 *      - Livre
 *     parameters:
 *       - in: path
 *         name: categorieId
 *         schema:
 *           type: string
 *           example: 1
 *         required: true
 *         description: id du catégorie
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         required: true
 *         description: Numéro de la page à récupérer
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           example: 15
 *         required: true
 *         description: Taille de la page (nombre de livres  à afficher par page)
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
 *                   description: Données renvoyées (liste des livres)
 *                   items:
 *                     type: object
 *                     example: {id: 2 , titre: HP , auteur: JK ,  date: 2024-06-01 , popularite: 100}
 *                 currentPage:
 *                     type: integer
 *                     example: 1
 *                 totalPage:
 *                     type: integer
 *                     example: 15
 *                 categorieNom:
 *                     type: string
 *                     example: Fiction
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/livre/tri-par-categorie/:categorieId", trierParCategorie);

/**
 * @swagger
 * /api/livre/populaire:
 *   get:
 *     summary: Afficher des livres par popularité
 *     tags:
 *      - Livre
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         required: true
 *         description: Numéro de la page à récupérer
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           example: 15
 *         required: true
 *         description: Taille de la page (nombre de livres  à afficher par page)
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
 *                   description: Données renvoyées (liste des livres)
 *                   items:
 *                     type: object
 *                     example: {id: 2 , titre: HP , auteur: JK ,  date: 2024-06-01 , popularite: 100}
 *                 currentPage:
 *                     type: integer
 *                     example: 1
 *                 totalPage:
 *                     type: integer
 *                     example: 15
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/livre/populaire", popularite);


/**
 * @swagger
 * /api/livre/recherche:
 *   get:
 *     summary: Rechercher un livre par son titre ou par le nom de son auteur
 *     tags:
 *      - Livre
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         required: true
 *         description: Numéro de la page à récupérer
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           example: 15
 *         required: true
 *         description: Taille de la page (nombre de résultat à afficher par page)
 *       - in: query
 *         name: rech
 *         schema:
 *           type: string
 *           example: mot-clé
 *         required: true
 *         description: Terme de recherche (titre du livre ou nom d'un auteur)
 *       - in: query
 *         name: colonne
 *         schema:
 *           type: string
 *           example: titre
 *           default: titre
 *         required: false
 *         description: Colonne à filtrer
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   description: Page actuelle
 *                   example: 1
 *                 data:
 *                   type: array
 *                   description: Données renvoyées (liste des livres trouvés)
 *                   items:
 *                     type: object
 *                 totalPage:
 *                   type: integer
 *                   description: Nombre total de pages
 *                   example: 5
 *                 count:
 *                   type: integer
 *                   description: Nombre total d'éléments trouvés
 *                   example: 50
 *       500:
 *         description: Erreur interne du serveur
 */

router.get("/livre/recherche", rechercheLivre);


/**
 * @swagger
 * /api/livre/commentaires/{livreId}:
 *   get:
 *     summary: récupérer les commentaire d'un livre
 *     tags:
 *      - Livre
 *     parameters:
 *       - in: path
 *         name: livreId
 *         schema:
 *           type: integer
 *           example: 3
 *         required: true
 *         description: Id du livre
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
 *                   description: Données renvoyées (liste des commentaires)
 *                   items:
 *                     type: object
 *                     example: {id: 2 , commentaire: test , LivreId: 2 ,  UtilisateurId: 4}
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/livre/commentaires/:livreId", toutCommentaire);

/**
 * @swagger
 * /api/livre/commentaire/reponses/{commentaireId}:
 *   get:
 *     summary: récupérer les réponses d'un commentaire
 *     tags:
 *      - Livre
 *     parameters:
 *       - in: path
 *         name: commentaireId
 *         schema:
 *           type: integer
 *           example: 3
 *         required: true
 *         description: Id du commentaire
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
 *                   description: Données renvoyées (liste des réponses)
 *                   items:
 *                     type: object
 *                     example: {id: 2 , commentaire: test , CommentaireId: 2 ,  UtilisateurId: 4}
 *       500:
 *         description: Erreur interne du serveur
 */
router.get("/livre/commentaire/reponses/:commentaireId", toutReponseComs);


/**
 * @swagger
 * /api/livre/commentaire/{livreId}:
 *   post:
 *     summary: Ajouter un commentaire à un livre
 *     description: >
 *       Cette route nécessite un token d'authentification JWT.
 *       Pour l'utiliser dans Swagger UI :
 *       1. Obtenez un token JWT en vous authentifiant via l'endpoint `/auth/connexion` en tant qu'utilisateur actif.
 *       2. Cliquez sur le bouton "Authorize" dans la documentation Swagger.
 *       3. Entrez le token JWT dans le champ `BearerAuth`.
 *       4. Cliquez sur "Authorize" pour enregistrer le token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Livre
 *     parameters:
 *      - in: path
 *        name: livreId
 *        description: id du livre à commenter
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
 *               commentaire:
 *                 type: string
 *             required:
 *               - commentaire
 *     responses:
 *       200:
 *         description: succès
 *         content:
 *           application/json:
 *            schema:
 *             type: object
 *             properties:
 *              nouveauCommentaire:
 *                type: object
 *                properties:
 *                 id:
 *                   type: integer
 *                   description: Id du commentaire
 *                   example: 5
 *                 commentaire:
 *                   type: string
 *                   description: le commentaire
 *                   example: test
 *                 UtilisateurId:
 *                   type: integer
 *                   description: L'id de l'utilisateur qui a commenter le livre
 *                   example: 2
 *                 LivreId:
 *                   type: integer
 *                   description: Id du livre commenté
 *                   example: 9
 *       401:
 *        description:  Non autorisé - Authentification requise
 *       500:
 *        description:  Erreur interne du serveur
 */

router.post("/livre/commentaire/:livreId",AutorisationMembre,ajoutCommentaire);

/**
 * @swagger
 * /api/livre/ajout:
 *   post:
 *     summary: Ajouter un nouveau livre
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
 *       - Livre
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               auteur:
 *                 type: string
 *               annee_publication:
 *                 type: string
 *                 format: date
 *               exemplaire:
 *                 type: integer
 *               CategorieId:
 *                 type: integer
 *               nouveaute:
 *                 type: boolean
 *                 description: Indique si le livre est une nouveauté
 *                 default: false
 *               photo:
 *                 type: string
 *                 format: binary
 *             required:
 *               - titre
 *               - auteur
 *               - annee_publication
 *               - exemplaire
 *               - CategorieId
 *               - photo
 *     responses:
 *       200:
 *         description: Livre ajouté avec succès
 *         content:
 *          application/json:
 *           schema:
 *            type: object
 *            properties:
 *             data: 
 *              type: object
 *              properties:
 *                 id:
 *                   type: integer
 *                   description: L'ID du livre ajouté
 *                 titre:
 *                   type: string
 *                   description: Le titre du livre
 *                 auteur:
 *                   type: string
 *                   description: L'auteur du livre
 *                 annee_publication:
 *                   type: string
 *                   format: date
 *                   description: La date de publication du livre
 *                 exemplaire:
 *                   type: integer
 *                   description: Le nombre d'exemplaires disponibles du livre
 *                 CategorieId:
 *                   type: integer
 *                   description: La catégorie du livre
 *                 nouveaute:
 *                   type: boolean
 *                   description: Indique si le livre est une nouveauté
 *                 popularite:
 *                   type: integer
 *                   description: La popularité du livre
 *                   default: 0
 *                 photo:
 *                   type: string
 *                   description: Le nom de la couverture du livre
 *                   example : FILE-1719504882569.jpg
 *       401:
 *        description:  Non autorisé - Authentification requise
 *       500:
 *        description:  Erreur interne du serveur
 */

router.post("/livre/ajout", AutorisationAdmin, ajoutLivre);

/**
 * @swagger
 * /api/livre/commentaire/reponse/{livreId}:
 *   post:
 *     summary: Ajouter une réponse à un commentaire
 *     description: >
 *       Cette route nécessite un token d'authentification JWT.
 *       Pour l'utiliser dans Swagger UI :
 *       1. Obtenez un token JWT en vous authentifiant via l'endpoint `/auth/connexion` en tant qu'utilisateur actif.
 *       2. Cliquez sur le bouton "Authorize" dans la documentation Swagger.
 *       3. Entrez le token JWT dans le champ `BearerAuth`.
 *       4. Cliquez sur "Authorize" pour enregistrer le token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Livre
 *     parameters:
 *      - in: path
 *        name: commentaireId
 *        description: id du commentaire à répondre
 *        schema:
 *          type: integer
 *          example: 6
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               commentaire:
 *                 type: string
 *                 description: réponse du commentaire
 *             required:
 *               - commentaire
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
 *                   description: Id de la réponse
 *                   example: 2
 *                 commentaire:
 *                   type: string
 *                   description: la réponse du commentaire
 *                   example: test reponse
 *                 UtilisateurId:
 *                   type: integer
 *                   description: L'id de l'utilisateur qui a répondu
 *                   example: 2
 *                 CommentaireId:
 *                   type: integer
 *                   description: L'id du commentaire en réponse
 *                   example: 6
 *       401:
 *        description:  Non autorisé - Authentification requise
 *       500:
 *        description:  Erreur interne du serveur
 */
router.post("/livre/commentaire/reponse/:commentaireId",AutorisationMembre,ajoutReponseComs);

/**
 * @swagger
 * /api/livre/note/ajout/{livreId}:
 *   put:
 *     summary: Donnez une note à un livre (étoiles)
 *     description: >
 *       Cette route nécessite un token d'authentification JWT.
 *       Pour l'utiliser dans Swagger UI :
 *       1. Obtenez un token JWT en vous authentifiant via l'endpoint `/auth/connexion` en tant qu'utilisateur actif.
 *       2. Cliquez sur le bouton "Authorize" dans la documentation Swagger.
 *       3. Entrez le token JWT dans le champ `BearerAuth`.
 *       4. Cliquez sur "Authorize" pour enregistrer le token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Livre
 *     parameters:
 *      - in: path
 *        name: livreId
 *        description: id du livre à noter
 *        schema:
 *          type: integer
 *          example: 6
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               note:
 *                 type: integer
 *                 description: note attribuée au livre
 *                 exemple: 4
 *             required:
 *               - note
 *     responses:
 *       200:
 *         description: succès
 *         content:
 *           application/json:
 *            schema:
 *               type: object
 *               properties:
 *                  serverSuccessMsg:
 *                      type: string
 *                      example: Mise à jour réussie!
 *       401:
 *        description:  Non autorisé - Authentification requise
 *       500:
 *        description:  Erreur interne du serveur
 */
router.put("/livre/note/ajout/:livreId",AutorisationMembre,ajoutNote);


/**
 * @swagger
 * /api/livre/modification/{id}:
 *   put:
 *     summary: Mettre à jour un livre
 *     description: >
 *       Met à jour les détails d'un livre existant. Seul un administrateur peut effectuer cette opération.
 *       Cette route nécessite un token d'authentification JWT.
 *       Pour l'utiliser dans Swagger UI :
 *       1. Obtenez un token JWT en vous authentifiant via l'endpoint `/auth/connexion` en tant qu'Admin.
 *       2. Cliquez sur le bouton "Authorize" dans la documentation Swagger.
 *       3. Entrez le token JWT dans le champ `BearerAuth`.
 *       4. Cliquez sur "Authorize" pour enregistrer le token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Livre
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du livre à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *          multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *               auteur:
 *                 type: string
 *               annee_publication:
 *                 type: string
 *                 format: date
 *               exemplaire:
 *                 type: integer
 *               CategorieId:
 *                 type: integer
 *               nouveaute:
 *                 type: boolean
 *                 description: Indique si le livre est une nouveauté
 *                 default: false
 *               photo:
 *                 type: string
 *                 format: binary
 *             required:
 *               - titre
 *               - auteur
 *               - annee_publication
 *               - exemplaire
 *               - CategorieId
 *               - photo
 *     responses:
 *       200:
 *         description: Livre mis à jour avec succès
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

router.put("/livre/modification/:id", AutorisationAdmin, miseJourLivre);

/**
 * @swagger
 * /api/livre/suppression/{id}:
 *   delete:
 *     summary: Supprimer un livre
 *     description: >
 *       Supprimer un livre existant
 *       Cette route nécessite un token d'authentification JWT.
 *       Pour l'utiliser dans Swagger UI :
 *       1. Obtenez un token JWT en vous authentifiant via l'endpoint `/auth/connexion` en tant qu'Admin.
 *       2. Cliquez sur le bouton "Authorize" dans la documentation Swagger.
 *       3. Entrez le token JWT dans le champ `BearerAuth`.
 *       4. Cliquez sur "Authorize" pour enregistrer le token.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Livre
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du livre à supprimer
 *     responses:
 *       200:
 *         description: Livre Supprimé avec succès
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
router.delete("/livre/suppression/:id", AutorisationAdmin, supprimerLivre);


module.exports = router;

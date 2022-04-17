# API & Client Constellations
**WORK IN PROGRESS**

## API
### Lancer le serveur
Pour lancer le serveur, se rendre dans le dossier racine du projet et lancer la commande ```npm run dev```.
Laisser le terminal ouvert, il indiquera les potentielles erreurs lors de l'exécution du projet.


### Documentation
Se rendre sur http://localhost:1234/documentation une fois le serveur lancé.

### Tests
Se placer dans le dossier racine du projet et faire "npm run test-rest".
Si vous lancez cette commande plusieurs fois certains tests ne passent pas.
Il s'agit d'un problème connu. Pour y pallier il faudrait supprimer le contenu du fichier './server/prisma/datasourcetest.db' et relancer la commande.
De plus un test ne passe pas car l'ID des objets changent dès qu'ils sont recrées.


# Prise de notes Docker

## Introduction

Un problème souvent rencontré lorsque nous souhaitons partager notre code : il ne fonctionne pas chez quelqu'un d'autre pour de diverses raison. 

- Manque de bibliothèques
- Pas les bonnes versions 
- Le système d'exploitation est différent
- etc

Une solution est d'utiliser une machine virtuelle spécifiée pour faire tourner l'application. Mais le plus grand inconvévient c'est que elle prend énormément de ressources, ralentit nos machines.

Les conteners docker sont plus légères, plus rapides que les VM et répondent à nos besoins. Les VM virtualisent les composants physiques d'une machine, tandis que les conteneurs virtualisent le système d'exploitation.

On crée d'abord l'image (ce que nous voulons émuler), et le conteneur est une instance de l'image qui tourne. La communication avec le conteneur se fait à travers un port spécifié dans le fichier Dockerfile.

Nous pouvons déployer plusieurs conteneurs d'une même image. Les images peuvent être partagées aux autres utilisateurs par exemple en les publiant sur Dockerhub.

## Dockerfile

On peut le nommer différemment, mais Dockerfile est la convention. Si un autre nom est utilisé, on doit le spécifier dans la commande de création d'image avec l'option `-file`

## Lancement du conteneur

Le lancement s'est bien déroulé. Mais j'ai rencontré un problème, après avoir ouvert vim pour éditer le fichier index.js dans le conteneur, le serveur web s'actualise que une fois, et après la deuxième modification, même si le fichier est bien modifié, le contenu du serveur reste identique. j'ai pas pu identifié la cause de ce bug. 

## Volume et bind mount

Le redémarrage d'un conteneur réinitialise toutes les données. Pour assurer la pertinence et la sauvegarde de l'état du conteneur, on a deux options :

- Bind mount : relie les répertoire de la machine hôte au conteneur
- Volume : système de fichier géré par docker, plus flexible, plus portable et utilisable sur diffférents hôtes docker.

# Les petits plats - P7 - 05/2023
#### - *FR* -

Projet 7 d'OpenClassrooms du parcours développeur d'application JS React. 

Je joue le rôle d'un freelance missionné par l'entreprise "les petits plats". J'ai pour mission de développer un moteur de recherche composé d'une barre de recherche principal et de filtres avancés (*tag*). À partir d'un fichier JS fourni contenant 50 recettes de cuisine, le moteur de recherche doit permettre de trier facilement et rapidement les recettes et d'afficher les résultats sur la page. 

De plus, deux versions de la barre de recherche principale sont développées sur deux branches distinctes :
- search-bar-native-loop : la version utilisant la boucle native *for* pour le moteur de la barre de recherche principal
- search-bar-array-method : la version utilisant la méthode *filter* pour le moteur de la barre de recherche principal

Cela dans l'objectif de tester laquelle de ces deux méthodes est la plus efficace grace à une étude de performance.

Finalement, une **fiche d’investigation** est réalisée pour reprendre les résultats de l'étude de performance.

---

#### - *EN* -

OpenClassrooms Project 7 of the JS React application developer course.

I'm playing the role of a freelancer commissioned by the company "les petits plats". My mission is to develop a search engine consisting of a main search bar and advanced filters (*tags*). Based on a supplied JS file containing 50 recipes, the search engine must enable recipes to be sorted quickly and easily, and the results to be displayed on the page.

In addition, two versions of the main search bar are being developed on two separate branches:
- search-bar-native-loop: the version using the native *for* loop for the main search bar engine
- search-bar-array-method: the version using the *filter* method for the main search bar engine

The aim is to test which of these two methods is the most efficient by means of a performance study.

Finally, an **investigation sheet** is produced to summarize the results of the performance study.

## Run Locally

**Clone the project**

```bash
  git clone https://github.com/Jean-Baradat/OC-p7-lespetitsplats-05-2023.git
```

**Go to the project directory**

```bash
  cd OC-p7-lespetitsplats-05-2023
```

**Start a server**

> This project uses import/export modules. You need to run it on a server to avoid CORS errors.
> 
> Do to so, you can use the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code or [WAMP server](https://www.wampserver.com/en/) for example.
> 
> Do as you like to run your server, but make sure you run it from the **public folder**.

**Install dependencies (if needed)**
- SASS

```bash
  npm install
```

**Run SAAS compiler (if needed)**

For normal version
```bash
  npm run sass
```

For compressed version
```bash
  npm run sass-compressed
```


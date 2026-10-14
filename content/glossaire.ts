import type { GlossaryEntry } from "./types";

/** Glossaire. Les identifiants servent aussi de « notions » pour la révision. */
export const GLOSSARY: GlossaryEntry[] = [
  /* Semaine 1 ------------------------------------------------------- */
  {
    id: "systeme-exploitation",
    term: "Système d'exploitation",
    definition: "Le logiciel de base qui fait fonctionner l'appareil : il gère la mémoire, les fichiers, l'écran et lance les autres programmes.",
    example: "Windows, macOS, Linux, Android et iOS sont des systèmes d'exploitation.",
    seeAlso: ["application"],
  },
  {
    id: "application",
    term: "Application (logiciel)",
    definition: "Un programme qui sert à une tâche précise et qui fonctionne grâce au système d'exploitation.",
    example: "Un traitement de texte, un navigateur ou une messagerie sont des applications.",
  },
  {
    id: "fichier",
    term: "Fichier",
    definition: "Un ensemble de données enregistré sous un nom : un document, une photo, un programme.",
    example: "facture-mars.pdf est un fichier.",
    seeAlso: ["extension", "dossier"],
  },
  {
    id: "dossier",
    term: "Dossier (répertoire)",
    definition: "Un conteneur qui range des fichiers et d'autres dossiers. Dans le terminal, on parle aussi de répertoire.",
  },
  {
    id: "extension",
    term: "Extension de fichier",
    definition: "Les lettres après le dernier point du nom d'un fichier. Elles indiquent son type, mais peuvent être trompeuses.",
    example: "Dans photo.jpg.exe, la vraie extension est .exe : c'est un programme, pas une image.",
  },
  {
    id: "navigateur",
    term: "Navigateur",
    definition: "L'application qui demande des pages aux sites web et les affiche.",
    example: "Firefox, Chrome, Safari ou Edge.",
    seeAlso: ["serveur", "client"],
  },
  {
    id: "serveur",
    term: "Serveur",
    definition: "Un ordinateur, souvent installé dans un centre de données, qui attend des demandes et y répond (pages web, e-mails, fichiers).",
    seeAlso: ["client", "requete"],
  },
  {
    id: "client",
    term: "Client",
    definition: "Le programme qui envoie une demande à un serveur. Ton navigateur est le client d'un site web.",
  },
  {
    id: "requete",
    term: "Requête",
    definition: "Le message qu'un client envoie à un serveur pour lui demander quelque chose.",
    example: "« Donne-moi la page /contact » est une requête.",
    seeAlso: ["reponse", "methode-http"],
  },
  {
    id: "reponse",
    term: "Réponse",
    definition: "Le message que le serveur renvoie au client : le contenu demandé, ou une explication s'il ne peut pas le fournir.",
    seeAlso: ["code-statut"],
  },
  {
    id: "adresse-ip",
    term: "Adresse IP",
    definition: "Le numéro qui identifie une machine sur un réseau, comme une adresse postale. En version 4, elle s'écrit avec quatre nombres de 0 à 255 séparés par des points.",
    example: "192.168.1.24 ou 203.0.113.7.",
    seeAlso: ["ip-privee", "ip-publique"],
  },
  {
    id: "ip-privee",
    term: "Adresse IP privée",
    definition: "Une adresse utilisée seulement à l'intérieur d'un réseau local (maison, bureau). Elle commence notamment par 192.168., 10. ou 172.16. à 172.31.",
    example: "Ton ordinateur à la maison a souvent une adresse en 192.168.1.x.",
  },
  {
    id: "ip-publique",
    term: "Adresse IP publique",
    definition: "L'adresse visible sur Internet. Chez toi, c'est généralement celle de ta box, partagée par tous tes appareils.",
  },
  {
    id: "routeur",
    term: "Routeur (box)",
    definition: "L'appareil qui relie ton réseau local à Internet et fait circuler les échanges entre les deux.",
  },
  {
    id: "dns",
    term: "DNS",
    definition: "Le Domain Name System, l'annuaire d'Internet : il traduit un nom de domaine lisible en adresse IP.",
    example: "Le DNS répond que librairie-exemple.test correspond à 203.0.113.10.",
    seeAlso: ["nom-de-domaine", "adresse-ip"],
  },
  {
    id: "nom-de-domaine",
    term: "Nom de domaine",
    definition: "Le nom d'un site enregistré par son propriétaire, juste avant l'extension (.com, .fr…). C'est lui qui indique vraiment chez qui tu vas.",
    example: "Dans www.banque-horizon.test/compte, le domaine est banque-horizon.test.",
    seeAlso: ["sous-domaine", "url"],
  },
  {
    id: "sous-domaine",
    term: "Sous-domaine",
    definition: "Ce qui est écrit à gauche du nom de domaine. Le propriétaire du domaine peut y mettre n'importe quel mot, y compris le nom d'une autre marque.",
    example: "Dans banque-horizon.secure-verif.test, « banque-horizon » est un sous-domaine du domaine secure-verif.test.",
  },
  {
    id: "url",
    term: "URL",
    definition: "L'adresse complète d'une ressource sur le web : protocole, nom d'hôte, chemin, et parfois paramètres.",
    example: "https://www.example.com/aide?page=2",
    seeAlso: ["nom-de-domaine", "https"],
  },
  {
    id: "http",
    term: "HTTP",
    definition: "Le langage commun que parlent navigateurs et serveurs web pour échanger requêtes et réponses.",
  },
  {
    id: "https",
    term: "HTTPS",
    definition: "HTTP protégé par chiffrement. Il garantit que l'échange n'est ni lu ni modifié en chemin, et que tu parles bien au domaine affiché. Il ne garantit pas que ce domaine est honnête.",
    example: "Un site de phishing peut très bien afficher un cadenas.",
    seeAlso: ["chiffrement", "certificat"],
  },
  {
    id: "chiffrement",
    term: "Chiffrement",
    definition: "Une transformation qui rend des données illisibles pour quiconque ne possède pas la clé permettant de les déchiffrer.",
  },
  {
    id: "certificat",
    term: "Certificat",
    definition: "Une pièce d'identité numérique qui prouve qu'un serveur contrôle bien un nom de domaine. Elle ne dit rien de l'honnêteté de son propriétaire.",
  },

  /* Semaine 2 ------------------------------------------------------- */
  {
    id: "mot-de-passe",
    term: "Mot de passe",
    definition: "Un secret qui prouve ton identité. Sa solidité dépend surtout de sa longueur, de son imprévisibilité et du fait qu'il ne serve qu'à un seul compte.",
    seeAlso: ["phrase-de-passe", "gestionnaire-mdp"],
  },
  {
    id: "phrase-de-passe",
    term: "Phrase de passe",
    definition: "Un mot de passe composé de plusieurs mots tirés au hasard. Long, donc solide, et plus facile à retenir.",
    example: "« tulipe-cadastre-orbite-sauge-volcan » (exemple fictif, à ne pas réutiliser).",
  },
  {
    id: "fuite-de-donnees",
    term: "Fuite de données",
    definition: "La divulgation non autorisée d'informations stockées par un service, par exemple sa liste d'adresses e-mail et de mots de passe.",
  },
  {
    id: "attaque-reutilisation",
    term: "Attaque par réutilisation",
    definition: "Un attaquant essaie, sur d'autres sites, des couples identifiant / mot de passe récupérés lors d'une fuite. Elle réussit dès qu'un mot de passe sert à plusieurs comptes.",
    example: "On parle aussi de « credential stuffing ».",
  },
  {
    id: "force-brute",
    term: "Attaque par force brute",
    definition: "Essayer un très grand nombre de mots de passe, automatiquement, jusqu'à trouver le bon.",
  },
  {
    id: "gestionnaire-mdp",
    term: "Gestionnaire de mots de passe",
    definition: "Une application qui crée, retient et remplit des mots de passe différents pour chaque compte, protégés par un seul mot de passe maître.",
    seeAlso: ["mot-de-passe-maitre"],
  },
  {
    id: "mot-de-passe-maitre",
    term: "Mot de passe maître",
    definition: "Le seul secret à retenir quand on utilise un gestionnaire. Il doit être long, unique, et protégé par une double authentification.",
  },
  {
    id: "double-authentification",
    term: "Double authentification (2FA)",
    definition: "Demander une deuxième preuve en plus du mot de passe, par exemple un code temporaire ou une clé physique. Un mot de passe volé ne suffit alors plus.",
    seeAlso: ["facteur", "code-de-secours"],
  },
  {
    id: "facteur",
    term: "Facteur d'authentification",
    definition: "Un type de preuve : ce que tu sais (mot de passe), ce que tu possèdes (téléphone, clé), ce que tu es (empreinte).",
  },
  {
    id: "code-de-secours",
    term: "Codes de secours",
    definition: "Des codes à usage unique fournis lors de l'activation de la double authentification, pour accéder au compte si tu perds ton téléphone.",
  },
  {
    id: "phishing",
    term: "Phishing (hameçonnage)",
    definition: "Un message qui imite une organisation de confiance pour te faire cliquer, saisir des identifiants ou payer.",
    seeAlso: ["ingenierie-sociale", "usurpation"],
  },
  {
    id: "ingenierie-sociale",
    term: "Ingénierie sociale",
    definition: "L'art de manipuler une personne plutôt qu'une machine : urgence, autorité, peur, curiosité ou sympathie servent à court-circuiter la réflexion.",
  },
  {
    id: "usurpation",
    term: "Usurpation d'identité",
    definition: "Se faire passer pour quelqu'un d'autre : une banque, un collègue, un service client.",
  },

  /* Semaine 3 ------------------------------------------------------- */
  {
    id: "rancongiciel",
    term: "Rançongiciel",
    definition: "Un logiciel malveillant qui chiffre les fichiers d'un ordinateur et réclame une rançon pour les rendre. La meilleure parade reste des sauvegardes régulières, conservées à part.",
  },
  {
    id: "terminal",
    term: "Terminal",
    definition: "Une fenêtre où l'on donne des ordres à l'ordinateur en écrivant des commandes, au lieu de cliquer.",
    seeAlso: ["commande", "invite"],
  },
  {
    id: "invite",
    term: "Invite de commande",
    definition: "Le texte affiché avant le curseur, qui rappelle qui tu es et où tu te trouves.",
    example: "lea@poste:~$ : utilisatrice lea, machine poste, dossier personnel (~).",
  },
  {
    id: "commande",
    term: "Commande",
    definition: "Un ordre tapé dans le terminal : un nom (ls, cat…), éventuellement suivi d'options et d'arguments.",
    example: "Dans ls -l documents, ls est la commande, -l une option, documents un argument.",
    seeAlso: ["option"],
  },
  {
    id: "option",
    term: "Option",
    definition: "Un réglage qui modifie le comportement d'une commande. Elle commence généralement par un tiret.",
    example: "-l dans ls -l affiche les détails.",
  },
  {
    id: "chemin",
    term: "Chemin",
    definition: "L'adresse d'un fichier ou d'un dossier dans l'arborescence, avec des / entre chaque dossier.",
    example: "/home/lea/documents/notes.txt",
    seeAlso: ["chemin-absolu", "chemin-relatif"],
  },
  {
    id: "chemin-absolu",
    term: "Chemin absolu",
    definition: "Un chemin qui part de la racine / : il désigne toujours le même endroit, où que tu sois.",
  },
  {
    id: "chemin-relatif",
    term: "Chemin relatif",
    definition: "Un chemin qui part du dossier où tu te trouves. .. désigne le dossier parent.",
  },
  {
    id: "dossier-personnel",
    term: "Dossier personnel",
    definition: "Ton dossier à toi, abrégé ~ dans le terminal.",
    example: "Pour l'utilisatrice lea : /home/lea.",
  },
  {
    id: "grep",
    term: "grep",
    definition: "Une commande qui affiche les lignes d'un fichier contenant un texte donné. Indispensable pour fouiller de longs journaux.",
  },
  {
    id: "permissions",
    term: "Permissions",
    definition: "Les droits de lire (r), modifier (w) et exécuter ou traverser (x) un fichier ou un dossier, définis pour le propriétaire, le groupe et les autres.",
    example: "-rw-r----- : le propriétaire lit et modifie, le groupe lit, les autres n'ont aucun droit.",
    seeAlso: ["proprietaire", "groupe"],
  },
  {
    id: "proprietaire",
    term: "Propriétaire",
    definition: "L'utilisateur à qui appartient un fichier. Les trois premiers droits des permissions s'appliquent à lui.",
  },
  {
    id: "groupe",
    term: "Groupe",
    definition: "Un ensemble d'utilisateurs qui partagent des droits. Les trois droits du milieu s'appliquent aux membres du groupe du fichier.",
  },
  {
    id: "administrateur",
    term: "Administrateur",
    definition: "Un compte qui a tous les droits sur une machine ou un service. Sur Linux, on l'appelle root.",
  },

  /* Semaine 4 ------------------------------------------------------- */
  {
    id: "methode-http",
    term: "Méthode HTTP",
    definition: "Le verbe d'une requête : GET pour lire, POST pour envoyer des données (un formulaire, par exemple).",
  },
  {
    id: "code-statut",
    term: "Code de statut",
    definition: "Le nombre au début d'une réponse HTTP : 200 (tout va bien), 301 (redirection), 401 (identification requise), 403 (interdit), 404 (introuvable), 500 (erreur du serveur).",
  },
  {
    id: "en-tete",
    term: "En-tête HTTP",
    definition: "Une ligne d'information qui accompagne une requête ou une réponse, sous la forme Nom: valeur.",
    example: "Host: www.example.com",
  },
  {
    id: "cookie",
    term: "Cookie",
    definition: "Une petite donnée qu'un site demande au navigateur de conserver et de lui renvoyer à chaque requête.",
    seeAlso: ["session", "identifiant-session"],
  },
  {
    id: "cookie-tiers",
    term: "Cookie tiers",
    definition: "Un cookie déposé par un autre domaine que celui du site visité, souvent une régie publicitaire présente sur de nombreux sites. Il permet de suivre une personne d'un site à l'autre.",
  },
  {
    id: "session",
    term: "Session",
    definition: "La période pendant laquelle un site te reconnaît comme connecté, sans te redemander ton mot de passe à chaque page.",
  },
  {
    id: "identifiant-session",
    term: "Identifiant de session",
    definition: "Un long code aléatoire, souvent stocké dans un cookie, qui prouve au site que tu t'es déjà connecté. Qui le vole peut se faire passer pour toi.",
  },
  {
    id: "authentification",
    term: "Authentification",
    definition: "Vérifier qui tu es (mot de passe, double authentification).",
    seeAlso: ["autorisation"],
  },
  {
    id: "autorisation",
    term: "Autorisation",
    definition: "Décider ce que tu as le droit de faire, une fois qu'on sait qui tu es.",
  },
  {
    id: "role",
    term: "Rôle",
    definition: "Un ensemble de permissions attribué à des utilisateurs selon leur fonction (lecteur, éditeur, administrateur…).",
  },
  {
    id: "moindre-privilege",
    term: "Principe du moindre privilège",
    definition: "Donner à chaque personne uniquement les droits nécessaires à son travail, pas davantage.",
  },
  {
    id: "controle-acces",
    term: "Contrôle d'accès",
    definition: "Les vérifications qu'un site fait, côté serveur, avant de montrer ou modifier une ressource.",
    example: "Vérifier que la facture n°1042 appartient bien à la personne connectée.",
  },

  /* Semaine 5 ------------------------------------------------------- */
  {
    id: "journal",
    term: "Journal (log)",
    definition: "Un fichier où un système note ses événements, une ligne par événement, avec la date et les détails.",
    seeAlso: ["horodatage", "evenement"],
  },
  {
    id: "horodatage",
    term: "Horodatage",
    definition: "La date et l'heure précises associées à un événement.",
    example: "2026-03-14 22:41:07",
  },
  {
    id: "fuseau-horaire",
    term: "Fuseau horaire",
    definition: "Le décalage d'heure selon la région. Deux journaux peuvent noter le même instant avec des heures différentes ; UTC sert de référence commune.",
  },
  {
    id: "evenement",
    term: "Événement",
    definition: "Une action enregistrée par un système : une connexion, un échec, une modification de fichier.",
  },
  {
    id: "indice",
    term: "Indice",
    definition: "Un élément observé qui rend une explication plus ou moins probable. Un indice isolé prouve rarement quelque chose.",
  },
  {
    id: "observation",
    term: "Observation",
    definition: "Un fait constaté directement dans une trace, sans interprétation.",
    example: "« 12 échecs de connexion pour le compte marc entre 22h40 et 22h43. »",
    seeAlso: ["hypothese", "conclusion"],
  },
  {
    id: "hypothese",
    term: "Hypothèse",
    definition: "Une explication possible des observations, qui reste à vérifier.",
    example: "« Quelqu'un essaie peut-être de deviner le mot de passe de marc. »",
  },
  {
    id: "conclusion",
    term: "Conclusion",
    definition: "Ce qu'on peut affirmer une fois l'hypothèse vérifiée par plusieurs indices concordants, en précisant son degré de certitude.",
  },
  {
    id: "faux-positif",
    term: "Faux positif",
    definition: "Une alerte déclenchée alors qu'il n'y a pas de problème réel.",
    example: "Une collègue qui se trompe trois fois de mot de passe après ses vacances.",
  },
  {
    id: "chronologie",
    term: "Chronologie",
    definition: "La liste ordonnée des événements d'un incident, construite à partir de sources différentes.",
  },
  {
    id: "incident",
    term: "Incident de sécurité",
    definition: "Un événement qui menace la confidentialité, l'intégrité ou la disponibilité de données ou de services.",
  },
];

export const GLOSSARY_BY_ID: Record<string, GlossaryEntry> = Object.fromEntries(GLOSSARY.map((g) => [g.id, g]));

import type { Session } from "../types";
import { dir, file, homeRoot } from "../fs";

const TERMINAL_SIM = "Ce terminal est entièrement simulé dans la page, avec un petit système de fichiers fictif. Aucune commande n'est exécutée sur ton appareil.";

/* ------------------------------------------------------------------ */
/* Systèmes de fichiers fictifs                                        */
/* ------------------------------------------------------------------ */

const FS_J15 = homeRoot("lea", [
  dir("documents", [
    file("lettre-proprietaire.txt", "Madame,\nJe vous informe que le robinet de la cuisine fuit depuis lundi.\nCordialement,\nLéa\n"),
    file("budget-2026.txt", "Loyer        640\nCourses      320\nTransports    55\n"),
  ]),
  dir("photos", [file("plage.jpg", "(Ceci est une image : le terminal ne sait afficher que du texte.)\n")]),
  file("notes.txt", "Rappel : rendez-vous chez le dentiste jeudi à 9 h.\n"),
  file("a-faire.txt", "- Acheter des ampoules\n- Répondre à Paul\n- Activer la double authentification de la messagerie\n"),
  file(".bienvenue.txt", "Bravo, tu as trouvé un fichier caché.\nSon nom commence par un point : ls ne l'affiche qu'avec l'option -a.\nLe mot à retenir : lanterne\n"),
]);

const FS_J16 = homeRoot(
  "lea",
  [
    dir("documents", [
      dir("administratif", [
        dir("impots", [file("a-lire.txt", "Tu es arrivée au bout du chemin.\nLe mot à noter : boussole\n")]),
        dir("banque", [file("releves.txt", "Relevés de compte : voir l'application de la banque.\n")]),
      ]),
      dir("personnel", [file("journal.txt", "Lundi : début du programme de cybersécurité.\n")]),
    ]),
    dir("projets", [
      dir("association", [file("compte-rendu.txt", "Réunion du 12 mars : budget validé.\n")]),
      dir("cuisine", [file("recettes.txt", "Soupe de potiron, tarte aux pommes.\n")]),
    ]),
  ],
  [
    dir("srv", [dir("partage", [dir("equipe", [file("planning.txt", "Planning partagé de l'équipe\nRéunion d'équipe : jeudi 10 h\n", { owner: "marc" })], { owner: "root" })], { owner: "root" })], {
      owner: "root",
    }),
  ],
);

const ADHERENTS = [
  "nom;prenom;ville;adhesion",
  "Bernard;Lucie;Lyon;2023",
  "Diallo;Ibrahim;Villeurbanne;2024",
  "Moreau;Claire;Lyon;2022",
  "Nguyen;Thi;Vénissieux;2025",
  "Petit;Hugo;Lyon;2025",
  "Rossi;Marco;Bron;2021",
  "Haddad;Samia;Lyon;2024",
  "Lefèvre;Paul;Caluire;2023",
  "Garnier;Inès;Lyon;2025",
  "Martin;Jules;Villeurbanne;2022",
  "Kowalski;Anna;Lyon;2024",
].join("\n");

const INSCRIPTIONS = [
  "2026-03-01 09:14 inscription atelier=compost personne=lucie",
  "2026-03-02 17:30 inscription atelier=semis personne=ibrahim",
  "2026-03-04 12:05 inscription atelier=compost personne=claire",
  "2026-03-06 20:41 inscription atelier=taille personne=thi",
  "2026-03-08 10:12 annulation atelier=compost personne=claire",
  "2026-03-10 08:55 inscription atelier=taille personne=marco",
  "2026-03-12 19:20 inscription atelier=semis personne=samia",
  "2026-03-14 14:03 inscription atelier=compost personne=paul",
  "2026-03-16 11:37 inscription atelier=taille personne=ines",
  "2026-03-18 09:02 inscription atelier=semis personne=jules",
  "2026-03-19 16:16 inscription atelier=compost personne=anna",
  "2026-03-20 18:42 inscription atelier=semis personne=hugo",
].join("\n");

const FS_J17 = homeRoot("lea", [
  dir("association", [
    file(
      "compte-rendu-mars.txt",
      [
        "Association Les Jardins Partagés",
        "Compte rendu de la réunion du 12 mars",
        "",
        "Présents : Nadia, Marc, Léa, Paul",
        "Ordre du jour : budget, journée portes ouvertes, outils numériques",
        "",
        "1. Budget : le devis des bacs de culture est accepté.",
        "2. Portes ouvertes : prévues le samedi 18 avril.",
        "3. Outils numériques : Paul propose un gestionnaire de mots de passe partagé pour les comptes de l'association.",
        "",
        "Prochaine assemblée générale : jeudi 7 mai à 19 h.",
        "Rédigé par Léa.",
      ].join("\n") + "\n",
    ),
    file("adherents.csv", ADHERENTS + "\n"),
    file("inscriptions.log", INSCRIPTIONS + "\n"),
  ]),
]);

const TICKETS = [
  "ticket 101 | 2026-03-02 | Imprimante du 2e étage bloquée",
  "ticket 102 | 2026-03-02 | Mot de passe oublié pour la messagerie",
  "ticket 103 | 2026-03-03 | Écran qui clignote au poste 12",
  "ticket 104 | 2026-03-03 | Imprimante : bourrage papier",
  "ticket 105 | 2026-03-04 | Demande d'accès au dossier Projets",
  "ticket 106 | 2026-03-05 | MOT DE PASSE expiré, impossible de se connecter",
  "ticket 107 | 2026-03-05 | Wifi lent en salle de réunion",
  "ticket 108 | 2026-03-06 | Installation d'un logiciel de dessin",
  "ticket 109 | 2026-03-09 | Le VPN se déconnecte toutes les dix minutes",
  "ticket 110 | 2026-03-09 | Clavier défectueux à l'accueil",
  "ticket 111 | 2026-03-10 | Changement de mot de passe demandé par la direction",
  "ticket 112 | 2026-03-11 | Imprimante couleur hors service",
  "ticket 113 | 2026-03-12 | Souris sans fil introuvable",
  "ticket 114 | 2026-03-12 | Mise à jour du système bloquée à 80 %",
  "ticket 115 | 2026-03-13 | Réinitialisation du Mot De Passe de Paul",
  "ticket 116 | 2026-03-16 | Accès refusé au partage Comptabilité",
].join("\n");

const FS_J18 = homeRoot("lea", [
  dir("support", [
    file("tickets.txt", TICKETS + "\n"),
    dir("archives", [
      file("janvier.txt", "ticket 041 | Écran noir au démarrage\nticket 042 | Câble réseau débranché\nticket 043 | Mot de passe oublié\n"),
      file("fevrier.txt", "ticket 071 | Fichiers renommés en .verrou sur le poste de l'accueil\nticket 072 | Message demandant une rançon pour récupérer les fichiers\nticket 073 | Poste de l'accueil isolé du réseau par précaution\n"),
      file("decembre.txt", "ticket 011 | Imprimante en panne\nticket 012 | Demande de nouvel écran\n"),
    ]),
  ]),
]);

const FS_J19 = homeRoot(
  "lea",
  [file("a-savoir.txt", "Les dossiers partagés de l'équipe sont dans /srv.\n")],
  [
    dir(
      "srv",
      [
        dir(
          "equipe",
          [
            file("planning.txt", "Planning de l'équipe : réunion jeudi 10 h.\n", { owner: "marc", group: "equipe", perms: "-rw-r--r--" }),
            file("salaires.txt", "Document confidentiel du service RH.\n", { owner: "rh", group: "rh", perms: "-rw-------" }),
            file("compte-rendu.txt", "Compte rendu de la réunion d'équipe.\nDécision : sauvegarde hebdomadaire des dossiers partagés.\nMot de la fin : phare\n", {
              owner: "nadia",
              group: "equipe",
              perms: "-rw-rw----",
            }),
            file("procedure.txt", "Procédure interne de la direction.\n", { owner: "rh", group: "direction", perms: "-rw-r-----" }),
          ],
          { owner: "root", group: "equipe", perms: "drwxr-x---" },
        ),
        dir("direction", [file("budget.txt", "Budget prévisionnel.\n", { owner: "rh", group: "direction", perms: "-rw-------" })], {
          owner: "rh",
          group: "direction",
          perms: "drwx------",
        }),
      ],
      { owner: "root" },
    ),
  ],
);

const AUTH_LOG = [
  "2026-03-14 08:02:11 succes connexion utilisateur=nadia ip=192.168.10.21",
  "2026-03-14 08:15:40 succes connexion utilisateur=marc ip=192.168.10.34",
  "2026-03-14 09:01:02 echec connexion utilisateur=paul ip=192.168.10.40",
  "2026-03-14 09:01:20 succes connexion utilisateur=paul ip=192.168.10.40",
  "2026-03-14 10:00:12 echec connexion utilisateur=admin ip=192.168.10.5",
  "2026-03-14 10:00:31 succes connexion utilisateur=admin ip=192.168.10.5",
  "2026-03-14 12:30:05 deconnexion utilisateur=nadia ip=192.168.10.21",
  "2026-03-14 18:45:00 deconnexion utilisateur=marc ip=192.168.10.34",
  "2026-03-15 02:11:03 echec connexion utilisateur=admin ip=203.0.113.66",
  "2026-03-15 02:11:09 echec connexion utilisateur=admin ip=203.0.113.66",
  "2026-03-15 02:11:15 echec connexion utilisateur=admin ip=203.0.113.66",
  "2026-03-15 02:11:24 echec connexion utilisateur=admin ip=203.0.113.66",
  "2026-03-15 02:11:32 echec connexion utilisateur=admin ip=203.0.113.66",
  "2026-03-15 02:11:41 echec connexion utilisateur=admin ip=203.0.113.66",
  "2026-03-15 02:11:55 echec connexion utilisateur=admin ip=203.0.113.66",
  "2026-03-15 02:12:10 echec connexion utilisateur=admin ip=203.0.113.66",
  "2026-03-15 02:12:31 succes connexion utilisateur=admin ip=203.0.113.66",
  "2026-03-15 02:14:02 lecture fichier=/srv/equipe/salaires.txt utilisateur=admin ip=203.0.113.66",
  "2026-03-15 02:15:47 deconnexion utilisateur=admin ip=203.0.113.66",
  "2026-03-15 08:05:19 succes connexion utilisateur=nadia ip=192.168.10.21",
].join("\n");

const FS_J20 = homeRoot(
  "lea",
  [
    file(
      "alerte.txt",
      "Alerte reçue le 15 mars à 8 h 30 :\nPlusieurs échecs de connexion ont été détectés sur le compte admin cette nuit.\nLe journal des connexions se trouve dans /var/log/auth.log\nÀ toi de jouer : d'où viennent ces échecs, et la personne est-elle finalement entrée ?\n",
    ),
  ],
  [
    dir("var", [dir("log", [file("auth.log", AUTH_LOG + "\n", { owner: "root", perms: "-rw-r--r--" }), file("systeme.log", "Démarrage du système à 07:58.\nSauvegarde terminée à 23:00.\n", { owner: "root", perms: "-rw-r--r--" })], { owner: "root" })], {
      owner: "root",
    }),
  ],
);

/* ------------------------------------------------------------------ */
/* Séances                                                            */
/* ------------------------------------------------------------------ */

export const SEMAINE_3: Session[] = [
  {
    id: "j15",
    day: 15,
    week: 3,
    kind: "apprentissage",
    title: "Le terminal : parler à l'ordinateur par écrit",
    duration: 15,
    objective: "lire une invite de commande, savoir où tu te trouves et afficher le contenu d'un dossier, fichiers cachés compris.",
    notions: ["terminal", "invite", "commande", "option", "dossier-personnel"],
    competences: ["terminal"],
    learn: {
      paragraphs: [
        "Le [[terminal]] est une fenêtre où l'on donne des ordres à l'ordinateur en les écrivant, au lieu de cliquer. Il peut impressionner, mais il est très utilisé en sécurité : les serveurs n'ont souvent pas d'interface graphique, et c'est l'outil idéal pour fouiller de grands fichiers de traces.",
        "Avant le curseur, l'[[invite|invite de commande]] te dit où tu en es. `lea@poste:~$` signifie : utilisatrice `lea`, machine `poste`, dossier `~`. Le tilde `~` est un raccourci pour ton [[dossier-personnel|dossier personnel]], ici `/home/lea`.",
        "Une [[commande]] se compose d'un nom, parfois suivi d'[[option|options]] (qui commencent par un tiret) et d'arguments (ce sur quoi elle agit). Dans `ls -a documents`, `ls` est la commande, `-a` une option et `documents` l'argument. Les espaces séparent ces éléments, et les majuscules comptent : `LS` n'existe pas.",
        "Trois commandes pour commencer. `pwd` (print working directory) affiche le dossier où tu te trouves. `ls` (list) liste son contenu. `ls -a` affiche aussi les fichiers cachés, dont le nom commence par un point. Dans un vrai terminal, `ls -a` montre en plus deux entrées spéciales, `.` et `..`, que tu découvriras demain.",
        "Le terminal de cette application est **simulé** : il n'exécute rien sur ton appareil et tu ne peux rien y casser. Tape `help` à tout moment pour voir la liste des commandes disponibles.",
      ],
      example: {
        title: "demander son chemin",
        paragraphs: [
          "Dans un grand bâtiment, tu peux suivre des panneaux (l'interface graphique) ou demander directement à l'accueil : « où suis-je ? » (`pwd`), « qu'y a-t-il dans cette pièce ? » (`ls`). Le terminal, c'est l'accueil : il faut connaître les bonnes questions, mais les réponses sont précises.",
        ],
      },
    },
    exercise: {
      type: "terminal",
      instructions: "Utilise le terminal simulé pour accomplir la mission. Les tâches se cochent au fur et à mesure.",
      simulation: TERMINAL_SIM,
      retry: "Tape les commandes exactement comme dans les consignes, en minuscules, avec un espace entre la commande et son option. Pour la dernière question, compte tout ce qu'affiche `ls -a`.",
      user: "lea",
      host: "poste",
      home: "/home/lea",
      startDir: "/home/lea",
      root: FS_J15,
      tasks: [
        { id: "t1", text: "Affiche le dossier dans lequel tu te trouves avec `pwd`.", check: { kind: "ran", command: "pwd", outputIncludes: "/home/lea" } },
        { id: "t2", text: "Liste le contenu de ce dossier avec `ls`.", check: { kind: "ran", command: "ls", outputIncludes: "documents/" } },
        { id: "t3", text: "Affiche aussi les fichiers cachés avec `ls -a`.", check: { kind: "ran", command: "ls", outputIncludes: ".bienvenue.txt" } },
        { id: "t4", text: "Vérifie ton nom d'utilisateur avec `whoami`.", check: { kind: "ran", command: "whoami", outputIncludes: "lea" } },
        { id: "t5", text: "Combien d'éléments (fichiers et dossiers) contient ton dossier personnel, fichiers cachés compris ?", check: { kind: "answer", accept: ["5", "cinq"], placeholder: "un nombre" } },
      ],
      solution: ["pwd", "ls", "ls -a", "whoami"],
      solutionAnswers: { t5: "5" },
    },
    hints: [
      "Clique dans la zone sombre du terminal, tape `pwd`, puis appuie sur Entrée. Fais de même pour chaque commande.",
      "`ls -a` affiche cinq éléments : deux dossiers (suivis de /) et trois fichiers, dont un caché.",
    ],
    correction: [
      "`pwd` répond `/home/lea` : ton dossier personnel, abrégé `~` dans l'invite. `ls` affiche quatre éléments ; `ls -a` en révèle un cinquième, `.bienvenue.txt`, caché parce que son nom commence par un point.",
      "Les fichiers cachés ne sont pas secrets : ce sont souvent des réglages qu'on préfère ne pas afficher en permanence. En sécurité, on prend l'habitude d'utiliser `ls -a`, car un fichier indésirable peut aussi se cacher ainsi.",
      "`whoami` confirme l'utilisateur, déjà visible dans l'invite. Lire l'invite est un réflexe utile : elle dit toujours qui tu es et où tu es.",
    ],
    recall: {
      notion: "code-de-secours",
      fromDay: 10,
      prompt: "À quoi servent les codes de secours fournis lors de l'activation de la double authentification ?",
      options: [
        { id: "a", text: "À accéder à ton compte si tu perds ton téléphone" },
        { id: "b", text: "À remplacer ton mot de passe" },
        { id: "c", text: "À les donner au support technique en cas de problème" },
      ],
      answer: "a",
      explanation: "Ils permettent de te connecter sans ton téléphone. Comme tout code d'accès, ils ne se donnent à personne.",
    },
    summary: [
      "L'invite indique qui tu es, sur quelle machine, et dans quel dossier (`~` = ton dossier personnel).",
      "Une commande = un nom, des options (avec un tiret), des arguments, séparés par des espaces.",
      "`pwd` dit où tu es, `ls` ce qu'il y a, `ls -a` montre aussi les fichiers cachés.",
    ],
  },

  {
    id: "j16",
    day: 16,
    week: 3,
    kind: "apprentissage",
    title: "Se déplacer dans les dossiers",
    duration: 18,
    objective: "te déplacer avec `cd` en utilisant des chemins absolus et relatifs, y compris `..` et `~`.",
    notions: ["chemin", "chemin-absolu", "chemin-relatif", "dossier-personnel"],
    competences: ["terminal"],
    learn: {
      paragraphs: [
        "Les dossiers forment un arbre. Tout part de la racine, notée `/`. L'adresse d'un dossier ou d'un fichier dans cet arbre s'appelle un [[chemin]], avec des `/` entre chaque niveau : `/home/lea/documents`.",
        "La commande `cd` (change directory) te déplace. `cd documents` entre dans le dossier `documents` situé là où tu te trouves. C'est un [[chemin-relatif|chemin relatif]] : il part de ta position.",
        "Un [[chemin-absolu|chemin absolu]] commence par `/` et part toujours de la racine : `cd /srv/partage` fonctionne où que tu sois. C'est plus long à taper, mais sans ambiguïté.",
        "Deux raccourcis : `..` désigne le dossier parent (un niveau au-dessus), et `~` ton dossier personnel. On peut les combiner : `cd ../..` remonte de deux niveaux, `cd ~/projets` va dans le dossier projets de ton dossier personnel. `cd` seul te ramène chez toi.",
        "Astuce : la touche Tab complète les noms. Tape `cd doc` puis Tab, le terminal écrit `documents/` pour toi. Moins de fautes de frappe, plus de rapidité.",
      ],
      example: {
        title: "les indications pour venir chez toi",
        paragraphs: [
          "« Prends la deuxième à gauche, puis la troisième à droite » est un chemin relatif : il dépend d'où part la personne. « 12 rue des Lilas, Lyon » est un chemin absolu : il fonctionne depuis n'importe où. Et « reviens sur tes pas », c'est `..`.",
        ],
      },
    },
    exercise: {
      type: "terminal",
      instructions: "Explore l'arborescence fictive pour accomplir la mission.",
      simulation: TERMINAL_SIM,
      retry:
        "Utilise `pwd` après chaque déplacement pour vérifier où tu es, et `ls` pour voir les dossiers disponibles. Pour remonter, `..` ; pour un chemin qui fonctionne de partout, commence par `/`.",
      user: "lea",
      host: "poste",
      home: "/home/lea",
      startDir: "/home/lea",
      root: FS_J16,
      tasks: [
        { id: "t1", text: "Rends-toi dans le dossier `documents/administratif/impots`.", check: { kind: "cwd", path: "/home/lea/documents/administratif/impots" } },
        { id: "t2", text: "Quel mot est noté dans le fichier `a-lire.txt` de ce dossier ? (lis-le avec `cat a-lire.txt`)", check: { kind: "answer", accept: ["boussole"], placeholder: "un mot" } },
        { id: "t3", text: "Depuis là, va dans `projets/association` de ton dossier personnel, en utilisant `..` ou `~`.", check: { kind: "cwd", path: "/home/lea/projets/association" } },
        { id: "t4", text: "Va dans le dossier partagé de l'équipe grâce à son chemin absolu : `/srv/partage/equipe`.", check: { kind: "cwd", path: "/srv/partage/equipe" } },
        {
          id: "t5",
          text: "Donne le chemin absolu du dossier qui contient le fichier `planning.txt`.",
          check: { kind: "answer", accept: ["/srv/partage/equipe", "/srv/partage/equipe/"], placeholder: "commence par /" },
        },
      ],
      solution: ["cd documents/administratif/impots", "cat a-lire.txt", "cd ../../../projets/association", "cd /srv/partage/equipe", "ls", "pwd"],
      solutionAnswers: { t2: "boussole", t5: "/srv/partage/equipe" },
    },
    hints: [
      "Tu peux enchaîner plusieurs niveaux d'un coup : `cd documents/administratif/impots`. Ou avancer un dossier à la fois, en vérifiant avec `ls`.",
      "Depuis `impots`, il faut remonter de trois niveaux pour revenir à `/home/lea` : `../../..`. Plus simple encore : `cd ~/projets/association`.",
    ],
    correction: [
      "Les déplacements combinent deux façons d'écrire un chemin. Relatif : `cd documents/administratif/impots`, puis `cd ../../../projets/association`. Absolu : `cd /srv/partage/equipe`, qui fonctionne d'où que tu partes.",
      "`cd ~/projets/association` était une alternative élégante : le tilde ramène au dossier personnel, puis on descend.",
      "En cas de doute, `pwd` donne toujours la réponse. Les professionnels l'utilisent sans cesse : se tromper de dossier avant d'agir est une erreur fréquente.",
    ],
    recall: {
      notion: "option",
      fromDay: 15,
      prompt: "Dans la commande `ls -a documents`, que désigne `-a` ?",
      options: [
        { id: "a", text: "La commande" },
        { id: "b", text: "Une option" },
        { id: "c", text: "Le dossier à lister" },
      ],
      answer: "b",
      explanation: "`ls` est la commande, `-a` une option (qui affiche les fichiers cachés), `documents` l'argument.",
    },
    summary: [
      "Un chemin absolu commence par `/` et fonctionne de partout ; un chemin relatif part de ta position.",
      "`..` remonte d'un niveau, `~` désigne ton dossier personnel, `cd` seul y ramène.",
      "Vérifie ta position avec `pwd` avant d'agir.",
    ],
  },

  {
    id: "j17",
    day: 17,
    week: 3,
    kind: "apprentissage",
    title: "Lire des fichiers : cat, head, tail et wc",
    duration: 18,
    objective: "lire un fichier en entier, n'en afficher que le début ou la fin, et compter ses lignes.",
    notions: ["fichier", "commande"],
    competences: ["terminal"],
    learn: {
      paragraphs: [
        "Pour lire un fichier texte, `cat` affiche tout son contenu : `cat notes.txt`. Pratique pour un fichier court, beaucoup moins pour un fichier de dix mille lignes.",
        "`head` affiche le début d'un fichier, par défaut ses dix premières lignes. `head -n 3 adherents.csv` n'en affiche que trois : idéal pour découvrir la structure d'un tableau, dont la première ligne contient souvent les noms de colonnes.",
        "`tail` affiche la fin, ce qui est précieux pour les journaux d'événements : les entrées les plus récentes sont ajoutées en bas. `tail -n 5 inscriptions.log` montre les cinq dernières.",
        "Enfin, `wc -l` (word count, option lines) compte les lignes d'un fichier. Avant d'ouvrir un fichier inconnu, cela permet de savoir à quoi s'attendre.",
        "Un fichier `.csv` est un tableau en texte : chaque ligne est une rangée, et un séparateur (ici le point-virgule) délimite les colonnes. On en rencontre partout, car tous les tableurs savent les ouvrir.",
      ],
      example: {
        title: "feuilleter un livre",
        paragraphs: [
          "Tu ne lis pas un roman en entier pour savoir de quoi il parle : tu regardes la quatrième de couverture, la première page (`head`) ou la dernière (`tail`), et le nombre de pages (`wc -l`). `cat`, c'est lire tout le livre d'une traite.",
        ],
      },
    },
    exercise: {
      type: "terminal",
      instructions: "Les archives fictives d'une association de jardinage sont dans le dossier `association`. Accomplis la mission.",
      simulation: TERMINAL_SIM,
      retry: "Commence par `cd association` puis `ls`. Ensuite, choisis la commande adaptée : `cat` pour tout lire, `head` pour le début, `tail` pour la fin, `wc -l` pour compter.",
      user: "lea",
      host: "poste",
      home: "/home/lea",
      startDir: "/home/lea",
      root: FS_J17,
      tasks: [
        { id: "t1", text: "Lis en entier le fichier `compte-rendu-mars.txt` avec `cat`.", check: { kind: "ran", command: "cat", outputIncludes: "assemblée générale" } },
        {
          id: "t2",
          text: "Quelle est la date de la prochaine assemblée générale ?",
          check: { kind: "answer", accept: ["7 mai", "jeudi 7 mai", "le 7 mai", "le jeudi 7 mai", "7 mai à 19 h", "jeudi 7 mai à 19 h", "7/05", "07/05"], placeholder: "jour et mois" },
        },
        { id: "t3", text: "Affiche seulement les 3 premières lignes de `adherents.csv` avec `head -n 3`.", check: { kind: "ran", command: "head", outputIncludes: "nom;prenom" } },
        { id: "t4", text: "Affiche les 5 dernières lignes de `inscriptions.log` avec `tail -n 5`.", check: { kind: "ran", command: "tail", outputIncludes: "personne=hugo" } },
        { id: "t5", text: "Qui s'est inscrit en dernier ? (le prénom indiqué après `personne=`)", check: { kind: "answer", accept: ["hugo"], placeholder: "un prénom" } },
        { id: "t6", text: "Combien de lignes compte `adherents.csv` ? (utilise `wc -l`)", check: { kind: "answer", accept: ["12", "douze"], placeholder: "un nombre" } },
      ],
      solution: ["cd association", "ls", "cat compte-rendu-mars.txt", "head -n 3 adherents.csv", "tail -n 5 inscriptions.log", "wc -l adherents.csv"],
      solutionAnswers: { t2: "jeudi 7 mai", t5: "hugo", t6: "12" },
    },
    hints: [
      "Tous les fichiers sont dans le dossier `association` : entre d'abord dedans avec `cd association`.",
      "Pour la dernière question, `wc -l adherents.csv` répond directement. Note que la ligne des titres de colonnes compte aussi.",
    ],
    correction: [
      "`cat` convient au compte rendu, court. Pour le tableau des adhérents, `head -n 3` révèle la structure : une ligne de titres (`nom;prenom;ville;adhesion`) puis une ligne par personne.",
      "`tail -n 5 inscriptions.log` montre les événements les plus récents : la dernière inscription est celle de Hugo, le 20 mars à 18 h 42.",
      "`wc -l` compte 12 lignes : 11 adhérents et la ligne de titres. Ce genre de détail compte en enquête : « combien de lignes » et « combien de personnes » ne sont pas toujours le même nombre.",
    ],
    recall: {
      notion: "chemin-absolu",
      fromDay: 16,
      prompt: "Lequel de ces chemins est absolu ?",
      options: [
        { id: "a", text: "`/srv/partage/equipe`" },
        { id: "b", text: "`../projets`" },
        { id: "c", text: "`documents/impots`" },
      ],
      answer: "a",
      explanation: "Un chemin absolu commence par `/`, la racine. Les deux autres partent de ta position actuelle.",
    },
    summary: [
      "`cat` affiche tout un fichier ; `head` le début, `tail` la fin (les entrées récentes d'un journal).",
      "`-n` précise le nombre de lignes : `tail -n 5 fichier`.",
      "`wc -l` compte les lignes, utile avant d'ouvrir un gros fichier.",
    ],
  },

  {
    id: "j18",
    day: 18,
    week: 3,
    kind: "apprentissage",
    title: "Chercher du texte avec grep",
    duration: 20,
    objective: "trouver les lignes qui contiennent un mot dans un fichier ou un dossier entier, avec les options `-i`, `-n`, `-c` et `-r`.",
    notions: ["grep", "option"],
    competences: ["terminal", "journaux"],
    learn: {
      paragraphs: [
        "[[grep]] est probablement la commande la plus utile en sécurité. Elle affiche uniquement les lignes d'un fichier qui contiennent un texte donné : `grep imprimante tickets.txt`. Sur un journal de cent mille lignes, c'est la différence entre une aiguille et une botte de foin.",
        "Par défaut, grep distingue les majuscules et les minuscules : `grep imprimante` ne trouvera pas « Imprimante ». L'option `-i` ignore cette différence.",
        "Si le texte cherché contient des espaces, mets-le entre guillemets : `grep -i \"mot de passe\" tickets.txt`. Sans guillemets, le terminal croirait que « de » et « passe » sont des noms de fichiers.",
        "Trois autres options : `-n` affiche le numéro de chaque ligne trouvée, `-c` compte les lignes au lieu de les afficher, et `-r` cherche dans tous les fichiers d'un dossier : `grep -r rançon archives`. On peut les combiner : `grep -i -c \"mot de passe\" tickets.txt`.",
      ],
      example: {
        title: "la fonction Rechercher",
        paragraphs: [
          "C'est l'équivalent de Ctrl+F dans un document, mais en plus puissant : grep peut chercher dans des centaines de fichiers d'un coup, et n'affiche que les lignes qui comptent.",
        ],
      },
    },
    exercise: {
      type: "terminal",
      instructions: "Tu aides le support informatique fictif d'une entreprise. Les tickets sont dans le dossier `support`. Accomplis la mission.",
      simulation: TERMINAL_SIM,
      retry:
        "Pense à la casse : si grep ne trouve rien, ajoute `-i`. Pour un texte avec des espaces, utilise des guillemets. Pour chercher dans un dossier, ajoute `-r` et donne le nom du dossier au lieu d'un fichier.",
      user: "lea",
      host: "poste",
      home: "/home/lea",
      startDir: "/home/lea/support",
      root: FS_J18,
      tasks: [
        { id: "t1", text: "Affiche les tickets de `tickets.txt` qui contiennent le mot `Imprimante`.", check: { kind: "ran", command: "grep", outputIncludes: "ticket 112" } },
        {
          id: "t2",
          text: "Combien de tickets parlent de mot de passe, quelle que soit l'écriture (majuscules ou minuscules) ?",
          check: { kind: "answer", accept: ["4", "quatre"], placeholder: "un nombre" },
        },
        { id: "t3", text: "À quel numéro de ligne se trouve le ticket qui mentionne le VPN ? (option `-n`)", check: { kind: "answer", accept: ["9", "neuf"], placeholder: "un numéro de ligne" } },
        {
          id: "t4",
          text: "Dans le dossier `archives`, quel fichier mentionne une rançon ? (option `-r`)",
          check: { kind: "answer", accept: ["fevrier.txt", "février.txt", "fevrier", "février", "archives/fevrier.txt"], placeholder: "nom du fichier" },
        },
      ],
      solution: ["ls", "grep Imprimante tickets.txt", 'grep -i -c "mot de passe" tickets.txt', "grep -n VPN tickets.txt", "grep -r rançon archives"],
      solutionAnswers: { t2: "4", t3: "9", t4: "fevrier.txt" },
    },
    hints: [
      "Pour la question 2 : `grep -i -c \"mot de passe\" tickets.txt`. Sans `-i`, certains tickets écrits en majuscules t'échapperaient.",
      "Pour la question 4 : `grep -r rançon archives`. Le nom du fichier s'affiche au début de chaque ligne trouvée.",
    ],
    correction: [
      "`grep Imprimante tickets.txt` affiche les tickets 101, 104 et 112. Sans la majuscule, grep n'aurait rien trouvé.",
      "`grep -i -c \"mot de passe\" tickets.txt` répond 4 : les tickets 102, 106, 111 et 115, écrits de trois façons différentes. Sans `-i`, on n'en trouve qu'un. Dans un vrai journal, oublier cette option fait passer à côté d'événements.",
      "`grep -n VPN tickets.txt` indique la ligne 9. Enfin, `grep -r rançon archives` trouve `archives/fevrier.txt`, qui décrit un incident de [[rancongiciel|rançongiciel]] : des fichiers chiffrés et une demande de paiement. Remarque que le poste a été isolé du réseau, une première mesure classique.",
    ],
    recall: {
      notion: "commande",
      fromDay: 17,
      prompt: "Tu veux voir les entrées les plus récentes d'un long journal. Quelle commande choisis-tu ?",
      options: [
        { id: "a", text: "`head -n 20 journal.log`" },
        { id: "b", text: "`tail -n 20 journal.log`" },
        { id: "c", text: "`wc -l journal.log`" },
      ],
      answer: "b",
      explanation: "Les nouveaux événements s'ajoutent à la fin d'un journal : `tail` les affiche.",
    },
    summary: [
      "`grep motif fichier` n'affiche que les lignes qui contiennent le motif.",
      "`-i` ignore les majuscules, `-n` numérote, `-c` compte, `-r` cherche dans tout un dossier.",
      "Un motif avec des espaces se met entre guillemets.",
    ],
  },

  {
    id: "j19",
    day: 19,
    week: 3,
    kind: "apprentissage",
    title: "Les permissions : qui a le droit de quoi",
    duration: 20,
    objective: "lire les permissions d'un fichier avec `ls -l` et expliquer pourquoi un accès est refusé.",
    notions: ["permissions", "proprietaire", "groupe", "administrateur"],
    competences: ["terminal", "acces"],
    learn: {
      paragraphs: [
        "Sur un ordinateur partagé ou un serveur, chaque fichier a des [[permissions]] : qui peut le lire (`r`, read), le modifier (`w`, write), et l'exécuter ou, pour un dossier, y entrer (`x`).",
        "`ls -l` les affiche sous la forme `-rw-r-----`. Le premier caractère indique le type (`-` fichier, `d` dossier). Viennent ensuite trois groupes de trois lettres : les droits du [[proprietaire|propriétaire]], ceux du [[groupe]], et ceux de tous les autres. Un tiret signifie que le droit est absent.",
        "Exemple : `-rw-r----- nadia equipe compte-rendu.txt`. Nadia, la propriétaire, peut lire et modifier (`rw-`). Les membres du groupe `equipe` peuvent lire (`r--`). Les autres n'ont aucun droit (`---`).",
        "Pour savoir si **tu** peux lire un fichier, demande-toi dans quelle catégorie tu tombes : es-tu le propriétaire ? sinon, fais-tu partie de son groupe ? sinon, tu es dans « les autres ». Un seul de ces trois groupes de droits s'applique à toi.",
        "C'est la première forme de contrôle d'accès, et on la retrouvera sur les sites web en semaine 4. Le compte [[administrateur]] (root, sous Linux) contourne ces règles : c'est pourquoi il est si convoité par les attaquants. Dans cette simulation, tu es `lea`, membre des groupes `lea` et `equipe`.",
      ],
      example: {
        title: "les badges d'un immeuble de bureaux",
        paragraphs: [
          "Ton badge ouvre ton bureau (propriétaire), la salle de ton équipe (groupe), et le hall (tout le monde). Il n'ouvre pas le bureau de la direction. Le gardien, lui, a un passe qui ouvre tout : c'est l'administrateur.",
        ],
      },
    },
    exercise: {
      type: "terminal",
      instructions: "Les dossiers partagés de l'entreprise fictive sont dans `/srv`. Observe les permissions et accomplis la mission.",
      simulation: TERMINAL_SIM,
      retry:
        "Affiche les permissions avec `ls -l /srv/equipe`. Pour chaque fichier, regarde le propriétaire et le groupe, puis le bloc de trois lettres qui s'applique à `lea` (membre du groupe `equipe`).",
      user: "lea",
      groups: ["lea", "equipe"],
      host: "poste",
      home: "/home/lea",
      startDir: "/home/lea",
      root: FS_J19,
      tasks: [
        { id: "t1", text: "Affiche les permissions des fichiers de `/srv/equipe` avec `ls -l`.", check: { kind: "ran", command: "ls", outputIncludes: "rw-------" } },
        { id: "t2", text: "Qui est le propriétaire du fichier `salaires.txt` ?", check: { kind: "answer", accept: ["rh"], placeholder: "un nom d'utilisateur" } },
        { id: "t3", text: "Lis `compte-rendu.txt`. Quel est le mot de la fin ?", check: { kind: "answer", accept: ["phare"], placeholder: "un mot" } },
        {
          id: "t4",
          text: "Parmi les quatre fichiers de `/srv/equipe`, lequel est lisible par tous les utilisateurs de la machine ?",
          check: { kind: "answer", accept: ["planning.txt", "planning"], placeholder: "nom du fichier" },
        },
        {
          id: "t5",
          text: "Essaie d'entrer dans `/srv/direction`. Quelle lettre de droit te manque pour y entrer ?",
          check: { kind: "answer", accept: ["x"], placeholder: "une lettre" },
        },
      ],
      solution: ["ls -l /srv/equipe", "cd /srv/equipe", "cat compte-rendu.txt", "cat salaires.txt", "ls -l /srv", "cd /srv/direction"],
      solutionAnswers: { t2: "rh", t3: "phare", t4: "planning.txt", t5: "x" },
    },
    hints: [
      "Dans `ls -l`, la colonne qui suit les permissions est le propriétaire, la suivante le groupe.",
      "Pour qu'un fichier soit lisible par tout le monde, la lettre `r` doit apparaître dans le dernier bloc de trois caractères. Pour entrer dans un dossier, c'est le droit `x` qui compte.",
    ],
    correction: [
      "`ls -l /srv/equipe` montre quatre situations. `planning.txt` (`-rw-r--r--`) est lisible par tous. `compte-rendu.txt` (`-rw-rw----`, groupe `equipe`) est lisible par Léa grâce à son groupe. `salaires.txt` (`-rw-------`, propriétaire `rh`) n'est accessible qu'au service RH. `procedure.txt` appartient au groupe `direction`, dont Léa ne fait pas partie.",
      "`/srv/direction` est un dossier en `drwx------` : seul son propriétaire peut y entrer. Il manque à Léa le droit `x`, celui de traverser un dossier (et `r`, pour lister son contenu).",
      "Ces refus sont une bonne nouvelle : ils montrent que le principe « chacun accède seulement à ce dont il a besoin » est appliqué. Garde cette idée, elle reviendra la semaine prochaine sous le nom de moindre privilège.",
    ],
    recall: {
      notion: "grep",
      fromDay: 18,
      prompt: "`grep erreur journal.log` ne trouve rien, alors que le fichier contient « Erreur disque ». Pourquoi ?",
      options: [
        { id: "a", text: "grep distingue les majuscules : il faut l'option `-i`" },
        { id: "b", text: "grep ne lit que les fichiers `.txt`" },
        { id: "c", text: "Il faut écrire le motif en majuscules" },
      ],
      answer: "a",
      explanation: "Par défaut, « erreur » et « Erreur » sont différents pour grep. L'option `-i` ignore la casse.",
    },
    summary: [
      "`ls -l` affiche les droits : propriétaire, groupe, autres, chacun avec `r`, `w`, `x`.",
      "Un seul bloc de droits s'applique à toi : celui du propriétaire, sinon du groupe, sinon des autres.",
      "Un accès refusé est souvent le signe que les permissions font bien leur travail.",
    ],
  },

  {
    id: "j20",
    day: 20,
    week: 3,
    kind: "defi",
    title: "Défi : d'où viennent ces échecs de connexion ?",
    duration: 20,
    objective: "utiliser `cat`, `grep` et ses options pour répondre à une alerte à partir d'un journal.",
    notions: ["grep", "journal", "force-brute"],
    competences: ["terminal", "journaux", "enquete"],
    learn: {
      paragraphs: [
        "Pour ce défi, tu réunis tout ce que tu as appris cette semaine. Une alerte signale des échecs de connexion sur un compte important. Ta mission : remonter jusqu'à leur origine dans le [[journal]] des connexions.",
        "Méthode conseillée : lire l'alerte, regarder la taille du journal, puis filtrer avec grep sur le compte concerné. Une fois l'adresse suspecte repérée, filtre sur elle pour voir tout ce qu'elle a fait.",
        "Garde à l'esprit la distinction de la semaine 1 : ce que montre le journal est une observation. Des échecs répétés rapprochés évoquent une [[force-brute|attaque par force brute]], mais c'est une hypothèse que les lignes suivantes vont confirmer ou non.",
      ],
      example: {
        title: "le registre d'entrée d'un bâtiment",
        paragraphs: [
          "Un registre note chaque passage de badge. Huit badges refusés en une minute, au milieu de la nuit, puis un passage accepté : il ne faut pas être enquêteur pour s'inquiéter, mais il faut lire le registre avec méthode pour savoir ce qui s'est passé ensuite.",
        ],
      },
    },
    exercise: {
      type: "terminal",
      instructions: "Une alerte t'attend dans ton dossier personnel. Mène l'enquête dans le terminal.",
      simulation: TERMINAL_SIM,
      retry:
        "Filtre d'abord le journal sur le compte concerné avec `grep admin /var/log/auth.log`. Pour compter des lignes très précises, mets toute la phrase recherchée entre guillemets et ajoute `-c`.",
      user: "lea",
      host: "poste",
      home: "/home/lea",
      startDir: "/home/lea",
      root: FS_J20,
      tasks: [
        { id: "t1", text: "Lis l'alerte dans `alerte.txt`.", check: { kind: "ran", command: "cat", outputIncludes: "compte admin" } },
        { id: "t2", text: "Avec grep, affiche toutes les lignes de `/var/log/auth.log` qui concernent le compte admin.", check: { kind: "ran", command: "grep", outputIncludes: "utilisateur=admin" } },
        { id: "t3", text: "De quelle adresse IP viennent la plupart des échecs ?", check: { kind: "answer", accept: ["203.0.113.66"], placeholder: "une adresse IP" } },
        { id: "t4", text: "Combien d'échecs de connexion compte-t-on depuis cette adresse ?", check: { kind: "answer", accept: ["8", "huit"], placeholder: "un nombre" } },
        { id: "t5", text: "Après ces échecs, une connexion depuis cette adresse a-t-elle réussi ? Réponds oui ou non.", check: { kind: "answer", accept: ["oui"], placeholder: "oui ou non" } },
        {
          id: "t6",
          text: "Quel fichier a été lu par cette connexion ? Donne son chemin complet.",
          check: { kind: "answer", accept: ["/srv/equipe/salaires.txt", "srv/equipe/salaires.txt"], placeholder: "commence par /" },
        },
      ],
      solution: [
        "cat alerte.txt",
        "wc -l /var/log/auth.log",
        "grep admin /var/log/auth.log",
        'grep -c "echec connexion utilisateur=admin ip=203.0.113.66" /var/log/auth.log',
        "grep 203.0.113.66 /var/log/auth.log",
      ],
      solutionAnswers: { t3: "203.0.113.66", t4: "8", t5: "oui", t6: "/srv/equipe/salaires.txt" },
    },
    hints: [
      "`grep admin /var/log/auth.log` affiche toutes les lignes du compte admin. Regarde l'adresse IP en fin de ligne.",
      "`grep 203.0.113.66 /var/log/auth.log` montre tout ce qu'a fait cette adresse, dans l'ordre. Attention : un échec du compte admin provient d'une autre adresse, interne.",
    ],
    correction: [
      "Le journal montre huit échecs de connexion au compte admin entre 02:11:03 et 02:12:10, tous depuis `203.0.113.66`, une adresse extérieure, puis une connexion **réussie** à 02:12:31 et la lecture de `/srv/equipe/salaires.txt`. Huit essais en une minute, en pleine nuit, puis un succès : l'hypothèse d'une attaque par force brute réussie devient très solide.",
      "Note l'échec de la veille à 10:00, depuis `192.168.10.5`, une adresse interne, immédiatement suivi d'une réussite : c'est vraisemblablement l'administrateur qui s'est trompé de mot de passe. Un échec isolé ne signifie pas une attaque ; une série depuis l'extérieur suivie d'un succès, si.",
      "Pour compter précisément, il fallait chercher la phrase complète entre guillemets : `grep -c \"echec connexion utilisateur=admin ip=203.0.113.66\"` répond 8. Prochaine étape d'une vraie enquête : changer le mot de passe du compte admin, et prévenir le service RH que le fichier des salaires a pu être consulté.",
    ],
    recall: {
      notion: "permissions",
      fromDay: 19,
      prompt: "Un fichier a les permissions `-rw-r-----`, propriétaire marc, groupe equipe. Que peut faire un membre du groupe equipe ?",
      options: [
        { id: "a", text: "Le lire et le modifier" },
        { id: "b", text: "Le lire seulement" },
        { id: "c", text: "Rien du tout" },
      ],
      answer: "b",
      explanation: "Le bloc du milieu, `r--`, s'applique au groupe : lecture seule.",
    },
    summary: [
      "Une enquête dans un journal : lire l'alerte, filtrer sur le compte, puis sur l'adresse suspecte.",
      "Des échecs rapprochés depuis l'extérieur suivis d'un succès sont un signal fort ; un échec isolé, non.",
      "Pour compter une situation précise, cherche la phrase complète entre guillemets avec `grep -c`.",
    ],
  },

  {
    id: "j21",
    day: 21,
    week: 3,
    kind: "revision",
    title: "Révision : les commandes essentielles",
    duration: 12,
    objective: "associer chaque commande de la semaine à ce qu'elle fait, de mémoire.",
    notions: ["terminal", "chemin-relatif", "grep", "permissions"],
    competences: ["terminal"],
    learn: {
      paragraphs: [
        "En une semaine, tu as appris à te repérer (`pwd`, `ls`), à te déplacer (`cd`, `..`, `~`), à lire (`cat`, `head`, `tail`, `wc -l`), à chercher (`grep` et ses options) et à lire des [[permissions]].",
        "C'est le socle qu'utilisent au quotidien les administrateurs et les analystes en sécurité. Ils connaissent bien d'autres commandes, mais ces quelques-unes couvrent une grande partie des besoins pour explorer et lire des traces.",
        "Fais l'exercice de mémoire. Pour une commande qui résiste, retourne au jour concerné et rejoue-la dans le terminal simulé.",
      ],
      example: {
        title: "les premiers mots d'une langue",
        paragraphs: [
          "Avec une vingtaine de mots bien choisis, on se débrouille dans une ville étrangère : demander son chemin, lire un panneau, trouver une information. Ces commandes sont tes premiers mots de la langue du terminal.",
        ],
      },
    },
    exercise: {
      type: "match",
      variant: "associate",
      instructions: "Associe chaque commande à ce qu'elle fait.",
      retry: "Décompose chaque commande : son nom d'abord (que fait-il en général ?), puis ses options. `-i`, `-r`, `-n` n'ont de sens qu'avec la commande qui les précède.",
      options: [
        { id: "o1", label: "Affiche le dossier où tu te trouves" },
        { id: "o2", label: "Liste un dossier avec les permissions" },
        { id: "o3", label: "Remonte d'un niveau dans l'arborescence" },
        { id: "o4", label: "Ramène dans ton dossier personnel" },
        { id: "o5", label: "Affiche tout le contenu d'un fichier" },
        { id: "o6", label: "Affiche les 5 dernières lignes d'un fichier" },
        { id: "o7", label: "Cherche un mot sans tenir compte des majuscules" },
        { id: "o8", label: "Cherche un mot dans tous les fichiers d'un dossier" },
        { id: "o9", label: "Compte les lignes d'un fichier" },
      ],
      items: [
        { id: "c1", text: "pwd", mono: true, answer: "o1", why: "print working directory : le dossier courant." },
        { id: "c2", text: "ls -l", mono: true, answer: "o2", why: "L'option `-l` ajoute les détails, dont les permissions." },
        { id: "c3", text: "cd ..", mono: true, answer: "o3", why: "`..` désigne le dossier parent." },
        { id: "c4", text: "cd ~", mono: true, answer: "o4", why: "`~` est ton dossier personnel ; `cd` seul fait la même chose." },
        { id: "c5", text: "cat notes.txt", mono: true, answer: "o5", why: "cat affiche le fichier en entier." },
        { id: "c6", text: "tail -n 5 journal.log", mono: true, answer: "o6", why: "tail montre la fin d'un fichier, ici 5 lignes." },
        { id: "c7", text: "grep -i erreur journal.log", mono: true, answer: "o7", why: "`-i` ignore la différence entre majuscules et minuscules." },
        { id: "c8", text: "grep -r rançon archives", mono: true, answer: "o8", why: "`-r` parcourt tous les fichiers du dossier." },
        { id: "c9", text: "wc -l adherents.csv", mono: true, answer: "o9", why: "wc -l compte les lignes." },
      ],
    },
    hints: [
      "Trois commandes commencent par `cd` ou concernent le dossier courant : elles parlent de position, pas de contenu.",
      "Les deux commandes grep diffèrent par leur option : `-i` pour la casse, `-r` pour un dossier entier.",
    ],
    correction: [
      "Se repérer : `pwd`, `ls -l`. Se déplacer : `cd ..`, `cd ~`. Lire : `cat`, `tail -n 5`, `wc -l`. Chercher : `grep -i`, `grep -r`.",
      "Si l'une d'elles t'a résisté, note-la dans « Ce que je veux revoir » : elle reviendra en semaine 5, lors de l'enquête dans les journaux, et en semaine 6.",
    ],
    recall: {
      notion: "force-brute",
      fromDay: 20,
      prompt: "Huit échecs de connexion en une minute depuis une même adresse extérieure, puis une réussite. Quelle hypothèse est la plus solide ?",
      options: [
        { id: "a", text: "Une attaque par force brute qui a fini par trouver le mot de passe" },
        { id: "b", text: "Une panne du serveur" },
        { id: "c", text: "Une simple faute de frappe de l'administrateur" },
      ],
      answer: "a",
      explanation: "La série rapide depuis l'extérieur, suivie d'un succès, correspond au schéma de la force brute. Une faute de frappe produit un échec isolé.",
    },
    summary: [
      "Se repérer et se déplacer : `pwd`, `ls`, `cd`, avec `..` et `~`.",
      "Lire : `cat`, `head`, `tail`, `wc -l`. Chercher : `grep` avec `-i`, `-n`, `-c`, `-r`.",
      "`ls -l` révèle qui a le droit de lire, modifier ou entrer.",
    ],
  },
];

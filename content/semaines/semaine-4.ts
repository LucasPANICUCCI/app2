import type { Session } from "../types";

/** Semaine 4 : Comprendre la sécurité des sites. */
export const SEMAINE_4: Session[] = [
  {
    id: "j22",
    day: 22,
    week: 4,
    kind: "apprentissage",
    title: "Ce que se disent ton navigateur et un site",
    duration: 18,
    objective: "reconnaître les parties d'une requête et d'une réponse HTTP, et lire un code de statut.",
    notions: ["http", "methode-http", "en-tete", "code-statut", "requete", "reponse"],
    competences: ["web"],
    learn: {
      paragraphs: [
        "Au jour 2, tu as vu que le navigateur envoie des requêtes et que le serveur répond. Regardons maintenant ces messages de près. Ils suivent les règles du protocole [[http|HTTP]], et ce sont de simples lignes de texte.",
        "Une requête commence par une ligne qui contient la [[methode-http|méthode]] et le chemin : `GET /horaires HTTP/1.1`. GET sert à lire une page ; POST sert à envoyer des données, par exemple un formulaire de connexion. Suivent des [[en-tete|en-têtes]], sous la forme `Nom: valeur` : `Host` (le site visé), `User-Agent` (le navigateur utilisé), `Cookie` (on y vient demain). Pour un POST, les données du formulaire forment le corps de la requête.",
        "La réponse commence par une ligne de statut, avec un [[code-statut|code]] : `200` tout va bien, `301` la page a déménagé, `401` il faut s'identifier, `403` c'est interdit, `404` la page n'existe pas, `500` le serveur a rencontré une erreur. Viennent ensuite des en-têtes (`Content-Type` indique le type de contenu), puis le corps : la page elle-même.",
        "Un principe fondamental découle de cette mécanique : **tout ce qu'envoie le navigateur peut être modifié par la personne qui l'utilise**. Les outils intégrés aux navigateurs permettent de voir et de rejouer des requêtes. Un site sérieux ne fait donc jamais confiance aux données reçues : il vérifie tout, côté serveur.",
      ],
      example: {
        title: "le bon de commande",
        paragraphs: [
          "Une requête, c'est un bon de commande : ce que tu veux (méthode et chemin), des précisions dans les cases (en-têtes) et parfois un contenu joint (corps). La réponse, c'est le bordereau de livraison : un tampon « livré », « adresse inconnue » ou « refusé » (le code), puis le colis.",
          "Et comme pour un bon papier, celui qui le remplit peut écrire ce qu'il veut dans les cases : c'est au magasin de vérifier.",
        ],
      },
    },
    exercise: {
      type: "match",
      variant: "categorize",
      instructions: "Voici des lignes extraites d'échanges entre un navigateur et un site fictif. Range chacune dans la bonne catégorie.",
      simulation: "Ces échanges sont fictifs et simplifiés.",
      retry:
        "Regarde le début de chaque ligne. Une méthode (GET, POST) suivie d'un chemin ouvre une requête. `HTTP/1.1` suivi d'un nombre ouvre une réponse. `Nom: valeur` est un en-tête. Le reste est du contenu.",
      options: [
        { id: "req", label: "Ligne de requête", description: "Méthode et chemin demandé." },
        { id: "hdr", label: "En-tête", description: "Une information « Nom: valeur »." },
        { id: "stat", label: "Ligne de statut", description: "Le code de la réponse." },
        { id: "body", label: "Corps", description: "Le contenu transmis." },
      ],
      items: [
        { id: "l1", text: "GET /horaires HTTP/1.1", mono: true, answer: "req", why: "La méthode GET et le chemin `/horaires` : on demande à lire une page." },
        { id: "l2", text: "Host: www.mediatheque-exemple.test", mono: true, answer: "hdr", why: "L'en-tête Host indique le site visé, utile quand un serveur en héberge plusieurs (jour 4)." },
        { id: "l3", text: "User-Agent: Firefox/140.0", mono: true, answer: "hdr", why: "Le navigateur se présente. Cette valeur se modifie facilement : elle ne prouve rien." },
        { id: "l4", text: "HTTP/1.1 200 OK", mono: true, answer: "stat", why: "Le code 200 : la requête a réussi." },
        { id: "l5", text: "Content-Type: text/html; charset=utf-8", mono: true, answer: "hdr", why: "Le serveur annonce une page HTML encodée en UTF-8." },
        { id: "l6", text: "<h1>Horaires de la médiathèque</h1>", mono: true, answer: "body", why: "Le contenu de la page, que le navigateur va afficher." },
        { id: "l7", text: "POST /connexion HTTP/1.1", mono: true, answer: "req", why: "POST envoie des données : ici, un formulaire de connexion." },
        { id: "l8", text: "identifiant=lea&motdepasse=••••••", mono: true, answer: "body", why: "Le corps de la requête POST : les champs du formulaire. HTTPS les protège en chemin." },
        { id: "l9", text: "HTTP/1.1 404 Not Found", mono: true, answer: "stat", why: "Le code 404 : la page demandée n'existe pas." },
      ],
    },
    hints: [
      "Trois catégories se reconnaissent au premier mot de la ligne : une méthode, `HTTP/1.1`, ou un nom suivi de deux-points.",
      "Le corps d'une requête POST contient les champs du formulaire, sous la forme `champ=valeur&autre=valeur`.",
    ],
    correction: [
      "Une requête : une ligne `MÉTHODE /chemin`, des en-têtes, parfois un corps. Une réponse : une ligne de statut avec un code, des en-têtes, puis le corps.",
      "Retiens les codes les plus courants : 200 (réussi), 404 (introuvable), 403 (interdit), 401 (identification requise), 500 (erreur du serveur). Tu les retrouveras dans les journaux de la semaine prochaine.",
      "Note que des en-têtes comme `User-Agent` sont déclarés par le navigateur lui-même : ils renseignent, mais ne prouvent rien, puisqu'ils peuvent être modifiés.",
    ],
    recall: {
      notion: "journal",
      fromDay: 20,
      prompt: "Dans un fichier journal, où trouve-t-on habituellement les événements les plus récents ?",
      options: [
        { id: "a", text: "Au début du fichier" },
        { id: "b", text: "À la fin du fichier" },
        { id: "c", text: "Dans un fichier caché séparé" },
      ],
      answer: "b",
      explanation: "Chaque nouvel événement est ajouté en bas : c'est pourquoi `tail` est si utile.",
    },
    summary: [
      "Une requête HTTP : méthode et chemin (GET pour lire, POST pour envoyer), en-têtes, parfois un corps.",
      "Une réponse : un code de statut (200, 404, 403…), des en-têtes, puis le contenu.",
      "Tout ce qu'envoie le navigateur peut être modifié : le serveur doit tout vérifier.",
    ],
  },

  {
    id: "j23",
    day: 23,
    week: 4,
    kind: "apprentissage",
    title: "Les cookies : la mémoire que le site te confie",
    duration: 18,
    objective: "lire un cookie, comprendre ses principaux réglages, et distinguer un cookie de session d'un cookie tiers.",
    notions: ["cookie", "cookie-tiers", "identifiant-session"],
    competences: ["web"],
    learn: {
      paragraphs: [
        "HTTP n'a pas de mémoire : chaque requête est indépendante. Pour se souvenir de toi d'une page à l'autre, un site utilise des [[cookie|cookies]]. Dans sa réponse, il envoie un en-tête `Set-Cookie: langue=fr`. Le navigateur range cette valeur, puis la renvoie automatiquement, dans l'en-tête `Cookie`, à chaque requête vers ce même site.",
        "Les cookies servent à beaucoup de choses : ta langue, ton panier, et surtout ta connexion. Le cookie le plus précieux est celui qui contient ton [[identifiant-session|identifiant de session]], un long code aléatoire qui prouve au site que tu t'es déjà connecté.",
        "Un cookie peut porter des réglages. `Max-Age` fixe sa durée de vie en secondes. `Secure` interdit de l'envoyer sans HTTPS. `HttpOnly` empêche les scripts de la page de le lire, ce qui complique son vol. `SameSite` limite son envoi depuis d'autres sites.",
        "Un [[cookie-tiers|cookie tiers]] est déposé par un autre domaine que celui que tu visites, par exemple une régie publicitaire dont les images sont présentes sur des milliers de sites. Il sert surtout à te suivre d'un site à l'autre. C'est l'objet des bandeaux de consentement que tu vois partout.",
      ],
      example: {
        title: "le ticket de vestiaire",
        paragraphs: [
          "Au vestiaire d'un théâtre, on te donne un ticket numéroté. Tu ne montres plus ta carte d'identité : tu présentes le ticket, et on te rend ton manteau. Le cookie de session, c'est ce ticket.",
          "Quiconque trouve ton ticket peut récupérer ton manteau. D'où les réglages qui évitent de le perdre ou de se le faire subtiliser.",
        ],
      },
    },
    exercise: {
      type: "choice",
      instructions: "Tu visites le site fictif d'une médiathèque. Voici les cookies que ton navigateur a reçus. Réponds aux questions.",
      simulation: "Ces cookies et ces sites sont fictifs.",
      retry: "Relis chaque ligne `Set-Cookie` : son nom, sa valeur, puis ses réglages après les points-virgules. Une durée `Max-Age` s'exprime en secondes : un jour en compte 86 400.",
      questions: [
        {
          id: "q1",
          prompt: "Lequel de ces cookies permet au site de te reconnaître comme connecté ?",
          context:
            "Réponse de www.mediatheque-exemple.test :\nSet-Cookie: session=4b1e9a72d0c3f8e1; Secure; HttpOnly; SameSite=Lax\nSet-Cookie: langue=fr; Max-Age=31536000\nSet-Cookie: panier=3-livres; Max-Age=86400\n\nRéponse de regie-pub.test (une image publicitaire de la page) :\nSet-Cookie: suivi=a91f07; Max-Age=34128000",
          options: [
            { id: "a", text: "session" },
            { id: "b", text: "langue" },
            { id: "c", text: "panier" },
            { id: "d", text: "suivi" },
          ],
          answers: ["a"],
          explanation: "Le cookie `session` contient un identifiant long et aléatoire. Il est d'ailleurs bien protégé : `Secure`, `HttpOnly` et `SameSite`.",
        },
        {
          id: "q2",
          prompt: "Combien de temps le cookie `langue` est-il conservé ?",
          options: [
            { id: "a", text: "Jusqu'à la fermeture du navigateur" },
            { id: "b", text: "Un jour" },
            { id: "c", text: "Un an" },
          ],
          answers: ["c"],
          explanation: "31 536 000 secondes font 365 jours. Le panier, lui, dure 86 400 secondes, soit un jour.",
        },
        {
          id: "q3",
          prompt: "Le cookie `suivi` est déposé par regie-pub.test alors que tu visites la médiathèque. Comment l'appelle-t-on ?",
          options: [
            { id: "a", text: "Un cookie de session" },
            { id: "b", text: "Un cookie tiers" },
            { id: "c", text: "Un cookie sécurisé" },
          ],
          answers: ["b"],
          explanation: "Il vient d'un autre domaine que celui que tu visites : c'est un cookie tiers, typique du suivi publicitaire.",
        },
        {
          id: "q4",
          prompt: "Quelqu'un récupère la valeur `4b1e9a72d0c3f8e1` du cookie de session. Que peut-il faire ?",
          options: [
            { id: "a", text: "Rien sans ton mot de passe." },
            { id: "b", text: "Se faire passer pour toi sur le site, tant que la session est valide." },
            { id: "c", text: "Changer ton adresse IP." },
          ],
          answers: ["b"],
          explanation: "L'identifiant de session remplace le mot de passe pour toute la durée de la session. Le voler, c'est entrer sans connaître le mot de passe, et même sans double authentification.",
        },
      ],
    },
    hints: [
      "Le cookie de connexion est celui qui porte le plus de réglages de protection.",
      "Pour la durée : 86 400 secondes, c'est 24 heures. Combien fait 31 536 000 divisé par 86 400 ?",
    ],
    correction: [
      "Le cookie `session` est celui qui te garde connecté, et ses réglages le protègent : envoyé seulement en HTTPS (`Secure`), illisible par les scripts de la page (`HttpOnly`), limité depuis les autres sites (`SameSite`).",
      "`langue` dure un an, `panier` un jour. `suivi` est un cookie tiers déposé par une régie publicitaire : il ne sert pas au fonctionnement du site.",
      "Le point clé : l'identifiant de session vaut, le temps de la session, autant que ton mot de passe. C'est ce qui rend son vol intéressant pour un attaquant, et la déconnexion utile.",
    ],
    recall: {
      notion: "code-statut",
      fromDay: 22,
      prompt: "Une réponse commence par `HTTP/1.1 404 Not Found`. Que s'est-il passé ?",
      options: [
        { id: "a", text: "La page demandée n'existe pas" },
        { id: "b", text: "L'accès est interdit" },
        { id: "c", text: "Le serveur est en panne" },
      ],
      answer: "a",
      explanation: "404 : introuvable. Un accès interdit renverrait 403, une erreur du serveur 500.",
    },
    summary: [
      "Le site dépose un cookie avec `Set-Cookie`, le navigateur le renvoie à chaque requête vers ce site.",
      "Le cookie de session vaut ton mot de passe tant que la session dure ; `Secure` et `HttpOnly` le protègent.",
      "Un cookie tiers vient d'un autre domaine et sert surtout au suivi d'un site à l'autre.",
    ],
  },

  {
    id: "j24",
    day: 24,
    week: 4,
    kind: "apprentissage",
    title: "Les sessions : comment un site se souvient de toi",
    duration: 15,
    objective: "décrire le cycle de vie d'une session, de la connexion à la déconnexion, et ce que change la déconnexion.",
    notions: ["session", "identifiant-session", "cookie"],
    competences: ["web", "acces"],
    learn: {
      paragraphs: [
        "Une [[session]] commence quand tu te connectes et se termine quand tu te déconnectes, ou quand elle expire. Entre les deux, le site te reconnaît grâce à l'[[identifiant-session|identifiant de session]] rangé dans un [[cookie]].",
        "Côté serveur, le site tient une liste des sessions ouvertes : tel identifiant correspond à telle personne, connectée depuis telle heure. Quand une requête arrive avec un cookie de session, le serveur consulte cette liste.",
        "Se déconnecter, c'est demander au serveur de **rayer la session de sa liste**. Le cookie peut rester dans le navigateur, il ne sert plus à rien. Fermer simplement l'onglet, en revanche, laisse souvent la session ouverte. Sur un ordinateur partagé ou public, la déconnexion est donc indispensable.",
        "Pour limiter les risques, les sites sérieux font expirer les sessions inactives, recréent un nouvel identifiant à chaque connexion, et proposent souvent « se déconnecter de tous les appareils ». Cette option est précieuse si tu soupçonnes qu'un appareil ou un cookie t'a échappé.",
      ],
      example: {
        title: "le bracelet d'un festival",
        paragraphs: [
          "À l'entrée d'un festival, on vérifie ton billet une fois et on te pose un bracelet. Ensuite, tu entres et sors sans remontrer ton billet : le bracelet suffit. À la fin du festival, les bracelets sont désactivés.",
          "Si on te coupait ton bracelet pour le porter, l'agent de sécurité laisserait passer cette personne : il ne vérifie que le bracelet.",
        ],
      },
    },
    exercise: {
      type: "order",
      variant: "steps",
      instructions: "Remets dans l'ordre les étapes d'une session sur un site, de la connexion à la déconnexion.",
      retry:
        "Le serveur ne peut créer une session qu'après avoir vérifié qui tu es, et le navigateur ne peut renvoyer un cookie qu'il n'a pas encore reçu. La déconnexion termine toujours le cycle.",
      items: [
        { id: "s1", text: "Tu saisis ton identifiant et ton mot de passe dans le formulaire de connexion.", note: "Tout commence par ta preuve d'identité." },
        { id: "s2", text: "Le navigateur envoie ces informations au serveur dans une requête POST, protégée par HTTPS.", note: "Le corps de la requête contient les champs du formulaire." },
        { id: "s3", text: "Le serveur vérifie le mot de passe, puis le code de double authentification.", note: "C'est l'authentification." },
        { id: "s4", text: "Le serveur crée une session et un identifiant long et aléatoire.", note: "Il l'ajoute à sa liste des sessions ouvertes." },
        { id: "s5", text: "La réponse contient `Set-Cookie` : le navigateur range l'identifiant de session.", note: "Le ticket de vestiaire est remis." },
        { id: "s6", text: "À chaque page suivante, le navigateur renvoie le cookie et le serveur te reconnaît.", note: "Plus besoin de ressaisir ton mot de passe." },
        { id: "s7", text: "Tu cliques sur « Se déconnecter » : le serveur supprime la session de sa liste.", note: "Le cookie ne sert plus à rien, même s'il reste dans le navigateur." },
      ],
    },
    hints: [
      "Les trois premières étapes concernent la vérification de ton identité ; les suivantes, ce qui se passe une fois que le site sait qui tu es.",
      "Le cookie est d'abord fabriqué par le serveur, puis envoyé dans une réponse, et seulement ensuite renvoyé par le navigateur.",
    ],
    correction: [
      "Le cycle est toujours le même : prouver qui tu es une fois, recevoir un identifiant de session, le présenter ensuite à chaque requête, jusqu'à ce que le serveur l'efface.",
      "Deux conséquences pratiques. Fermer l'onglet ne déconnecte pas : clique sur « Se déconnecter », surtout sur un ordinateur partagé. Et si tu as un doute sur un appareil perdu ou prêté, utilise « se déconnecter de tous les appareils » : toutes les sessions sont effacées côté serveur.",
    ],
    recall: {
      notion: "cookie",
      fromDay: 23,
      prompt: "Que fait le navigateur d'un cookie reçu d'un site ?",
      options: [
        { id: "a", text: "Il l'affiche dans la page" },
        { id: "b", text: "Il le renvoie automatiquement à chaque requête vers ce site" },
        { id: "c", text: "Il l'envoie à tous les sites visités" },
      ],
      answer: "b",
      explanation: "Un cookie est renvoyé au site qui l'a déposé, à chaque requête, dans l'en-tête `Cookie`.",
    },
    summary: [
      "Après la connexion, le site te reconnaît grâce à l'identifiant de session stocké dans un cookie.",
      "Se déconnecter efface la session côté serveur ; fermer l'onglet ne suffit pas.",
      "« Se déconnecter de tous les appareils » efface toutes tes sessions ouvertes.",
    ],
  },

  {
    id: "j25",
    day: 25,
    week: 4,
    kind: "apprentissage",
    title: "Authentification et autorisation",
    duration: 18,
    objective: "distinguer « qui es-tu ? » de « qu'as-tu le droit de faire ? » et prévoir la décision d'un site selon le rôle de chacun.",
    notions: ["authentification", "autorisation", "role"],
    competences: ["acces"],
    learn: {
      paragraphs: [
        "Deux questions distinctes se posent à chaque requête. L'[[authentification]] répond à « qui es-tu ? » : c'est le mot de passe, la double authentification, puis la session. L'[[autorisation]] répond à « as-tu le droit de faire ça ? ».",
        "Être authentifié ne donne pas tous les droits. Pour éviter de régler les droits personne par personne, on regroupe les permissions en [[role|rôles]] : un bénévole peut lire le planning, un coordinateur peut aussi le modifier, un administrateur peut tout faire. Chaque personne reçoit un rôle.",
        "Une demande est autorisée seulement si les deux vérifications passent : on sait qui fait la demande, et son rôle comprend l'action demandée. Une personne non connectée échoue dès la première question : le site ne sait pas qui elle est. Une personne connectée sans le bon rôle échoue à la seconde, avec le code `403` (interdit).",
        "En sécurité, la plupart des failles graves des sites viennent d'autorisations mal vérifiées, bien plus que d'authentifications contournées. On le verra dans le défi de samedi.",
      ],
      example: {
        title: "l'hôtel",
        paragraphs: [
          "À la réception d'un hôtel, on vérifie ton identité et on te remet une carte : c'est l'authentification. Ta carte ouvre ta chambre et la salle de sport, pas la chambre d'à côté ni la cuisine : c'est l'autorisation. Le personnel d'entretien a une carte différente, avec un autre rôle.",
        ],
      },
    },
    exercise: {
      type: "access",
      mode: "predict",
      instructions: "Voici les droits configurés sur l'espace en ligne fictif d'une association. Pour chaque demande, prévois la décision du site, puis compare avec la simulation.",
      retry:
        "Pour chaque demande, pose les deux questions dans l'ordre : sait-on qui fait la demande ? Si oui, son rôle a-t-il une coche pour cette ressource et cette action dans le tableau ?",
      roles: [
        { id: "visiteur", label: "Visiteur", description: "personne non connectée : le site ne sait pas qui elle est." },
        { id: "benevole", label: "Bénévole", description: "consulte le planning des permanences." },
        { id: "coordinateur", label: "Coordinateur", description: "organise le planning et contacte les adhérents." },
        { id: "admin", label: "Administratrice", description: "gère tout l'espace, y compris ses réglages." },
      ],
      users: [
        { id: "anonyme", name: "Un visiteur non connecté", role: "visiteur" },
        { id: "ines", name: "Inès", role: "benevole" },
        { id: "karim", name: "Karim", role: "coordinateur" },
        { id: "nadia", name: "Nadia", role: "admin" },
      ],
      resources: [
        { id: "planning", label: "le planning" },
        { id: "adherents", label: "le fichier des adhérents" },
        { id: "reglages", label: "les réglages du site" },
      ],
      actions: ["lire", "modifier", "supprimer"],
      perms: {
        visiteur: [],
        benevole: ["planning:lire"],
        coordinateur: ["planning:lire", "planning:modifier", "adherents:lire"],
        admin: [
          "planning:lire",
          "planning:modifier",
          "planning:supprimer",
          "adherents:lire",
          "adherents:modifier",
          "adherents:supprimer",
          "reglages:lire",
          "reglages:modifier",
          "reglages:supprimer",
        ],
      },
      requests: [
        { id: "r1", userId: "ines", action: "lire", resourceId: "planning", why: "Inès est authentifiée et le rôle Bénévole permet de lire le planning." },
        { id: "r2", userId: "ines", action: "modifier", resourceId: "planning", why: "Authentifiée, mais son rôle ne permet que la lecture : refus (code 403)." },
        { id: "r3", userId: "karim", action: "modifier", resourceId: "planning", why: "Le rôle Coordinateur comprend la modification du planning." },
        { id: "r4", userId: "karim", action: "lire", resourceId: "adherents", why: "Le coordinateur peut lire le fichier des adhérents pour les contacter." },
        { id: "r5", userId: "karim", action: "supprimer", resourceId: "adherents", why: "Lire n'est pas supprimer : ce droit est réservé à l'administratrice." },
        { id: "r6", userId: "nadia", action: "modifier", resourceId: "reglages", why: "L'administratrice a tous les droits." },
        { id: "r7", userId: "anonyme", action: "lire", resourceId: "planning", why: "Le visiteur n'est pas authentifié : le site ne sait pas qui il est, il n'a aucun droit." },
        { id: "r8", userId: "ines", action: "lire", resourceId: "adherents", why: "Le rôle Bénévole ne donne pas accès aux données personnelles des adhérents." },
      ],
    },
    hints: [
      "Le tableau ne laisse aucune place à l'interprétation : une coche, c'est autorisé ; pas de coche, c'est refusé.",
      "Le visiteur non connecté n'a aucune coche : il échoue avant même la question des droits.",
    ],
    correction: [
      "Quatre demandes sont autorisées (Inès lit le planning, Karim modifie le planning et lit les adhérents, Nadia modifie les réglages) et quatre sont refusées.",
      "Les refus n'ont pas tous la même cause. Le visiteur échoue à l'authentification : le site ne sait pas qui il est. Inès et Karim, eux, sont bien authentifiés, mais leur rôle ne comprend pas l'action demandée : c'est un refus d'autorisation.",
      "Cette distinction aide à diagnostiquer : une erreur 401 invite à se connecter, une erreur 403 signifie « je sais qui tu es, et la réponse est non ».",
    ],
    recall: {
      notion: "identifiant-session",
      fromDay: 24,
      prompt: "Pourquoi faut-il cliquer sur « Se déconnecter » sur un ordinateur public, plutôt que fermer l'onglet ?",
      options: [
        { id: "a", text: "Parce que la déconnexion efface la session côté serveur" },
        { id: "b", text: "Parce que fermer l'onglet efface le mot de passe" },
        { id: "c", text: "Ce n'est pas nécessaire" },
      ],
      answer: "a",
      explanation: "Fermer l'onglet laisse souvent la session ouverte : la personne suivante pourrait reprendre ta place.",
    },
    summary: [
      "Authentification : qui es-tu ? Autorisation : as-tu le droit de faire ça ?",
      "Les rôles regroupent les permissions ; une demande passe seulement si les deux vérifications réussissent.",
      "401 invite à se connecter ; 403 refuse une personne connectée qui n'a pas le droit.",
    ],
  },

  {
    id: "j26",
    day: 26,
    week: 4,
    kind: "apprentissage",
    title: "Le moindre privilège : régler les droits au plus juste",
    duration: 20,
    objective: "configurer les droits de plusieurs rôles en respectant le principe du moindre privilège.",
    notions: ["moindre-privilege", "role", "autorisation"],
    competences: ["acces"],
    learn: {
      paragraphs: [
        "Le [[moindre-privilege|principe du moindre privilège]] dit que chacun doit avoir exactement les droits nécessaires à son travail, et pas davantage.",
        "Pourquoi ? Parce que chaque droit inutile élargit les dégâts possibles. Si le compte d'un préparateur de commandes est piraté, mieux vaut qu'il ne puisse pas lire les factures ni modifier le catalogue. Le moindre privilège limite aussi les erreurs de manipulation : on ne peut pas supprimer par mégarde ce à quoi on n'a pas accès.",
        "En pratique, on part de ce que chacun doit faire, on accorde ces droits-là, puis on vérifie que les accès qui doivent rester fermés le sont bien. Un réflexe utile s'y ajoute : séparer les tâches sensibles. Celui qui commande ne devrait pas aussi valider les paiements.",
        "Le piège courant, c'est la facilité : « donnons tous les droits à tout le monde, ce sera plus simple ». C'est vrai le premier jour, et c'est un risque tous les jours suivants.",
      ],
      example: {
        title: "les clés d'une boulangerie",
        paragraphs: [
          "L'apprenti a la clé de l'atelier, la vendeuse celle de la caisse, la comptable celle du bureau. Personne n'a besoin de toutes. Si l'apprenti perd son trousseau, la caisse reste fermée.",
        ],
      },
      callout: {
        title: "Pour cet exercice",
        text: "Au départ, tous les rôles ont tous les droits. Décoche ce qui n'est pas nécessaire, lance la simulation, et ajuste jusqu'à ce que toutes les demandes soient conformes, sans droit superflu.",
      },
    },
    exercise: {
      type: "access",
      mode: "configure",
      instructions: "Configure les droits de la boutique en ligne fictive pour que chaque demande obtienne la bonne réponse, sans aucun droit superflu.",
      retry:
        "Reprends la liste des demandes : chaque « doit pouvoir » correspond à exactement une coche à garder ; tout le reste doit être décoché. Le message sous la liste indique les droits encore superflus.",
      roles: [
        { id: "preparateur", label: "Préparateur", description: "prépare et expédie les commandes." },
        { id: "comptable", label: "Comptable", description: "établit et corrige les factures, rapproche les commandes et les paiements." },
        { id: "gerant", label: "Gérant", description: "fait évoluer le catalogue et suit l'activité." },
      ],
      users: [
        { id: "hugo", name: "Hugo", role: "preparateur" },
        { id: "samia", name: "Samia", role: "comptable" },
        { id: "marc", name: "Marc", role: "gerant" },
      ],
      resources: [
        { id: "commandes", label: "les commandes" },
        { id: "factures", label: "les factures" },
        { id: "catalogue", label: "le catalogue" },
      ],
      actions: ["lire", "modifier"],
      perms: {
        preparateur: ["commandes:lire", "commandes:modifier", "factures:lire", "factures:modifier", "catalogue:lire", "catalogue:modifier"],
        comptable: ["commandes:lire", "commandes:modifier", "factures:lire", "factures:modifier", "catalogue:lire", "catalogue:modifier"],
        gerant: ["commandes:lire", "commandes:modifier", "factures:lire", "factures:modifier", "catalogue:lire", "catalogue:modifier"],
      },
      scenarios: [
        { id: "s1", text: "Hugo doit pouvoir lire les commandes.", userId: "hugo", action: "lire", resourceId: "commandes", expected: true },
        { id: "s2", text: "Hugo doit pouvoir modifier une commande (la marquer « expédiée »).", userId: "hugo", action: "modifier", resourceId: "commandes", expected: true },
        { id: "s3", text: "Hugo doit pouvoir lire le catalogue pour trouver les articles.", userId: "hugo", action: "lire", resourceId: "catalogue", expected: true },
        { id: "s4", text: "Hugo ne doit pas pouvoir lire les factures.", userId: "hugo", action: "lire", resourceId: "factures", expected: false },
        { id: "s5", text: "Hugo ne doit pas pouvoir modifier le catalogue.", userId: "hugo", action: "modifier", resourceId: "catalogue", expected: false },
        { id: "s6", text: "Samia doit pouvoir lire les factures.", userId: "samia", action: "lire", resourceId: "factures", expected: true },
        { id: "s7", text: "Samia doit pouvoir corriger une facture.", userId: "samia", action: "modifier", resourceId: "factures", expected: true },
        { id: "s8", text: "Samia doit pouvoir lire les commandes.", userId: "samia", action: "lire", resourceId: "commandes", expected: true },
        { id: "s9", text: "Samia ne doit pas pouvoir modifier les commandes.", userId: "samia", action: "modifier", resourceId: "commandes", expected: false },
        { id: "s10", text: "Marc doit pouvoir modifier le catalogue.", userId: "marc", action: "modifier", resourceId: "catalogue", expected: true },
        { id: "s11", text: "Marc doit pouvoir lire le catalogue.", userId: "marc", action: "lire", resourceId: "catalogue", expected: true },
        { id: "s12", text: "Marc doit pouvoir lire les factures pour suivre l'activité.", userId: "marc", action: "lire", resourceId: "factures", expected: true },
        { id: "s13", text: "Marc doit pouvoir lire les commandes.", userId: "marc", action: "lire", resourceId: "commandes", expected: true },
        { id: "s14", text: "Marc ne doit pas pouvoir modifier les factures (séparation des tâches).", userId: "marc", action: "modifier", resourceId: "factures", expected: false },
      ],
      solutionPerms: {
        preparateur: ["commandes:lire", "commandes:modifier", "catalogue:lire"],
        comptable: ["factures:lire", "factures:modifier", "commandes:lire"],
        gerant: ["catalogue:lire", "catalogue:modifier", "factures:lire", "commandes:lire"],
      },
      solutionNote:
        "Configuration minimale : le préparateur lit et modifie les commandes et lit le catalogue ; la comptable lit et corrige les factures et lit les commandes ; le gérant lit et modifie le catalogue, et lit les commandes et les factures. Tous les autres droits sont superflus.",
    },
    hints: [
      "Commence par tout décocher mentalement, puis ne garde que les coches qui correspondent à une phrase « doit pouvoir ».",
      "Chaque rôle garde trois ou quatre droits au total. Le gérant ne modifie ni les commandes ni les factures.",
    ],
    correction: [
      "La bonne configuration ne garde que dix droits sur dix-huit. Chaque rôle peut faire son travail, et rien d'autre.",
      "Remarque la séparation des tâches : le gérant consulte les factures sans pouvoir les modifier, la comptable consulte les commandes sans pouvoir en changer le statut. Ainsi, une seule personne ne peut pas à la fois créer et maquiller une opération.",
      "Dans la vraie vie, ces droits se revoient régulièrement : quand quelqu'un change de poste, ses anciens droits doivent disparaître. Les droits qui s'accumulent au fil des années sont une faiblesse classique.",
    ],
    recall: {
      notion: "autorisation",
      fromDay: 25,
      prompt: "Karim est bien connecté, mais le site refuse qu'il supprime le fichier des adhérents. De quelle vérification s'agit-il ?",
      options: [
        { id: "a", text: "L'authentification" },
        { id: "b", text: "L'autorisation" },
        { id: "c", text: "Le chiffrement" },
      ],
      answer: "b",
      explanation: "On sait qui il est (authentification réussie) ; c'est son droit d'agir qui manque (autorisation).",
    },
    summary: [
      "Le moindre privilège : exactement les droits nécessaires, pas davantage.",
      "Chaque droit inutile élargit les dégâts possibles en cas de piratage ou d'erreur.",
      "Séparer les tâches sensibles empêche une seule personne de tout faire.",
    ],
  },

  {
    id: "j27",
    day: 27,
    week: 4,
    kind: "defi",
    title: "Défi : la facture de quelqu'un d'autre",
    duration: 20,
    objective: "analyser une faille de contrôle d'accès à partir d'indices, et proposer la bonne correction.",
    notions: ["controle-acces", "autorisation", "authentification", "observation", "hypothese"],
    competences: ["acces", "web", "enquete", "journaux"],
    learn: {
      paragraphs: [
        "Ce défi porte sur une faille très répandue. Beaucoup de sites affichent un élément grâce à un numéro dans l'adresse : `/factures/1041`. Que se passe-t-il si quelqu'un remplace 1041 par 1042 ?",
        "Si le site vérifie seulement que la personne est connectée (authentification), sans vérifier que la facture 1042 lui appartient (autorisation), il affichera la facture d'un autre client. Le [[controle-acces|contrôle d'accès]] doit se faire côté serveur, pour chaque élément demandé.",
        "Tu vas aussi appliquer la méthode de la semaine 1 : séparer ce que montrent les traces de ce qu'on suppose, en particulier sur les intentions des personnes.",
      ],
      example: {
        title: "les casiers de la piscine",
        paragraphs: [
          "Imagine des casiers numérotés dont la serrure s'ouvre avec n'importe quel bracelet de la piscine. Être client (authentifié) suffit pour ouvrir le casier 42, même si c'est celui de quelqu'un d'autre. Il manque une vérification : ce bracelet correspond-il à ce casier ?",
        ],
      },
    },
    exercise: {
      type: "investigation",
      instructions: "Une cliente a signalé un problème sur une boutique en ligne fictive. Examine les indices, puis réponds aux questions.",
      simulation: "La boutique, les clients et les traces sont fictifs. Cette faille est présentée dans une simulation, sur un site qui n'existe pas.",
      retry:
        "Sépare ce que les indices montrent (des requêtes, des codes 200, des propriétaires de factures) de ce qu'on pourrait supposer (une intention). Puis relis la note du développeur : quelle question le site oublie-t-il de se poser ?",
      brief: [
        "La boutique Atelier Lumen reçoit un message inquiet d'une cliente. Le gérant te demande de comprendre ce qui se passe et de proposer une correction.",
      ],
      clues: [
        {
          id: "a",
          title: "Le message d'Élodie",
          source: "formulaire de contact de la boutique",
          kind: "email",
          content:
            "Bonjour,\nEn consultant ma facture en ligne, j'ai remarqué que l'adresse se terminait par /factures/1041. Par curiosité, j'ai essayé 1042, puis 1043 : j'ai vu les factures d'autres clients, avec leur nom et leur adresse. Je préfère vous prévenir.\nÉlodie",
        },
        {
          id: "b",
          title: "Journal du serveur web",
          source: "journal d'accès de la boutique",
          kind: "log",
          content: [
            "2026-04-02 14:03:11 ip=198.51.100.23 utilisateur=elodie GET /factures/1041 200",
            "2026-04-02 14:03:40 ip=198.51.100.23 utilisateur=elodie GET /factures/1042 200",
            "2026-04-02 14:03:52 ip=198.51.100.23 utilisateur=elodie GET /factures/1043 200",
            "2026-04-02 14:04:05 ip=198.51.100.23 utilisateur=elodie GET /factures/1044 200",
            "2026-04-02 14:09:30 ip=198.51.100.23 utilisateur=elodie POST /contact 200",
          ].join("\n"),
        },
        {
          id: "c",
          title: "Extrait de la base des factures",
          source: "base de données de la boutique",
          kind: "log",
          content: "numero  cliente_ou_client\n1041    elodie\n1042    karim\n1043    samia\n1044    elodie",
        },
        {
          id: "d",
          title: "Note du développeur",
          source: "documentation interne",
          kind: "text",
          content: "Page facture : si l'utilisateur est connecté, on affiche la facture dont le numéro figure dans l'adresse.",
        },
        {
          id: "e",
          title: "Une autre ligne du journal",
          source: "journal d'accès, la veille",
          kind: "log",
          content: "2026-04-01 22:17:45 ip=203.0.113.90 utilisateur=- GET /factures/1042 302 -> /connexion",
        },
      ],
      questions: [
        {
          id: "q1",
          prompt: "Parmi ces affirmations, lesquelles sont des observations tirées des indices ?",
          options: [
            { id: "a", text: "Élodie a obtenu une réponse 200 pour les factures 1042 et 1043." },
            { id: "b", text: "La facture 1042 appartient à Karim." },
            { id: "c", text: "Élodie cherchait à voler des données." },
            { id: "d", text: "La boutique a été piratée par un groupe organisé." },
          ],
          answers: ["a", "b"],
          explanation: "A vient du journal (indice B), B de la base (indice C). Les deux autres sont des suppositions, que rien dans les indices ne soutient.",
        },
        {
          id: "q2",
          prompt: "Quel est le problème de la boutique ?",
          options: [
            { id: "a", text: "Elle vérifie que la personne est connectée, mais pas que la facture lui appartient." },
            { id: "b", text: "Le mot de passe d'Élodie est trop faible." },
            { id: "c", text: "La boutique n'utilise pas HTTPS." },
          ],
          answers: ["a"],
          explanation: "La note du développeur le dit : seule l'authentification est vérifiée. L'autorisation, c'est-à-dire l'appartenance de la facture, est oubliée.",
        },
        {
          id: "q3",
          prompt: "Que montre l'indice E, où un visiteur non connecté est redirigé vers la page de connexion ?",
          options: [
            { id: "a", text: "Que l'authentification fonctionne : sans connexion, pas de facture." },
            { id: "b", text: "Que la boutique est parfaitement sûre." },
            { id: "c", text: "Qu'un pirate a été arrêté." },
          ],
          answers: ["a"],
          explanation:
            "Le code 302 redirige vers la connexion : la première vérification marche. Cela ne dit rien de la seconde, et rien ne permet d'affirmer qu'il s'agissait d'un pirate : ce peut être un lien enregistré, un robot, une erreur.",
        },
        {
          id: "q4",
          prompt: "Quelle correction proposes-tu ?",
          options: [
            { id: "a", text: "Vérifier côté serveur, pour chaque facture demandée, qu'elle appartient à la personne connectée." },
            { id: "b", text: "Remplacer les numéros de facture par des codes plus difficiles à deviner, sans autre changement." },
            { id: "c", text: "Demander à Élodie de ne plus recommencer." },
          ],
          answers: ["a"],
          explanation:
            "Seule la vérification d'appartenance règle le problème. Des numéros difficiles à deviner compliquent la tâche, mais un numéro qui fuit (par un e-mail transféré, par exemple) ouvrirait toujours la facture.",
        },
        {
          id: "q5",
          prompt: "Peut-on conclure qu'Élodie est malveillante ?",
          options: [
            { id: "a", text: "Oui, elle a consulté des factures d'autres clients." },
            { id: "b", text: "Non : les traces montrent ce qu'elle a fait, pas son intention, et elle a elle-même signalé le problème." },
            { id: "c", text: "Oui, puisqu'elle a recommencé plusieurs fois." },
          ],
          answers: ["b"],
          explanation:
            "Un journal enregistre des actions, jamais des intentions. Ici, le message d'Élodie et la requête POST vers le formulaire de contact, cinq minutes plus tard, vont plutôt dans le sens d'une personne de bonne foi.",
        },
      ],
    },
    hints: [
      "Compare le journal (qui a demandé quelle facture) avec la base (à qui appartient chaque facture).",
      "Relis la note du développeur en te demandant laquelle des deux questions du jour 25 elle oublie.",
    ],
    correction: [
      "Les observations sont nettes : connectée en tant qu'elodie, la cliente a obtenu des réponses 200 pour les factures 1042 et 1043, qui appartiennent à Karim et Samia. La boutique vérifie l'authentification (indice E) mais pas l'autorisation (indice D).",
      "La correction consiste à vérifier, côté serveur et pour chaque facture, qu'elle appartient à la personne connectée, sinon répondre 403 ou 404. Cacher les numéros ne suffit pas.",
      "Sur l'intention, aucune conclusion ne s'impose, et le signalement plaide pour la bonne foi. Cette faille est d'ailleurs un incident à part entière : des données personnelles ont été exposées. Dans la réalité, il faudrait la corriger rapidement, vérifier dans les journaux si d'autres personnes l'ont exploitée, et étudier les obligations de notification prévues par la réglementation sur les données personnelles.",
    ],
    recall: {
      notion: "moindre-privilege",
      fromDay: 26,
      prompt: "Que dit le principe du moindre privilège ?",
      options: [
        { id: "a", text: "Chacun reçoit exactement les droits nécessaires à son travail, pas davantage" },
        { id: "b", text: "Les administrateurs doivent avoir le moins de droits possible" },
        { id: "c", text: "Il faut donner tous les droits pour éviter les blocages" },
      ],
      answer: "a",
      explanation: "Chaque droit inutile élargit les dégâts possibles en cas de piratage ou d'erreur.",
    },
    summary: [
      "Une faille fréquente : vérifier qu'une personne est connectée, mais pas que l'élément demandé lui appartient.",
      "La correction se fait côté serveur, pour chaque élément ; cacher les numéros ne suffit pas.",
      "Les traces montrent des actions, jamais des intentions.",
    ],
  },

  {
    id: "j28",
    day: 28,
    week: 4,
    kind: "revision",
    title: "Révision : comment un site te reconnaît et te contrôle",
    duration: 12,
    objective: "associer chaque notion de la semaine à sa définition, de mémoire.",
    notions: ["cookie", "session", "authentification", "autorisation", "moindre-privilege", "code-statut"],
    competences: ["web", "acces"],
    learn: {
      paragraphs: [
        "Cette semaine, tu as suivi une visite sur un site, de l'intérieur : les [[requete|requêtes]] et leurs [[code-statut|codes]], le [[cookie]] qui garde la [[session]] ouverte, puis les deux vérifications de chaque demande, l'[[authentification]] et l'[[autorisation]], réglées selon le [[moindre-privilege|moindre privilège]].",
        "Ces notions s'emboîtent : sans cookie, pas de session ; sans session, il faudrait s'authentifier à chaque page ; et sans autorisation bien vérifiée, l'authentification ne protège pas grand-chose.",
      ],
      example: {
        title: "le fil d'une soirée au théâtre",
        paragraphs: [
          "Billet contrôlé à l'entrée (authentification), ticket de vestiaire (identifiant de session), placement selon ta catégorie de billet (autorisation), et un ouvreur qui n'a que les clés de son balcon (moindre privilège).",
        ],
      },
    },
    exercise: {
      type: "match",
      variant: "associate",
      instructions: "Associe chaque notion à sa définition.",
      retry: "Commence par les paires évidentes. Pour les codes, souviens-toi : 4xx signale un problème du côté de la demande, et 403 et 404 ne disent pas la même chose.",
      options: [
        { id: "d1", label: "Petite donnée renvoyée par le navigateur à chaque requête vers un site" },
        { id: "d2", label: "Code aléatoire qui prouve qu'on s'est déjà connecté" },
        { id: "d3", label: "Vérifier qui fait la demande" },
        { id: "d4", label: "Décider si la demande est permise" },
        { id: "d5", label: "Accès interdit à une personne pourtant identifiée" },
        { id: "d6", label: "Page ou élément introuvable" },
        { id: "d7", label: "Réglage qui empêche les scripts de lire un cookie" },
        { id: "d8", label: "Exactement les droits nécessaires, pas davantage" },
        { id: "d9", label: "Méthode qui envoie des données, comme un formulaire" },
      ],
      items: [
        { id: "n1", text: "Cookie", answer: "d1", why: "Déposé avec Set-Cookie, renvoyé automatiquement au même site." },
        { id: "n2", text: "Identifiant de session", answer: "d2", why: "Le ticket de vestiaire : qui le possède est reconnu." },
        { id: "n3", text: "Authentification", answer: "d3", why: "Qui es-tu ?" },
        { id: "n4", text: "Autorisation", answer: "d4", why: "As-tu le droit ?" },
        { id: "n5", text: "Code 403", answer: "d5", why: "Je sais qui tu es, et la réponse est non." },
        { id: "n6", text: "Code 404", answer: "d6", why: "Introuvable. Certains sites l'utilisent aussi pour ne pas révéler qu'un élément existe." },
        { id: "n7", text: "HttpOnly", answer: "d7", why: "Il complique le vol du cookie de session par un script." },
        { id: "n8", text: "Moindre privilège", answer: "d8", why: "Il limite les dégâts d'un compte piraté ou d'une erreur." },
        { id: "n9", text: "POST", answer: "d9", why: "GET lit, POST envoie." },
      ],
    },
    hints: [
      "Authentification et autorisation : l'une vient toujours avant l'autre.",
      "Deux définitions parlent de cookies : l'une décrit le cookie en général, l'autre un réglage de protection.",
    ],
    correction: [
      "Les neuf notions forment la mécanique d'un site : échanges HTTP (POST, codes), mémoire (cookie, identifiant de session, HttpOnly) et contrôle (authentification, autorisation, moindre privilège, 403).",
      "La semaine prochaine, tu retrouveras ces codes et ces identifiants dans les journaux d'un incident.",
    ],
    recall: {
      notion: "controle-acces",
      fromDay: 27,
      prompt: "En changeant le numéro dans l'adresse, un client voit la facture d'un autre. Quelle vérification manque au site ?",
      options: [
        { id: "a", text: "Vérifier que la facture appartient à la personne connectée" },
        { id: "b", text: "Vérifier que le client utilise HTTPS" },
        { id: "c", text: "Vérifier que le mot de passe est solide" },
      ],
      answer: "a",
      explanation: "C'est un défaut d'autorisation : l'appartenance doit être vérifiée côté serveur, pour chaque élément.",
    },
    summary: [
      "Le cookie porte l'identifiant de session, qui évite de se reconnecter à chaque page.",
      "Authentification puis autorisation : deux vérifications distinctes à chaque demande.",
      "Le moindre privilège et la vérification côté serveur limitent les dégâts des erreurs et des attaques.",
    ],
  },
];

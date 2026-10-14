import type { Session } from "../types";
import { dir, file, homeRoot } from "../fs";

const ACCESS_LOG = [
  "2026-05-12 09:14:02 198.51.100.23 utilisateur=- GET /accueil 200",
  "2026-05-12 09:14:05 198.51.100.23 utilisateur=- GET /catalogue?recherche=jardinage 200",
  "2026-05-12 09:15:40 198.51.100.23 utilisateur=- POST /connexion 401",
  "2026-05-12 09:15:58 198.51.100.23 utilisateur=- POST /connexion 200",
  "2026-05-12 09:16:01 198.51.100.23 utilisateur=lucie GET /mon-compte 200",
  "2026-05-12 09:17:22 198.51.100.23 utilisateur=lucie GET /reservations/88 200",
  "2026-05-12 09:18:10 203.0.113.45 utilisateur=- GET /admin 302",
  "2026-05-12 09:18:11 203.0.113.45 utilisateur=- GET /connexion 200",
].join("\n");

const CONNEXIONS = [
  "2026-05-15 08:51:10 succes connexion utilisateur=nadia ip=192.168.10.21",
  "2026-05-15 08:55:42 succes connexion utilisateur=marc ip=192.168.10.34",
  "2026-05-15 09:02:13 echec connexion utilisateur=ines ip=192.168.10.33",
  "2026-05-15 09:02:30 succes connexion utilisateur=ines ip=192.168.10.33",
  "2026-05-15 17:58:00 deconnexion utilisateur=marc ip=192.168.10.34",
  "2026-05-17 22:58:40 succes connexion utilisateur=marc ip=203.0.113.45",
  "2026-05-17 23:09:12 deconnexion utilisateur=marc ip=203.0.113.45",
  "2026-05-18 08:49:51 succes connexion utilisateur=nadia ip=192.168.10.21",
  "2026-05-18 08:57:03 succes connexion utilisateur=marc ip=192.168.10.34",
].join("\n");

const PARTAGE = [
  "2026-05-15 10:12:44 utilisateur=nadia ouverture fichier=/partage/equipe/planning.txt",
  "2026-05-15 14:30:02 utilisateur=marc modification fichier=/partage/projets/devis-jardin.txt",
  "2026-05-17 23:01:05 utilisateur=marc telechargement fichier=/partage/clients/clients-2026.csv",
  "2026-05-17 23:02:47 utilisateur=marc telechargement fichier=/partage/clients/contrats-signes.zip",
  "2026-05-17 23:04:30 utilisateur=marc telechargement fichier=/partage/compta/factures-avril.zip",
  "2026-05-18 09:15:20 utilisateur=marc ouverture fichier=/partage/projets/devis-jardin.txt",
].join("\n");

const MESSAGERIE = [
  "2026-05-15 11:02:31 reception destinataire=nadia expediteur=rh@atelier-lumen.test objet=Planning des congés",
  "2026-05-15 16:20:11 reception destinataire=marc expediteur=securite@messagerie-verif.test objet=Votre mot de passe expire aujourd'hui",
  "2026-05-15 16:24:02 clic lien utilisateur=marc url=https://messagerie-verif.test/renouveler",
  "2026-05-18 09:30:45 reception destinataire=ines expediteur=contact@example.com objet=Demande de devis",
].join("\n");

const FS_J34 = homeRoot(
  "lea",
  [
    dir("enquete", [
      file(
        "consigne.txt",
        "Lundi 18 mai, 9 h 40.\nLe système de surveillance signale un accès au réseau de l'entreprise dimanche soir, alors que les bureaux étaient fermés.\nLes journaux sont dans /var/log : connexions.log, partage.log, messagerie.log\nÀ toi d'établir les faits.\n",
      ),
    ]),
  ],
  [
    dir("var", [
      dir("log", [
        file("connexions.log", CONNEXIONS + "\n", { owner: "root", perms: "-rw-r--r--" }),
        file("partage.log", PARTAGE + "\n", { owner: "root", perms: "-rw-r--r--" }),
        file("messagerie.log", MESSAGERIE + "\n", { owner: "root", perms: "-rw-r--r--" }),
      ], { owner: "root" }),
    ], { owner: "root" }),
  ],
);

/** Semaine 5 : Découvrir l'enquête numérique. */
export const SEMAINE_5: Session[] = [
  {
    id: "j29",
    day: 29,
    week: 5,
    kind: "apprentissage",
    title: "Les journaux : la mémoire des systèmes",
    duration: 18,
    objective: "lire une ligne de journal et en extraire le moment, la source, l'identité, l'action et le résultat.",
    notions: ["journal", "horodatage", "evenement"],
    competences: ["journaux"],
    learn: {
      paragraphs: [
        "Presque tout système note ce qui lui arrive dans un [[journal]] (on dit aussi « log ») : une ligne par [[evenement|événement]]. Le serveur web note chaque requête, la messagerie chaque e-mail, le système chaque connexion. En cas d'incident, ces journaux sont la principale source de faits.",
        "Une ligne de journal répond le plus souvent à cinq questions. **Quand ?** C'est l'[[horodatage]] : `2026-05-12 09:15:58`. **D'où ?** L'adresse IP de la source. **Qui ?** L'utilisateur, ou un tiret s'il n'est pas connecté. **Quoi ?** L'action : `GET /mon-compte`, `POST /connexion`. **Avec quel résultat ?** Le code de statut, ou « succès » et « échec ».",
        "Les dates sont écrites année-mois-jour : `2026-05-12`. Ce format se trie naturellement dans l'ordre chronologique, c'est pourquoi il est universel dans les journaux.",
        "Quelques précautions. Un journal ne montre que ce qu'on a choisi d'enregistrer. Il peut être incomplet, voire effacé par un attaquant habile. Et chaque système a son format : il faut toujours lire quelques lignes avant de chercher, pour comprendre ce que contient chaque colonne.",
      ],
      example: {
        title: "le carnet de bord d'un navire",
        paragraphs: [
          "Sur un bateau, on note l'heure, la position, le cap et les événements notables. Après une tempête, c'est ce carnet qui permet de reconstituer ce qui s'est passé, à condition que chaque entrée soit datée et précise.",
        ],
      },
    },
    exercise: {
      type: "short",
      instructions: "Voici un extrait du journal d'accès du site fictif d'une médiathèque. Réponds aux questions.",
      simulation: "Ce journal, ces adresses et ces personnes sont fictifs.",
      contextLabel: "Journal d'accès du serveur web (heure de Paris)",
      context: ACCESS_LOG,
      retry: "Lis chaque ligne de gauche à droite : date et heure, adresse IP, utilisateur, méthode et chemin, puis code. Pour compter, filtre mentalement sur l'adresse IP demandée.",
      questions: [
        {
          id: "q1",
          prompt: "À quelle heure exacte la connexion de Lucie a-t-elle réussi ?",
          accept: ["09:15:58", "9:15:58", "09h15m58", "9h15m58", "9 h 15 min 58", "09 h 15 min 58"],
          placeholder: "hh:mm:ss",
          explanation: "La requête `POST /connexion` reçoit un 200 à 09:15:58, et la ligne suivante montre déjà `utilisateur=lucie`.",
        },
        {
          id: "q2",
          prompt: "Quel code indique que son premier essai de connexion a été refusé ?",
          accept: ["401"],
          placeholder: "un code",
          explanation: "401 : identification refusée, sans doute un mot de passe mal saisi. Un échec isolé suivi d'une réussite n'a rien d'inquiétant.",
        },
        {
          id: "q3",
          prompt: "Depuis quelle adresse IP la page `/admin` a-t-elle été demandée ?",
          accept: ["203.0.113.45"],
          placeholder: "une adresse IP",
          explanation: "`203.0.113.45`, sans être connecté : le site répond 302 et redirige vers la connexion. C'est une observation ; on ne sait rien de l'intention.",
        },
        {
          id: "q4",
          prompt: "Quel mot a été recherché dans le catalogue ?",
          accept: ["jardinage"],
          placeholder: "un mot",
          explanation: "Le paramètre `recherche=jardinage` figure dans l'adresse demandée. Les journaux contiennent souvent ce genre de détail, parfois personnel : c'est pourquoi on les protège.",
        },
        {
          id: "q5",
          prompt: "Combien de requêtes l'adresse 198.51.100.23 a-t-elle envoyées dans cet extrait ?",
          accept: ["6", "six"],
          placeholder: "un nombre",
          explanation: "Six lignes commencent par cette adresse, de 09:14:02 à 09:17:22.",
        },
      ],
    },
    hints: [
      "La connexion réussie est la requête `POST /connexion` qui reçoit le code 200.",
      "Les codes de la semaine dernière : 200 réussi, 302 redirection, 401 identification requise ou refusée.",
    ],
    correction: [
      "Chaque ligne se lit comme une phrase : à 09:15:58, depuis 198.51.100.23, un visiteur pas encore identifié envoie le formulaire de connexion, et le site répond 200. La ligne suivante confirme que la session de Lucie est ouverte.",
      "L'extrait raconte une visite ordinaire : une recherche, un mot de passe mal saisi puis corrigé, la consultation d'une réservation. Puis une autre adresse demande `/admin` sans être connectée et se voit redirigée. C'est un fait à noter, pas une preuve d'attaque : des robots testent ce genre d'adresse en permanence sur tous les sites.",
    ],
    recall: {
      notion: "session",
      fromDay: 24,
      prompt: "Qu'est-ce qui met fin à une session côté serveur ?",
      options: [
        { id: "a", text: "Fermer l'onglet" },
        { id: "b", text: "La déconnexion, ou l'expiration de la session" },
        { id: "c", text: "Changer de page sur le site" },
      ],
      answer: "b",
      explanation: "Le serveur efface la session quand tu te déconnectes ou quand elle expire. Fermer l'onglet ne le prévient pas.",
    },
    summary: [
      "Une ligne de journal dit quand, d'où, qui, quoi, et avec quel résultat.",
      "Les dates au format année-mois-jour se trient dans l'ordre chronologique.",
      "Un journal est une source précieuse mais partielle : lis quelques lignes avant de chercher.",
    ],
  },

  {
    id: "j30",
    day: 30,
    week: 5,
    kind: "apprentissage",
    title: "Observation, hypothèse, conclusion",
    duration: 15,
    objective: "classer les phrases d'un rapport en observations, hypothèses et conclusions, et rédiger avec le bon degré de certitude.",
    notions: ["observation", "hypothese", "conclusion", "indice"],
    competences: ["enquete"],
    learn: {
      paragraphs: [
        "En semaine 1, tu as rencontré trois mots qui structurent toute enquête. Ils deviennent maintenant essentiels.",
        "Une [[observation]] est un fait vérifiable, directement constaté dans une trace ou un témoignage : « connexion réussie au compte marc à 23:04 depuis 203.0.113.45 ». Une [[hypothese|hypothèse]] est une explication possible : « quelqu'un a peut-être obtenu son mot de passe ». Une [[conclusion]] est ce qu'on affirme après avoir confronté les hypothèses à plusieurs [[indice|indices]], avec un degré de certitude explicite : « très probablement », « certainement », « on ne peut pas encore dire ».",
        "Pourquoi tant de rigueur ? Parce qu'un rapport d'incident conduit à des décisions : bloquer un compte, prévenir des clients, parfois accuser quelqu'un. Présenter une hypothèse comme un fait peut causer du tort à une personne innocente, ou détourner l'enquête de la vraie cause.",
        "Deux pièges classiques. Prêter des intentions : un journal montre des actions, jamais des motivations. Et confondre « je n'ai rien trouvé » avec « il n'y a rien » : une absence d'indice n'est pas une preuve.",
      ],
      example: {
        title: "le verre cassé dans la cuisine",
        paragraphs: [
          "Observation : un verre est cassé par terre, la fenêtre est ouverte. Hypothèses : le chat l'a fait tomber, le vent l'a renversé, quelqu'un l'a fait tomber. Conclusion, après avoir vu les traces de pattes sur le plan de travail : « c'est très probablement le chat ».",
          "Remarque le « très probablement » : sans avoir vu la scène, on reste honnête sur la certitude.",
        ],
      },
    },
    exercise: {
      type: "match",
      variant: "categorize",
      instructions:
        "Le service informatique fictif d'une entreprise enquête sur une connexion au compte de Marc, dimanche soir. Voici des phrases tirées du rapport en préparation. Classe chacune.",
      simulation: "Le scénario et les personnes sont fictifs.",
      retry:
        "Pour chaque phrase, demande-toi : peut-on la vérifier directement dans une trace ou un document ? Si oui, c'est une observation. Contient-elle « peut-être » ou une intention non prouvée ? C'est une hypothèse. Tire-t-elle une leçon de plusieurs faits, avec un degré de certitude ? C'est une conclusion.",
      options: [
        { id: "obs", label: "Observation", description: "Un fait constaté, vérifiable." },
        { id: "hyp", label: "Hypothèse", description: "Une explication possible, à vérifier." },
        { id: "conc", label: "Conclusion", description: "Ce qu'on affirme après vérification, avec un degré de certitude." },
      ],
      items: [
        { id: "p1", text: "Le journal indique une connexion réussie au compte marc le dimanche 17 mai à 22:58.", answer: "obs", why: "C'est écrit tel quel dans le journal : un fait vérifiable." },
        { id: "p2", text: "La connexion provient de l'adresse 203.0.113.45, jamais utilisée auparavant par ce compte.", answer: "obs", why: "Vérifiable en cherchant cette adresse dans l'historique du compte." },
        { id: "p3", text: "Quelqu'un a peut-être obtenu le mot de passe de Marc.", answer: "hyp", why: "« Peut-être » : une explication possible, pas encore vérifiée." },
        { id: "p4", text: "Marc s'est peut-être simplement connecté depuis chez un proche.", answer: "hyp", why: "Une autre explication possible, qu'il faut aussi examiner." },
        { id: "p5", text: "Marc confirme qu'il ne s'est pas connecté ce week-end.", answer: "obs", why: "C'est un témoignage recueilli : on constate ce que Marc déclare. Il reste à le croiser avec d'autres indices." },
        { id: "p6", text: "La connexion a été suivie du téléchargement de trois fichiers de clients et de factures.", answer: "obs", why: "Constaté dans le journal du partage de fichiers." },
        { id: "p7", text: "Le responsable est sûrement un concurrent qui voulait voler les clients.", answer: "hyp", why: "Une intention prêtée sans aucun indice : c'est une hypothèse, et une hypothèse fragile." },
        {
          id: "p8",
          text: "Au vu de ces éléments concordants, le compte de Marc a très probablement été utilisé par une autre personne.",
          answer: "conc",
          why: "Elle s'appuie sur plusieurs indices et annonce son degré de certitude.",
        },
        {
          id: "p9",
          text: "À ce stade, on ne peut pas encore dire comment le mot de passe a été obtenu.",
          answer: "conc",
          why: "Une conclusion peut aussi être un constat d'incertitude : c'est honnête et utile pour la suite de l'enquête.",
        },
      ],
    },
    hints: [
      "Quatre phrases sont des observations : elles décrivent ce que montrent un journal ou un témoignage.",
      "Une conclusion contient souvent un mot qui dit le degré de certitude : « très probablement », « on ne peut pas encore dire ».",
    ],
    correction: [
      "Les observations décrivent des faits vérifiables : la connexion, l'adresse, les téléchargements, et le témoignage de Marc, qui est un fait (il a déclaré cela) mais pas une vérité garantie.",
      "Les hypothèses proposent des explications : un mot de passe obtenu par quelqu'un d'autre, une connexion depuis chez un proche, ou un concurrent, cette dernière sans aucun appui.",
      "Les conclusions tirent les leçons de plusieurs indices, avec prudence. Retiens que « on ne peut pas encore dire » est une vraie conclusion, et souvent la plus juste à un moment donné de l'enquête.",
    ],
    recall: {
      notion: "horodatage",
      fromDay: 29,
      prompt: "Dans la ligne `2026-05-12 09:15:58 198.51.100.23 utilisateur=- POST /connexion 200`, quelle partie est l'horodatage ?",
      options: [
        { id: "a", text: "`2026-05-12 09:15:58`" },
        { id: "b", text: "`198.51.100.23`" },
        { id: "c", text: "`200`" },
      ],
      answer: "a",
      explanation: "L'horodatage est la date et l'heure de l'événement. Viennent ensuite l'adresse IP, l'utilisateur, l'action et le code.",
    },
    summary: [
      "Observation : un fait vérifiable. Hypothèse : une explication possible. Conclusion : ce qu'on affirme après vérification.",
      "Une conclusion annonce son degré de certitude, et « on ne peut pas encore dire » en est une.",
      "Les traces montrent des actions, pas des intentions ; l'absence d'indice n'est pas une preuve.",
    ],
  },

  {
    id: "j31",
    day: 31,
    week: 5,
    kind: "apprentissage",
    title: "Repérer les événements suspects",
    duration: 20,
    objective: "repérer, dans un journal, les événements qui sortent de l'ordinaire, sans conclure à partir d'un indice isolé.",
    notions: ["evenement", "indice", "faux-positif", "force-brute"],
    competences: ["journaux", "enquete"],
    learn: {
      paragraphs: [
        "Repérer un événement suspect, c'est d'abord connaître le normal : qui se connecte, d'où, à quelle heure, avec quel taux d'erreur. Le suspect se définit toujours par rapport à cette habitude.",
        "Quelques schémas méritent l'attention. Une série d'échecs rapprochés sur un même compte (la [[force-brute|force brute]]). Une même adresse qui essaie quelques mots de passe sur **plusieurs** comptes, pour passer sous les seuils d'alerte : on parle de pulvérisation de mots de passe. Une connexion depuis un lieu ou un appareil jamais vus. Une activité inhabituelle juste après une connexion : un gros téléchargement, une règle de transfert créée.",
        "Mais chaque élément pris seul a souvent une explication banale : une faute de frappe, un déplacement, une personne qui travaille tard. Une alerte qui se déclenche sans problème réel s'appelle un [[faux-positif|faux positif]]. Les analystes en voient beaucoup, et c'est normal.",
        "La règle : **un indice isolé ne prouve pas une attaque**. C'est la combinaison d'indices, et leur cohérence avec le contexte, qui fait la différence.",
      ],
      example: {
        title: "la voisine qui rentre tard",
        paragraphs: [
          "Ta voisine rentre à 2 h du matin : c'est inhabituel, mais elle est peut-être infirmière de nuit. Si en plus sa porte est fracturée et qu'un inconnu sort avec un sac, la combinaison change tout.",
        ],
      },
    },
    exercise: {
      type: "logs",
      instructions:
        "Voici une semaine de connexions au réseau d'une petite entreprise fictive. Contexte : Paul travaille souvent le soir depuis chez lui, et Marc était à un salon professionnel à Lyon vendredi. Coche les lignes qui méritent d'être examinées, puis réponds aux questions.",
      simulation: "L'entreprise, les personnes et les adresses sont fictives.",
      source: "Journal des connexions au réseau de l'entreprise",
      retry:
        "Cherche ce qui relie plusieurs lignes entre elles : une même adresse, un même moment. Puis vérifie chaque ligne isolée à la lumière du contexte donné dans la consigne.",
      columns: [
        { key: "date", label: "Jour" },
        { key: "heure", label: "Heure" },
        { key: "user", label: "Compte" },
        { key: "ip", label: "Adresse IP" },
        { key: "lieu", label: "Lieu estimé" },
        { key: "evt", label: "Événement" },
      ],
      rows: [
        { id: "r1", cells: { date: "lun.", heure: "08:58", user: "nadia", ip: "192.168.10.21", lieu: "Bureau", evt: "Connexion réussie" }, suspicious: false, why: "Une arrivée au bureau ordinaire." },
        { id: "r2", cells: { date: "lun.", heure: "09:03", user: "paul", ip: "192.168.10.40", lieu: "Bureau", evt: "Échec" }, suspicious: false, why: "Un échec isolé, suivi d'une réussite une minute plus tard depuis le même poste." },
        { id: "r3", cells: { date: "lun.", heure: "09:04", user: "paul", ip: "192.168.10.40", lieu: "Bureau", evt: "Connexion réussie" }, suspicious: false, why: "La connexion qui suit la faute de frappe." },
        {
          id: "r4",
          cells: { date: "mar.", heure: "23:40", user: "paul", ip: "198.51.100.61", lieu: "Domicile de Paul", evt: "Connexion réussie" },
          suspicious: false,
          why: "L'heure est tardive, mais c'est l'adresse habituelle du domicile de Paul, qui travaille souvent le soir : un faux positif typique si l'on ne regarde que l'heure.",
        },
        { id: "r5", cells: { date: "mer.", heure: "03:12", user: "nadia", ip: "203.0.113.77", lieu: "Inconnu", evt: "Échec" }, suspicious: true, why: "Adresse inconnue, en pleine nuit : premier essai d'une série." },
        { id: "r6", cells: { date: "mer.", heure: "03:12", user: "marc", ip: "203.0.113.77", lieu: "Inconnu", evt: "Échec" }, suspicious: true, why: "La même adresse essaie un autre compte, quelques secondes plus tard." },
        { id: "r7", cells: { date: "mer.", heure: "03:13", user: "paul", ip: "203.0.113.77", lieu: "Inconnu", evt: "Échec" }, suspicious: true, why: "Troisième compte essayé : c'est le schéma de la pulvérisation de mots de passe." },
        { id: "r8", cells: { date: "mer.", heure: "03:13", user: "ines", ip: "203.0.113.77", lieu: "Inconnu", evt: "Connexion réussie" }, suspicious: true, why: "La série aboutit : le mot de passe d'Inès a été trouvé." },
        { id: "r9", cells: { date: "mer.", heure: "03:20", user: "ines", ip: "203.0.113.77", lieu: "Inconnu", evt: "Export du fichier clients" }, suspicious: true, why: "Activité sensible juste après la connexion suspecte." },
        {
          id: "r10",
          cells: { date: "jeu.", heure: "09:10", user: "ines", ip: "192.168.10.33", lieu: "Bureau", evt: "Connexion réussie" },
          suspicious: false,
          why: "Inès se connecte normalement depuis son poste. Elle ne sait probablement pas que son compte a servi dans la nuit de mercredi.",
        },
        {
          id: "r11",
          cells: { date: "ven.", heure: "14:02", user: "marc", ip: "198.51.100.200", lieu: "Lyon", evt: "Connexion réussie" },
          suspicious: false,
          why: "Un lieu inhabituel, expliqué par le salon professionnel de Marc à Lyon.",
        },
      ],
      followUp: [
        {
          id: "f1",
          prompt: "Que révèlent les lignes de mercredi, à 3 h ?",
          options: [
            { id: "a", text: "Une même adresse essaie plusieurs comptes en quelques secondes et finit par entrer dans celui d'Inès." },
            { id: "b", text: "Paul travaille encore plus tard que d'habitude." },
            { id: "c", text: "Une panne du réseau." },
          ],
          answers: ["a"],
          explanation: "Le lien entre ces lignes, c'est l'adresse 203.0.113.77 : un seul acteur, plusieurs comptes, un succès, puis un export.",
        },
        {
          id: "f2",
          prompt: "La connexion de Paul mardi à 23 h 40 est-elle, à elle seule, la preuve d'une attaque ?",
          options: [
            { id: "a", text: "Oui, l'heure est inhabituelle." },
            { id: "b", text: "Non : un indice isolé ne prouve rien, et l'adresse est celle de son domicile, d'où il travaille souvent le soir." },
            { id: "c", text: "Oui, elle vient de l'extérieur du bureau." },
          ],
          answers: ["b"],
          explanation: "L'heure seule ne suffit pas ; le contexte l'explique. Alerter sur cette ligne produirait un faux positif.",
        },
        {
          id: "f3",
          prompt: "Quelle action est la plus urgente ?",
          options: [
            { id: "a", text: "Changer le mot de passe d'Inès, fermer ses sessions ouvertes et prévenir le responsable." },
            { id: "b", text: "Supprimer le journal pour éviter qu'il ne soit volé." },
            { id: "c", text: "Attendre de voir si cela recommence." },
          ],
          answers: ["a"],
          explanation: "Il faut couper l'accès de l'attaquant au plus vite, et conserver le journal : c'est la preuve de ce qui s'est passé.",
        },
      ],
    },
    hints: [
      "Trie le tableau par adresse IP : une adresse apparaît sur plusieurs lignes et plusieurs comptes.",
      "Les lignes de Paul mardi soir et de Marc vendredi sont inhabituelles, mais la consigne les explique.",
    ],
    correction: [
      "Les cinq lignes de mercredi forment un tout : la même adresse inconnue essaie trois comptes en une minute, entre dans celui d'Inès, puis exporte le fichier clients. Aucune ligne prise seule n'est spectaculaire ; leur combinaison l'est.",
      "À l'inverse, Paul à 23 h 40 et Marc à Lyon sont des écarts expliqués par le contexte. Les signaler serait produire des faux positifs, qui finissent par lasser et faire ignorer les vraies alertes.",
      "Prochaines étapes : couper l'accès (mot de passe d'Inès, sessions), conserver toutes les traces, puis comprendre comment l'attaquant a trouvé ce mot de passe. Une double authentification aurait très probablement arrêté cette attaque.",
    ],
    recall: {
      notion: "hypothese",
      fromDay: 30,
      prompt: "« Le compte de Marc a peut-être été utilisé par quelqu'un d'autre. » Cette phrase est…",
      options: [
        { id: "a", text: "une observation" },
        { id: "b", text: "une hypothèse" },
        { id: "c", text: "une conclusion" },
      ],
      answer: "b",
      explanation: "« Peut-être » : c'est une explication possible, qui reste à vérifier.",
    },
    summary: [
      "Le suspect se définit par rapport au normal : connais les habitudes avant de chercher les écarts.",
      "Une même source qui essaie plusieurs comptes, puis réussit, est un schéma d'attaque classique.",
      "Un indice isolé ne prouve pas une attaque ; un écart expliqué par le contexte est un faux positif.",
    ],
  },

  {
    id: "j32",
    day: 32,
    week: 5,
    kind: "apprentissage",
    title: "Reconstituer la chronologie d'un incident",
    duration: 20,
    objective: "ordonner des événements venus de sources différentes, en tenant compte des fuseaux horaires.",
    notions: ["chronologie", "horodatage", "fuseau-horaire", "incident"],
    competences: ["chronologie", "journaux"],
    learn: {
      paragraphs: [
        "Lors d'un [[incident|incident de sécurité]], chaque source raconte un morceau de l'histoire : la messagerie, le navigateur, le serveur, un appel noté à l'accueil. La [[chronologie]] les rassemble dans l'ordre, pour comprendre l'enchaînement et repérer le point de départ.",
        "Le piège principal tient aux [[fuseau-horaire|fuseaux horaires]]. Beaucoup de services en ligne notent l'heure en **UTC**, le temps universel de référence. En France, l'heure locale vaut UTC + 1 en hiver, et UTC + 2 en été. Un événement noté `07:05 UTC` en mai s'est donc produit à 9 h 05, heure de Paris.",
        "La méthode : pour chaque événement, noter la source et le fuseau de son [[horodatage]], tout convertir dans une même heure de référence, puis ordonner. Les écarts qui restent sont des indices : un e-mail reçu à 9 h 02, un mot de passe saisi sur un faux site à 9 h 04, une connexion de l'attaquant à 9 h 05.",
        "Une chronologie montre aussi ce qui a suivi. Ici, l'attaquant a créé une règle de transfert automatique : une astuce classique pour continuer à lire les e-mails d'une personne même après le changement de son mot de passe.",
      ],
      example: {
        title: "l'appel avec un ami à l'étranger",
        paragraphs: [
          "Un ami à Montréal te dit : « Je t'ai écrit à 15 h. » Avant de dire « je ne l'ai pas vu », il faut savoir qu'il est 21 h chez toi. Deux horloges, un même instant.",
        ],
      },
      callout: {
        title: "Repère pour l'exercice",
        text: "L'incident a lieu en mai : l'heure de Paris vaut UTC + 2. Convertis les heures en UTC avant de comparer.",
      },
    },
    exercise: {
      type: "order",
      variant: "timeline",
      instructions:
        "Reconstitue la chronologie de l'incident fictif qui a touché la messagerie d'Inès. Attention : certaines sources notent l'heure de Paris, d'autres l'heure UTC.",
      simulation: "L'incident, les personnes et les adresses sont fictifs.",
      retry: "Convertis d'abord chaque heure UTC en heure de Paris en ajoutant 2 heures, puis ordonne tous les événements selon l'heure de Paris.",
      items: [
        {
          id: "e1",
          text: "09:02 : Inès reçoit un e-mail « Votre boîte est pleine » qui contient un lien.",
          detail: "Source : messagerie de l'entreprise, heure de Paris",
          note: "Le point de départ : un e-mail de phishing.",
        },
        {
          id: "e2",
          text: "09:04 : Inès saisit son mot de passe sur une page qui imite sa messagerie.",
          detail: "Source : historique du navigateur d'Inès, heure de Paris",
          note: "Deux minutes plus tard, le mot de passe est donné.",
        },
        {
          id: "e3",
          text: "07:05 : connexion à la messagerie d'Inès depuis l'adresse 203.0.113.77.",
          detail: "Source : journal du fournisseur de messagerie, heure UTC",
          note: "07:05 UTC = 09:05 à Paris : l'attaquant utilise le mot de passe une minute après sa saisie.",
        },
        {
          id: "e4",
          text: "07:11 : création d'une règle qui transfère automatiquement les e-mails d'Inès vers une adresse extérieure.",
          detail: "Source : journal du fournisseur de messagerie, heure UTC",
          note: "09:11 à Paris. Cette règle permet de continuer à lire les e-mails même après un changement de mot de passe.",
        },
        {
          id: "e5",
          text: "10:30 : un client appelle. Il a reçu « d'Inès » une facture avec de nouvelles coordonnées bancaires.",
          detail: "Source : note de l'accueil, heure de Paris",
          note: "L'attaquant exploite la boîte : c'est souvent un client qui donne l'alerte.",
        },
        {
          id: "e6",
          text: "08:45 : le service informatique bloque le compte d'Inès.",
          detail: "Source : journal du fournisseur de messagerie, heure UTC",
          note: "10:45 à Paris : réaction un quart d'heure après l'alerte.",
        },
      ],
    },
    hints: [
      "Trois événements sont en heure UTC. En mai, ajoute 2 heures pour obtenir l'heure de Paris : 07:05 UTC devient 09:05.",
      "Une fois converties, les heures vont de 09:02 à 10:45. Le blocage du compte arrive en dernier.",
    ],
    correction: [
      "Converti en heure de Paris, l'enchaînement est limpide : e-mail de phishing à 09:02, mot de passe saisi à 09:04, connexion de l'attaquant à 09:05, règle de transfert à 09:11, appel du client à 10:30, blocage à 10:45.",
      "Sans conversion, on aurait cru que la connexion de l'attaquant (07:05) précédait l'e-mail, et on serait passé à côté du lien de cause à effet.",
      "La chronologie dicte aussi la remise en état : changer le mot de passe ne suffit pas, il faut supprimer la règle de transfert, prévenir les clients de la fausse facture, et rechercher d'autres e-mails envoyés pendant cette heure.",
    ],
    recall: {
      notion: "faux-positif",
      fromDay: 31,
      prompt: "Une alerte se déclenche parce que Paul s'est trompé trois fois de mot de passe en rentrant de vacances. Comment appelle-t-on ce cas ?",
      options: [
        { id: "a", text: "Une attaque par force brute" },
        { id: "b", text: "Un faux positif" },
        { id: "c", text: "Une fuite de données" },
      ],
      answer: "b",
      explanation: "L'alerte s'est déclenchée sans problème réel : c'est un faux positif.",
    },
    summary: [
      "Une chronologie rassemble des événements de plusieurs sources dans un même ordre.",
      "Convertis tout dans une même heure : en France, l'heure locale vaut UTC + 1 en hiver et UTC + 2 en été.",
      "L'ordre révèle les causes, et ce qu'il faut réparer ensuite.",
    ],
  },

  {
    id: "j33",
    day: 33,
    week: 5,
    kind: "apprentissage",
    title: "Croiser les indices avant de conclure",
    duration: 20,
    objective: "garder plusieurs hypothèses ouvertes, trouver l'indice qui les départage, et conclure avec prudence.",
    notions: ["indice", "hypothese", "conclusion", "faux-positif", "incident"],
    competences: ["enquete", "journaux"],
    learn: {
      paragraphs: [
        "Face à un problème, la première explication qui vient à l'esprit est souvent la plus spectaculaire : « on a été piraté ». Elle n'est pas forcément la bonne. Beaucoup d'incidents ont des causes banales : une erreur de manipulation, une mise à jour, une panne.",
        "La méthode consiste à lister les [[hypothese|hypothèses]] plausibles, puis à chercher l'[[indice]] qui les **départage** : un élément qui serait présent si une hypothèse était vraie, et absent sinon. Un indice compatible avec toutes les hypothèses n'apprend presque rien.",
        "Méfie-toi des indices d'absence. « L'antivirus n'a rien détecté » ne prouve pas qu'il n'y a pas de logiciel malveillant : il peut ne pas le connaître. Une absence d'indice affaiblit une hypothèse, elle l'écarte rarement.",
        "Enfin, une [[conclusion]] se vérifie : si les fichiers ont été déplacés, on doit les retrouver ailleurs, intacts. Ce test final transforme l'hypothèse la plus probable en conclusion solide.",
      ],
      example: {
        title: "les clés introuvables",
        paragraphs: [
          "Tes clés ont disparu. Volées ? Oubliées au bureau ? Tombées dans le sac ? Plutôt que de changer les serrures, tu cherches l'indice qui départage : le dernier endroit où tu les as utilisées. Tu ouvres le sac : elles y sont. Fin de l'enquête.",
        ],
      },
    },
    exercise: {
      type: "investigation",
      instructions: "Le dossier partagé des projets d'une entreprise fictive est vide ce matin. Examine les indices, puis réponds aux questions.",
      simulation: "L'entreprise, les personnes et les traces sont fictives.",
      retry:
        "Pour chaque indice, demande-toi quelle hypothèse il soutient ou contredit. L'indice décisif est celui qui montre directement ce qui est arrivé aux fichiers.",
      brief: [
        "Mercredi 20 mai, 9 h 10 : Nadia signale que le dossier partagé `/partage/projets` est vide. Toute l'équipe s'inquiète, quelqu'un parle déjà de piratage.",
        "Le responsable te demande de trouver ce qui s'est passé avant de prendre la moindre mesure.",
      ],
      clues: [
        { id: "a", title: "Le signalement de Nadia", source: "outil de tickets", kind: "text", content: "9 h 10 : le dossier /partage/projets est vide depuis ce matin. Hier soir, il contenait tous nos projets en cours." },
        {
          id: "b",
          title: "Journal du partage de fichiers",
          source: "serveur de fichiers",
          kind: "log",
          content: "2026-05-20 08:47:12 utilisateur=karim action=deplacement source=/partage/projets destination=/partage/archives/2025 fichiers=212",
        },
        {
          id: "c",
          title: "E-mail de Karim, la veille",
          source: "messagerie de l'entreprise",
          kind: "email",
          content: "De : Karim\nÀ : l'équipe\nMardi 19 mai, 18 h 02\nJe range demain matin les dossiers de l'an dernier dans les archives. Dites-moi si quelque chose vous gêne.",
        },
        { id: "d", title: "Journal des connexions", source: "serveur d'authentification", kind: "log", content: "2026-05-20 08:40:03 succes connexion utilisateur=karim ip=192.168.10.52 poste=PC-KARIM" },
        { id: "e", title: "Console de l'antivirus", source: "logiciel de sécurité", kind: "text", content: "Aucune détection sur les postes de l'entreprise depuis 7 jours." },
        {
          id: "f",
          title: "Contenu de /partage/archives/2025",
          source: "explorateur de fichiers",
          kind: "text",
          content: "212 fichiers, dont ceux des projets 2025 et ceux des projets en cours 2026 (devis-jardin.txt, planning-chantier.txt…). Les fichiers s'ouvrent normalement.",
        },
      ],
      questions: [
        {
          id: "q1",
          prompt: "Avant d'examiner les indices en détail, quelles hypothèses est-il raisonnable d'envisager ?",
          options: [
            { id: "a", text: "Un logiciel malveillant a supprimé ou chiffré les fichiers." },
            { id: "b", text: "Quelqu'un a déplacé ou supprimé les fichiers par erreur." },
            { id: "c", text: "Un problème technique du serveur de fichiers." },
          ],
          answers: ["a", "b", "c"],
          explanation: "Les trois sont plausibles au départ. Les écarter trop tôt, ou n'en retenir qu'une, est le premier piège d'une enquête.",
        },
        {
          id: "q2",
          prompt: "Quel indice départage le mieux ces hypothèses ?",
          options: [
            { id: "a", text: "A, le signalement de Nadia." },
            { id: "b", text: "B, le journal du partage, qui montre le déplacement de 212 fichiers par le compte de Karim vers les archives." },
            { id: "c", text: "E, la console de l'antivirus." },
          ],
          answers: ["b"],
          explanation: "B décrit directement ce qui est arrivé aux fichiers : un déplacement, pas une suppression ni un chiffrement. A ne fait que constater le problème.",
        },
        {
          id: "q3",
          prompt: "L'indice E, « aucune détection », suffit-il à écarter l'hypothèse d'un logiciel malveillant ?",
          options: [
            { id: "a", text: "Oui, l'antivirus aurait forcément détecté quelque chose." },
            { id: "b", text: "Non : une absence de détection n'est pas une preuve d'absence. Ce sont les indices B et F qui écartent cette hypothèse." },
          ],
          answers: ["b"],
          explanation: "Un antivirus ne connaît pas tous les logiciels malveillants. C'est la présence des fichiers intacts dans les archives qui rend l'hypothèse très improbable.",
        },
        {
          id: "q4",
          prompt: "Quelle conclusion, formulée avec prudence, proposes-tu ?",
          options: [
            { id: "a", text: "Karim a volontairement saboté le dossier." },
            { id: "b", text: "Les fichiers ont très probablement été déplacés par erreur lors du rangement annoncé par Karim ; ils sont intacts dans les archives." },
            { id: "c", text: "Un pirate a utilisé le compte de Karim." },
          ],
          answers: ["b"],
          explanation:
            "Tout concorde : l'annonce de la veille, la connexion depuis le poste habituel de Karim, le déplacement, les fichiers intacts. Rien ne soutient une intention malveillante ni un piratage.",
        },
        {
          id: "q5",
          prompt: "Que faire pour confirmer cette conclusion ?",
          options: [
            { id: "a", text: "En parler avec Karim et vérifier que les fichiers des projets en cours sont bien tous dans les archives, puis les remettre en place." },
            { id: "b", text: "Réinstaller tous les ordinateurs." },
            { id: "c", text: "Couper l'accès à Internet de l'entreprise." },
          ],
          answers: ["a"],
          explanation: "La vérification est simple et proportionnée. Les mesures lourdes auraient coûté une journée de travail pour un incident qui n'en était pas un.",
        },
      ],
    },
    hints: [
      "Un seul indice décrit ce qui est arrivé aux fichiers eux-mêmes. Les autres renseignent sur le contexte.",
      "Compare l'e-mail de la veille (C) et l'heure du déplacement (B) : l'un annonce, l'autre montre.",
    ],
    correction: [
      "La méthode a évité une fausse alerte coûteuse. Trois hypothèses au départ ; un indice qui les départage, le journal du partage ; un contexte cohérent, l'e-mail de Karim et sa connexion depuis son poste ; et une vérification finale, les fichiers intacts dans les archives.",
      "L'antivirus muet n'apportait presque rien : il aurait été compatible avec toutes les hypothèses. Méfie-toi des indices d'absence.",
      "Un incident n'est pas toujours une attaque. Ici, la leçon est organisationnelle : prévoir une vérification avant de ranger des dossiers partagés, et des sauvegardes pour pouvoir revenir en arrière.",
    ],
    recall: {
      notion: "fuseau-horaire",
      fromDay: 32,
      prompt: "En mai, un journal note `07:05 UTC`. Quelle heure était-il à Paris ?",
      options: [
        { id: "a", text: "6 h 05" },
        { id: "b", text: "8 h 05" },
        { id: "c", text: "9 h 05" },
      ],
      answer: "c",
      explanation: "En été, l'heure de Paris vaut UTC + 2.",
    },
    summary: [
      "Liste plusieurs hypothèses, puis cherche l'indice qui les départage.",
      "L'absence de détection n'est pas une preuve d'absence.",
      "Vérifie la conclusion par un test simple ; beaucoup d'incidents ont une cause banale.",
    ],
  },

  {
    id: "j34",
    day: 34,
    week: 5,
    kind: "defi",
    title: "Défi : l'accès du dimanche soir",
    duration: 20,
    objective: "mener une enquête complète dans plusieurs journaux avec le terminal, et relier les événements entre eux.",
    notions: ["journal", "chronologie", "phishing", "observation"],
    competences: ["terminal", "journaux", "enquete", "chronologie", "phishing"],
    learn: {
      paragraphs: [
        "Ce défi rassemble trois semaines de travail : le terminal (semaine 3), le phishing (semaine 2) et l'enquête (cette semaine). Trois [[journal|journaux]] t'attendent, chacun ne racontant qu'une partie de l'histoire.",
        "Méthode conseillée : lis la consigne, repère dans le journal des connexions l'événement signalé, puis utilise ses éléments (le compte, l'adresse IP) comme fils à tirer dans les autres journaux. `grep -r` cherche dans tous les fichiers d'un dossier d'un coup.",
        "Note tes trouvailles au fur et à mesure dans ta zone personnelle : demain, tu t'en serviras pour rédiger une note d'incident.",
      ],
      example: {
        title: "l'enquête de voisinage",
        paragraphs: [
          "Un enquêteur ne se contente pas d'un témoin : il interroge la boulangère, le facteur, le gardien. Chacun a vu un morceau. C'est en recoupant leurs récits qu'on reconstitue la journée.",
        ],
      },
    },
    exercise: {
      type: "terminal",
      instructions: "Ouvre la consigne dans le dossier `enquete`, puis fouille les journaux de `/var/log`.",
      simulation: "Ce terminal est entièrement simulé, avec des journaux fictifs. Rien n'est exécuté sur ton appareil.",
      retry:
        "Commence par `grep 2026-05-17 /var/log/connexions.log` pour voir l'activité du dimanche. Ensuite, cherche le compte trouvé dans les autres journaux avec `grep -r`.",
      user: "lea",
      host: "poste",
      home: "/home/lea",
      startDir: "/home/lea",
      root: FS_J34,
      tasks: [
        { id: "t1", text: "Lis la consigne dans `enquete/consigne.txt`.", check: { kind: "ran", command: "cat", outputIncludes: "dimanche soir" } },
        { id: "t2", text: "Quel compte s'est connecté dimanche soir ?", check: { kind: "answer", accept: ["marc"], placeholder: "un nom de compte" } },
        { id: "t3", text: "Depuis quelle adresse IP ?", check: { kind: "answer", accept: ["203.0.113.45"], placeholder: "une adresse IP" } },
        {
          id: "t4",
          text: "Combien de fichiers ce compte a-t-il téléchargés dimanche soir ?",
          check: { kind: "answer", accept: ["3", "trois"], placeholder: "un nombre" },
        },
        {
          id: "t5",
          text: "Quel jour Marc a-t-il cliqué sur un lien suspect ? (au format AAAA-MM-JJ)",
          check: { kind: "answer", accept: ["2026-05-15", "15/05/2026", "15 mai 2026", "15 mai"], placeholder: "AAAA-MM-JJ" },
        },
        {
          id: "t6",
          text: "Quel est le nom de domaine de ce lien ?",
          check: { kind: "answer", accept: ["messagerie-verif.test"], placeholder: "un nom de domaine" },
        },
      ],
      solution: [
        "cat enquete/consigne.txt",
        "grep 2026-05-17 /var/log/connexions.log",
        "grep -r marc /var/log",
        'grep -c "2026-05-17 23" /var/log/partage.log',
        "grep -i lien /var/log/messagerie.log",
      ],
      solutionAnswers: { t2: "marc", t3: "203.0.113.45", t4: "3", t5: "2026-05-15", t6: "messagerie-verif.test" },
    },
    hints: [
      "Dimanche 17 mai : `grep 2026-05-17 /var/log/connexions.log` isole la connexion du week-end.",
      "`grep -r marc /var/log` affiche toutes les traces du compte dans les trois journaux, dans l'ordre de chaque fichier. Lis aussi le journal de la messagerie du vendredi.",
    ],
    correction: [
      "La chronologie se reconstitue en trois journaux. Vendredi 15 mai à 16:20, Marc reçoit un faux e-mail « Votre mot de passe expire aujourd'hui » envoyé depuis `messagerie-verif.test`, et clique sur le lien à 16:24. Dimanche 17 mai à 22:58, son compte se connecte depuis `203.0.113.45`, une adresse extérieure jamais vue. Entre 23:01 et 23:04, trois fichiers sensibles sont téléchargés : clients, contrats, factures.",
      "Ce qu'on observe est solide. Ce qu'on en déduit reste une hypothèse forte : le mot de passe de Marc a probablement été saisi sur une fausse page vendredi, puis utilisé dimanche. Pour la confirmer, il faudrait interroger Marc et examiner la page `messagerie-verif.test` dans un environnement isolé.",
      "Lundi matin, Marc se connecte normalement depuis son poste : il ne sait sans doute rien. Les mesures immédiates : changer son mot de passe, fermer ses sessions, activer la double authentification, et évaluer les conséquences de la sortie des fichiers clients.",
    ],
    recall: {
      notion: "indice",
      fromDay: 33,
      prompt: "L'antivirus n'a rien détecté sur l'ordinateur de Marc. Qu'en conclure ?",
      options: [
        { id: "a", text: "Que l'ordinateur est forcément sain" },
        { id: "b", text: "Pas grand-chose : une absence de détection n'est pas une preuve d'absence" },
        { id: "c", text: "Que Marc ment" },
      ],
      answer: "b",
      explanation: "Un antivirus ne connaît pas tout. Cet indice d'absence affaiblit à peine une hypothèse.",
    },
    summary: [
      "Une enquête tire des fils d'un journal à l'autre : un compte, une adresse, une date.",
      "`grep -r` cherche dans tous les journaux d'un dossier à la fois.",
      "L'enchaînement phishing, connexion inhabituelle, téléchargements est un scénario d'incident très courant.",
    ],
  },

  {
    id: "j35",
    day: 35,
    week: 5,
    kind: "revision",
    title: "Révision : rédiger une note d'incident",
    duration: 18,
    objective: "rédiger une courte note d'incident qui sépare clairement observations, hypothèses et conclusion.",
    notions: ["observation", "hypothese", "conclusion", "chronologie", "incident"],
    competences: ["enquete", "chronologie"],
    learn: {
      paragraphs: [
        "Une enquête ne sert à rien si ses résultats ne sont pas transmis clairement. La note d'incident est l'outil de base : quelques paragraphes qui permettent à un responsable de décider.",
        "Une bonne note suit un plan simple. **Ce qu'on a observé** : les faits, datés, avec leur source. **Ce qu'on suppose** : les hypothèses, avec ce qui les soutient. **Ce qu'on conclut** : avec un degré de certitude explicite. **Ce qu'on recommande** : les mesures immédiates, puis celles pour éviter que cela se reproduise.",
        "Écris pour quelqu'un qui n'a pas suivi l'enquête : phrases courtes, pas de jargon inutile, et jamais d'accusation sans preuve.",
      ],
      example: {
        title: "le constat amiable",
        paragraphs: [
          "Après un accrochage, le constat sépare les faits (lieu, heure, croquis) des déclarations de chacun. C'est cette séparation qui permet ensuite à l'assureur de décider sereinement.",
        ],
      },
    },
    exercise: {
      type: "reflection",
      instructions: "À partir de l'enquête d'hier sur le compte de Marc, rédige une courte note d'incident. Le rappel des faits est ci-dessous.",
      simulation: "Le scénario est fictif. Ta note reste dans ce navigateur.",
      retry: "Relis le plan de la leçon : observations, hypothèses, conclusion, recommandations.",
      context: [
        "Rappel des faits du défi d'hier. **Vendredi 15 mai, 16:20** : Marc reçoit un e-mail « Votre mot de passe expire aujourd'hui » envoyé depuis `messagerie-verif.test`. **16:24** : il clique sur le lien.",
        "**Dimanche 17 mai, 22:58** : connexion au compte de Marc depuis `203.0.113.45`, adresse jamais utilisée. **23:01 à 23:04** : téléchargement de trois fichiers (clients, contrats signés, factures d'avril). **Lundi 18 mai, 08:57** : Marc se connecte normalement depuis son poste.",
      ],
      prompts: [
        { id: "observations", label: "Ce qu'on a observé (les faits, datés)", placeholder: "Ex. : Le 17 mai à 22:58, …" },
        { id: "hypotheses", label: "Ce qu'on suppose (au moins une hypothèse, et ce qui la soutient)", placeholder: "Il est possible que…" },
        { id: "conclusion", label: "Ce qu'on conclut, et ce qu'on recommande", placeholder: "Très probablement… Nous recommandons…" },
      ],
      criteria: [
        "Mes observations sont datées et ne contiennent aucune interprétation.",
        "Mes hypothèses sont présentées comme telles (« il est possible », « probablement ») et reliées à des indices.",
        "Ma conclusion indique un degré de certitude et n'accuse personne sans preuve.",
        "Je recommande au moins une mesure immédiate (mot de passe, sessions, double authentification).",
        "Je recommande au moins une mesure pour éviter que cela se reproduise (sensibilisation, double authentification généralisée, alerte sur les connexions inhabituelles).",
      ],
      reference: [
        "**Observations.** Le 15 mai à 16:20, Marc a reçu un e-mail l'invitant à renouveler son mot de passe, envoyé depuis le domaine `messagerie-verif.test`, qui n'est pas celui de notre messagerie ; il a cliqué sur le lien à 16:24. Le 17 mai à 22:58, son compte s'est connecté depuis l'adresse `203.0.113.45`, jamais utilisée auparavant. Entre 23:01 et 23:04, trois fichiers ont été téléchargés : liste des clients, contrats signés, factures d'avril.",
        "**Hypothèses.** Le mot de passe de Marc a pu être saisi sur une fausse page le 15 mai, puis utilisé par un tiers le 17 mai : l'enchaînement des dates et le domaine imité le soutiennent. Il reste à vérifier avec Marc qu'il ne s'est pas connecté lui-même ce soir-là.",
        "**Conclusion et recommandations.** Le compte de Marc a très probablement été utilisé par une autre personne, à la suite d'un phishing ; la manière exacte reste à confirmer. Mesures immédiates : changer son mot de passe, fermer toutes ses sessions, activer la double authentification. Ensuite : évaluer les conséquences de la sortie des fichiers clients, étendre la double authentification à tous les comptes, et rappeler à l'équipe comment vérifier un lien.",
      ],
    },
    hints: [
      "Reprends les faits tels quels, avec leurs heures : ce sont tes observations.",
      "Pour la conclusion, choisis un mot de certitude (« très probablement ») et termine par des mesures concrètes.",
    ],
    correction: [
      "Une note d'incident réussie se lit en deux minutes et permet de décider. Sa force tient à la séparation nette entre ce qui est su et ce qui est supposé.",
      "Compare ta note à la référence avec la grille : il n'y a pas une seule bonne rédaction, mais les cinq critères sont ceux qu'un responsable attend.",
    ],
    recall: {
      notion: "chronologie",
      fromDay: 32,
      prompt: "Pourquoi convertir toutes les heures dans un même fuseau avant d'établir une chronologie ?",
      options: [
        { id: "a", text: "Pour que les événements apparaissent dans leur ordre réel" },
        { id: "b", text: "Parce que les journaux en UTC sont faux" },
        { id: "c", text: "Ce n'est pas nécessaire si les sources sont fiables" },
      ],
      answer: "a",
      explanation: "Sans conversion, un événement noté en UTC peut sembler précéder sa propre cause.",
    },
    summary: [
      "Une note d'incident : observations, hypothèses, conclusion avec degré de certitude, recommandations.",
      "Écris pour quelqu'un qui n'a pas suivi l'enquête, sans accuser sans preuve.",
      "Les recommandations distinguent l'urgence et la prévention.",
    ],
  },
];

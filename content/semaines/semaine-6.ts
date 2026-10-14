import type { Session } from "../types";
import { dir, file, homeRoot } from "../fs";

const FS_J39 = homeRoot(
  "lea",
  [file("demande.txt", "Message de la direction :\nUn audit rapide des dossiers partagés est demandé. Vérifie qu'aucun mot de passe ne traîne en clair dans /srv/partage.\n")],
  [
    dir(
      "srv",
      [
        dir(
          "partage",
          [
            dir(
              "public",
              [
                file("charte-informatique.txt", "Charte informatique (extrait)\nNe jamais stocker de mot de passe dans un fichier partagé.\nUtiliser le gestionnaire de mots de passe de l'équipe.\n", { owner: "nadia", perms: "-rw-r--r--" }),
                file("plan-acces.txt", "Accès au bureau : 2e étage, porte B.\n", { owner: "nadia", perms: "-rw-r--r--" }),
                file(
                  "export-identifiants.txt",
                  "Export rapide pour la migration, à supprimer après\nservice=boutique compte=admin-boutique motdepasse=Fictif-Boutique-2026\nservice=reseau-social compte=atelier_lumen motdepasse=Fictif-Social-77\nservice=imprimante compte=admin note=voir avec Nadia\n",
                  { owner: "karim", group: "karim", perms: "-rw-r--r--" },
                ),
              ],
              { owner: "root", perms: "drwxr-xr-x" },
            ),
            dir("projets", [file("devis-jardin.txt", "Devis jardin partagé : 3 bacs, 2 composteurs.\n", { owner: "marc", group: "equipe", perms: "-rw-rw----" })], {
              owner: "root",
              group: "equipe",
              perms: "drwxrwx---",
            }),
            dir("rh", [file("contrats.txt", "Dossier du service RH.\n", { owner: "rh", perms: "-rw-------" })], { owner: "rh", perms: "drwx------" }),
          ],
          { owner: "root" },
        ),
      ],
      { owner: "root" },
    ),
  ],
);

/** Semaine 6 : Consolider les acquis. */
export const SEMAINE_6: Session[] = [
  {
    id: "j36",
    day: 36,
    week: 6,
    kind: "apprentissage",
    title: "Scénario : les liens d'une journée ordinaire",
    duration: 18,
    objective: "appliquer en une seule démarche la lecture d'adresse, la détection du phishing et la juste place de HTTPS.",
    notions: ["url", "nom-de-domaine", "sous-domaine", "phishing", "https"],
    competences: ["url", "phishing"],
    learn: {
      paragraphs: [
        "Cette dernière semaine assemble ce que tu as appris. Plus de nouvelles notions : des situations réalistes, où plusieurs réflexes doivent jouer ensemble.",
        "Face à un lien, une démarche en quatre questions suffit presque toujours. **Qui prétend m'écrire ?** **Quel est le véritable domaine** du lien, lu de droite à gauche avant la première barre oblique ? **Que me demande-t-on ?** Payer, me connecter, donner un code ? **Par quel canal** puis-je vérifier sans utiliser ce lien ?",
        "Le cadenas n'entre pas dans la liste : [[https|HTTPS]] ne dit rien de l'honnêteté d'un site. Et un [[sous-domaine]] qui reprend le nom d'une marque ne prouve rien non plus.",
        "Les pièges d'aujourd'hui sont un peu plus retors qu'au jour 5 : un `.test` placé au milieu du nom d'hôte, un `@` caché, une autre extension que celle attendue. La méthode, elle, ne change pas.",
      ],
      example: {
        title: "le panneau de chantier",
        paragraphs: [
          "Un faux panneau « Déviation » peut être très bien imité. Le bon conducteur ne juge pas la qualité du panneau : il se demande s'il mène vers sa destination, et vérifie sur sa carte en cas de doute.",
        ],
      },
    },
    exercise: {
      type: "url",
      instructions: "Voici six liens reçus au cours d'une même journée. Pour chacun, trouve le véritable domaine et dis s'il mène là où il le prétend.",
      simulation: "Tous ces liens sont fictifs. Les sites officiels fictifs sont colis-express.test, impots-service.test, mediatheque-exemple.test et banque-horizon.test.",
      retry:
        "Repère la première barre oblique après `://`, enlève tout ce qui précède un éventuel `@`, puis prends les deux derniers éléments du nom d'hôte. Un `.test` au milieu du nom ne termine rien : seul le dernier compte.",
      items: [
        {
          id: "u1",
          url: "https://suivi.colis-express.test/colis/FR4821",
          claim: "SMS de Colis Express, ton transporteur habituel (site officiel : colis-express.test).",
          choices: ["suivi.colis-express.test", "colis-express.test", "FR4821"],
          answer: "colis-express.test",
          legit: true,
          why: "Le domaine est bien `colis-express.test`. `suivi` est un sous-domaine du transporteur, et le lien ne demande qu'à suivre un colis.",
        },
        {
          id: "u2",
          url: "https://colis-express.reexpedition-paiement.test/frais",
          claim: "SMS « Colis Express : frais de réexpédition de 1,99 € à régler aujourd'hui ».",
          choices: ["colis-express.test", "reexpedition-paiement.test", "colis-express.reexpedition-paiement.test"],
          answer: "reexpedition-paiement.test",
          legit: false,
          why: "Le domaine est `reexpedition-paiement.test`. Ajoute la demande de paiement urgent : c'est un phishing classique.",
        },
        {
          id: "u3",
          url: "https://www.impots-service.test@remboursement-dossier.test/formulaire",
          claim: "E-mail « Un remboursement d'impôt vous attend » (site officiel : impots-service.test).",
          choices: ["impots-service.test", "remboursement-dossier.test", "www.impots-service.test"],
          answer: "remboursement-dossier.test",
          legit: false,
          why: "Le `@` cache la vraie destination : tout ce qui précède est ignoré. On arrive sur `remboursement-dossier.test`.",
        },
        {
          id: "u4",
          url: "https://www.mediatheque-exemple.test/reservations?livre=8812",
          claim: "E-mail de ta médiathèque : « Le livre que vous avez réservé est disponible ».",
          choices: ["mediatheque-exemple.test", "www.mediatheque-exemple.test", "livre=8812"],
          answer: "mediatheque-exemple.test",
          legit: true,
          why: "Bon domaine, demande ordinaire (consulter une réservation) : rien de suspect.",
        },
        {
          id: "u5",
          url: "https://mediatheque-exemple.test.prolongation-pret.test/connexion",
          claim: "SMS « Votre prêt expire ce soir, prolongez-le en vous connectant ».",
          choices: ["mediatheque-exemple.test", "prolongation-pret.test", "test.prolongation-pret.test"],
          answer: "prolongation-pret.test",
          legit: false,
          why: "Le `.test` du milieu fait illusion : le nom d'hôte se termine par `prolongation-pret.test`. Tout le reste est un sous-domaine.",
        },
        {
          id: "u6",
          url: "https://banque-horizon.test.securite-compte.example/login",
          claim: "Message « Banque Horizon : vérification obligatoire de votre compte ».",
          choices: ["banque-horizon.test", "securite-compte.example", "banque-horizon.test.securite-compte.example"],
          answer: "securite-compte.example",
          legit: false,
          why: "Lu de droite à gauche : extension `.example`, domaine `securite-compte.example`. L'adresse de la banque n'est qu'un préfixe trompeur.",
        },
      ],
    },
    hints: [
      "Deux liens sur six sont légitimes : ce sont ceux dont le nom d'hôte se termine exactement par le domaine officiel.",
      "Dans `mediatheque-exemple.test.prolongation-pret.test`, compte les éléments depuis la droite : `test`, puis `prolongation-pret`.",
    ],
    correction: [
      "Quatre liens sur six sont piégés, avec trois techniques différentes : un sous-domaine qui reprend la marque, un `@` qui cache la destination, et le nom officiel complet placé au début d'un autre domaine.",
      "Les deux liens légitimes se reconnaissent de la même façon : leur nom d'hôte se termine exactement par le domaine officiel, et ce qu'ils demandent est ordinaire.",
      "Dans la vraie vie, tu n'as pas besoin de trancher à chaque fois : en cas de doute, ouvre toi-même l'application ou tape l'adresse que tu connais. C'est la quatrième question de la méthode, et la plus sûre.",
    ],
    recall: {
      notion: "conclusion",
      fromDay: 35,
      prompt: "Laquelle de ces phrases est une conclusion bien formulée ?",
      options: [
        { id: "a", text: "« Le compte a forcément été piraté par un concurrent. »" },
        { id: "b", text: "« Au vu des indices concordants, le compte a très probablement été utilisé par un tiers ; le moyen reste à confirmer. »" },
        { id: "c", text: "« Une connexion a eu lieu à 22:58. »" },
      ],
      answer: "b",
      explanation: "Elle s'appuie sur des indices, dit son degré de certitude et ce qui reste inconnu. La dernière phrase est une observation ; la première prête une intention sans preuve.",
    },
    summary: [
      "Quatre questions face à un lien : qui prétend écrire, quel domaine réel, quelle demande, quel canal pour vérifier.",
      "Le cadenas et les sous-domaines ne prouvent rien.",
      "Seul compte le nom d'hôte qui se termine exactement par le domaine officiel.",
    ],
  },

  {
    id: "j37",
    day: 37,
    week: 6,
    kind: "apprentissage",
    title: "Scénario : le compte partagé du bureau",
    duration: 18,
    objective: "proposer une organisation des accès qui combine comptes individuels, rôles, double authentification et gestionnaire.",
    notions: ["moindre-privilege", "role", "gestionnaire-mdp", "double-authentification", "journal"],
    competences: ["comptes", "acces"],
    learn: {
      paragraphs: [
        "Dans beaucoup de petites structures, un seul compte sert à tout le monde : un identifiant, un mot de passe sur un post-it, et c'est parti. C'est pratique, et c'est un nid à problèmes.",
        "D'abord, plus personne ne sait **qui a fait quoi** : le [[journal]] indique « compte atelier » pour toutes les actions. Ensuite, quand quelqu'un part, il faut changer le mot de passe et prévenir tout le monde, ou bien la personne garde l'accès. Enfin, chacun a tous les droits, à l'opposé du [[moindre-privilege|moindre privilège]].",
        "La bonne organisation combine ce que tu as vu : un **compte par personne** avec le bon [[role|rôle]], la [[double-authentification|double authentification]] sur chacun, et, pour les rares accès qui ne peuvent vraiment pas être individuels, un partage par un [[gestionnaire-mdp|gestionnaire de mots de passe]] d'équipe plutôt que par post-it.",
      ],
      example: {
        title: "la clé sous le paillasson",
        paragraphs: [
          "Une clé sous le paillasson, c'est commode pour toute la famille. Mais impossible de savoir qui est entré, impossible de la reprendre à l'ancien colocataire, et n'importe qui peut la trouver.",
        ],
      },
    },
    exercise: {
      type: "justify",
      instructions: "Lis la situation, choisis l'organisation la plus adaptée, et justifie ton choix.",
      simulation: "L'entreprise et les personnes sont fictives.",
      retry: "Demande-toi ce qui se passera au prochain départ, et comment savoir qui a fait une modification. Relis la réaction affichée sous ton choix.",
      situation: [
        "À l'Atelier Lumen, quatre personnes partagent un seul compte pour administrer la boutique en ligne et le réseau social de l'entreprise. Le mot de passe est noté sur un post-it collé sous l'écran de l'accueil.",
        "Karim quitte l'entreprise vendredi. La semaine dernière, un prix du catalogue a été modifié par erreur, et personne ne sait qui l'a fait.",
      ],
      question: "Quelle organisation proposes-tu ?",
      choices: [
        {
          id: "a",
          text: "Garder le compte partagé, mais changer le mot de passe tous les mois.",
          feedback: "Le départ de Karim serait réglé un temps, mais on ne saurait toujours pas qui fait quoi, et chacun garderait tous les droits.",
        },
        {
          id: "b",
          text: "Un compte individuel par personne avec le rôle adapté, la double authentification pour tous, et un gestionnaire d'équipe pour ce qui ne peut pas être individuel.",
          feedback: "Cette organisation règle les trois problèmes : traçabilité, départs, et droits au plus juste.",
        },
        {
          id: "c",
          text: "Ne plus écrire le mot de passe, et le transmettre uniquement à l'oral.",
          feedback: "Le post-it disparaît, mais le compte reste partagé : pas de traçabilité, et Karim connaîtra toujours le mot de passe après son départ.",
        },
        {
          id: "d",
          text: "Confier le compte au seul gérant, qui fera toutes les modifications lui-même.",
          feedback: "Le risque diminue, mais tout repose sur une personne, débordée et indispensable. Les autres ne peuvent plus faire leur travail.",
        },
      ],
      answer: "b",
      justificationPrompt: "Explique en quelques phrases ce que cette organisation change concrètement.",
      criteria: [
        "Ma justification explique qu'avec des comptes individuels, le journal indique qui a fait chaque modification.",
        "Elle explique qu'on peut retirer l'accès de Karim sans changer celui des autres.",
        "Elle mentionne les rôles ou le moindre privilège (chacun n'a que les droits nécessaires).",
        "Elle mentionne la double authentification ou le gestionnaire d'équipe.",
      ],
      reference: [
        "Avec un compte par personne, chaque action est attribuée à quelqu'un : on aurait su qui a modifié le prix, et on pourrait l'aider à éviter l'erreur. Au départ de Karim, on désactive simplement son compte, sans rien changer pour les autres.",
        "Chaque compte reçoit le rôle adapté (le préparateur n'a pas besoin de modifier le catalogue) et la double authentification le protège même si un mot de passe fuit. Pour un accès qui ne peut pas être individuel, le gestionnaire d'équipe permet de partager sans post-it et de retirer l'accès d'une personne.",
      ],
    },
    hints: [
      "Trois problèmes sont à régler : le départ de Karim, l'erreur de prix inexpliquée, et le post-it.",
      "Une seule proposition règle les trois à la fois.",
    ],
    correction: [
      "Les comptes individuels apportent la traçabilité (qui a fait quoi) et la gestion des départs (on désactive un compte). Les rôles appliquent le moindre privilège. La double authentification et le gestionnaire d'équipe protègent les secrets.",
      "Les autres propositions déplacent le problème sans le résoudre. Garde ce réflexe : une bonne mesure de sécurité se juge sur les situations concrètes qu'elle règle, ici un départ et une erreur.",
    ],
    recall: {
      notion: "sous-domaine",
      fromDay: 36,
      prompt: "Dans `suivi.colis-express.test`, que représente `suivi` ?",
      options: [
        { id: "a", text: "Un sous-domaine, choisi par le propriétaire de colis-express.test" },
        { id: "b", text: "Le véritable nom de domaine" },
        { id: "c", text: "Le chemin de la page" },
      ],
      answer: "a",
      explanation: "Tout ce qui est à gauche du domaine est un sous-domaine. Ici, il appartient bien au transporteur.",
    },
    summary: [
      "Un compte partagé efface la traçabilité, complique les départs et donne tous les droits à tous.",
      "Un compte par personne, avec un rôle et la double authentification, règle ces trois problèmes.",
      "Pour les rares accès collectifs, un gestionnaire d'équipe remplace avantageusement le post-it.",
    ],
  },

  {
    id: "j38",
    day: 38,
    week: 6,
    kind: "apprentissage",
    title: "Scénario : une alerte de connexion, vraie ou fausse ?",
    duration: 15,
    objective: "reconnaître une vraie alerte de sécurité et y réagir sans panique ni excès de méfiance.",
    notions: ["phishing", "faux-positif", "session", "double-authentification"],
    competences: ["phishing", "comptes", "journaux"],
    learn: {
      paragraphs: [
        "Après cinq semaines, un risque nouveau apparaît : voir du phishing partout. Or les services sérieux envoient de vraies alertes, et les ignorer serait une erreur.",
        "Une vraie alerte a un profil reconnaissable. Elle vient du **domaine du service**. Elle **décrit un fait précis** (appareil, lieu approximatif, heure) que tu peux confronter à tes souvenirs. Elle **propose sans menacer** : « si c'était vous, rien à faire ; sinon, sécurisez votre compte ». Et elle te renvoie vers des réglages que tu peux ouvrir toi-même.",
        "La bonne réaction reste la même que face à un doute : vérifier par ton propre chemin. Ouvre l'application ou tape l'adresse du service, et regarde l'historique des connexions et les [[session|sessions]] ouvertes. Si une connexion t'est inconnue, ferme les sessions, change le mot de passe, vérifie la [[double-authentification|double authentification]].",
      ],
      example: {
        title: "l'appel de la banque",
        paragraphs: [
          "Ta banque t'envoie un SMS : « Paiement de 42 € chez la Boulangerie du Port, est-ce vous ? ». Si tu viens d'acheter ton pain, l'alerte est rassurante, pas inquiétante. Elle prouve que le système surveille.",
        ],
      },
    },
    exercise: {
      type: "message",
      channel: "email",
      instructions:
        "Hier soir, tu as dîné chez ta sœur à Lille et tu as consulté ta messagerie depuis son ordinateur portable. Ce matin, tu reçois cet e-mail de ton fournisseur de messagerie, Courriel Plus (domaine courriel-plus.test). Signale ce qui te semble suspect, s'il y a quelque chose, puis choisis ta réaction.",
      simulation: "Ce message et ce fournisseur sont fictifs.",
      retry:
        "Applique la même grille qu'au jour 11, sans présumer du résultat : domaine de l'expéditeur, destination du lien, présence ou absence de menace et de demande inhabituelle, cohérence avec ce que tu as fait hier.",
      fields: [
        {
          label: "De",
          value: [
            "Courriel Plus ",
            { id: "from", text: "<securite@courriel-plus.test>", suspicious: false, why: "Le domaine est exactement celui de ton fournisseur." },
          ],
        },
        { label: "À", value: ["toi@example.com"] },
        { label: "Objet", value: [{ id: "subject", text: "Nouvelle connexion à votre compte", suspicious: false, why: "Un objet factuel, sans urgence ni menace." }] },
      ],
      body: [
        ["Bonjour,"],
        [
          "Une nouvelle connexion à votre compte a été détectée : ",
          { id: "detail", text: "Firefox sur Windows, près de Lille, le 3 juin à 21:14.", suspicious: false, why: "Un fait précis, que tu peux confronter à ta soirée : il correspond à ta visite chez ta sœur." },
        ],
        [
          { id: "noaction", text: "Si c'était vous, aucune action n'est nécessaire.", suspicious: false, why: "Une vraie alerte n'exige rien quand tout va bien. Un phishing, lui, demande toujours une action." },
          " ",
          {
            id: "advice",
            text: "Sinon, ouvrez l'application ou les réglages de sécurité de votre compte pour fermer cette session et changer votre mot de passe.",
            suspicious: false,
            why: "Le message te renvoie vers un chemin que tu connais, sans délai ni menace.",
          },
        ],
        [{ id: "never", text: "Courriel Plus ne vous demandera jamais votre mot de passe par e-mail.", suspicious: false, why: "Un rappel habituel des vrais services. Il ne prouve rien à lui seul, mais il est cohérent avec le reste." }],
      ],
      button: {
        id: "button",
        text: "Vérifier l'activité récente",
        suspicious: false,
        link: "https://compte.courriel-plus.test/securite/activite",
        why: "Le lien mène bien à `courriel-plus.test`. Ouvrir toi-même l'application reste toutefois le réflexe le plus sûr.",
      },
      verdict: {
        prompt: "Quelle est la réaction la plus juste ?",
        options: [
          { id: "a", text: "C'est forcément du phishing : je le supprime et je change tous mes mots de passe." },
          { id: "b", text: "C'est très probablement une vraie alerte, cohérente avec ma soirée. Je peux le vérifier en ouvrant moi-même l'application, et penser à fermer la session ouverte sur l'ordinateur de ma sœur." },
          { id: "c", text: "Je l'ignore : ces alertes ne servent à rien." },
        ],
        answer: "b",
        explanation:
          "Tous les indices concordent avec une alerte authentique. La seule action utile : vérifier par ton propre chemin, et fermer la session restée ouverte sur un ordinateur qui n'est pas le tien.",
      },
    },
    hints: [
      "Compare chaque élément avec la grille du jour 11 : domaine, lien, menace, demande inhabituelle.",
      "Rien n'oblige un message à contenir un piège. Tu peux très bien ne rien signaler.",
    ],
    correction: [
      "Cet e-mail est une vraie alerte : bon domaine d'expéditeur, lien vers le bon domaine, fait précis et vérifiable, aucune menace ni demande sensible. Il ne fallait rien signaler.",
      "La réaction utile n'est pas de cliquer ou non, mais de vérifier par ton propre chemin et d'en profiter pour fermer la session ouverte chez ta sœur. Une session laissée ouverte sur un appareil prêté est un risque réel, même entre proches.",
      "Savoir reconnaître une vraie alerte compte autant que repérer un faux : une méfiance systématique finit par faire ignorer les avertissements qui comptent. C'est l'équivalent, pour une personne, des faux positifs d'une équipe de sécurité.",
    ],
    recall: {
      notion: "role",
      fromDay: 37,
      prompt: "Pourquoi attribuer un rôle à chaque compte plutôt que tous les droits à tout le monde ?",
      options: [
        { id: "a", text: "Pour que chacun n'ait que les droits nécessaires à son travail" },
        { id: "b", text: "Pour que les mots de passe soient plus courts" },
        { id: "c", text: "Pour éviter d'avoir à se connecter" },
      ],
      answer: "a",
      explanation: "Les rôles appliquent le moindre privilège et limitent les dégâts d'un compte piraté ou d'une erreur.",
    },
    summary: [
      "Une vraie alerte : bon domaine, fait précis, aucune menace, renvoi vers des réglages connus.",
      "Vérifie par ton propre chemin, et ferme les sessions ouvertes sur des appareils qui ne sont pas les tiens.",
      "La méfiance systématique est aussi un risque : elle fait ignorer les vraies alertes.",
    ],
  },

  {
    id: "j39",
    day: 39,
    week: 6,
    kind: "apprentissage",
    title: "Scénario : un fichier qui ne devrait pas être là",
    duration: 20,
    objective: "repérer un secret stocké en clair dans un dossier partagé, évaluer qui pouvait le lire, et proposer les bonnes mesures.",
    notions: ["permissions", "grep", "mot-de-passe", "gestionnaire-mdp"],
    competences: ["terminal", "comptes", "acces"],
    learn: {
      paragraphs: [
        "Un audit de dossiers partagés trouve régulièrement des secrets oubliés : un fichier d'export, une note de migration, des identifiants copiés « juste pour un moment ». Avec `grep -r`, on les retrouve en quelques secondes. Un attaquant entré sur le réseau fait exactement la même chose.",
        "Quand un tel fichier est trouvé, deux questions comptent. **Qui pouvait le lire ?** Les [[permissions]] le disent : si le dernier bloc contient `r`, n'importe quel utilisateur de la machine y avait accès. **Depuis quand ?** S'il a pu être lu, il faut considérer les mots de passe comme exposés.",
        "Les mesures suivent : supprimer le fichier ne suffit pas, il faut **changer les mots de passe concernés**. Puis ranger ces secrets dans un [[gestionnaire-mdp|gestionnaire d'équipe]], et rappeler la règle à tous, sans chercher de coupable : l'erreur est presque toujours une solution de facilité sous la pression.",
        "Un mot d'éthique : en audit comme en enquête, on n'exploite pas ce qu'on trouve. On constate, on signale, on fait changer. Dans cet exercice, les mots de passe sont évidemment fictifs.",
      ],
      example: {
        title: "le double des clés",
        paragraphs: [
          "Tu retrouves le double des clés de l'atelier dans un tiroir de la salle de pause, accessible à tous les visiteurs. Le ranger ne suffit pas : quelqu'un a pu en faire une copie. On change la serrure.",
        ],
      },
    },
    exercise: {
      type: "terminal",
      instructions: "La direction de l'entreprise fictive te demande un audit rapide des dossiers partagés. Lis `demande.txt`, puis mène l'audit dans le terminal.",
      simulation: "Ce terminal est entièrement simulé. Les fichiers et les mots de passe sont fictifs.",
      retry:
        "Utilise `grep -r -i motdepasse /srv/partage` pour chercher dans tous les dossiers lisibles. Ensuite, `ls -l` sur le dossier du fichier trouvé te donne son propriétaire et ses permissions.",
      user: "lea",
      groups: ["lea", "equipe"],
      host: "poste",
      home: "/home/lea",
      startDir: "/home/lea",
      root: FS_J39,
      tasks: [
        { id: "t1", text: "Lis la demande dans `demande.txt`.", check: { kind: "ran", command: "cat", outputIncludes: "audit" } },
        { id: "t2", text: "Cherche le mot `motdepasse` dans tout `/srv/partage`, avec `grep -r`.", check: { kind: "ran", command: "grep", outputIncludes: "export-identifiants.txt" } },
        { id: "t3", text: "Quel fichier contient des mots de passe en clair ?", check: { kind: "answer", accept: ["export-identifiants.txt", "export-identifiants"], placeholder: "nom du fichier" } },
        { id: "t4", text: "Qui en est le propriétaire ?", check: { kind: "answer", accept: ["karim"], placeholder: "un nom d'utilisateur" } },
        {
          id: "t5",
          text: "Quels sont les droits des « autres » sur ce fichier ? (les trois derniers caractères des permissions)",
          check: { kind: "answer", accept: ["r--"], placeholder: "trois caractères" },
        },
        { id: "t6", text: "Combien de lignes de ce fichier contiennent un mot de passe ?", check: { kind: "answer", accept: ["2", "deux"], placeholder: "un nombre" } },
      ],
      solution: ["cat demande.txt", "grep -r -i motdepasse /srv/partage", "ls -l /srv/partage/public", "grep -c motdepasse /srv/partage/public/export-identifiants.txt"],
      solutionAnswers: { t3: "export-identifiants.txt", t4: "karim", t5: "r--", t6: "2" },
    },
    hints: [
      "`grep -r` signale aussi les dossiers qu'il ne peut pas lire : c'est normal, tu n'as pas accès au dossier RH.",
      "Dans `-rw-r--r--`, découpe après le premier caractère en blocs de trois : `rw-`, `r--`, `r--`. Le dernier concerne les autres.",
    ],
    correction: [
      "`grep -r -i motdepasse /srv/partage` trouve `public/export-identifiants.txt`, qui contient deux mots de passe en clair, et signale au passage que le dossier `rh` est inaccessible : c'est le comportement attendu.",
      "`ls -l /srv/partage/public` montre que le fichier appartient à `karim` et porte les permissions `-rw-r--r--` : les autres ont `r--`, donc tout utilisateur de la machine pouvait le lire, et le dossier `public` est ouvert à tous.",
      "Recommandations : changer les mots de passe de la boutique et du réseau social (ils sont exposés depuis la création du fichier), supprimer le fichier, ranger ces accès dans le gestionnaire d'équipe, et vérifier dans les journaux si le fichier a été lu. Le nom du fichier, « à supprimer après », raconte une intention sincère et un oubli classique.",
    ],
    recall: {
      notion: "facteur",
      fromDay: 10,
      prompt: "Recevoir un code sur ton téléphone relève de quel facteur d'authentification ?",
      options: [
        { id: "a", text: "Ce que tu sais" },
        { id: "b", text: "Ce que tu possèdes" },
        { id: "c", text: "Ce que tu es" },
      ],
      answer: "b",
      explanation: "Le téléphone est un objet que tu possèdes. Le mot de passe relève de ce que tu sais, l'empreinte de ce que tu es.",
    },
    summary: [
      "`grep -r` retrouve en quelques secondes les secrets oubliés, pour toi comme pour un attaquant.",
      "Si un secret a pu être lu, il est exposé : on le change, supprimer le fichier ne suffit pas.",
      "On constate et on signale sans exploiter, et sans chercher de coupable.",
    ],
  },

  {
    id: "j40",
    day: 40,
    week: 6,
    kind: "apprentissage",
    title: "La méthode de réponse à un incident",
    duration: 15,
    objective: "ordonner les grandes étapes de la réponse à un incident et expliquer le rôle de chacune.",
    notions: ["incident", "chronologie", "hypothese", "conclusion"],
    competences: ["enquete", "chronologie"],
    learn: {
      paragraphs: [
        "Avant l'enquête finale de demain, voici la méthode qui relie tout ce que tu as fait en semaine 5. Les équipes de sécurité suivent des étapes très proches, quelle que soit la taille de l'[[incident]].",
        "On commence par **signaler** et noter l'heure, sans rien effacer. On **contient** ensuite les dégâts : bloquer un compte, isoler un poste du réseau, plutôt que l'éteindre ou le réinstaller, ce qui détruirait des traces. Puis on **préserve** les journaux utiles, avant qu'ils ne soient écrasés.",
        "Vient le cœur du travail, que tu connais : établir les observations et la [[chronologie]], formuler les [[hypothese|hypothèses]] et les tester, puis **conclure** avec un degré de certitude et remettre en état.",
        "Enfin, on tire les leçons : quelle mesure aurait empêché l'incident, ou l'aurait fait détecter plus tôt ? Cette dernière étape est la plus souvent oubliée, et pourtant celle qui évite de revivre le même incident.",
      ],
      example: {
        title: "le dégât des eaux",
        paragraphs: [
          "Une fuite dans la cuisine : tu préviens, tu coupes l'eau (contenir), tu prends des photos avant d'éponger (préserver), tu cherches d'où vient l'eau (enquêter), le plombier répare (remettre en état), et tu fais vérifier les autres joints (tirer les leçons).",
        ],
      },
    },
    exercise: {
      type: "order",
      variant: "steps",
      instructions: "Remets dans l'ordre les étapes de la réponse à un incident de sécurité.",
      retry: "Demande-toi ce qui devient impossible si une étape est faite trop tard : on contient avant que les dégâts s'étendent, on préserve avant que les traces disparaissent, on conclut après avoir testé.",
      items: [
        { id: "m1", text: "Signaler l'alerte et noter l'heure, sans rien effacer.", note: "Tout commence par un signalement daté." },
        { id: "m2", text: "Contenir : bloquer le compte concerné, isoler le poste du réseau.", note: "Chaque minute compte, mais on isole plutôt qu'on éteint ou réinstalle." },
        { id: "m3", text: "Préserver les traces : copier les journaux utiles.", note: "Avant qu'ils ne soient écrasés ou effacés." },
        { id: "m4", text: "Établir les observations et la chronologie.", note: "Les faits, datés et convertis dans une même heure." },
        { id: "m5", text: "Formuler les hypothèses et chercher les indices qui les départagent.", note: "Plusieurs hypothèses, un indice décisif." },
        { id: "m6", text: "Conclure avec un degré de certitude, puis remettre en état.", note: "Mots de passe, réglages, données restaurées." },
        { id: "m7", text: "Tirer les leçons et décider des mesures pour éviter que cela se reproduise.", note: "L'étape la plus souvent oubliée." },
      ],
    },
    hints: [
      "Les deux étapes qui suivent immédiatement le signalement visent à limiter les dégâts, puis à ne pas perdre les preuves.",
      "On ne peut pas formuler d'hypothèses solides avant d'avoir établi les faits.",
    ],
    correction: [
      "Signaler, contenir, préserver, observer, tester, conclure, tirer les leçons. Les trois premières étapes vont vite et se chevauchent souvent ; l'important est de ne rien effacer en voulant agir vite.",
      "Tu as déjà pratiqué le cœur de cette méthode en semaine 5. Demain, l'enquête finale te demandera de l'appliquer du début à la fin.",
    ],
    recall: {
      notion: "permissions",
      fromDay: 39,
      prompt: "Un fichier en `-rw-r--r--` contient des mots de passe. Qui pouvait le lire ?",
      options: [
        { id: "a", text: "Seulement son propriétaire" },
        { id: "b", text: "Son propriétaire et son groupe" },
        { id: "c", text: "Tous les utilisateurs de la machine" },
      ],
      answer: "c",
      explanation: "Le dernier bloc, `r--`, donne la lecture aux autres : tout le monde. Les mots de passe doivent être considérés comme exposés.",
    },
    summary: [
      "Signaler, contenir, préserver : vite, mais sans rien effacer.",
      "Observer, tester les hypothèses, conclure : la méthode de l'enquête.",
      "Tirer les leçons évite de revivre le même incident.",
    ],
  },

  {
    id: "j41",
    day: 41,
    week: 6,
    kind: "defi",
    title: "Enquête finale : les coordonnées bancaires modifiées",
    duration: 20,
    objective: "mener une enquête complète qui mobilise les notions des six semaines.",
    notions: ["phishing", "nom-de-domaine", "fuseau-horaire", "autorisation", "double-authentification", "observation"],
    competences: ["url", "phishing", "comptes", "acces", "journaux", "enquete", "chronologie"],
    learn: {
      paragraphs: [
        "Voici l'enquête finale. Elle mobilise presque tout le programme : lire une adresse, reconnaître un phishing, comprendre les rôles, convertir des heures, séparer les faits des suppositions, et recommander des mesures.",
        "Prends ton temps. Ouvre tous les indices, note dans ta zone personnelle ce que tu observes, puis réponds aux questions. Les indices et la correction restent disponibles, comme toujours.",
      ],
      example: {
        title: "le puzzle",
        paragraphs: [
          "Chaque indice est une pièce : seule, elle ne montre presque rien. Assemblées dans le bon ordre, les pièces racontent une histoire claire, et révèlent parfois la pièce qui manque.",
        ],
      },
    },
    exercise: {
      type: "investigation",
      instructions: "La boutique en ligne fictive de l'Atelier Lumen fait face à un incident. Mène l'enquête.",
      simulation: "La boutique, la plateforme, les personnes et les traces sont fictives. Le site officiel de la plateforme est boutique-plateforme.test.",
      retry:
        "Reprends la méthode d'hier : établis d'abord les faits et leur chronologie (en convertissant l'UTC : + 2 heures en juin), puis relie-les. Les questions suivent le fil de l'enquête.",
      brief: [
        "Lundi 8 juin, 10 h 12 : une cliente s'étonne des coordonnées bancaires indiquées dans son e-mail de confirmation de commande. Marc, le gérant, te demande de comprendre ce qui s'est passé et de proposer des mesures.",
        "La boutique fonctionne sur une plateforme en ligne dont l'adresse officielle est `boutique-plateforme.test`. En juin, l'heure de Paris vaut UTC + 2.",
      ],
      clues: [
        {
          id: "a",
          title: "Le message de Julie, cliente",
          source: "formulaire de contact, lundi 8 juin 10:12",
          kind: "email",
          content:
            "Bonjour,\nVotre e-mail de confirmation m'indique un nouveau RIB pour le virement, différent de celui de ma commande précédente. Est-ce normal ? Je préfère vérifier avant de payer.\nJulie",
        },
        {
          id: "b",
          title: "E-mail reçu par Marc",
          source: "messagerie de Marc, vendredi 5 juin 17:41",
          kind: "email",
          content:
            "De : Plateforme Boutique <support@boutique-plateforme-securite.test>\nObjet : Vérifiez votre compte administrateur sous 48 h\n\nSans vérification, votre boutique sera suspendue.\nVérifier mon compte : https://boutique-plateforme.test.verification-admin.test/login",
        },
        {
          id: "c",
          title: "Journal d'administration de la plateforme",
          source: "plateforme de la boutique, heures en UTC",
          kind: "log",
          content: [
            "2026-06-05 15:43:10 UTC connexion admin=marc ip=203.0.113.88 double_auth=non_activee resultat=succes",
            "2026-06-06 21:02:55 UTC connexion admin=marc ip=203.0.113.88 resultat=succes",
            "2026-06-06 21:05:31 UTC modification parametre=coordonnees_bancaires ancienne=FR76...1234 nouvelle=FR76...9876",
            "2026-06-06 21:06:02 UTC modification parametre=copie_des_commandes ajout=copie-commandes@example.net",
            "2026-06-08 07:30:00 UTC connexion admin=marc ip=192.168.10.34 resultat=succes",
          ].join("\n"),
        },
        {
          id: "d",
          title: "Le témoignage de Marc",
          source: "entretien, lundi 8 juin 10:40",
          kind: "text",
          content: "« Vendredi, peu avant 17 h 45, j'ai cliqué sur un lien de la plateforme pour vérifier mon compte. J'ai saisi mon identifiant et mon mot de passe, puis la page a affiché une erreur. Je n'y ai plus pensé. »",
        },
        {
          id: "e",
          title: "Les rôles sur la plateforme",
          source: "réglages de la boutique",
          kind: "text",
          content: "Marc : administrateur. Hugo : préparateur. Samia : comptable.\nSeul le rôle administrateur peut modifier les coordonnées bancaires et les adresses de notification.",
        },
      ],
      questions: [
        {
          id: "q1",
          prompt: "Quel est le véritable domaine du lien reçu par Marc ?",
          options: [
            { id: "a", text: "boutique-plateforme.test" },
            { id: "b", text: "verification-admin.test" },
            { id: "c", text: "boutique-plateforme-securite.test" },
          ],
          answers: ["b"],
          explanation: "Le nom d'hôte se termine par `verification-admin.test`. Le nom de la vraie plateforme n'est qu'un préfixe, et l'expéditeur utilise encore un autre domaine.",
        },
        {
          id: "q2",
          prompt: "En heure de Paris, quand a eu lieu la première connexion depuis 203.0.113.88 ?",
          options: [
            { id: "a", text: "Vendredi à 15:43" },
            { id: "b", text: "Vendredi à 17:43" },
            { id: "c", text: "Samedi à 21:02" },
          ],
          answers: ["b"],
          explanation: "15:43 UTC + 2 heures = 17:43 à Paris, deux minutes après la réception de l'e-mail (17:41) et juste au moment où Marc dit avoir saisi ses identifiants.",
        },
        {
          id: "q3",
          prompt: "Parmi ces affirmations, lesquelles sont des observations ?",
          options: [
            { id: "a", text: "Les coordonnées bancaires ont été modifiées le samedi 6 juin à 23:05, heure de Paris." },
            { id: "b", text: "Une adresse de copie des commandes a été ajoutée juste après." },
            { id: "c", text: "L'attaquant est un ancien salarié de la boutique." },
            { id: "d", text: "Marc est complice." },
          ],
          answers: ["a", "b"],
          explanation: "A et B figurent dans le journal (21:05 et 21:06 UTC, soit 23:05 et 23:06 à Paris). C et D prêtent des identités et des intentions que rien ne soutient.",
        },
        {
          id: "q4",
          prompt: "Pourquoi l'attaquant a-t-il visé précisément le compte de Marc ?",
          options: [
            { id: "a", text: "Seul le rôle administrateur peut modifier les coordonnées bancaires : il lui fallait ce compte-là." },
            { id: "b", text: "Parce que tous les comptes peuvent modifier les coordonnées bancaires." },
            { id: "c", text: "Par hasard." },
          ],
          answers: ["a"],
          explanation: "L'indice E le montre : l'autorisation fonctionne bien, donc l'attaquant devait obtenir l'identité d'un administrateur. Un phishing ciblé sur le gérant était le chemin le plus court.",
        },
        {
          id: "q5",
          prompt: "Quelle protection aurait très probablement empêché la connexion de l'attaquant ?",
          options: [
            { id: "a", text: "La double authentification sur le compte administrateur." },
            { id: "b", text: "Un mot de passe plus long." },
            { id: "c", text: "Un antivirus sur l'ordinateur de Marc." },
          ],
          answers: ["a"],
          explanation:
            "Le journal indique `double_auth=non_activee`. Un mot de passe plus long n'aurait rien changé : Marc l'a lui-même saisi sur la fausse page. Une clé physique ou une passkey aurait même refusé de fonctionner sur le faux domaine.",
        },
        {
          id: "q6",
          prompt: "Quelles mesures recommandes-tu en priorité ?",
          options: [
            {
              id: "a",
              text: "Rétablir les bonnes coordonnées, supprimer l'adresse de copie, changer le mot de passe de Marc et fermer ses sessions, activer la double authentification, et prévenir les clients concernés.",
            },
            { id: "b", text: "Rétablir seulement les bonnes coordonnées bancaires." },
            { id: "c", text: "Fermer définitivement la boutique." },
          ],
          answers: ["a"],
          explanation:
            "L'attaquant a laissé deux modifications : le RIB et une copie des commandes vers une adresse extérieure. Il faut tout défaire, couper son accès, empêcher une récidive, et prévenir les clients qui ont pu payer sur le mauvais compte.",
        },
      ],
    },
    hints: [
      "Pour l'heure, ajoute 2 heures à 15:43 UTC, puis compare avec l'heure de l'e-mail et le témoignage de Marc.",
      "Le journal d'administration contient deux modifications faites par l'attaquant, pas une seule. Et regarde ce qu'il dit de la double authentification.",
    ],
    correction: [
      "La chronologie, en heure de Paris : vendredi 17:41, Marc reçoit un faux e-mail de la plateforme ; peu avant 17:45, il saisit ses identifiants sur `verification-admin.test` ; à 17:43, une connexion réussit depuis `203.0.113.88`, sans double authentification. Samedi 23:02, la même adresse revient, change les coordonnées bancaires à 23:05 et ajoute une copie des commandes à 23:06. Lundi, une cliente attentive donne l'alerte.",
      "Ce qu'on peut conclure, avec un haut degré de certitude : le compte administrateur de Marc a été obtenu par phishing, puis utilisé pour détourner les paiements. Ce qu'on ne sait pas : qui est derrière l'adresse `203.0.113.88`. Rien ne permet d'accuser qui que ce soit.",
      "Toutes les compétences du programme y étaient : lire un domaine, reconnaître un phishing, comprendre pourquoi seul ce rôle était visé, convertir l'UTC, séparer observations et suppositions, et recommander des mesures immédiates et préventives. Bravo pour ce parcours.",
    ],
    recall: {
      notion: "incident",
      fromDay: 40,
      prompt: "Pourquoi isoler un poste du réseau plutôt que l'éteindre ou le réinstaller tout de suite ?",
      options: [
        { id: "a", text: "Pour contenir les dégâts sans détruire les traces utiles à l'enquête" },
        { id: "b", text: "Parce qu'éteindre un ordinateur est interdit" },
        { id: "c", text: "Pour que l'attaquant puisse finir" },
      ],
      answer: "a",
      explanation: "Isoler arrête la propagation tout en conservant ce que la machine peut encore révéler.",
    },
    summary: [
      "Un phishing ciblé a donné à l'attaquant le seul rôle capable de détourner les paiements.",
      "La conversion UTC relie l'e-mail, la saisie des identifiants et la première connexion à quelques minutes près.",
      "La double authentification, idéalement par clé ou passkey, aurait très probablement arrêté l'attaque.",
    ],
  },

  {
    id: "j42",
    day: 42,
    week: 6,
    kind: "revision",
    title: "Bilan : ce que tu sais faire maintenant",
    duration: 20,
    objective: "mesurer le chemin parcouru, choisir ce que tu gardes au quotidien, et savoir comment continuer.",
    notions: ["double-authentification", "nom-de-domaine", "observation"],
    competences: ["enquete"],
    learn: {
      paragraphs: [
        "Six semaines, quarante-deux séances. Tu sais maintenant suivre le trajet d'une page web, lire une adresse sans te faire piéger, protéger tes comptes, manipuler un terminal, comprendre comment un site te reconnaît et te contrôle, et mener une petite enquête en séparant les faits des suppositions.",
        "Ce qui compte le plus pour ta sécurité au quotidien tient en quelques habitudes : lire le domaine avant de faire confiance, un mot de passe unique par compte grâce à un gestionnaire, la double authentification sur les comptes importants, et la vérification par un canal connu face à toute demande pressante.",
        "Pour aller plus loin, quelques pistes. Le site gouvernemental Cybermalveillance propose des fiches pratiques et une assistance aux victimes ; la CNIL publie des conseils sur les données personnelles. Si le terminal et l'enquête t'ont plu, les plateformes d'entraînement de type « capture du drapeau » (CTF) proposent des défis pour débutants, toujours dans des environnements prévus pour cela.",
        "Aujourd'hui, l'exercice porte sur toi. Prends dix minutes pour écrire ton bilan, puis ouvre ton bilan final, qui compare tes premiers exercices aux derniers.",
      ],
      example: {
        title: "le carnet de voyage",
        paragraphs: [
          "Au retour d'un voyage, on relit son carnet : ce qu'on ne savait pas en partant, ce qu'on referait, ce qu'on aimerait voir la prochaine fois. C'est souvent à ce moment-là qu'on mesure tout ce qu'on a appris.",
        ],
      },
    },
    exercise: {
      type: "reflection",
      instructions: "Rédige ton bilan personnel en répondant aux trois questions. Il n'y a pas de bonne réponse : la grille t'aide seulement à vérifier que ton bilan est concret.",
      retry: "Prends le temps de citer des notions précises et des situations de ta vie.",
      context: [
        "Si tu veux te rafraîchir la mémoire, ton carnet rassemble toutes tes notes, et le programme liste les 42 séances.",
      ],
      prompts: [
        { id: "notions", label: "Les trois notions qui te semblent les plus utiles dans ta vie, et pourquoi.", placeholder: "Par exemple : lire le domaine d'un lien, parce que…" },
        { id: "habitude", label: "Une habitude que tu as changée, ou que tu vas changer cette semaine.", placeholder: "Concrètement : quoi, et quand ?" },
        { id: "suite", label: "Ce que tu aimerais approfondir ensuite.", placeholder: "Un sujet, une compétence, une question restée ouverte." },
      ],
      criteria: [
        "J'ai cité des notions précises (par exemple le domaine, la double authentification, l'observation), pas seulement « la sécurité ».",
        "J'ai relié au moins une notion à une situation concrète de ma vie.",
        "J'ai décrit une habitude précise, avec un moment pour la mettre en place.",
        "J'ai identifié une piste pour continuer à apprendre.",
      ],
      reference: [
        "**Notions.** Lire le domaine d'un lien de droite à gauche : je reçois plusieurs SMS de livraison par mois et je sais maintenant les trier. La double authentification : un mot de passe qui fuit ne suffit plus. Séparer observation et hypothèse : cela me sert même au travail, quand un problème arrive et que tout le monde accuse quelqu'un.",
        "**Habitude.** Ce week-end, j'installe le gestionnaire de mots de passe de mon navigateur et je change le mot de passe de ma messagerie, avec la double authentification. Les autres comptes suivront, un par semaine.",
        "**Suite.** J'aimerais mieux comprendre comment fonctionnent les sauvegardes, pour me protéger d'un rançongiciel, et essayer un défi de terminal pour débutants.",
      ],
    },
    hints: [
      "Ton carnet et tes bilans hebdomadaires peuvent t'aider à retrouver les notions qui t'ont marqué.",
      "Pour l'habitude, une action précise avec un moment (« ce soir », « samedi ») a beaucoup plus de chances d'être tenue.",
    ],
    correction: [
      "Il n'y a pas de correction à ce bilan, seulement une comparaison avec un exemple de réponse. L'important est qu'il soit concret : des notions précises, une situation de ta vie, une action datée.",
      "Ouvre maintenant ton bilan final : il compare tes premières séances à tes dernières, et te propose de te situer à nouveau sur les affirmations du premier jour.",
    ],
    recall: {
      notion: "double-authentification",
      fromDay: 41,
      prompt: "Le mot de passe de Marc a été volé par phishing. Quelle protection aurait très probablement arrêté l'attaquant ?",
      options: [
        { id: "a", text: "Un mot de passe plus complexe" },
        { id: "b", text: "La double authentification" },
        { id: "c", text: "Changer de navigateur" },
      ],
      answer: "b",
      explanation: "Le mot de passe était connu de l'attaquant, quelle que soit sa complexité. Seule une seconde preuve l'aurait arrêté.",
    },
    summary: [
      "Lire le domaine, un mot de passe unique par compte, la double authentification, vérifier par un canal connu.",
      "Séparer les faits des suppositions sert bien au-delà de la cybersécurité.",
      "Continuer est simple : quelques habitudes, et des ressources fiables pour approfondir.",
    ],
  },
];

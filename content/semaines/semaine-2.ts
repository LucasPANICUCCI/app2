import type { Session } from "../types";

/** Semaine 2 : Protéger ses comptes. */
export const SEMAINE_2: Session[] = [
  {
    id: "j08",
    day: 8,
    week: 2,
    kind: "apprentissage",
    title: "Un mot de passe solide, et un seul par compte",
    duration: 15,
    objective: "juger la solidité d'un mot de passe et expliquer pourquoi la réutilisation est le risque principal.",
    notions: ["mot-de-passe", "phrase-de-passe", "fuite-de-donnees", "attaque-reutilisation", "force-brute"],
    competences: ["comptes"],
    learn: {
      paragraphs: [
        "Un [[mot-de-passe|mot de passe]] est attaqué de deux façons principales. La première consiste à le deviner : un programme essaie des millions de combinaisons par seconde, en commençant par les plus probables. C'est l'[[force-brute|attaque par force brute]], souvent guidée par des listes de mots de passe réels.",
        "Ce qui rend un mot de passe difficile à deviner, c'est surtout sa **longueur** et son **imprévisibilité**. `Soleil2024!` contient majuscule, chiffres et symbole, mais suit le schéma le plus courant du monde : un mot, une année, un point d'exclamation. Les logiciels d'attaque essaient ce schéma en premier, ainsi que les substitutions classiques comme `@` pour `a` ou `3` pour `e`.",
        "Une [[phrase-de-passe|phrase de passe]] faite de cinq ou six mots tirés **au hasard** (et non une citation connue) est longue, donc résistante, tout en restant mémorisable. Un mot de passe aléatoire de seize caractères est excellent aussi, mais impossible à retenir : il faut un gestionnaire, au programme de demain.",
        "La seconde attaque est bien plus fréquente : la **réutilisation**. Des services se font régulièrement voler leur base de comptes : c'est une [[fuite-de-donnees|fuite de données]]. Les attaquants essaient alors automatiquement chaque couple e-mail et mot de passe sur des centaines d'autres sites. C'est l'[[attaque-reutilisation|attaque par réutilisation]]. Si ton mot de passe du forum de cuisine est aussi celui de ta messagerie, la fuite du forum ouvre ta messagerie.",
        "D'où la règle d'or : **un mot de passe différent pour chaque compte important**. Un mot de passe moyen mais unique fait souvent moins de dégâts qu'un excellent mot de passe réutilisé partout.",
      ],
      example: {
        title: "le trousseau de clés",
        paragraphs: [
          "Utiliser le même mot de passe partout, c'est avoir une seule clé pour ta maison, ta voiture, ton bureau et ta boîte aux lettres. La serrure la plus fragile, celle de la boîte aux lettres, devient la porte d'entrée de tout le reste.",
        ],
      },
      callout: {
        title: "Dans cette application",
        text: "Tous les mots de passe de l'exercice sont fictifs. Ne saisis jamais tes vrais mots de passe dans un site ou un outil pour « tester leur solidité ».",
      },
    },
    exercise: {
      type: "order",
      variant: "rank",
      rankLabels: { top: "plus facile à deviner", bottom: "plus difficile à deviner" },
      instructions: "Classe ces mots de passe fictifs du plus facile à deviner (en haut) au plus difficile à deviner (en bas).",
      retry:
        "Compare d'abord la longueur, puis demande-toi si le mot de passe suit un schéma prévisible : mot du dictionnaire, année, suite de touches du clavier. Ce qui est aléatoire et long résiste le mieux.",
      items: [
        { id: "p1", text: "123456", mono: true, note: "Le mot de passe le plus répandu au monde : il figure en tête de toutes les listes d'attaque." },
        { id: "p2", text: "Soleil2024!", mono: true, note: "Un mot courant, une année, un symbole à la fin : le schéma que les outils d'attaque testent dès les premières secondes." },
        { id: "p3", text: "k7#Qv9!p", mono: true, note: "Aléatoire, mais seulement huit caractères : il résiste à une devinette humaine, beaucoup moins à un calcul massif après une fuite." },
        {
          id: "p4",
          text: "brindille-cadastre-orbite-sauge-volcan-tamis",
          mono: true,
          note: "Six mots tirés au hasard : très long, donc très résistant, et mémorisable. À condition que les mots soient vraiment tirés au hasard.",
        },
        { id: "p5", text: "k7#Qv9!pZ2wR4$mx", mono: true, note: "Seize caractères aléatoires : le plus résistant de la liste. Idéal dans un gestionnaire, impossible à retenir de tête." },
      ],
    },
    hints: [
      "Un mot de passe court ou construit à partir d'un mot courant est toujours en haut de la liste, quels que soient ses symboles.",
      "Entre les deux derniers, compare l'imprévisibilité de chaque caractère : un caractère aléatoire parmi environ 90 possibles apporte plus qu'une lettre d'un mot.",
    ],
    correction: [
      "Le classement suit d'abord la prévisibilité, puis la longueur. `123456` et `Soleil2024!` tombent en quelques secondes parce qu'ils suivent des schémas connus. `k7#Qv9!p` est aléatoire mais court.",
      "La phrase de passe de six mots et le mot de passe aléatoire de seize caractères sont tous deux très solides. Le second l'emporte, mais n'est utilisable qu'avec un gestionnaire.",
      "Garde en tête la leçon principale : même le meilleur des cinq devient inutile s'il est réutilisé sur un site qui subit une fuite. L'unicité compte au moins autant que la solidité.",
    ],
    recall: {
      notion: "nom-de-domaine",
      fromDay: 5,
      prompt: "Dans l'adresse `https://banque-horizon.compte-verif.test/connexion`, quel est le véritable nom de domaine ?",
      options: [
        { id: "a", text: "banque-horizon.test" },
        { id: "b", text: "compte-verif.test" },
        { id: "c", text: "banque-horizon.compte-verif.test" },
      ],
      answer: "b",
      explanation: "On lit le nom d'hôte de droite à gauche : `compte-verif.test`. « banque-horizon » n'est qu'un sous-domaine.",
    },
    summary: [
      "La longueur et l'imprévisibilité font la solidité ; les symboles ajoutés à un mot courant aident peu.",
      "Une phrase de passe de mots tirés au hasard est solide et mémorisable.",
      "Le premier risque est la réutilisation : un mot de passe différent pour chaque compte important.",
    ],
  },

  {
    id: "j09",
    day: 9,
    week: 2,
    kind: "apprentissage",
    title: "Le gestionnaire de mots de passe",
    duration: 15,
    objective: "expliquer ce qu'apporte un gestionnaire de mots de passe, ses limites, et comment protéger son mot de passe maître.",
    notions: ["gestionnaire-mdp", "mot-de-passe-maitre"],
    competences: ["comptes"],
    learn: {
      paragraphs: [
        "Avoir un mot de passe différent et solide pour chacun de ses dizaines de comptes est impossible de mémoire. Le [[gestionnaire-mdp|gestionnaire de mots de passe]] règle ce problème : c'est une application qui crée des mots de passe aléatoires, les retient, et les remplit pour toi.",
        "Tous ces mots de passe sont rangés dans un coffre chiffré, ouvert par un seul secret : le [[mot-de-passe-maitre|mot de passe maître]]. C'est le seul que tu dois retenir. Il doit donc être long (une phrase de passe convient très bien), n'être utilisé nulle part ailleurs, et être complété par une double authentification.",
        "Un avantage moins connu : le gestionnaire remplit le mot de passe en fonction du **domaine** du site. Sur `banque-horizom.test`, il ne proposera pas le mot de passe de `banque-horizon.test`. Si ton gestionnaire ne propose rien sur une page qui ressemble à ta banque, c'est un signal d'alerte.",
        "Les navigateurs intègrent aujourd'hui un gestionnaire correct pour débuter. Il existe aussi des applications dédiées, gratuites ou payantes. Le choix compte moins que le fait d'en utiliser un, avec un mot de passe maître solide.",
        "Aucun outil n'est infaillible : un gestionnaire peut avoir des failles, et un appareil infecté peut espionner ce que tu tapes. Mais pour la grande majorité des gens, le gain est très largement supérieur au risque.",
      ],
      example: {
        title: "le coffre à clés",
        paragraphs: [
          "Le gestionnaire ressemble à ces boîtes à clés murales à code : chaque porte a sa propre clé, toutes rangées dans un coffre solide. Tu ne retiens qu'un code. Ce code doit donc être excellent, et tu ne le donnes à personne.",
        ],
      },
    },
    exercise: {
      type: "match",
      variant: "categorize",
      instructions: "Pour chaque affirmation, indique si elle est vraie, fausse, ou s'il faut nuancer.",
      retry:
        "Méfie-toi des affirmations absolues avec « toujours » ou « jamais » : elles sont rarement exactes en sécurité. Pour les autres, demande-toi sur quoi se base le gestionnaire pour remplir un mot de passe.",
      options: [
        { id: "vrai", label: "Vrai" },
        { id: "faux", label: "Faux" },
        { id: "nuance", label: "À nuancer" },
      ],
      items: [
        { id: "s1", text: "Avec un gestionnaire, je n'ai plus qu'un seul mot de passe à retenir.", answer: "vrai", why: "C'est son principe : seul le mot de passe maître reste à mémoriser." },
        { id: "s2", text: "Le gestionnaire peut créer un mot de passe différent et aléatoire pour chaque site.", answer: "vrai", why: "C'est sa fonction principale, et la meilleure parade à la réutilisation." },
        {
          id: "s3",
          text: "Si quelqu'un découvre mon mot de passe maître, tous mes comptes sont exposés.",
          answer: "nuance",
          why: "C'est le grand risque, d'où la double authentification sur le gestionnaire : avec elle, le mot de passe maître seul ne suffit plus.",
        },
        {
          id: "s4",
          text: "Le gestionnaire remplira mon mot de passe sur un faux site qui imite parfaitement ma banque.",
          answer: "faux",
          why: "Il se fie au domaine, pas à l'apparence de la page. Sur un domaine imité, il ne propose rien : c'est un signal d'alerte utile.",
        },
        {
          id: "s5",
          text: "Noter ses mots de passe dans un carnet papier rangé chez soi est toujours une mauvaise idée.",
          answer: "nuance",
          why: "Un carnet chez soi est à l'abri des attaques à distance, qui sont le risque principal. Il est moins pratique et peut se perdre, mais vaut bien mieux qu'un mot de passe réutilisé partout.",
        },
        { id: "s6", text: "Le gestionnaire intégré au navigateur peut suffire pour commencer.", answer: "vrai", why: "S'il est protégé (session de l'ordinateur verrouillée, compte protégé par double authentification), c'est une bonne première étape." },
        { id: "s7", text: "Les gestionnaires de mots de passe ne peuvent jamais être piratés.", answer: "faux", why: "Aucun logiciel n'est infaillible. Le gain reste toutefois très supérieur au risque pour la plupart des gens." },
        { id: "s8", text: "Mon mot de passe maître peut être le même que celui de ma messagerie.", answer: "faux", why: "Il doit être unique : une fuite de la messagerie ouvrirait sinon tout le coffre." },
      ],
    },
    hints: [
      "Trois affirmations contiennent un mot absolu (« toujours », « jamais ») ou une promesse trop belle : examine-les de près.",
      "Deux affirmations sont « à nuancer » : elles décrivent un risque réel, mais qui dépend des précautions prises.",
    ],
    correction: [
      "Le gestionnaire résout le problème de la réutilisation en créant et en retenant des mots de passe uniques. Il concentre en échange tout le risque sur le mot de passe maître, qu'il faut rendre long, unique et protégé par une double authentification.",
      "Son remplissage automatique se base sur le domaine : c'est une protection discrète contre les faux sites.",
      "Les solutions imparfaites, comme le carnet papier, valent souvent mieux que l'absence de solution. En sécurité, on compare des risques, rarement le parfait et le mauvais.",
    ],
    recall: {
      notion: "attaque-reutilisation",
      fromDay: 8,
      prompt: "Le forum de jardinage où tu es inscrit subit une fuite. Pourquoi ta messagerie pourrait-elle être en danger ?",
      options: [
        { id: "a", text: "Parce que les attaquants essaient le couple e-mail et mot de passe volé sur d'autres sites" },
        { id: "b", text: "Parce que le forum et la messagerie sont sur le même serveur" },
        { id: "c", text: "Elle ne l'est pas : seules les données du forum sont concernées" },
      ],
      answer: "a",
      explanation: "C'est l'attaque par réutilisation : si le mot de passe est le même, la fuite du forum ouvre la messagerie.",
    },
    summary: [
      "Un gestionnaire crée et retient un mot de passe unique pour chaque compte.",
      "Le mot de passe maître doit être long, unique et protégé par une double authentification.",
      "Le remplissage automatique se fie au domaine : il ne se laisse pas tromper par un faux site.",
    ],
  },

  {
    id: "j10",
    day: 10,
    week: 2,
    kind: "apprentissage",
    title: "La double authentification",
    duration: 18,
    objective: "expliquer comment la double authentification arrête un mot de passe volé, et lire un historique de connexions.",
    notions: ["double-authentification", "facteur", "code-de-secours"],
    competences: ["comptes", "journaux"],
    learn: {
      paragraphs: [
        "La [[double-authentification|double authentification]] (souvent abrégée 2FA) demande une deuxième preuve en plus du mot de passe. Chaque preuve relève d'un [[facteur|facteur]] : ce que tu sais (le mot de passe), ce que tu possèdes (ton téléphone, une clé physique), ce que tu es (une empreinte).",
        "L'intérêt est simple : un mot de passe volé lors d'une fuite ne suffit plus. L'attaquant devrait aussi avoir ton téléphone en main.",
        "Toutes les méthodes ne se valent pas. Les clés physiques et les clés d'accès (passkeys) sont les plus solides, car elles vérifient elles-mêmes le domaine du site. Les applications d'authentification, qui affichent un code changeant toutes les 30 secondes, sont très bonnes. Le code par SMS est moins sûr (un numéro peut être détourné), mais vaut beaucoup mieux que rien.",
        "Lors de l'activation, le service fournit des [[code-de-secours|codes de secours]]. Garde-les à part, sur papier par exemple : ils te sauveront si tu perds ton téléphone.",
        "Enfin, une règle essentielle : **un code de double authentification ne se donne jamais à personne**, ni par téléphone ni par message. Aucun service légitime ne te le demandera. On verra au jour 12 comment les escrocs essaient pourtant de l'obtenir.",
      ],
      example: {
        title: "le digicode et la clé",
        paragraphs: [
          "Un immeuble protégé par un digicode et une clé : quelqu'un qui a vu le code par-dessus ton épaule reste bloqué devant la seconde porte. Il lui faut aussi ta clé, qui est dans ta poche.",
        ],
      },
    },
    exercise: {
      type: "logs",
      instructions:
        "Voici l'historique de connexion de ta messagerie, tel qu'on le trouve dans les réglages de sécurité. Contexte : tu vis à Lyon et tu étais à Marseille mercredi pour le travail. Coche les lignes qui méritent d'être examinées, puis réponds aux questions.",
      simulation: "Cet historique est fictif, tout comme les adresses IP.",
      source: "Activité récente du compte de messagerie",
      retry:
        "Pour chaque ligne, croise trois informations : l'appareil, le lieu et le résultat. Une ligne isolée inhabituelle n'est pas forcément grave ; un mot de passe correct suivi d'un code refusé, si.",
      columns: [
        { key: "date", label: "Date" },
        { key: "appareil", label: "Appareil" },
        { key: "lieu", label: "Lieu estimé" },
        { key: "ip", label: "Adresse IP" },
        { key: "resultat", label: "Résultat" },
      ],
      rows: [
        { id: "r1", cells: { date: "lun. 09:12", appareil: "Ordinateur, Firefox", lieu: "Lyon", ip: "203.0.113.24", resultat: "Réussie (mot de passe + code)" }, suspicious: false, why: "Ton appareil habituel, chez toi, avec le code : normal." },
        { id: "r2", cells: { date: "lun. 13:40", appareil: "Téléphone, application", lieu: "Lyon", ip: "203.0.113.24", resultat: "Réussie (appareil connu)" }, suspicious: false, why: "Ton téléphone, déjà reconnu par le service." },
        {
          id: "r3",
          cells: { date: "mar. 03:17", appareil: "Navigateur inconnu, Windows", lieu: "Vilnius (Lituanie)", ip: "198.51.100.77", resultat: "Mot de passe correct, code refusé" },
          suspicious: true,
          why: "Appareil inconnu, lieu inhabituel, heure étrange, et surtout un mot de passe correct : quelqu'un le connaît.",
        },
        {
          id: "r4",
          cells: { date: "mar. 03:18", appareil: "Navigateur inconnu, Windows", lieu: "Vilnius (Lituanie)", ip: "198.51.100.77", resultat: "Mot de passe correct, code refusé" },
          suspicious: true,
          why: "Deuxième essai de la même source une minute plus tard : la double authentification l'a encore arrêté.",
        },
        { id: "r5", cells: { date: "mar. 08:55", appareil: "Téléphone, application", lieu: "Lyon", ip: "203.0.113.24", resultat: "Réussie (appareil connu)" }, suspicious: false, why: "Ton téléphone, le matin, chez toi." },
        {
          id: "r6",
          cells: { date: "mer. 19:05", appareil: "Ordinateur, Firefox", lieu: "Marseille", ip: "198.51.100.140", resultat: "Réussie (mot de passe + code)" },
          suspicious: false,
          why: "Lieu différent, mais tu y étais ce jour-là, sur ton appareil habituel, avec le code. Le contexte explique l'écart.",
        },
        { id: "r7", cells: { date: "jeu. 10:02", appareil: "Ordinateur, Firefox", lieu: "Lyon", ip: "203.0.113.24", resultat: "Mot de passe incorrect" }, suspicious: false, why: "Une erreur de frappe isolée sur ton appareil habituel, suivie d'une réussite : rien d'inquiétant." },
        { id: "r8", cells: { date: "jeu. 10:02", appareil: "Ordinateur, Firefox", lieu: "Lyon", ip: "203.0.113.24", resultat: "Réussie (mot de passe + code)" }, suspicious: false, why: "La connexion qui suit ta faute de frappe." },
      ],
      followUp: [
        {
          id: "f1",
          prompt: "Que t'apprennent les deux tentatives de mardi à 3 h ?",
          options: [
            { id: "a", text: "Rien : elles ont échoué, tout va bien." },
            { id: "b", text: "Quelqu'un connaît très probablement ton mot de passe, et la double authentification l'a bloqué." },
            { id: "c", text: "Ton téléphone a été volé." },
          ],
          answers: ["b"],
          explanation: "Le mot de passe a été accepté, seul le code a été refusé. L'attaquant connaît donc le mot de passe, sans doute issu d'une fuite.",
        },
        {
          id: "f2",
          prompt: "Que fais-tu en priorité ?",
          options: [
            { id: "a", text: "Je change le mot de passe de ma messagerie, et celui de tout compte qui utilisait le même, en gardant la double authentification." },
            { id: "b", text: "Je désactive la double authentification, puisqu'elle refuse des connexions." },
            { id: "c", text: "Rien, puisque la tentative a échoué." },
          ],
          answers: ["a"],
          explanation: "La double authentification a fait son travail, mais le mot de passe est compromis : il faut le remplacer, partout où il servait.",
        },
      ],
    },
    hints: [
      "Repère les lignes dont l'appareil n'est pas l'un des tiens. Combien y en a-t-il ?",
      "Marseille n'est pas suspect ici : relis le contexte de la consigne. Une erreur de mot de passe isolée sur ton propre ordinateur non plus.",
    ],
    correction: [
      "Deux lignes ressortent : celles de mardi à 3 h, depuis un appareil inconnu et un lieu inhabituel, avec un mot de passe **correct** et un code refusé. Ce résultat précis est l'indice décisif : il prouve que le mot de passe est connu de quelqu'un d'autre.",
      "La ligne de Marseille est inhabituelle mais expliquée par le contexte, et l'erreur de frappe de jeudi est isolée et suivie d'une réussite. Un écart seul ne fait pas une attaque : c'est la combinaison d'indices qui compte.",
      "Sans double authentification, l'attaquant serait entré. Avec elle, l'incident se résume à changer un mot de passe.",
    ],
    recall: {
      notion: "mot-de-passe-maitre",
      fromDay: 9,
      prompt: "Quelle est la meilleure protection pour le mot de passe maître d'un gestionnaire ?",
      options: [
        { id: "a", text: "Le réutiliser sur sa messagerie pour ne pas l'oublier" },
        { id: "b", text: "Une phrase de passe longue et unique, complétée par une double authentification" },
        { id: "c", text: "Un mot court avec beaucoup de symboles" },
      ],
      answer: "b",
      explanation: "Le mot de passe maître ouvre tout le coffre : il doit être long, unique et doublé d'une seconde preuve.",
    },
    summary: [
      "La double authentification exige une seconde preuve : un mot de passe volé ne suffit plus.",
      "Clé physique ou passkey, puis application d'authentification, puis SMS : toutes valent mieux que rien.",
      "« Mot de passe correct, code refusé » signifie que ton mot de passe est connu : change-le.",
    ],
  },

  {
    id: "j11",
    day: 11,
    week: 2,
    kind: "apprentissage",
    title: "Repérer un e-mail de phishing",
    duration: 18,
    objective: "repérer les indices d'un e-mail de phishing et choisir la bonne réaction.",
    notions: ["phishing", "usurpation"],
    competences: ["phishing", "url"],
    learn: {
      paragraphs: [
        "Le [[phishing]], ou hameçonnage, est un message qui imite une organisation de confiance (banque, transporteur, administration) pour te faire cliquer, saisir tes identifiants ou payer. C'est la porte d'entrée de la majorité des piratages de comptes.",
        "Les indices les plus fiables sont techniques. L'**adresse réelle de l'expéditeur** : le nom affiché (« Banque Horizon ») se choisit librement, l'adresse qui suit doit appartenir au vrai domaine. La **destination des liens** : survole-les sans cliquer pour voir l'adresse réelle, et lis son domaine comme au jour 5.",
        "Viennent ensuite les indices de manipulation : une **urgence** ou une menace (« sous 24 heures »), une **demande inhabituelle** (code de carte, mot de passe, paiement), une formule générale (« Cher client ») là où le service connaît ton nom.",
        "Attention aux indices trompeurs. Les fautes d'orthographe sont de moins en moins fréquentes, car les escrocs utilisent des outils de traduction et de rédaction. Un logo, une signature ou un numéro de dossier se copient en deux secondes. Aucun de ces éléments ne prouve l'authenticité.",
        "Le bon réflexe ne dépend d'ailleurs pas de ta capacité à tout repérer : en cas de doute, **ne clique pas, et passe par un canal que tu connais** (l'application officielle, l'adresse tapée toi-même, le numéro au dos de ta carte).",
      ],
      example: {
        title: "le faux agent du gaz",
        paragraphs: [
          "Quelqu'un sonne en uniforme : « Contrôle obligatoire du compteur, sinon coupure ce soir. » L'uniforme se loue, la menace presse. Le bon réflexe n'est pas d'examiner l'uniforme mais d'appeler toi-même le fournisseur, avec le numéro de ta facture.",
        ],
      },
    },
    exercise: {
      type: "message",
      channel: "email",
      instructions: "Examine cet e-mail fictif. Signale les passages suspects, puis choisis ta réaction.",
      simulation: "Ce message est fictif. Ses liens ne mènent nulle part et rien n'est envoyé.",
      retry:
        "Reprends la méthode : l'adresse réelle de l'expéditeur, la destination réelle du bouton, puis les leviers de manipulation (urgence, demande inhabituelle). Certains passages soulignés sont parfaitement normaux.",
      fields: [
        {
          label: "De",
          value: [
            "Banque Horizon ",
            { id: "from", text: "<securite@banque-horizon-alerte.test>", suspicious: true, why: "Le domaine de l'expéditeur est `banque-horizon-alerte.test`, pas `banque-horizon.test`. Le nom affiché, lui, se choisit librement." },
          ],
        },
        { label: "À", value: ["toi@example.com"] },
        {
          label: "Objet",
          value: [{ id: "subject", text: "Action requise : votre compte sera suspendu sous 24 h", suspicious: true, why: "Une menace et un délai très court, dès l'objet : l'urgence sert à t'empêcher de réfléchir." }],
        },
      ],
      body: [
        [{ id: "greeting", text: "Cher client,", suspicious: true, why: "Ta banque connaît ton nom. Une formule générale est un indice, faible à lui seul, mais qui s'ajoute aux autres." }],
        [
          {
            id: "activity",
            text: "Nous avons détecté une activité inhabituelle sur votre compte.",
            suspicious: false,
            why: "Les vraies banques envoient aussi ce genre d'alerte : cette phrase seule n'a rien d'anormal. C'est ce qui la suit qui compte.",
          },
          " ",
          { id: "threat", text: "Sans action de votre part sous 24 heures, votre compte sera définitivement suspendu.", suspicious: true, why: "Menace et urgence : le levier classique pour te faire agir vite." },
        ],
        [
          "Pour éviter cela, ",
          {
            id: "code",
            text: "confirmez vos informations, y compris le code secret de votre carte bancaire",
            suspicious: true,
            why: "Aucune banque ne demande ton code de carte, ni ton mot de passe, par e-mail. Cet indice suffit à lui seul.",
          },
          ", en cliquant ci-dessous.",
        ],
        [{ id: "ref", text: "Référence du dossier : HZ-48213", suspicious: false, why: "Un numéro de dossier donne un air officiel, mais n'importe qui peut en inventer un. Il ne prouve rien, dans un sens comme dans l'autre." }],
        [{ id: "sign", text: "Le service sécurité de la Banque Horizon", suspicious: false, why: "Une signature se copie facilement : elle n'est ni un indice de fraude ni une preuve d'authenticité." }],
      ],
      button: {
        id: "button",
        text: "Sécuriser mon compte",
        suspicious: true,
        link: "https://banque-horizon.compte-verif.test/securite",
        why: "Le bouton mène vers `compte-verif.test` : « banque-horizon » n'y est qu'un sous-domaine.",
      },
      verdict: {
        prompt: "Que fais-tu de ce message ?",
        options: [
          { id: "a", text: "Je clique pour voir, sans saisir mon code." },
          { id: "b", text: "Je ne clique pas. Je le signale, et en cas de doute je contacte ma banque par son application ou le numéro au dos de ma carte." },
          { id: "c", text: "Je réponds à l'e-mail pour demander s'il est authentique." },
        ],
        answer: "b",
        explanation:
          "Cliquer expose déjà à une page conçue pour tromper, et répondre te met en contact avec l'escroc lui-même. La vérification passe toujours par un canal que tu connais. Le signalement (bouton « signaler » de ta messagerie) aide à protéger les autres.",
      },
    },
    hints: [
      "Commence par l'adresse entre chevrons après le nom de l'expéditeur, puis inspecte le bouton.",
      "Six éléments sont suspects. Le numéro de dossier, la signature et la phrase sur l'activité inhabituelle ne prouvent rien à eux seuls.",
    ],
    correction: [
      "Deux indices techniques suffisent à trancher : l'expéditeur appartient au domaine `banque-horizon-alerte.test`, et le bouton mène à `compte-verif.test`. Aucun des deux n'est le domaine de la banque.",
      "S'y ajoutent les leviers de manipulation : la menace de suspension, le délai de 24 heures, et une demande qu'aucune banque ne fait par e-mail, le code de carte.",
      "Note les éléments neutres : une alerte d'activité inhabituelle, un numéro de dossier ou une signature peuvent figurer dans un vrai message. On ne juge pas un message sur un seul détail, mais sur la cohérence de l'ensemble, en commençant par les domaines.",
    ],
    recall: {
      notion: "double-authentification",
      fromDay: 10,
      prompt: "L'historique de ton compte indique « mot de passe correct, code refusé » depuis un appareil inconnu. Qu'en conclus-tu ?",
      options: [
        { id: "a", text: "Ton mot de passe est probablement connu de quelqu'un : il faut le changer" },
        { id: "b", text: "Ton téléphone est défectueux" },
        { id: "c", text: "Rien, la connexion a échoué" },
      ],
      answer: "a",
      explanation: "Le mot de passe a été accepté : il est compromis. La double authentification a seulement empêché l'entrée.",
    },
    summary: [
      "Vérifie d'abord les domaines : celui de l'adresse de l'expéditeur et celui des liens.",
      "Urgence, menace et demande inhabituelle (code, mot de passe, paiement) sont des signaux d'alerte.",
      "En cas de doute, ne clique pas et passe par un canal que tu connais.",
    ],
  },

  {
    id: "j12",
    day: 12,
    week: 2,
    kind: "apprentissage",
    title: "L'ingénierie sociale : quand on manipule la personne",
    duration: 18,
    objective: "reconnaître les leviers de manipulation d'un message et vérifier une demande par un autre canal.",
    notions: ["ingenierie-sociale", "usurpation"],
    competences: ["phishing"],
    learn: {
      paragraphs: [
        "L'[[ingenierie-sociale|ingénierie sociale]] vise la personne plutôt que la machine. Pourquoi forcer une porte quand on peut convaincre quelqu'un de l'ouvrir ? Elle passe par un e-mail, un SMS, un appel ou une messagerie.",
        "Les escrocs utilisent quelques leviers, toujours les mêmes. L'**urgence** (« avant midi »), qui empêche de réfléchir. L'**autorité** (un directeur, la police, la banque), qui décourage de contester. Le **secret** (« n'en parle à personne »), qui coupe des vérifications habituelles. L'**affect** : flatterie, peur, sympathie. Et souvent, un prétexte qui **empêche de vérifier** (« je suis en réunion, je ne peux pas parler »).",
        "Deux scénarios reviennent souvent. La fraude au faux dirigeant : un « responsable » demande un virement urgent et confidentiel. Le faux conseiller ou faux support : quelqu'un t'appelle pour « sécuriser ton compte » et te demande le code que tu viens de recevoir par SMS, c'est-à-dire ta double authentification.",
        "La défense tient en une règle : **vérifier par un autre canal, que tu connais déjà**. Rappeler la personne sur son numéro habituel, passer par la procédure normale, se rendre dans l'application officielle. Répondre au message suspect ne vérifie rien : c'est l'escroc qui répondra.",
      ],
      example: {
        title: "l'appel du « petit-fils »",
        paragraphs: [
          "« Mamie, c'est moi, j'ai eu un accident, j'ai perdu mon téléphone, il me faut de l'argent tout de suite, ne dis rien aux parents. » Urgence, affect, secret, impossibilité de vérifier : tous les leviers y sont. La parade ? Raccrocher et rappeler le petit-fils sur son numéro habituel.",
        ],
      },
    },
    exercise: {
      type: "message",
      channel: "messagerie",
      instructions:
        "Tu travailles à l'Atelier Lumen, une petite entreprise fictive. Ta responsable s'appelle Sophie Marchand. Tu reçois ce message sur ton téléphone. Signale les passages qui relèvent de la manipulation, puis choisis ta réaction.",
      simulation: "Le message, l'entreprise et le numéro sont fictifs.",
      retry:
        "Cherche les leviers vus dans la leçon : urgence, autorité, secret, affect, et tout ce qui empêche de vérifier. Certains passages soulignés sont des éléments ordinaires.",
      fields: [
        {
          label: "De",
          value: [
            "Sophie Marchand ",
            { id: "number", text: "(06 39 98 00 41, numéro non enregistré)", suspicious: true, why: "Un numéro inconnu qui se présente comme celui d'une personne connue : rien ne prouve qu'il s'agit d'elle." },
          ],
        },
      ],
      body: [
        [
          { id: "hello", text: "Bonjour, c'est Sophie.", suspicious: false, why: "Utiliser le prénom de ta responsable montre seulement que l'auteur s'est renseigné : les organigrammes sont souvent publics. Ce n'est ni une preuve, ni un indice de fraude à lui seul." },
          " ",
          { id: "newnum", text: "J'ai changé de numéro, enregistre celui-ci.", suspicious: true, why: "Le changement de numéro est le prétexte classique de l'usurpation : il installe un nouveau canal que l'escroc contrôle." },
        ],
        [{ id: "meeting", text: "Je suis en réunion avec un client important et je ne peux pas parler.", suspicious: true, why: "Ce prétexte empêche précisément la vérification la plus simple : un appel." }],
        [
          { id: "urgent", text: "J'ai besoin que tu règles une facture urgente pour un nouveau fournisseur avant midi.", suspicious: true, why: "Urgence et demande financière inhabituelle : un nouveau fournisseur payé dans la précipitation." },
          " ",
          { id: "secret", text: "Ne passe pas par la comptabilité, c'est confidentiel.", suspicious: true, why: "Le secret sert à contourner les procédures, qui existent justement pour bloquer ce genre de fraude." },
        ],
        [
          { id: "rib", text: "Je t'envoie les coordonnées bancaires juste après.", suspicious: false, why: "Envoyer des coordonnées pour un paiement n'a rien d'anormal en soi. C'est le contexte qui rend la demande suspecte." },
          " ",
          { id: "flatter", text: "Je compte sur toi, tu es la seule personne en qui j'ai confiance pour ça.", suspicious: true, why: "La flatterie crée un sentiment de responsabilité et renforce le secret." },
        ],
      ],
      verdict: {
        prompt: "Quelle est la bonne réaction ?",
        options: [
          { id: "a", text: "Je paie : la demande vient de la direction et il y a urgence." },
          { id: "b", text: "Je réponds au message pour demander une confirmation." },
          { id: "c", text: "Je ne paie pas, et je vérifie en appelant Sophie sur son numéro habituel ou en passant par la procédure normale." },
        ],
        answer: "c",
        explanation:
          "Répondre au message ne vérifie rien : c'est l'auteur du message qui répondra. Seul un canal déjà connu (le numéro habituel, un collègue, la comptabilité) permet de vérifier. Une vraie responsable comprendra toujours cette prudence.",
      },
    },
    hints: [
      "Repère d'abord tout ce qui empêche de vérifier l'identité de l'expéditrice.",
      "Six passages sont des leviers de manipulation. Les deux autres sont des éléments qu'on trouve aussi dans des messages tout à fait normaux.",
    ],
    correction: [
      "Le message accumule les leviers : un nouveau numéro, un prétexte qui interdit l'appel, l'urgence, le secret qui contourne la comptabilité et la flatterie.",
      "Aucun de ces éléments n'est technique : l'escroc n'a besoin que d'un nom trouvé en ligne et d'un téléphone. C'est pourquoi les entreprises imposent des procédures de paiement, et pourquoi il faut les respecter même sous la pression.",
      "La réaction juste ne consiste pas à deviner si le message est vrai, mais à vérifier par un canal connu. Si c'était vraiment Sophie, elle confirmera en deux minutes.",
    ],
    recall: {
      notion: "phishing",
      fromDay: 11,
      prompt: "Dans un e-mail, quel indice est le plus fiable pour repérer un phishing ?",
      options: [
        { id: "a", text: "La présence de fautes d'orthographe" },
        { id: "b", text: "Le domaine réel de l'expéditeur et des liens" },
        { id: "c", text: "L'absence de logo" },
      ],
      answer: "b",
      explanation: "Les fautes et les logos ne prouvent rien. Les domaines, eux, ne peuvent pas être imités à l'identique.",
    },
    summary: [
      "L'ingénierie sociale joue sur l'urgence, l'autorité, le secret et l'affect.",
      "Un prétexte qui empêche de vérifier est un signal d'alerte en soi.",
      "Vérifie toujours par un canal que tu connais déjà, jamais en répondant au message suspect.",
    ],
  },

  {
    id: "j13",
    day: 13,
    week: 2,
    kind: "defi",
    title: "Défi : la matinée piégée",
    duration: 20,
    objective: "trier plusieurs messages reçus le même jour, sans tomber dans la méfiance excessive.",
    notions: ["phishing", "ingenierie-sociale", "double-authentification", "nom-de-domaine"],
    competences: ["phishing", "url", "comptes"],
    learn: {
      paragraphs: [
        "Dans la vraie vie, les messages piégés arrivent au milieu de messages parfaitement normaux. Le défi d'aujourd'hui consiste à les trier, en appliquant tout ce que tu as vu cette semaine.",
        "Garde en tête que l'objectif n'est pas de soupçonner tout le monde. Un message qui contient un lien n'est pas suspect par nature. Ce qui compte, c'est la cohérence entre qui prétend écrire, le domaine réel, et ce qui t'est demandé.",
      ],
      example: {
        title: "le tri du courrier",
        paragraphs: [
          "Chaque matin, tu tries ton courrier sans tout ouvrir avec des gants : tu reconnais les factures habituelles, et tu regardes de plus près l'enveloppe qui réclame un paiement urgent à un organisme dont tu n'as jamais entendu parler.",
        ],
      },
    },
    exercise: {
      type: "investigation",
      instructions: "Ouvre les quatre messages reçus ce matin, puis réponds aux questions.",
      simulation: "Tous les messages, personnes et domaines sont fictifs. Ton entreprise utilise le domaine atelier-lumen.test, ta banque banque-horizon.test.",
      retry:
        "Pour chaque message, compare l'expéditeur prétendu et le domaine réel, puis demande-toi si ce qui t'est demandé est habituel. Rappelle-toi aussi qu'un code de double authentification ne se donne jamais.",
      brief: [
        "Lundi matin, avant ton premier café, tu as reçu quatre messages. Certains sont légitimes, d'autres non.",
        "Ton entreprise utilise le domaine `atelier-lumen.test`. Ta banque est la Banque Horizon, domaine `banque-horizon.test`.",
      ],
      clues: [
        {
          id: "a",
          title: "SMS : « Colis Express »",
          source: "SMS sur ton téléphone",
          kind: "text",
          content: "Colis Express : votre colis est bloqué au dépôt. Frais de réexpédition : 1,99 €. Réglez ici avant ce soir : https://colis-express.livraison-frais.test/payer",
        },
        {
          id: "b",
          title: "E-mail : « Planning des congés d'été »",
          source: "boîte de réception professionnelle",
          kind: "email",
          content:
            "De : Service RH <rh@atelier-lumen.test>\nObjet : Planning des congés d'été\n\nBonjour à toutes et à tous,\nPensez à saisir vos souhaits de congés avant le 30 du mois sur l'intranet : https://intranet.atelier-lumen.test/conges\nBonne journée,\nLe service RH",
        },
        {
          id: "c",
          title: "Appel du « support informatique »",
          source: "ta note après l'appel",
          kind: "text",
          content:
            "Appel à 9 h 10 d'un certain Thomas, « du support informatique ». Il connaît mon nom et mon poste. Il dit que mon compte a un problème de sécurité et me demande de lui lire le code que je vais recevoir par SMS « pour le réparer ». J'ai dit que je rappellerais.",
        },
        {
          id: "d",
          title: "E-mail : « Votre relevé est disponible »",
          source: "boîte de réception personnelle",
          kind: "email",
          content:
            "De : Banque Horizon <notifications@banque-horizon.test>\nObjet : Votre relevé de mars est disponible\n\nBonjour,\nVotre relevé de mars est consultable dans votre espace client. Pour y accéder, utilisez l'application ou tapez l'adresse habituelle de votre banque.\nNous ne vous demanderons jamais vos codes par e-mail ou par téléphone.\nBanque Horizon",
        },
      ],
      questions: [
        {
          id: "q1",
          prompt: "Lesquels de ces messages sont des tentatives de manipulation ?",
          options: [
            { id: "a", text: "A, le SMS de Colis Express" },
            { id: "b", text: "B, l'e-mail des RH" },
            { id: "c", text: "C, l'appel du support informatique" },
            { id: "d", text: "D, l'e-mail de la banque" },
          ],
          answers: ["a", "c"],
          explanation:
            "Le SMS mène à un domaine sans rapport et réclame un paiement urgent. L'appel demande un code de double authentification. Les messages B et D sont cohérents : bons domaines, demandes habituelles, aucune information sensible réclamée.",
        },
        {
          id: "q2",
          prompt: "Pour le SMS du colis, quel est l'indice le plus solide ?",
          options: [
            { id: "a", text: "Le montant est très faible." },
            { id: "b", text: "Le lien mène au domaine livraison-frais.test, pas à celui d'un transporteur connu." },
            { id: "c", text: "Il est écrit en français correct." },
          ],
          answers: ["b"],
          explanation:
            "Le domaine est l'indice technique décisif. Le petit montant est d'ailleurs une ruse : il fait baisser la garde, alors que l'objectif est de récupérer ton numéro de carte.",
        },
        {
          id: "q3",
          prompt: "Pourquoi la demande de « Thomas » est-elle grave ?",
          options: [
            { id: "a", text: "Le code reçu par SMS est ta double authentification : le lui lire revient à lui ouvrir ton compte." },
            { id: "b", text: "Elle n'est pas grave puisqu'il connaît ton nom et ton poste." },
            { id: "c", text: "Elle n'est grave que si l'appel vient de l'étranger." },
          ],
          answers: ["a"],
          explanation:
            "L'appelant connaît sans doute déjà ton mot de passe ; il lui manque le second facteur. Connaître ton nom et ton poste ne prouve rien : ces informations sont souvent publiques. Le bon réflexe a été de ne rien donner et de rappeler le vrai support par le numéro interne habituel.",
        },
        {
          id: "q4",
          prompt: "L'e-mail des RH contient un lien. Quelle est l'attitude la plus juste ?",
          options: [
            { id: "a", text: "C'est forcément du phishing, puisqu'il contient un lien." },
            { id: "b", text: "Le lien mène à intranet.atelier-lumen.test, le domaine de l'entreprise, et la demande est habituelle : il est très probablement légitime." },
            { id: "c", text: "Il est légitime parce que l'expéditeur s'appelle « Service RH »." },
          ],
          answers: ["b"],
          explanation:
            "Un lien n'est pas suspect en soi. Le nom affiché « Service RH » ne prouve rien, mais le domaine de l'adresse et celui du lien sont cohérents avec l'entreprise, et rien de sensible n'est demandé hors de l'intranet.",
        },
      ],
    },
    hints: [
      "Deux messages sur quatre sont légitimes. Pour chacun, vérifie le domaine et la nature de la demande.",
      "Une demande de code reçu par SMS, quel que soit le prétexte, n'est jamais légitime.",
    ],
    correction: [
      "Le tri repose sur la même grille pour chaque message : qui prétend écrire, quel domaine réel, quelle demande. Le SMS échoue sur le domaine et la demande de paiement ; l'appel échoue sur la demande de code.",
      "Les messages légitimes passent la même grille : bons domaines, demandes ordinaires. Savoir dire « celui-ci est normal » fait partie de la compétence, sinon on finit par ignorer aussi les vrais messages.",
      "Dernier point : la note de l'appel montre une excellente réaction. Ne rien donner, raccrocher, rappeler par un canal connu.",
    ],
    recall: {
      notion: "ingenierie-sociale",
      fromDay: 12,
      prompt: "Un message urgent de ta « directrice » arrive depuis un nouveau numéro. Comment vérifier ?",
      options: [
        { id: "a", text: "Répondre au message pour lui poser une question personnelle" },
        { id: "b", text: "L'appeler sur son numéro habituel ou passer par la procédure normale" },
        { id: "c", text: "Vérifier que le message ne contient pas de fautes" },
      ],
      answer: "b",
      explanation: "Seul un canal déjà connu vérifie quelque chose. Répondre au message, c'est parler à l'expéditeur, quel qu'il soit.",
    },
    summary: [
      "Une même grille pour chaque message : expéditeur prétendu, domaine réel, demande.",
      "Un lien n'est pas suspect par nature ; un code de double authentification ne se donne jamais.",
      "Reconnaître un message légitime fait aussi partie de la compétence.",
    ],
  },

  {
    id: "j14",
    day: 14,
    week: 2,
    kind: "revision",
    title: "Révision : par où commencer pour protéger ses comptes",
    duration: 15,
    objective: "choisir et justifier la première mesure de protection à mettre en place.",
    notions: ["mot-de-passe", "gestionnaire-mdp", "double-authentification", "attaque-reutilisation"],
    competences: ["comptes"],
    learn: {
      paragraphs: [
        "Cette semaine, tu as vu quatre protections : des [[mot-de-passe|mots de passe]] solides et uniques, un [[gestionnaire-mdp|gestionnaire]], la [[double-authentification|double authentification]], et la vigilance face aux messages piégés.",
        "Tout mettre en place d'un coup est décourageant. Il vaut mieux commencer par le compte le plus important : ta **messagerie**. Elle reçoit les liens « mot de passe oublié » de presque tous tes autres comptes. Qui contrôle ta messagerie peut donc réinitialiser le reste.",
        "Aujourd'hui, tu ne vas pas seulement choisir : tu vas expliquer ton choix. Formuler une justification est l'une des meilleures façons de vérifier qu'on a compris.",
      ],
      example: {
        title: "le passe-partout du gardien",
        paragraphs: [
          "Dans un immeuble, le gardien a un passe-partout. Avant de changer chaque serrure, mieux vaut s'assurer que ce passe-partout est en sécurité : ta messagerie joue ce rôle pour tes comptes.",
        ],
      },
    },
    exercise: {
      type: "justify",
      instructions: "Lis la situation, choisis la mesure la plus utile pour commencer, et justifie ton choix.",
      simulation: "Léa est un personnage fictif.",
      retry:
        "Demande-toi quel compte permet de prendre le contrôle des autres, et quelle mesure règle le risque principal vu au jour 8. Relis aussi la réaction affichée sous ton choix.",
      situation: [
        "Léa, 36 ans, utilise le même mot de passe pour sa messagerie, sa banque, ses achats en ligne et une dizaine de forums. Elle n'a jamais activé la double authentification.",
        "Elle dispose d'une demi-heure ce soir et veut faire **une seule chose**, la plus utile.",
      ],
      question: "Que lui conseilles-tu en priorité ?",
      choices: [
        {
          id: "a",
          text: "Changer le mot de passe de sa messagerie pour un mot de passe long et unique, et y activer la double authentification.",
          feedback: "C'est la mesure qui protège le compte clé, celui qui permet de réinitialiser tous les autres.",
        },
        {
          id: "b",
          text: "Installer un antivirus payant.",
          feedback: "Un antivirus peut être utile, mais il ne règle pas le risque principal de Léa : un mot de passe réutilisé partout, qu'une seule fuite suffit à exposer.",
        },
        {
          id: "c",
          text: "Changer tous ses mots de passe ce soir, en les notant dans un fichier texte sur son bureau.",
          feedback: "L'intention est bonne, mais tout faire d'un coup en une demi-heure est irréaliste, et un fichier texte non protégé sur le bureau crée un nouveau risque.",
        },
        {
          id: "d",
          text: "Supprimer ses comptes de forums.",
          feedback: "Fermer les comptes inutiles est une bonne hygiène, mais ses comptes importants resteraient protégés par le même mot de passe.",
        },
      ],
      answer: "a",
      justificationPrompt: "Explique en une ou deux phrases pourquoi ce choix vient en premier.",
      criteria: [
        "Ma justification explique que la messagerie permet de réinitialiser les autres comptes (« mot de passe oublié »).",
        "Elle mentionne le risque de la réutilisation d'un même mot de passe sur plusieurs sites.",
        "Elle explique que la double authentification protège même si le mot de passe fuit.",
      ],
      reference: [
        "La messagerie reçoit les liens de réinitialisation de presque tous les autres comptes : la protéger en premier évite qu'une fuite sur un forum ne donne accès à tout le reste.",
        "Un mot de passe unique supprime le risque de réutilisation pour ce compte, et la double authentification le protège même si ce nouveau mot de passe venait à fuiter. Léa pourra ensuite traiter sa banque, puis ses autres comptes, idéalement avec un gestionnaire.",
      ],
    },
    hints: [
      "Quel compte reçoit les e-mails « réinitialiser votre mot de passe » de tous les autres ?",
      "La meilleure mesure doit à la fois supprimer la réutilisation et ajouter une seconde preuve.",
    ],
    correction: [
      "La priorité va à la messagerie, avec un mot de passe unique et la double authentification. Ce compte est la clé de tous les autres : le protéger d'abord réduit le risque pour l'ensemble.",
      "Ensuite, compte par compte, en commençant par la banque et les achats en ligne, Léa pourra adopter un gestionnaire pour créer des mots de passe uniques sans effort de mémoire.",
      "Compare ta justification à la réponse de référence : l'idée de « compte clé » et celle de réutilisation sont les deux arguments essentiels.",
    ],
    recall: {
      notion: "gestionnaire-mdp",
      fromDay: 9,
      prompt: "Ton gestionnaire ne propose pas de remplir ton mot de passe sur une page qui ressemble à ta banque. Que peut-on suspecter ?",
      options: [
        { id: "a", text: "Le gestionnaire est en panne" },
        { id: "b", text: "Le domaine de la page n'est pas celui de ta banque" },
        { id: "c", text: "Ta banque a changé de logo" },
      ],
      answer: "b",
      explanation: "Le gestionnaire se fie au domaine. S'il ne reconnaît pas le site, c'est peut-être une imitation.",
    },
    summary: [
      "La messagerie est le compte clé : elle permet de réinitialiser les autres.",
      "Un mot de passe unique et la double authentification sur ce compte forment la première mesure.",
      "Avancer compte par compte, avec un gestionnaire, est plus durable que tout changer d'un coup.",
    ],
  },
];

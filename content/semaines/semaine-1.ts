import type { Session } from "../types";

/** Semaine 1 : Comprendre les ordinateurs et Internet. */
export const SEMAINE_1: Session[] = [
  {
    id: "j01",
    day: 1,
    week: 1,
    kind: "apprentissage",
    title: "Ton appareil : système, applications et fichiers",
    duration: 15,
    objective: "distinguer le système d'exploitation, une application et un fichier, et repérer la véritable extension d'un fichier.",
    notions: ["systeme-exploitation", "application", "fichier", "extension"],
    competences: ["internet"],
    learn: {
      paragraphs: [
        "Avant de parler de sécurité, il faut savoir de quoi est fait un appareil. Ton ordinateur comme ton téléphone fonctionnent grâce à trois étages qui s'empilent.",
        "Le premier étage est le [[systeme-exploitation|système d'exploitation]] : le logiciel de base, lancé au démarrage, qui gère l'écran, la mémoire, les fichiers et la connexion au réseau. Windows, macOS, Linux, Android et iOS sont des systèmes d'exploitation.",
        "Au-dessus viennent les [[application|applications]] : des programmes qui servent à une tâche précise, comme écrire, naviguer sur le web ou écouter de la musique. Elles passent par le système d'exploitation pour accéder à tes fichiers, à la caméra ou au réseau.",
        "Enfin, les [[fichier|fichiers]] sont tes données : une photo, un document, une facture. Ils sont rangés dans des [[dossier|dossiers]]. Leur nom se termine souvent par une [[extension]], comme `.pdf` ou `.jpg`, qui indique leur type et donc l'application qui saura les ouvrir.",
        "Pourquoi est-ce utile pour la sécurité ? Parce qu'un nom de fichier peut mentir. Seule la **toute dernière** extension compte : `facture.pdf.exe` n'est pas un document, c'est un programme (`.exe`) qui s'exécutera si tu l'ouvres. Comme certains systèmes masquent les extensions par défaut, ce fichier peut s'afficher simplement sous le nom `facture.pdf`.",
      ],
      example: {
        title: "la maison et ses placards",
        paragraphs: [
          "Le système d'exploitation ressemble aux murs, à l'électricité et à la plomberie d'une maison : invisible au quotidien, mais indispensable. Les applications sont les appareils que tu branches, le four ou le lave-linge. Les fichiers sont ce que tu ranges dans les placards.",
          "Un fichier `.exe` déguisé en `.pdf`, c'est un colis étiqueté « livres » qui contient en réalité un appareil qui se met en marche dès qu'on l'ouvre.",
        ],
      },
    },
    exercise: {
      type: "match",
      variant: "categorize",
      instructions: "Range chaque élément dans la bonne catégorie. Pour les noms de fichiers, regarde attentivement la toute dernière extension.",
      retry:
        "Pour chaque nom de fichier, lis-le de droite à gauche : ce qui suit le dernier point décide de sa nature. Pour les autres éléments, demande-toi s'il s'agit du logiciel de base de tout l'appareil, ou d'un outil qu'on lance pour une tâche précise.",
      options: [
        { id: "os", label: "Système d'exploitation", description: "Fait fonctionner tout l'appareil." },
        { id: "app", label: "Application", description: "Un outil lancé pour une tâche précise." },
        { id: "doc", label: "Fichier de données", description: "Un contenu qu'une application affiche." },
        { id: "prog", label: "Programme exécutable", description: "Du code qui s'exécute quand on l'ouvre." },
      ],
      items: [
        { id: "android", text: "Android", answer: "os", why: "Android fait fonctionner un téléphone entier : c'est un système d'exploitation." },
        { id: "macos", text: "macOS", answer: "os", why: "macOS est le système d'exploitation des ordinateurs Apple." },
        { id: "firefox", text: "Le navigateur Firefox", answer: "app", why: "Un navigateur est une application : on le lance pour consulter des sites." },
        { id: "traitement", text: "Un traitement de texte", answer: "app", why: "C'est une application qui sert à une tâche précise : écrire." },
        { id: "vacances", text: "vacances-2025.jpg", mono: true, answer: "doc", why: "`.jpg` désigne une image : un fichier de données." },
        { id: "contrat", text: "contrat-signe.pdf", mono: true, answer: "doc", why: "`.pdf` est un document, affiché par une application de lecture." },
        { id: "contratexe", text: "contrat-signe.pdf.exe", mono: true, answer: "prog", why: "La dernière extension est `.exe` : c'est un programme déguisé en document." },
        { id: "photo", text: "photo_identite.jpg.scr", mono: true, answer: "prog", why: "`.scr` est une extension de programme sous Windows. Le `.jpg` du milieu fait partie du nom et sert à tromper." },
        { id: "installer", text: "installeur-lecteur.exe", mono: true, answer: "prog", why: "Un programme d'installation : pas forcément malveillant, mais l'ouvrir exécute du code, donc sa provenance compte." },
      ],
    },
    hints: [
      "Deux éléments de la liste sont des systèmes d'exploitation : on les trouve sur des appareils entiers, pas sur un seul outil.",
      "`.exe` et `.scr` sont des extensions de programmes sous Windows. Un nom qui contient `.pdf` ou `.jpg` mais qui se termine par l'une d'elles est un programme.",
    ],
    correction: [
      "Android et macOS sont des systèmes d'exploitation : ils font tourner l'appareil entier. Firefox et le traitement de texte sont des applications, lancées par-dessus.",
      "`vacances-2025.jpg` et `contrat-signe.pdf` sont des fichiers de données : les ouvrir affiche leur contenu dans une application.",
      "`contrat-signe.pdf.exe` et `photo_identite.jpg.scr` sont des programmes : la vraie extension est la dernière. `installeur-lecteur.exe` est aussi un programme. Il n'est pas suspect en soi, mais l'ouvrir revient à exécuter du code : il faut savoir d'où il vient.",
      "Réflexe à garder : avant d'ouvrir une pièce jointe, regarde la fin de son nom. Si ton ordinateur masque les extensions, tu peux les afficher dans les réglages de l'explorateur de fichiers.",
    ],
    summary: [
      "Un appareil empile trois étages : le système d'exploitation, les applications, puis tes fichiers.",
      "Seule la dernière extension d'un nom de fichier indique sa vraie nature.",
      "Ouvrir un programme (`.exe`, `.scr`…) exécute du code : vérifie toujours sa provenance.",
    ],
  },

  {
    id: "j02",
    day: 2,
    week: 1,
    kind: "apprentissage",
    title: "Navigateur et serveur : qui demande, qui répond",
    duration: 15,
    objective: "décrire, étape par étape, ce qui se passe entre ton navigateur et un serveur quand une page s'affiche.",
    notions: ["navigateur", "serveur", "client", "requete", "reponse"],
    competences: ["internet"],
    learn: {
      paragraphs: [
        "Quand tu consultes un site, deux ordinateurs dialoguent. D'un côté, ton [[navigateur]] (Firefox, Chrome, Safari, Edge) joue le rôle de [[client]] : c'est lui qui demande. De l'autre, un [[serveur]], un ordinateur allumé en permanence dans un centre de données, répond.",
        "Le navigateur envoie une [[requete|requête]], un message court qui dit en substance : « donne-moi la page `/horaires` du site `www.example.com` ». Le serveur renvoie une [[reponse|réponse]] qui contient le texte de la page.",
        "Dans ce texte, le navigateur découvre qu'il lui faut aussi des images, des polices de caractères, une mise en forme. Il envoie alors de nouvelles requêtes, une par élément. Une seule page peut en nécessiter plusieurs dizaines. Quand tout est arrivé, il assemble les morceaux et dessine la page à l'écran.",
        "Retiens une idée importante : ce que tu vois à l'écran a été **envoyé par le serveur**. Le navigateur ne fait que l'afficher. Si le serveur appartient à quelqu'un de malhonnête, la page peut imiter n'importe quel site, au pixel près.",
      ],
      example: {
        title: "le restaurant",
        paragraphs: [
          "Tu es à table : c'est le navigateur. La cuisine est le serveur. Tu passes commande (la requête), la cuisine prépare et envoie les plats (la réponse), souvent en plusieurs fois : l'entrée, puis le plat, puis le dessert.",
          "Tu ne vois jamais la cuisine. Tu fais confiance à l'enseigne du restaurant. Sur le web, l'enseigne, c'est l'adresse du site : on apprendra à la lire au jour 5.",
        ],
      },
    },
    exercise: {
      type: "order",
      variant: "steps",
      instructions: "Remets dans l'ordre les étapes qui mènent de l'adresse tapée à la page affichée.",
      retry:
        "Pour chaque étape, demande-toi de quoi elle a besoin pour avoir lieu. Le serveur ne peut pas répondre à une requête qui n'a pas encore été envoyée, et le navigateur ne peut pas demander les images d'une page qu'il n'a pas encore reçue.",
      items: [
        { id: "taper", text: "Tu tapes www.example.com/horaires et tu appuies sur Entrée.", note: "Tout commence par ton action." },
        { id: "trouver", text: "Le navigateur cherche l'adresse de la machine qui héberge le site.", note: "Il doit savoir à qui envoyer sa demande. C'est le rôle du DNS, au programme du jour 4." },
        { id: "requete", text: "Le navigateur envoie une requête au serveur : « donne-moi la page /horaires ».", note: "Le client demande." },
        { id: "reponse", text: "Le serveur renvoie une réponse contenant le texte de la page.", note: "Le serveur répond." },
        { id: "elements", text: "Le navigateur envoie de nouvelles requêtes pour les images et la mise en forme.", note: "Il ne découvre ces éléments qu'en lisant la page reçue." },
        { id: "afficher", text: "Le navigateur assemble le tout et affiche la page.", note: "Ce que tu vois est le résultat de toutes ces réponses." },
      ],
    },
    hints: [
      "La première et la dernière étape concernent ce que tu fais et ce que tu vois. Tout le reste se passe entre les deux.",
      "Avant d'envoyer sa requête, le navigateur doit savoir à quelle machine l'envoyer.",
    ],
    correction: [
      "Le trajet suit toujours le même schéma : une demande du client, une réponse du serveur. Le navigateur trouve d'abord la machine à contacter, puis demande la page, puis les éléments qu'elle contient, et enfin affiche le résultat.",
      "Ce découpage explique des situations courantes : une page qui s'affiche sans ses images (certaines requêtes ont échoué), ou un message d'erreur envoyé par le serveur alors que ta connexion fonctionne très bien.",
    ],
    recall: {
      notion: "extension",
      fromDay: 1,
      prompt: "Un fichier s'appelle `bulletin-salaire.pdf.exe`. De quoi s'agit-il ?",
      options: [
        { id: "a", text: "Un document PDF" },
        { id: "b", text: "Un programme qui s'exécutera à l'ouverture" },
        { id: "c", text: "Une image" },
      ],
      answer: "b",
      explanation: "Seule la dernière extension compte : `.exe` désigne un programme. Le `.pdf` du milieu fait partie du nom et sert à tromper.",
    },
    summary: [
      "Le navigateur (le client) demande, le serveur répond : c'est le modèle requête et réponse.",
      "Une page affichée résulte souvent de dizaines de requêtes successives.",
      "Le contenu d'une page vient du serveur : son apparence ne prouve pas qui l'a envoyée.",
    ],
  },

  {
    id: "j03",
    day: 3,
    week: 1,
    kind: "apprentissage",
    title: "Les adresses IP : le numéro de chaque machine",
    duration: 15,
    objective: "reconnaître une adresse IP valide et dire si elle est privée (réseau local) ou publique (visible sur Internet).",
    notions: ["adresse-ip", "ip-privee", "ip-publique", "routeur"],
    competences: ["internet"],
    learn: {
      paragraphs: [
        "Pour qu'une requête arrive à destination, chaque machine connectée possède un numéro : son [[adresse-ip|adresse IP]]. Dans sa forme la plus courante, la version 4, elle s'écrit avec **quatre nombres compris entre 0 et 255**, séparés par des points : `192.168.1.24` ou `203.0.113.7`.",
        "Chez toi, tes appareils ne sont pas exposés directement à Internet. Ils sont reliés à ta box, qui joue le rôle de [[routeur]]. À l'intérieur de la maison, chaque appareil reçoit une [[ip-privee|adresse IP privée]]. Trois plages sont réservées à cet usage : `10.x.x.x`, `172.16.x.x` à `172.31.x.x`, et `192.168.x.x`. Ces adresses sont réutilisées dans des millions de foyers et n'ont de sens qu'à l'intérieur d'un réseau local.",
        "Vers l'extérieur, tous tes appareils partagent l'[[ip-publique|adresse IP publique]] de ta box. C'est elle que voient les sites que tu visites.",
        "Une adresse IP indique d'où vient une connexion, mais avec prudence : elle peut être partagée (une famille, une entreprise, le wifi d'un café) et elle peut changer. On s'en souviendra en semaine 5, lors de l'enquête numérique.",
        "Il existe une version plus récente, IPv6, aux adresses beaucoup plus longues, comme `2001:db8::1`. Le principe est le même. Dans ce programme, on utilise la version 4, plus lisible. Les adresses publiques des exercices (`203.0.113.x`, `198.51.100.x`) appartiennent à des plages réservées aux exemples.",
      ],
      example: {
        title: "l'immeuble",
        paragraphs: [
          "Ta box est comme l'adresse postale d'un immeuble : c'est l'adresse publique. À l'intérieur, chaque appartement a un numéro de porte : c'est l'adresse privée.",
          "« Appartement 24 » ne veut rien dire pour le facteur s'il ne sait pas de quel immeuble il s'agit, et il existe un appartement 24 dans des milliers d'immeubles.",
        ],
      },
    },
    exercise: {
      type: "match",
      variant: "categorize",
      instructions: "Classe chaque adresse : privée (réseau local), publique, ou invalide.",
      retry:
        "Vérifie d'abord la forme : quatre nombres, chacun entre 0 et 255. Ensuite seulement, regarde le début de l'adresse pour savoir si elle appartient à l'une des trois plages privées.",
      options: [
        { id: "privee", label: "Privée", description: "Valable seulement dans un réseau local." },
        { id: "publique", label: "Publique", description: "Visible sur Internet." },
        { id: "invalide", label: "Invalide", description: "Ce n'est pas une adresse IPv4 correcte." },
      ],
      items: [
        { id: "a1", text: "192.168.1.24", mono: true, answer: "privee", why: "Elle commence par 192.168 : plage réservée aux réseaux locaux." },
        { id: "a2", text: "10.0.0.5", mono: true, answer: "privee", why: "Toutes les adresses en 10.x.x.x sont privées." },
        { id: "a3", text: "203.0.113.7", mono: true, answer: "publique", why: "Elle n'appartient à aucune plage privée : c'est une adresse publique (ici, une adresse d'exemple)." },
        { id: "a4", text: "198.51.100.42", mono: true, answer: "publique", why: "Hors des plages privées : publique." },
        { id: "a5", text: "192.168.1.300", mono: true, answer: "invalide", why: "300 dépasse 255 : ce nombre est impossible." },
        { id: "a6", text: "172.16.4.2", mono: true, answer: "privee", why: "De 172.16 à 172.31, les adresses sont privées." },
        { id: "a7", text: "192.168.1", mono: true, answer: "invalide", why: "Il manque un nombre : une adresse IPv4 en compte quatre." },
        { id: "a8", text: "198.51.100.7", mono: true, answer: "publique", why: "Hors des plages privées : publique." },
      ],
    },
    hints: [
      "Les trois plages privées à connaître : 10.x.x.x, de 172.16.x.x à 172.31.x.x, et 192.168.x.x.",
      "Deux adresses sont invalides : l'une contient un nombre trop grand, l'autre n'a pas le bon nombre de parties.",
    ],
    correction: [
      "Une adresse IPv4 valide compte exactement quatre nombres de 0 à 255. `192.168.1.300` et `192.168.1` ne respectent pas cette règle.",
      "Parmi les adresses valides, celles qui commencent par `10.`, `172.16` à `172.31` ou `192.168.` sont privées : `192.168.1.24`, `10.0.0.5` et `172.16.4.2`. Les autres sont publiques.",
      "Conséquence pratique : si quelqu'un te dit « je connais ton adresse IP, c'est 192.168.1.24 », il ne sait presque rien. Des millions d'appareils ont cette adresse dans leur réseau local.",
    ],
    recall: {
      notion: "serveur",
      fromDay: 2,
      prompt: "Quand tu consultes un site, quel rôle joue l'ordinateur qui t'envoie la page ?",
      options: [
        { id: "a", text: "Le client" },
        { id: "b", text: "Le serveur" },
        { id: "c", text: "Le navigateur" },
      ],
      answer: "b",
      explanation: "Le serveur attend les requêtes et renvoie les pages. Le navigateur, lui, est le client qui demande.",
    },
    summary: [
      "Une adresse IPv4 compte quatre nombres de 0 à 255.",
      "Les adresses en `10.`, `172.16` à `172.31` et `192.168.` sont privées : elles ne servent qu'à l'intérieur d'un réseau local.",
      "Vers Internet, tes appareils partagent l'adresse publique de ta box : une IP désigne souvent un lieu ou un réseau, pas une personne.",
    ],
  },

  {
    id: "j04",
    day: 4,
    week: 1,
    kind: "apprentissage",
    title: "Le DNS, l'annuaire d'Internet",
    duration: 15,
    objective: "expliquer à quoi sert le DNS et lire une table de correspondance entre noms de domaine et adresses IP.",
    notions: ["dns", "nom-de-domaine"],
    competences: ["internet"],
    learn: {
      paragraphs: [
        "Personne ne retient `203.0.113.10`. On retient `librairie-exemple.test`. Le [[dns|DNS]] (pour Domain Name System) fait la traduction : c'est l'annuaire qui associe chaque [[nom-de-domaine|nom de domaine]] à une adresse IP.",
        "Quand tu tapes une adresse, ton appareil interroge d'abord un résolveur DNS, souvent fourni par ton opérateur. Celui-ci trouve la réponse, ou la connaît déjà car il garde en mémoire les réponses récentes, et renvoie l'adresse IP. C'est seulement ensuite que le navigateur contacte le serveur.",
        "Un même serveur peut héberger plusieurs sites : plusieurs noms peuvent donc pointer vers la même adresse IP. À l'inverse, un grand site peut répartir ses visiteurs sur plusieurs adresses.",
        "Pour la sécurité, retiens deux idées. D'abord, si le DNS répond une fausse adresse (panne, configuration piratée), ton navigateur ira au mauvais endroit tout en affichant le bon nom : c'est l'une des raisons d'être de HTTPS, au programme de demain. Ensuite, beaucoup de pannes du type « Internet ne marche plus » sont en réalité des pannes de DNS : les serveurs sont bien là, mais on ne trouve plus leur numéro.",
      ],
      example: {
        title: "le répertoire du téléphone",
        paragraphs: [
          "Tu appelles « Maman » sans connaître son numéro par cœur : ton téléphone le cherche dans le répertoire. Si quelqu'un modifiait discrètement ce répertoire, tu appellerais un autre numéro en voyant toujours « Maman » à l'écran.",
        ],
      },
    },
    exercise: {
      type: "short",
      instructions: "Voici un extrait simulé des réponses d'un résolveur DNS. Lis-le, puis réponds aux questions.",
      simulation: "Ces noms de domaine et ces adresses sont fictifs.",
      contextLabel: "Réponses du résolveur DNS (nom → adresse IP)",
      context: [
        "www.librairie-exemple.test  →  203.0.113.10",
        "librairie-exemple.test  →  203.0.113.10",
        "boutique.cafe-exemple.test  →  203.0.113.10",
        "www.mairie-exemple.test  →  198.51.100.21",
        "mail.mairie-exemple.test  →  198.51.100.25",
        "www.cafe-exemple.test  →  198.51.100.80",
      ].join("\n"),
      retry: "Lis l'extrait ligne par ligne : à gauche le nom, à droite de la flèche l'adresse que le DNS renvoie pour ce nom. Pour compter, cherche toutes les lignes qui ont la même adresse à droite.",
      questions: [
        {
          id: "q1",
          prompt: "Quelle adresse IP ton navigateur contactera-t-il pour afficher www.mairie-exemple.test ?",
          accept: ["198.51.100.21"],
          placeholder: "ex. 192.0.2.1",
          explanation: "La ligne `www.mairie-exemple.test` indique `198.51.100.21`. Attention à ne pas confondre avec `mail.mairie-exemple.test`, le serveur de messagerie.",
        },
        {
          id: "q2",
          prompt: "Combien de noms différents pointent vers 203.0.113.10 ?",
          accept: ["3", "trois"],
          explanation: "Trois noms partagent cette adresse : `www.librairie-exemple.test`, `librairie-exemple.test` et `boutique.cafe-exemple.test`. Un même serveur héberge plusieurs sites.",
        },
        {
          id: "q3",
          prompt: "Quel nom partage le serveur de la librairie alors qu'il appartient à un autre domaine ?",
          accept: ["boutique.cafe-exemple.test"],
          explanation: "`boutique.cafe-exemple.test` appartient au domaine `cafe-exemple.test`, mais pointe vers le même serveur que la librairie. C'est courant chez les hébergeurs.",
        },
        {
          id: "q4",
          prompt: "Le DNS de ta box tombe en panne. Quelle adresse peux-tu taper directement pour joindre le site www.cafe-exemple.test ?",
          accept: ["198.51.100.80", "http://198.51.100.80", "https://198.51.100.80"],
          explanation:
            "Sans DNS, on peut contacter le serveur par son adresse IP : `198.51.100.80`. En pratique, cela ne marche pas toujours, car un serveur qui héberge plusieurs sites a besoin du nom pour savoir lequel afficher. Mais cela montre bien que le DNS n'est qu'un annuaire.",
        },
      ],
    },
    hints: [
      "Le tableau se lit comme un répertoire : le nom à gauche, le numéro à droite.",
      "Pour la question 3, regarde la fin des noms qui partagent l'adresse 203.0.113.10 : l'un d'eux ne se termine pas par librairie-exemple.test.",
    ],
    correction: [
      "Le DNS se contente d'associer des noms à des adresses. Plusieurs noms peuvent mener au même serveur, et un serveur peut être joint sans DNS si l'on connaît son adresse.",
      "Retiens que le nom affiché dans la barre d'adresse et la machine réellement contactée sont reliés par cet annuaire. C'est pourquoi la vérification apportée par HTTPS, que tu découvres demain, est précieuse.",
    ],
    recall: {
      notion: "ip-privee",
      fromDay: 3,
      prompt: "Ton ordinateur portable a l'adresse 192.168.1.24. Que peut-on en dire ?",
      options: [
        { id: "a", text: "C'est une adresse privée, valable seulement dans ton réseau local" },
        { id: "b", text: "C'est l'adresse que voient tous les sites que tu visites" },
        { id: "c", text: "C'est une adresse invalide" },
      ],
      answer: "a",
      explanation: "192.168.x.x est une plage privée. Les sites voient l'adresse publique de ta box, pas celle-ci.",
    },
    summary: [
      "Le DNS traduit les noms de domaine en adresses IP, comme un annuaire.",
      "Plusieurs noms peuvent pointer vers le même serveur.",
      "Si l'annuaire se trompe, le nom affiché ne garantit plus la destination : d'où l'intérêt de HTTPS.",
    ],
  },

  {
    id: "j05",
    day: 5,
    week: 1,
    kind: "apprentissage",
    title: "Lire une adresse web et comprendre le cadenas",
    duration: 20,
    objective: "identifier le véritable nom de domaine d'une adresse web, et expliquer pourquoi le cadenas HTTPS ne suffit pas à faire confiance.",
    notions: ["url", "nom-de-domaine", "sous-domaine", "https", "certificat"],
    competences: ["url"],
    learn: {
      paragraphs: [
        "Une [[url|URL]] est l'adresse complète d'une page. Prenons `https://www.banque-horizon.test/compte/releves?mois=03`. On y lit le protocole (`https`), le nom d'hôte (`www.banque-horizon.test`), le chemin (`/compte/releves`) et des paramètres (`mois=03`).",
        "La partie qui dit **chez qui** tu vas, c'est le [[nom-de-domaine|nom de domaine]] : les deux derniers éléments du nom d'hôte, juste avant la première barre oblique. Ici, `banque-horizon.test`. Tout ce qui se trouve à sa gauche est un [[sous-domaine]], choisi librement par le propriétaire du domaine.",
        "C'est là que se logent les pièges. Dans `https://banque-horizon.verification-client.test/connexion`, le domaine est `verification-client.test` : « banque-horizon » n'est qu'un sous-domaine, que n'importe qui peut écrire. De même, tout ce qui précède un `@` dans l'adresse est ignoré pour la destination, et un chemin comme `/banque-horizon/` peut contenir n'importe quel mot.",
        "La méthode : repère la première barre oblique après `://`. Juste avant, lis le nom d'hôte **de droite à gauche** : l'extension, puis le nom de domaine. S'il y a un `@`, ne garde que ce qui le suit. Lis aussi lettre par lettre : `banque-horizom` n'est pas `banque-horizon`.",
        "Et le cadenas ? [[https|HTTPS]] signifie que l'échange est [[chiffrement|chiffré]] : personne ne peut lire ni modifier les données en chemin, et le [[certificat]] prouve que le serveur contrôle bien le domaine affiché. Mais n'importe qui peut obtenir gratuitement un certificat pour son propre domaine, escrocs compris. HTTPS dit donc « tu parles bien à `verification-client.test`, en privé », jamais « ce site est honnête ».",
      ],
      example: {
        title: "l'enveloppe scellée",
        paragraphs: [
          "HTTPS, c'est une enveloppe scellée confiée à un coursier fiable : personne ne peut lire ta lettre en route, et elle arrive bien à l'adresse écrite dessus.",
          "Mais si l'adresse est celle d'un escroc, le coursier l'y portera avec le même soin. Le sceau protège le trajet, pas le choix du destinataire.",
        ],
      },
      callout: {
        title: "À retenir absolument",
        text: "Le cadenas protège la conversation, pas ta confiance. Un site de phishing peut parfaitement être en HTTPS, et c'est le cas de la plupart d'entre eux aujourd'hui.",
      },
    },
    exercise: {
      type: "url",
      instructions: "Pour chaque lien, trouve le véritable nom de domaine, puis dis s'il mène vraiment là où il le prétend.",
      simulation: "Ces liens sont fictifs et ne mènent nulle part. Tu peux les analyser sans risque.",
      retry:
        "Pour chaque lien, repère la première barre oblique après `://`, puis lis le nom d'hôte de droite à gauche. S'il y a un `@`, ne garde que ce qui le suit. Le nom de domaine, ce sont les deux derniers éléments.",
      items: [
        {
          id: "u1",
          url: "https://www.banque-horizon.test/espace-client",
          claim: "Présenté comme le site de la Banque Horizon.",
          choices: ["www.banque-horizon.test", "banque-horizon.test", "espace-client"],
          answer: "banque-horizon.test",
          legit: true,
          why: "Le nom d'hôte se termine par `banque-horizon.test` : c'est bien le domaine de la banque. `www` est un sous-domaine habituel, et `/espace-client` le chemin.",
        },
        {
          id: "u2",
          url: "https://banque-horizon.verification-client.test/connexion",
          claim: "Présenté comme la page de connexion de la Banque Horizon.",
          choices: ["banque-horizon.verification-client.test", "verification-client.test", "banque-horizon"],
          answer: "verification-client.test",
          legit: false,
          why: "Lu de droite à gauche, le domaine est `verification-client.test`. « banque-horizon » est un sous-domaine que le propriétaire de ce domaine a choisi pour te tromper.",
        },
        {
          id: "u3",
          url: "https://espace.banque-horizon.test@releves-securises.test/compte",
          claim: "Présenté comme l'accès à tes relevés de la Banque Horizon.",
          choices: ["banque-horizon.test", "releves-securises.test", "espace.banque-horizon.test"],
          answer: "releves-securises.test",
          legit: false,
          why: "Tout ce qui précède `@` est traité comme un identifiant, pas comme une destination. Le navigateur se rend en réalité sur `releves-securises.test`.",
        },
        {
          id: "u4",
          url: "https://www.compte-alerte.test/banque-horizon/connexion",
          claim: "Présenté comme une alerte de sécurité de la Banque Horizon.",
          choices: ["compte-alerte.test", "banque-horizon", "www.compte-alerte.test/banque-horizon"],
          answer: "compte-alerte.test",
          legit: false,
          why: "Le domaine est `compte-alerte.test`. `/banque-horizon/` n'est qu'un dossier sur ce site : n'importe quel mot peut figurer dans un chemin.",
        },
        {
          id: "u5",
          url: "https://aide.banque-horizon.test/contact?sujet=carte",
          claim: "Présenté comme l'aide en ligne de la Banque Horizon.",
          choices: ["aide.banque-horizon.test", "banque-horizon.test", "sujet=carte"],
          answer: "banque-horizon.test",
          legit: true,
          why: "Le domaine est `banque-horizon.test`. `aide` est un sous-domaine créé par la banque elle-même : un sous-domaine n'est pas suspect quand il est placé à gauche du bon domaine.",
        },
        {
          id: "u6",
          url: "https://www.banque-horizom.test/connexion",
          claim: "Présenté comme le site de la Banque Horizon.",
          choices: ["banque-horizon.test", "banque-horizom.test", "www.banque-horizom.test"],
          answer: "banque-horizom.test",
          legit: false,
          why: "Lis lettre par lettre : `horizom` avec un m. C'est un domaine différent, enregistré pour ressembler à l'original.",
        },
      ],
    },
    hints: [
      "Le domaine se trouve toujours juste avant la première barre oblique (ou juste avant la fin s'il n'y en a pas), après un éventuel `@`.",
      "Trois liens sur six mènent ailleurs que chez la banque. L'un d'eux ne diffère de l'original que par une seule lettre.",
    ],
    correction: [
      "Le réflexe à installer : ne lis pas une adresse de gauche à droite comme une phrase, lis le nom d'hôte de droite à gauche. Le nom de domaine, juste avant la première barre oblique, est la seule partie qui t'indique chez qui tu vas.",
      "Les sous-domaines, les chemins et le texte avant un `@` peuvent contenir n'importe quelle marque : ils ne prouvent rien. Une seule lettre changée suffit à créer un domaine différent.",
      "Tous ces liens, y compris les pièges, pourraient afficher un cadenas. HTTPS confirme seulement que tu parles au domaine écrit dans l'adresse.",
    ],
    recall: {
      notion: "dns",
      fromDay: 4,
      prompt: "À quoi sert le DNS ?",
      options: [
        { id: "a", text: "À chiffrer les échanges entre ton navigateur et un site" },
        { id: "b", text: "À traduire un nom de domaine en adresse IP" },
        { id: "c", text: "À stocker les pages des sites web" },
      ],
      answer: "b",
      explanation: "Le DNS est l'annuaire d'Internet : il associe un nom lisible à l'adresse IP de la machine. Le chiffrement, c'est le rôle de HTTPS.",
    },
    summary: [
      "Le véritable domaine se lit juste avant la première barre oblique : ce sont les deux derniers éléments du nom d'hôte.",
      "Sous-domaines, chemins et texte avant un `@` peuvent contenir n'importe quel nom de marque.",
      "HTTPS chiffre l'échange et confirme le domaine, mais ne dit rien de l'honnêteté du site.",
    ],
  },

  {
    id: "j06",
    day: 6,
    week: 1,
    kind: "defi",
    title: "Défi : la page qui ne s'affiche plus",
    duration: 20,
    objective: "mener un petit diagnostic en séparant ce que tu observes de ce que tu supposes.",
    notions: ["observation", "hypothese", "conclusion", "dns"],
    competences: ["internet", "url", "enquete"],
    learn: {
      paragraphs: [
        "Aujourd'hui, pas de nouvelle notion technique : tu vas utiliser celles de la semaine pour comprendre une panne. C'est aussi l'occasion d'adopter une méthode qui te servira pendant tout le programme.",
        "Une [[observation]] est un fait constaté : « la page affiche un message d'erreur ». Une [[hypothese|hypothèse]] est une explication possible : « le site de la mairie est peut-être en panne ». Une [[conclusion]] n'arrive qu'après vérification, quand plusieurs indices vont dans le même sens.",
        "L'erreur la plus courante consiste à sauter directement à la conclusion. Un bon diagnostic garde plusieurs hypothèses ouvertes et cherche l'indice qui permet de les départager.",
      ],
      example: {
        title: "le voyant de la voiture",
        paragraphs: [
          "Un voyant s'allume sur le tableau de bord : c'est une observation. « Il manque de l'huile » est une hypothèse. Le garagiste ne conclut qu'après avoir vérifié la jauge, car le voyant peut aussi venir d'un capteur défectueux.",
        ],
      },
    },
    exercise: {
      type: "investigation",
      instructions: "Consulte les indices, puis réponds aux questions. Distingue bien ce que les indices montrent de ce qu'on suppose.",
      simulation: "Le scénario, les personnes et les sites sont fictifs.",
      retry:
        "Reprends chaque indice et demande-toi ce qu'il montre réellement, sans interprétation. Le message d'erreur précise l'étape qui échoue : relis le jour 4 sur le DNS si besoin.",
      brief: [
        "Camille, une amie, t'appelle : « Je n'arrive plus à aller sur le site de ma mairie pour prendre rendez-vous. Internet ne marche plus ! » Elle t'envoie quelques captures.",
        "Ta mission : trouver l'explication la plus probable, sans conclure trop vite.",
      ],
      clues: [
        { id: "a", title: "Ce que Camille a tapé", source: "capture de la barre d'adresse", kind: "log", content: "https://www.mairie-exempel.test/rendez-vous" },
        {
          id: "b",
          title: "Le message du navigateur",
          source: "capture d'écran",
          kind: "text",
          content: "Ce site est inaccessible.\nImpossible de trouver l'adresse IP du serveur de www.mairie-exempel.test.\nCode : NXDOMAIN (nom de domaine inexistant)",
        },
        {
          id: "c",
          title: "Les autres sites",
          source: "message de Camille",
          kind: "text",
          content: "« Les vidéos et ma messagerie marchent très bien. Mon fils, sur le même wifi, lit les informations sur son téléphone. »",
        },
        {
          id: "d",
          title: "Le courrier de la mairie",
          source: "photo d'un courrier papier",
          kind: "email",
          content: "Madame,\nVous pouvez désormais prendre rendez-vous en ligne sur www.mairie-exemple.test/rendez-vous\nLe service État civil",
        },
      ],
      questions: [
        {
          id: "q1",
          prompt: "Parmi ces affirmations, lesquelles sont des observations, c'est-à-dire des faits constatés dans les indices ?",
          options: [
            { id: "a", text: "Le navigateur ne trouve pas l'adresse IP de www.mairie-exempel.test." },
            { id: "b", text: "D'autres sites fonctionnent sur la même connexion." },
            { id: "c", text: "Le serveur de la mairie est en panne." },
            { id: "d", text: "Internet ne marche plus chez Camille." },
          ],
          answers: ["a", "b"],
          explanation:
            "Les affirmations A et B sont écrites noir sur blanc dans les indices B et C. « Le serveur est en panne » est une hypothèse, et « Internet ne marche plus » est une hypothèse contredite par l'indice C.",
        },
        {
          id: "q2",
          prompt: "L'hypothèse de Camille, « Internet ne marche plus », tient-elle ?",
          options: [
            { id: "a", text: "Oui, puisque le site ne s'affiche pas." },
            { id: "b", text: "Non : d'autres sites fonctionnent sur la même connexion." },
            { id: "c", text: "On ne peut rien dire avec ces indices." },
          ],
          answers: ["b"],
          explanation: "L'indice C la contredit : vidéos, messagerie et téléphone du fils fonctionnent. Le problème est limité à ce site.",
        },
        {
          id: "q3",
          prompt: "Quelle est l'explication la plus probable ?",
          options: [
            { id: "a", text: "Le serveur de la mairie est en panne." },
            { id: "b", text: "L'adresse tapée contient une faute (exempel au lieu de exemple), et ce nom n'existe pas dans le DNS." },
            { id: "c", text: "Le wifi de Camille a été piraté." },
          ],
          answers: ["b"],
          explanation:
            "Le message ne dit pas que le serveur ne répond pas : il dit que le nom n'existe pas (NXDOMAIN). En comparant les indices A et D, on voit la faute de frappe. Une panne du serveur produirait une autre erreur, car le DNS trouverait quand même son adresse.",
        },
        {
          id: "q4",
          prompt: "Comment confirmer cette conclusion ?",
          options: [
            { id: "a", text: "Retaper l'adresse exactement comme sur le courrier et vérifier que la page s'affiche." },
            { id: "b", text: "Redémarrer la box." },
            { id: "c", text: "Installer un antivirus." },
          ],
          answers: ["a"],
          explanation: "Une conclusion se vérifie par un test qui pourrait la contredire. Si la bonne adresse fonctionne, l'hypothèse de la faute de frappe est confirmée.",
        },
      ],
    },
    hints: [
      "Le message d'erreur ne dit pas que le serveur ne répond pas : il dit qu'on ne trouve même pas son adresse IP. Quel service se charge de cette étape ?",
      "Compare lettre par lettre l'adresse tapée (indice A) et celle du courrier (indice D).",
    ],
    correction: [
      "Le diagnostic suit la méthode : on liste les observations (erreur DNS, autres sites fonctionnels), on écarte l'hypothèse « Internet en panne » qu'elles contredisent, puis on cherche l'indice qui départage les hypothèses restantes.",
      "Le message NXDOMAIN signifie que le nom demandé n'existe pas dans l'annuaire. La comparaison avec le courrier révèle une faute de frappe. Il reste à vérifier en tapant la bonne adresse : c'est ce test qui transforme l'hypothèse en conclusion.",
      "Note au passage que la faute de frappe aurait pu être plus grave : si quelqu'un avait enregistré `mairie-exempel.test`, Camille serait arrivée sur un faux site, avec un cadenas. Les escrocs enregistrent volontiers ces variantes.",
    ],
    recall: {
      notion: "https",
      fromDay: 5,
      prompt: "Un site affiche un cadenas dans la barre d'adresse. Qu'est-ce que cela garantit ?",
      options: [
        { id: "a", text: "Que le site est honnête" },
        { id: "b", text: "Que l'échange est chiffré avec le domaine affiché dans l'adresse" },
        { id: "c", text: "Que le site a été vérifié par une autorité publique" },
      ],
      answer: "b",
      explanation: "HTTPS protège la conversation et confirme le domaine. Il ne dit rien des intentions de son propriétaire.",
    },
    summary: [
      "Une observation est un fait ; une hypothèse, une explication à vérifier ; une conclusion, une hypothèse confirmée par des indices.",
      "Un message d'erreur précis indique l'étape qui échoue : ici, la recherche DNS.",
      "Avant de conclure, cherche l'indice qui départage les hypothèses, puis vérifie par un test.",
    ],
  },

  {
    id: "j07",
    day: 7,
    week: 1,
    kind: "revision",
    title: "Révision : les acteurs d'une visite sur le web",
    duration: 12,
    objective: "associer chaque notion de la semaine à son rôle, de mémoire.",
    notions: ["navigateur", "serveur", "dns", "adresse-ip", "nom-de-domaine", "https"],
    competences: ["internet", "url"],
    learn: {
      paragraphs: [
        "Une séance plus légère pour consolider. Les notions de la semaine forment une chaîne : tu tapes une [[url|URL]] dans ton [[navigateur]] ; le [[dns|DNS]] traduit le nom en [[adresse-ip|adresse IP]] ; le navigateur envoie une [[requete|requête]] au [[serveur]], qui répond ; le tout est protégé par [[https|HTTPS]], et fonctionne grâce au [[systeme-exploitation|système d'exploitation]] de ton appareil.",
        "Essaie de faire l'exercice sans relire tes notes. Si un terme résiste, c'est une information utile : note-le dans « Ce que je veux revoir ».",
      ],
      example: {
        title: "refaire un trajet sans GPS",
        paragraphs: [
          "Pour retenir un trajet, rien ne vaut de le refaire sans GPS. La mémoire se renforce surtout quand on fait l'effort de retrouver une information, beaucoup moins quand on la relit.",
        ],
      },
    },
    exercise: {
      type: "match",
      variant: "associate",
      instructions: "Associe chaque notion à la description qui lui correspond.",
      retry: "Pour chaque notion, essaie de la replacer dans le trajet d'une page : qui demande, qui traduit, qui répond, qui protège ? Les descriptions restantes concernent l'appareil et l'adresse.",
      options: [
        { id: "d-nav", label: "Affiche les pages et envoie les requêtes" },
        { id: "d-srv", label: "Attend les demandes et renvoie les pages" },
        { id: "d-os", label: "Fait fonctionner l'appareil et lance les applications" },
        { id: "d-ip", label: "Numéro d'une machine sur un réseau" },
        { id: "d-dns", label: "Traduit un nom de domaine en adresse IP" },
        { id: "d-dom", label: "Indique vraiment chez qui mène une adresse web" },
        { id: "d-https", label: "Chiffre l'échange et confirme le domaine, sans garantir l'honnêteté" },
        { id: "d-ext", label: "Indique le type d'un fichier, à lire après le dernier point" },
        { id: "d-rout", label: "Relie ton réseau local à Internet" },
      ],
      items: [
        { id: "navigateur", text: "Navigateur", answer: "d-nav", why: "Le navigateur est le client : il demande et il affiche." },
        { id: "serveur", text: "Serveur", answer: "d-srv", why: "Le serveur répond aux requêtes." },
        { id: "os", text: "Système d'exploitation", answer: "d-os", why: "Il fait tourner l'appareil et les applications." },
        { id: "ip", text: "Adresse IP", answer: "d-ip", why: "Le numéro qui permet d'acheminer les échanges." },
        { id: "dns", text: "DNS", answer: "d-dns", why: "L'annuaire qui traduit un nom en adresse IP." },
        { id: "domaine", text: "Nom de domaine", answer: "d-dom", why: "Les deux derniers éléments du nom d'hôte, juste avant la première barre oblique." },
        { id: "https", text: "HTTPS", answer: "d-https", why: "Il protège la conversation, pas ta confiance." },
        { id: "extension", text: "Extension de fichier", answer: "d-ext", why: "Seule la dernière extension compte." },
        { id: "routeur", text: "Routeur (box)", answer: "d-rout", why: "Il fait le lien entre ton réseau local et Internet." },
      ],
    },
    hints: [
      "Commence par les associations dont tu es sûr : cela réduit les choix pour les autres.",
      "Deux descriptions se ressemblent : l'une parle de « numéro d'une machine », l'autre de « traduire un nom ». La première est l'adresse IP, la seconde le DNS.",
    ],
    correction: [
      "Ces neuf notions décrivent le trajet complet d'une visite sur le web, de ton appareil jusqu'au serveur.",
      "Les deux réflexes de sécurité de la semaine en découlent : lire le nom de domaine avant de faire confiance à un lien, et ne pas confondre le cadenas avec une garantie d'honnêteté.",
    ],
    recall: {
      notion: "observation",
      fromDay: 6,
      prompt: "« Le navigateur affiche une erreur DNS pour le site de la mairie. » Il s'agit…",
      options: [
        { id: "a", text: "d'une observation" },
        { id: "b", text: "d'une hypothèse" },
        { id: "c", text: "d'une conclusion" },
      ],
      answer: "a",
      explanation: "C'est un fait constaté à l'écran, sans interprétation : une observation.",
    },
    summary: [
      "Navigateur, DNS, serveur : le trajet d'une page tient en trois acteurs principaux.",
      "Le domaine se lit juste avant la première barre oblique ; HTTPS protège l'échange, pas ta confiance.",
      "Distinguer observation, hypothèse et conclusion évite les diagnostics hâtifs.",
    ],
  },
];

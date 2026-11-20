import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '0.42.0:8',
  releaseNotes: {
    en_US: `Requires StartOS 0.4.2 or later.

The Admin Portal and the Kubo RPC API now require a password. Until you create one, nothing can use the API, so the Admin Portal shows a connection screen; your pins, the Public Gateway and peering keep working.

After updating, run the **Create Admin Password** task. Then open the Admin Portal and, when it asks for its Kubo RPC API address, enter \`https://admin:<password>@<host>\`, where \`<host>\` is the hostname, with its port if it has one, of the address you opened it at. Any other tool that talks to your node's RPC API needs the same credentials.`,
    es_ES: `Requiere StartOS 0.4.2 o posterior.

El Portal de administración y la API RPC de Kubo ahora requieren una contraseña. Hasta que cree una, nada puede usar la API, por lo que el Portal de administración muestra una pantalla de conexión; sus pins, la Puerta de enlace pública y la conexión con pares siguen funcionando.

Después de actualizar, ejecute la tarea **Crear contraseña de administrador**. Luego abra el Portal de administración y, cuando le pida la dirección de su API RPC de Kubo, introduzca \`https://admin:<contraseña>@<host>\`, donde \`<host>\` es el nombre de host, con su puerto si lo tiene, de la dirección con la que lo abrió. Cualquier otra herramienta que use la API RPC de su nodo necesita las mismas credenciales.`,
    de_DE: `Erfordert StartOS 0.4.2 oder neuer.

Das Admin-Portal und die Kubo-RPC-API erfordern jetzt ein Passwort. Bis Sie eines erstellen, kann nichts die API verwenden, daher zeigt das Admin-Portal einen Verbindungsbildschirm; Ihre Pins, das Öffentliche Gateway und die Verbindung zu Peers funktionieren weiter.

Führen Sie nach dem Update die Aufgabe **Admin-Passwort erstellen** aus. Öffnen Sie dann das Admin-Portal und geben Sie, wenn es nach der Adresse seiner Kubo-RPC-API fragt, \`https://admin:<passwort>@<host>\` ein, wobei \`<host>\` der Hostname, gegebenenfalls mit Port, der Adresse ist, unter der Sie es geöffnet haben. Jedes andere Werkzeug, das die RPC-API Ihres Knotens verwendet, benötigt dieselben Zugangsdaten.`,
    pl_PL: `Wymaga StartOS 0.4.2 lub nowszego.

Portal administracyjny i API RPC Kubo wymagają teraz hasła. Dopóki go nie utworzysz, nic nie może korzystać z API, więc Portal administracyjny wyświetla ekran połączenia; twoje piny, Brama publiczna i łączenie z peerami nadal działają.

Po aktualizacji uruchom zadanie **Utwórz hasło administratora**. Następnie otwórz Portal administracyjny i, gdy poprosi o adres swojego API RPC Kubo, wpisz \`https://admin:<hasło>@<host>\`, gdzie \`<host>\` to nazwa hosta, wraz z portem, jeśli go ma, adresu, pod którym go otworzyłeś. Każde inne narzędzie korzystające z API RPC twojego węzła potrzebuje tych samych danych logowania.`,
    fr_FR: `Nécessite StartOS 0.4.2 ou une version ultérieure.

Le Portail d'administration et l'API RPC Kubo exigent désormais un mot de passe. Tant que vous n'en avez pas créé, rien ne peut utiliser l'API : le Portail d'administration affiche donc un écran de connexion ; vos pins, la Passerelle publique et la connexion aux pairs continuent de fonctionner.

Après la mise à jour, exécutez la tâche **Créer le mot de passe administrateur**. Ouvrez ensuite le Portail d'administration et, lorsqu'il demande l'adresse de son API RPC Kubo, saisissez \`https://admin:<mot-de-passe>@<hôte>\`, où \`<hôte>\` est le nom d'hôte, avec son port s'il en a un, de l'adresse à laquelle vous l'avez ouvert. Tout autre outil qui utilise l'API RPC de votre nœud a besoin des mêmes identifiants.`,
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})

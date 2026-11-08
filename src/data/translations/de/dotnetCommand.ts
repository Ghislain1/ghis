import type { LessonMeta } from '../../../types'
import type { CourseTranslation } from '../../../i18n/content'

export const meta: LessonMeta = {
  course: 'dotnet CLI — Grundlagen der Kommandozeile',
  chapter: '4 Kapitel · 20 Fragen',
  lesson: 'Meistere die dotnet-Kommandozeile',
  estimatedMinutes: 60,
}

export const frames: CourseTranslation['frames'] = {
  'command-c1': {
    type: 'content',
    eyebrow: 'DOTNET CLI · KAPITEL 1',
    title: 'Projekte erstellen und prüfen.',
    body: [
      'Die dotnet CLI ist im SDK enthalten und erzeugt jedes Projektgerüst: Konsole, Klassenbibliothek, Web-API, Tests und mehr. dotnet new erstellt aus einer Vorlage, dotnet new list zeigt die verfügbaren Vorlagen und dotnet --info meldet die installierten SDKs und Runtimes.',
      'Mit -o wählst du den Ausgabeordner und mit -n den Projektnamen. Vorlagen nehmen weitere Optionen über --help an – das ist oft schneller, als die Dokumentation zu durchsuchen.',
    ],
    note: 'Beginne jedes neue Projekt mit dotnet new list und dotnet new <template> --help.',
    aiNote: 'Dieses Kapitel behandelt Befehle zum Erstellen von Projekten und zum Prüfen des SDK.',
  },
  'command-c2': {
    type: 'content',
    eyebrow: 'DOTNET CLI · KAPITEL 2',
    title: 'Restore, Build und Run.',
    body: [
      'dotnet restore löst NuGet-Abhängigkeiten auf. dotnet build kompiliert das Projekt und schreibt die Ausgabe nach bin, und dotnet run baut und startet die App in einem Schritt. dotnet watch beschleunigt den Entwicklungslauf, indem es bei Dateiänderungen neu baut und neu startet.',
      'Die Konfiguration verändert die Ausgabe: Debug behält Symbole und optimiert weniger, während Release Optimierungen aktiviert. Mit --no-restore oder --no-build überspringst du Schritte, die in einer Pipeline bereits gelaufen sind.',
    ],
    note: 'build und run schließen restore ein, sofern du nicht --no-restore angibst.',
    aiNote: 'Dieses Kapitel behandelt den täglichen Build- und Run-Zyklus samt der nützlichsten Flags.',
  },
  'command-q1': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Welcher Befehl listet die installierten Projektvorlagen auf?',
    helper: 'Wähle eine Antwort.',
    options: {
      'command-q1-a': { title: 'dotnet new list' },
      'command-q1-b': { title: 'dotnet templates' },
      'command-q1-c': { title: 'dotnet init --list' },
      'command-q1-d': { title: 'dotnet list templates' },
    },
    explanation:
      'dotnet new list (oder dotnet new --list) gibt die verfügbaren Vorlagen und ihre Kurznamen aus.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q2': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Welche davon sind echte dotnet new-Vorlagen?',
    helper: 'Wähle alle zutreffenden Antworten.',
    options: {
      'command-q2-a': { title: 'console' },
      'command-q2-b': { title: 'webapi' },
      'command-q2-c': { title: 'xunit' },
      'command-q2-d': { title: 'npm' },
    },
    explanation:
      'console, webapi, classlib, xunit und viele weitere sind echte Vorlagen. npm ist ein Node.js-Paketmanager, keine dotnet-Vorlage.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q3': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Welcher Befehl zeigt die installierten SDK- und Runtime-Versionen an?',
    helper: 'Wähle eine Antwort.',
    options: {
      'command-q3-a': { title: 'dotnet --info' },
      'command-q3-b': {
        title: 'dotnet --version',
        description: 'Das gibt nur die aktuelle SDK-Version aus.',
      },
      'command-q3-c': { title: 'dotnet info --all' },
      'command-q3-d': { title: 'dotnet list sdk' },
    },
    explanation:
      'dotnet --info meldet SDK, Runtimes, Host und Umgebungsdetails. dotnet --version gibt nur die ausgewählte SDK-Version aus.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q4': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Wie erstellst du ein Konsolenprojekt in einem Ordner namens MyApp?',
    helper: 'Wähle eine Antwort.',
    options: {
      'command-q4-a': { title: 'dotnet new console -o MyApp' },
      'command-q4-b': { title: 'dotnet new console --folder MyApp' },
      'command-q4-c': { title: 'dotnet create console MyApp' },
      'command-q4-d': { title: 'dotnet new console > MyApp' },
    },
    explanation:
      'Die Option -o (oder --output) wählt das Ausgabeverzeichnis. Das Projekt wird in MyApp erstellt.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q5': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Welche Option legt den Projektnamen unabhängig vom Ausgabeordner fest?',
    helper: 'Wähle eine Antwort.',
    options: {
      'command-q5-a': { title: '-n oder --name' },
      'command-q5-b': {
        title: '-o oder --output',
        description: 'Das legt den Ordner fest, nicht den Projektnamen.',
      },
      'command-q5-c': { title: '-f oder --framework' },
      'command-q5-d': { title: '-c oder --configuration' },
    },
    explanation:
      'Nutze -n für den Projektnamen und -o für den Ordner, wenn sie sich unterscheiden sollen.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q6': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Was macht dotnet restore?',
    helper: 'Wähle eine Antwort.',
    options: {
      'command-q6-a': {
        title: 'Lädt die NuGet-Abhängigkeiten des Projekts herunter und löst sie auf',
      },
      'command-q6-b': { title: 'Löscht bin und obj' },
      'command-q6-c': { title: 'Führt die Anwendung aus' },
      'command-q6-d': { title: 'Formatiert den Quellcode' },
    },
    explanation:
      'Restore liest die Projektdatei und Paketverweise, kontaktiert die NuGet-Feeds und schreibt die Assets-Datei nach obj.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q7': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Welche Optionen sind für dotnet build gültig?',
    helper: 'Wähle alle zutreffenden Antworten.',
    options: {
      'command-q7-a': { title: '-c Release' },
      'command-q7-b': { title: '--no-restore' },
      'command-q7-c': { title: '-o out' },
      'command-q7-d': {
        title: '--publish',
        description: 'Das Veröffentlichen ist ein eigener Befehl dotnet publish.',
      },
    },
    explanation:
      'build akzeptiert Flags für Konfiguration, Ausgabe und Restore-Steuerung. Veröffentlichen ist ein eigenes Verb.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q8': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Was macht dotnet run?',
    helper: 'Wähle eine Antwort.',
    options: {
      'command-q8-a': { title: 'Baut das Projekt und führt es aus' },
      'command-q8-b': { title: 'Führt das Projekt nur aus, wenn es veröffentlicht wurde' },
      'command-q8-c': { title: 'Startet nur den ASP.NET Core-Entwicklungsserver' },
      'command-q8-d': { title: 'Packt das Projekt in ein NuGet-Paket' },
    },
    explanation:
      'dotnet run kompiliert das Projekt und startet die resultierende Anwendung; Argumente nach -- werden an die App weitergegeben.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q9': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Welcher Befehl baut die App bei Änderungen an Quelldateien neu und startet sie neu?',
    helper: 'Wähle eine Antwort.',
    options: {
      'command-q9-a': { title: 'dotnet watch' },
      'command-q9-b': { title: 'dotnet serve' },
      'command-q9-c': { title: 'dotnet hot' },
      'command-q9-d': { title: 'dotnet dev' },
    },
    explanation:
      'dotnet watch ist ein Dateiwatcher, der das Projekt bei Änderungen neu baut und erneut ausführt. dotnet watch run ist ebenfalls üblich.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q10': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Wohin schreibt dotnet build -c Release die Hauptausgabe?',
    helper: 'Wähle eine Antwort.',
    options: {
      'command-q10-a': { title: 'bin/Release/<target-framework>/' },
      'command-q10-b': {
        title: 'obj/Release/',
        description: 'obj enthält Zwischendateien, nicht die endgültige Ausgabe.',
      },
      'command-q10-c': { title: 'publish/Release/' },
      'command-q10-d': { title: 'dist/Release/' },
    },
    explanation:
      'Die Build-Ausgabe landet standardmäßig unter bin/<Configuration>/<TargetFramework>/. Der publish-Ordner entsteht durch dotnet publish.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-c3': {
    type: 'content',
    eyebrow: 'DOTNET CLI · KAPITEL 3',
    title: 'Testen, veröffentlichen und packen.',
    body: [
      'dotnet test erkennt und führt Testprojekte aus. dotnet publish erzeugt einen bereitstellbaren Ordner; standardmäßig ist er frameworkabhängig, aber -r mit --self-contained bindet die Runtime mit ein. dotnet pack verwandelt eine Klassenbibliothek in ein NuGet-Paket.',
      'Führe in CI restore einmal aus, baue dann mit --no-restore und teste anschließend mit --no-build. So bleibt jeder Schritt explizit und Arbeit wird nicht doppelt gemacht.',
    ],
    note: 'Nutze -c Release für alles, was deinen Rechner verlässt.',
    aiNote: 'Dieses Kapitel behandelt Befehle zum Testen, Veröffentlichen und Packen.',
  },
  'command-c4': {
    type: 'content',
    eyebrow: 'DOTNET CLI · KAPITEL 4',
    title: 'Solutions, Verweise, Tools und Geheimnisse.',
    body: [
      'Eine Solution gruppiert zusammengehörige Projekte. dotnet new sln erstellt eine; dotnet sln add, list und remove verwalten ihre Projekte. Projektverweise verbinden Projekte mit dotnet add reference.',
      'Die CLI ist erweiterbar. dotnet tool install fügt globale oder lokale Tools wie dotnet-ef hinzu, und dotnet user-secrets speichert Entwicklungsgeheimnisse außerhalb des Repositorys.',
    ],
    note: 'Bevorzuge lokale Tool-Manifeste, damit jedes Teammitglied und jeder CI-Job dieselbe Tool-Version verwendet.',
    aiNote: 'Dieses Kapitel behandelt Solution-Verwaltung, Verweise, Tools und User Secrets.',
  },
  'command-q11': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Welcher Befehl führt die Tests in einem Testprojekt aus?',
    helper: 'Wähle eine Antwort.',
    options: {
      'command-q11-a': { title: 'dotnet test' },
      'command-q11-b': { title: 'dotnet run tests' },
      'command-q11-c': { title: 'dotnet check' },
      'command-q11-d': { title: 'dotnet verify' },
    },
    explanation:
      'dotnet test erkennt Testframeworks im Projekt, führt sie aus und meldet die Ergebnisse.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q12': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Welche Optionen sind für dotnet test gültig?',
    helper: 'Wähle alle zutreffenden Antworten.',
    options: {
      'command-q12-a': { title: '--filter' },
      'command-q12-b': { title: '--no-build' },
      'command-q12-c': { title: '--collect:"XPlat Code Coverage"' },
      'command-q12-d': { title: '--publish' },
    },
    explanation:
      'Test unterstützt Filtern, Überspringen des Builds und Sammeln von Coverage. Veröffentlichen ist ein eigener Befehl.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q13': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Welcher Befehl veröffentlicht einen eigenständigen Linux-x64-Build?',
    helper: 'Wähle eine Antwort.',
    options: {
      'command-q13-a': { title: 'dotnet publish -c Release -r linux-x64 --self-contained true' },
      'command-q13-b': { title: 'dotnet build -r linux-x64 --bundle' },
      'command-q13-c': { title: 'dotnet publish --os linux' },
      'command-q13-d': { title: 'dotnet pack -r linux-x64' },
    },
    explanation:
      'Eine Runtime-ID (-r) zusammen mit --self-contained bindet die Runtime für diese Plattform ein. dotnet publish erzeugt die bereitstellbare Ausgabe.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q14': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Was erzeugt ein standardmäßiges dotnet publish?',
    helper: 'Wähle eine Antwort.',
    options: {
      'command-q14-a': {
        title: 'Eine frameworkabhängige Bereitstellung, die die Runtime auf dem Zielrechner voraussetzt',
      },
      'command-q14-b': {
        title: 'Eine eigenständige Bereitstellung mit gebündelter Runtime',
      },
      'command-q14-c': { title: 'Ein Docker-Image' },
      'command-q14-d': { title: 'Ein NuGet-Paket' },
    },
    explanation:
      'Ohne -r und --self-contained ist publish frameworkabhängig. Der Zielhost benötigt eine kompatible .NET-Runtime.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q15': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Welcher Befehl erstellt ein NuGet-Paket aus einer Klassenbibliothek?',
    helper: 'Wähle eine Antwort.',
    options: {
      'command-q15-a': { title: 'dotnet pack' },
      'command-q15-b': { title: 'dotnet publish' },
      'command-q15-c': { title: 'dotnet build --package' },
      'command-q15-d': { title: 'dotnet nuget pack' },
    },
    explanation:
      'dotnet pack baut das Projekt und schreibt eine .nupkg-Datei, meistens nach bin/Release.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q16': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Welcher Befehl erstellt eine neue Solution-Datei?',
    helper: 'Wähle eine Antwort.',
    options: {
      'command-q16-a': { title: 'dotnet new sln' },
      'command-q16-b': { title: 'dotnet new solution' },
      'command-q16-c': { title: 'dotnet sln new' },
      'command-q16-d': { title: 'dotnet create sln' },
    },
    explanation:
      'dotnet new sln erzeugt eine .sln-Datei. Mit -n legst du den Solution-Namen fest.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q17': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Welche sind gültige dotnet sln-Befehle?',
    helper: 'Wähle alle zutreffenden Antworten.',
    options: {
      'command-q17-a': { title: 'dotnet sln add' },
      'command-q17-b': { title: 'dotnet sln list' },
      'command-q17-c': { title: 'dotnet sln remove' },
      'command-q17-d': { title: 'dotnet sln compile' },
    },
    explanation:
      'Der solution-Befehl fügt Projekte hinzu, listet sie auf und entfernt sie. Kompiliert wird mit dotnet build, nicht mit dotnet sln.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q18': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Wie fügst du einen Projektverweis auf ein anderes Projekt hinzu?',
    helper: 'Wähle eine Antwort.',
    options: {
      'command-q18-a': { title: 'dotnet add reference ../Lib/Lib.csproj' },
      'command-q18-b': { title: 'dotnet reference add ../Lib/Lib.csproj' },
      'command-q18-c': { title: 'dotnet add package ../Lib/Lib.csproj' },
      'command-q18-d': { title: 'dotnet sln add ../Lib/Lib.csproj' },
    },
    explanation:
      'dotnet add reference ergänzt die .csproj um eine ProjectReference. Der sln-Befehl fügt Projekte zu einer Solution hinzu, keine Verweise.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q19': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Wie installierst du die EF Core CLI als globales Tool?',
    helper: 'Wähle eine Antwort.',
    options: {
      'command-q19-a': { title: 'dotnet tool install --global dotnet-ef' },
      'command-q19-b': { title: 'dotnet install dotnet-ef --global' },
      'command-q19-c': { title: 'dotnet ef install --global' },
      'command-q19-d': { title: 'npm install -g dotnet-ef' },
    },
    explanation:
      'dotnet tool install --global installiert das Tool für den aktuellen Benutzer. Lokale Tool-Manifeste sind die reproduzierbare Alternative.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
  'command-q20': {
    type: 'question',
    eyebrow: 'CHECK · DOTNET CLI',
    question: 'Welche sind gültige dotnet user-secrets-Befehle?',
    helper: 'Wähle alle zutreffenden Antworten.',
    options: {
      'command-q20-a': { title: 'dotnet user-secrets set' },
      'command-q20-b': { title: 'dotnet user-secrets list' },
      'command-q20-c': { title: 'dotnet user-secrets clear' },
      'command-q20-d': { title: 'dotnet user-secrets deploy' },
    },
    explanation:
      'User Secrets lassen sich setzen, auflisten und löschen. Sie sind für die lokale Entwicklung gedacht und werden nie bereitgestellt.',
    aiNote: 'Verknüpfe diese Antwort mit dem Konzept, das auf diesem Bildschirm erklärt wird.',
  },
}

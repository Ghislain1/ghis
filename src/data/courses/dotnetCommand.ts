import type { LessonFrame, LessonMeta } from '../../types'
import { c, q } from '../frames'

export const meta: LessonMeta = {
  course: 'dotnet CLI — Command Line Essentials',
  chapter: '4 chapters · 20 questions',
  lesson: 'Master the dotnet command line',
  estimatedMinutes: 60,
}

export const frames: LessonFrame[] = [
  c(
    'command-c1',
    'DOTNET CLI · CHAPTER 1',
    'Create and inspect projects.',
    [
      'The dotnet CLI ships with the SDK and scaffolds every project type: console, class library, Web API, tests, and more. dotnet new creates from a template, dotnet new list shows what is available, and dotnet --info reports the installed SDKs and runtimes.',
      'Use -o to choose the output folder and -n to choose the project name. Templates accept extra options through --help, which is often faster than searching the documentation.',
    ],
    'Start every new project with dotnet new list and dotnet new <template> --help.',
    'This chapter covers project creation and SDK inspection commands.',
  ),
  c(
    'command-c2',
    'DOTNET CLI · CHAPTER 2',
    'Restore, build, and run.',
    [
      'dotnet restore resolves NuGet dependencies. dotnet build compiles the project and writes output under bin, and dotnet run builds and launches the app in one step. dotnet watch improves the inner loop by rebuilding and restarting on file changes.',
      'Configuration changes the output shape: Debug keeps symbols and optimises less, while Release enables optimisations. Use --no-restore or --no-build to skip steps that already ran in a pipeline.',
    ],
    'build and run imply restore unless you pass --no-restore.',
    'This chapter covers the daily build and run loop together with the most useful flags.',
  ),
  q('command-q1', 'CHECK · DOTNET CLI', 'Which command lists the installed project templates?', [
    ['dotnet new list', true],
    ['dotnet templates', false],
    ['dotnet init --list', false],
    ['dotnet list templates', false],
  ], 'dotnet new list (or dotnet new --list) prints the available templates and their short names.'),
  q('command-q2', 'CHECK · DOTNET CLI', 'Which of these are real dotnet new templates?', [
    ['console', true],
    ['webapi', true],
    ['xunit', true],
    ['npm', false],
  ], 'console, webapi, classlib, xunit, and many others are real templates. npm is a Node.js package manager, not a dotnet template.', true),
  q('command-q3', 'CHECK · DOTNET CLI', 'Which command shows the installed SDK and runtime versions?', [
    ['dotnet --info', true],
    ['dotnet --version', false, 'That prints only the current SDK version.'],
    ['dotnet info --all', false],
    ['dotnet list sdk', false],
  ], 'dotnet --info reports the SDK, runtimes, host, and environment details. dotnet --version prints only the selected SDK version.'),
  q('command-q4', 'CHECK · DOTNET CLI', 'How do you create a console project in a folder named MyApp?', [
    ['dotnet new console -o MyApp', true],
    ['dotnet new console --folder MyApp', false],
    ['dotnet create console MyApp', false],
    ['dotnet new console > MyApp', false],
  ], 'The -o (or --output) option selects the output directory. The project is created inside MyApp.'),
  q('command-q5', 'CHECK · DOTNET CLI', 'Which option sets the project name independently of the output folder?', [
    ['-n or --name', true],
    ['-o or --output', false, 'That sets the folder, not the project name.'],
    ['-f or --framework', false],
    ['-c or --configuration', false],
  ], 'Use -n to set the project name and -o to set the folder when they should differ.'),
  q('command-q6', 'CHECK · DOTNET CLI', 'What does dotnet restore do?', [
    ['Downloads and resolves NuGet dependencies for the project', true],
    ['Deletes bin and obj', false],
    ['Runs the application', false],
    ['Formats the source code', false],
  ], 'Restore reads the project file and package references, contacts the NuGet feeds, and writes the assets file under obj.'),
  q('command-q7', 'CHECK · DOTNET CLI', 'Which options are valid for dotnet build?', [
    ['-c Release', true],
    ['--no-restore', true],
    ['-o out', true],
    ['--publish', false, 'Publishing is a separate dotnet publish command.'],
  ], 'build accepts configuration, output, and restore-control flags. Publishing is a separate verb.', true),
  q('command-q8', 'CHECK · DOTNET CLI', 'What does dotnet run do?', [
    ['Builds and runs the project', true],
    ['Runs the project only if it is published', false],
    ['Starts the ASP.NET Core development server only', false],
    ['Packs the project into a NuGet package', false],
  ], 'dotnet run compiles the project and launches the resulting application, forwarding arguments after -- to the app.'),
  q('command-q9', 'CHECK · DOTNET CLI', 'Which command rebuilds and restarts the app when source files change?', [
    ['dotnet watch', true],
    ['dotnet serve', false],
    ['dotnet hot', false],
    ['dotnet dev', false],
  ], 'dotnet watch is a file watcher that rebuilds and reruns the project on changes. dotnet watch run is also common.'),
  q('command-q10', 'CHECK · DOTNET CLI', 'Where does dotnet build -c Release write the main output?', [
    ['bin/Release/<target-framework>/', true],
    ['obj/Release/', false, 'obj holds intermediate files, not the final output.'],
    ['publish/Release/', false],
    ['dist/Release/', false],
  ], 'Build output goes to bin/<Configuration>/<TargetFramework>/ by default. The publish folder is produced by dotnet publish.'),
  c(
    'command-c3',
    'DOTNET CLI · CHAPTER 3',
    'Test, publish, and package.',
    [
      'dotnet test discovers and runs test projects. dotnet publish produces a deployable folder; by default it is framework-dependent, but -r with --self-contained bundles the runtime. dotnet pack turns a class library into a NuGet package.',
      'In CI, run restore once, then build with --no-restore, then test with --no-build. That keeps each step explicit and avoids repeating work.',
    ],
    'Use -c Release for anything that leaves your machine.',
    'This chapter covers testing, publishing, and packaging commands.',
  ),
  c(
    'command-c4',
    'DOTNET CLI · CHAPTER 4',
    'Solutions, references, tools, and secrets.',
    [
      'A solution groups related projects. dotnet new sln creates one; dotnet sln add, list, and remove manage its projects. Project references glue projects together with dotnet add reference.',
      'The CLI is extensible. dotnet tool install adds global or local tools such as dotnet-ef, and dotnet user-secrets stores development secrets outside the repository.',
    ],
    'Prefer local tool manifests so every teammate and CI job uses the same tool version.',
    'This chapter covers solution management, references, tools, and user secrets.',
  ),
  q('command-q11', 'CHECK · DOTNET CLI', 'Which command runs the tests in a test project?', [
    ['dotnet test', true],
    ['dotnet run tests', false],
    ['dotnet check', false],
    ['dotnet verify', false],
  ], 'dotnet test discovers test frameworks in the project, runs them, and reports results.'),
  q('command-q12', 'CHECK · DOTNET CLI', 'Which options are valid for dotnet test?', [
    ['--filter', true],
    ['--no-build', true],
    ['--collect:"XPlat Code Coverage"', true],
    ['--publish', false],
  ], 'Test supports filtering, skipping the build, and collecting coverage. Publishing is a separate command.', true),
  q('command-q13', 'CHECK · DOTNET CLI', 'Which command publishes a self-contained Linux x64 build?', [
    ['dotnet publish -c Release -r linux-x64 --self-contained true', true],
    ['dotnet build -r linux-x64 --bundle', false],
    ['dotnet publish --os linux', false],
    ['dotnet pack -r linux-x64', false],
  ], 'A runtime identifier (-r) plus --self-contained bundles the runtime for that platform. dotnet publish produces the deployable output.'),
  q('command-q14', 'CHECK · DOTNET CLI', 'What does a default dotnet publish produce?', [
    ['A framework-dependent deployment that requires the runtime on the target machine', true],
    ['A self-contained deployment with the runtime bundled', false],
    ['A Docker image', false],
    ['A NuGet package', false],
  ], 'Without -r and --self-contained, publish is framework-dependent. The target host must have a compatible .NET runtime.'),
  q('command-q15', 'CHECK · DOTNET CLI', 'Which command creates a NuGet package from a class library?', [
    ['dotnet pack', true],
    ['dotnet publish', false],
    ['dotnet build --package', false],
    ['dotnet nuget pack', false],
  ], 'dotnet pack builds the project and writes a .nupkg file, usually under bin/Release.'),
  q('command-q16', 'CHECK · DOTNET CLI', 'Which command creates a new solution file?', [
    ['dotnet new sln', true],
    ['dotnet new solution', false],
    ['dotnet sln new', false],
    ['dotnet create sln', false],
  ], 'dotnet new sln scaffolds a .sln file. Use -n to set the solution name.'),
  q('command-q17', 'CHECK · DOTNET CLI', 'Which are valid dotnet sln commands?', [
    ['dotnet sln add', true],
    ['dotnet sln list', true],
    ['dotnet sln remove', true],
    ['dotnet sln compile', false],
  ], 'The solution command adds, lists, and removes projects. Compilation is done by dotnet build, not dotnet sln.', true),
  q('command-q18', 'CHECK · DOTNET CLI', 'How do you add a project reference to another project?', [
    ['dotnet add reference ../Lib/Lib.csproj', true],
    ['dotnet reference add ../Lib/Lib.csproj', false],
    ['dotnet add package ../Lib/Lib.csproj', false],
    ['dotnet sln add ../Lib/Lib.csproj', false],
  ], 'dotnet add reference updates the .csproj with a ProjectReference. The sln command adds projects to a solution, not references.'),
  q('command-q19', 'CHECK · DOTNET CLI', 'How do you install the EF Core CLI as a global tool?', [
    ['dotnet tool install --global dotnet-ef', true],
    ['dotnet install dotnet-ef --global', false],
    ['dotnet ef install --global', false],
    ['npm install -g dotnet-ef', false],
  ], 'dotnet tool install --global installs the tool for the current user. Local tool manifests are the reproducible alternative.'),
  q('command-q20', 'CHECK · DOTNET CLI', 'Which are valid dotnet user-secrets commands?', [
    ['dotnet user-secrets set', true],
    ['dotnet user-secrets list', true],
    ['dotnet user-secrets clear', true],
    ['dotnet user-secrets deploy', false],
  ], 'User secrets can be set, listed, and cleared. They are for local development and are never deployed.', true),
]

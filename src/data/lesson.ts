import type { ContentFrame, LessonFrame, LessonMeta, QuestionFrame } from '../types'

type Opt = [title: string, correct: boolean, description?: string]

const c = (
  id: string,
  eyebrow: string,
  title: string,
  body: string[],
  note?: string,
  aiNote?: string,
): ContentFrame => ({
  id,
  type: 'content',
  eyebrow,
  title,
  body,
  note,
  aiNote: aiNote ?? 'This screen introduces the concepts tested in the next questions.',
})

const q = (
  id: string,
  eyebrow: string,
  question: string,
  options: Opt[],
  explanation: string,
  multi = false,
  aiNote?: string,
): QuestionFrame => ({
  id,
  type: 'question',
  eyebrow,
  question,
  helper: multi ? 'Select all answers that apply.' : 'Select one answer.',
  multi,
  options: options.map(([title, correct, description], index) => ({
    id: `${id}-${String.fromCharCode(97 + index)}`,
    title,
    correct,
    ...(description ? { description } : {}),
  })),
  explanation,
  aiNote: aiNote ?? 'Connect this answer to the .NET concept explained on this screen.',
})

const dotnetMeta: LessonMeta = {
  course: '.NET Framework — C# & Modern .NET',
  chapter: 'Complete course · 16 chapters',
  lesson: 'C# .NET: CLI, language, ASP.NET Core, EF Core and WPF',
  estimatedMinutes: 360,
}

const dotnetFrames: LessonFrame[] = [
  c(
    'c1-intro',
    'CHAPTER 1 · .NET PLATFORM',
    'What .NET actually is.',
    [
      '.NET is a developer platform made of a runtime (the CLR), a standard library (the BCL), and a toolchain (the SDK and CLI). C# is the most popular language that targets it, but F# and VB.NET compile to the same intermediate language.',
      'Your C# source is compiled to IL (Intermediate Language), stored in assemblies (.dll or .exe) with metadata. At run time the CLR verifies and JIT-compiles that IL to machine code, then manages objects with the garbage collector.',
    ],
    'Say .NET Framework for the legacy Windows-only 4.x line, and .NET for the modern cross-platform line. They are related, not interchangeable.',
    'This screen defines the vocabulary used by every later chapter: CLR, BCL, SDK, IL, assembly, and the .NET Framework versus modern .NET distinction.',
  ),
  q('q1', 'CHECK · .NET PLATFORM', 'What is the main job of the CLR?', [
    ['Compile C# source into IL', false, 'That is the job of the C# compiler and the build.'],
    ['Execute IL, JIT-compile it, and manage memory', true, 'The CLR hosts your code, turns IL into native code, and runs the GC.'],
    ['Package NuGet dependencies', false, 'That is the responsibility of the SDK and NuGet tooling.'],
    ['Provide the WPF control library', false, 'WPF is a UI framework layered on top of the runtime.'],
  ], 'The CLR is the execution engine: it loads assemblies, verifies IL, JIT-compiles hot methods, and manages objects and exceptions.'),
  q('q2', 'CHECK · .NET PLATFORM', 'Which statement best describes the difference between .NET Framework 4.8 and modern .NET?', [
    ['.NET Framework is Windows-only and feature-frozen; modern .NET is cross-platform and ships yearly.', true],
    ['They are the same runtime with different version numbers.', false],
    ['.NET Framework is cross-platform; modern .NET only runs on Windows.', false],
    ['Modern .NET cannot run C# code.', false],
  ], 'Version 4.8 is the final .NET Framework release and keeps receiving only security fixes. Modern .NET is open source, cross-platform, and released annually.'),
  q('q3', 'CHECK · .NET PLATFORM', 'What is an assembly?', [
    ['A versioned deployment unit containing IL and metadata', true, 'Usually a .dll or .exe; it carries types, references, and version information.'],
    ['A folder of C# source files', false],
    ['A NuGet package, which is the same thing', false, 'A NuGet package can contain several assemblies plus content and build targets.'],
    ['The machine code emitted by the JIT compiler', false],
  ], 'Assemblies are the unit of versioning, loading, and deployment. A NuGet package may bundle multiple assemblies.'),
  q('q4', 'CHECK · .NET PLATFORM', 'Which of these are core parts of the .NET platform?', [
    ['CLR (Common Language Runtime)', true],
    ['BCL (Base Class Library)', true],
    ['.NET SDK and CLI', true],
    ['Windows Registry', false, 'An operating-system component, not a part of .NET.'],
  ], 'The runtime, the standard library, and the SDK/CLI are the three pillars you use every day.', true),
  q('q5', 'CHECK · .NET PLATFORM', 'What is IL (Intermediate Language)?', [
    ['A CPU-specific machine language', false],
    ['A portable instruction set that the CLR JIT-compiles to native code', true],
    ['Another name for C# source code', false],
    ['The JSON format used by appsettings.json', false],
  ], 'IL is CPU-independent. The JIT compiler turns it into native instructions for the current machine, which is why the same assembly runs on x64 and ARM64.'),
  q('q6', 'CHECK · .NET PLATFORM', 'Which languages can target .NET?', [
    ['C#', true],
    ['F#', true],
    ['VB.NET', true],
    ['Java', false, 'Java targets the JVM, not the CLR.'],
  ], 'C#, F#, and VB.NET all compile to IL. Java is a separate ecosystem built on the JVM.', true),
  q('q7', 'CHECK · .NET PLATFORM', 'What does managed code mean?', [
    ['Code that runs under the CLR with garbage collection and type safety', true],
    ['Code written only by Microsoft employees', false],
    ['Code that has no dependencies', false],
    ['Code compiled with the Release configuration', false],
  ], 'Managed code executes under the CLR, which provides memory management, exception handling, and type safety. Unmanaged code does not get those services automatically.'),
  q('q8', 'CHECK · .NET PLATFORM', 'Which are real .NET runtime implementations or families?', [
    ['.NET (modern, cross-platform)', true],
    ['.NET Framework (Windows-only, 4.x)', true],
    ['Mono', true],
    ['JVM', false],
  ], 'Modern .NET, .NET Framework, and Mono are distinct implementations. Unity has long used Mono and now also supports modern .NET.', true),
  c(
    'c2-intro',
    'CHAPTER 2 · C# TYPE SYSTEM',
    'Value types, reference types, and nullability.',
    [
      'C# is statically typed: every variable has a type known at compile time. Value types (int, double, bool, DateTime, structs, enums) hold their data inline. Reference types (classes, arrays, strings, records, delegates) hold a reference to an object on the managed heap.',
      'Nullability is part of the type in modern C#. With nullable reference types enabled, string is non-nullable and string? may be null, so the compiler warns you before a NullReferenceException happens at run time.',
    ],
    'Use struct for small, immutable values; use class or record when identity, inheritance, or shared references matter.',
    'This screen anchors the rest of the course: copying semantics, equality, nullability, and allocation all follow from value versus reference types.',
  ),
  q('q9', 'CHECK · C# TYPES', 'What happens when you assign one struct variable to another?', [
    ['Both variables point to the same object', false],
    ['The value is copied; the two variables are independent', true],
    ['The compiler throws an error', false],
    ['A reference is cloned', false],
  ], 'Assignment of a value type copies the whole value. For a class, assignment copies only the reference, so both variables see the same object.'),
  q('q10', 'CHECK · C# TYPES', 'Which of these are value types?', [
    ['int', true],
    ['DateTime', true],
    ['enum', true],
    ['string', false, 'string is a reference type, even though it behaves immutably.'],
  ], 'Primitive numbers, bool, char, decimal, DateTime, enums, and structs are value types. string, arrays, classes, and delegates are reference types.', true),
  q('q11', 'CHECK · C# TYPES', 'What does the var keyword do?', [
    ['Declares a variable whose type is inferred by the compiler', true],
    ['Creates a variable that can hold any type at run time', false, 'That is dynamic, not var.'],
    ['Declares an untyped variable', false],
    ['Makes the variable mutable', false],
  ], 'var is still statically typed. The compiler infers the type from the initializer and the variable is exactly that type afterwards.'),
  q('q12', 'CHECK · C# TYPES', 'What is int? in C#?', [
    ['A shorthand for Nullable<int>', true],
    ['An alias for object', false],
    ['A type that can store any integer size', false],
    ['An invalid type outside unsafe code', false],
  ], 'Nullable<T> wraps a value type and adds a HasValue flag plus a Value property, so int? can represent null as well as any 32-bit integer.'),
  q('q13', 'CHECK · C# TYPES', 'Which are valid C# access modifiers?', [
    ['public', true],
    ['protected', true],
    ['internal', true],
    ['friend', false, 'friend is a C++ concept; C# uses InternalsVisibleTo instead.'],
  ], 'C# offers public, private, protected, internal, protected internal, and private protected. friend is not a C# modifier.', true),
  q('q14', 'CHECK · C# TYPES', 'What is the difference between const and readonly?', [
    ['const is compile-time and implicitly static; readonly is assigned at run time (constructor or initializer).', true],
    ['They are identical', false],
    ['readonly values can only be changed in any method', false],
    ['const can be assigned in a constructor', false],
  ], 'A const must be a compile-time constant and is baked into callers. A readonly field is evaluated at run time and can differ per instance when set in a constructor.'),
  q('q15', 'CHECK · C# TYPES', 'What does the == operator do when both operands are string?', [
    ['Compares references, like object ==', false],
    ['Compares the string values', true, 'string overloads == to perform value equality.'],
    ['Throws InvalidOperationException', false],
    ['Compares lengths only', false],
  ], 'string overloads == and != to compare content. Use string.Equals with a StringComparison when you need culture or case control.'),
  q('q16', 'CHECK · C# TYPES', 'Which of these are C# keywords?', [
    ['async', true],
    ['await', true],
    ['yield', true],
    ['then', false, 'then belongs to JavaScript promises, not C#.'],
  ], 'async, await, and yield are contextual C# keywords used for asynchronous and iterator methods.', true),
  q('q17', 'CHECK · C# TYPES', 'What is the value of default(int)?', [
    ['0', true],
    ['null', false],
    ['undefined', false],
    ['It throws at run time', false],
  ], 'The default of a value type is the zeroed value: 0 for numeric types, false for bool, and a struct with all fields zeroed. default(string) is null.'),
  q('q18', 'CHECK · C# TYPES', 'Which statements about decimal are true?', [
    ['It stores base-10 numbers with high precision', true],
    ['It uses the m suffix for literals', true],
    ['It is the right type for money calculations', true],
    ['It is always faster than double', false],
  ], 'decimal is a 128-bit base-10 type designed for financial values. It is slower than double because it is implemented in software, but it avoids binary rounding surprises.', true),
  c(
    'c3-intro',
    'CHAPTER 3 · OBJECT-ORIENTED C#',
    'Build contracts and hierarchies that stay maintainable.',
    [
      'C# gives you classes, interfaces, abstract classes, records, structs, and inheritance. The senior skill is choosing the lightest construct that expresses the design: an interface for a contract, an abstract class for shared state, a record for immutable data.',
      'Prefer composition over deep inheritance. Interfaces support multiple implementation, while a class supports only single inheritance. Modern C# interfaces can also declare default method bodies, but they still cannot hold instance fields.',
    ],
    'Program to an interface, not an implementation. It keeps callers stable when implementations change.',
    'This screen covers the OOP toolbox: interfaces, abstract classes, virtual/override, sealed, records, and encapsulation.',
  ),
  q('q19', 'CHECK · OOP', 'What is the main purpose of an interface?', [
    ['To define a contract that implementers must fulfil', true],
    ['To store shared instance state for subclasses', false, 'Interfaces cannot hold instance fields; use an abstract class for shared state.'],
    ['To prevent a class from being instantiated', false, 'That is an abstract class.'],
    ['To improve run-time performance', false],
  ], 'An interface describes what a type can do without prescribing how. Callers depend on the contract, so implementations can be swapped or mocked.'),
  q('q20', 'CHECK · OOP', 'Which statements about C# records are true?', [
    ['They provide value equality by default', true],
    ['They support with-expressions for non-destructive mutation', true],
    ['record class is a reference type', true],
    ['They cannot contain methods', false],
  ], 'Records give you value-based equality, ToString, deconstruction, and with-expressions. A record class is a reference type; record struct is a value type. Both can contain methods.', true),
  q('q21', 'CHECK · OOP', 'Which combination enables run-time polymorphism in C#?', [
    ['virtual in the base class and override in the derived class', true],
    ['static in the base class and sealed in the derived class', false],
    ['const in the base class and readonly in the derived class', false],
    ['new in the base class and override in the derived class', false],
  ], 'A virtual member can be replaced by an override. The call is resolved at run time using the actual object type, not the variable type.'),
  q('q22', 'CHECK · OOP', 'What does the sealed modifier do on a class?', [
    ['Prevents the class from being inherited', true],
    ['Makes all members static', false],
    ['Prevents the class from being instantiated', false],
    ['Makes the class immutable', false],
  ], 'A sealed class cannot be used as a base class. On a member, sealed stops further overriding of an override.'),
  q('q23', 'CHECK · OOP', 'Which statements about abstract classes and interfaces are true?', [
    ['An abstract class can hold state and define a constructor', true],
    ['A class can implement multiple interfaces', true],
    ['An interface can provide a default method body in modern C#', true],
    ['A class can inherit from multiple abstract classes', false],
  ], 'C# allows single class inheritance but multiple interface implementation. Abstract classes can share state; interfaces define contracts and may include default implementations.', true),
  q('q24', 'CHECK · OOP', 'What is the difference between the new and override modifiers?', [
    ['new hides the inherited member; override replaces a virtual member and stays polymorphic', true],
    ['They are interchangeable', false],
    ['new is required for every method in a derived class', false],
    ['override can be used on non-virtual members', false],
  ], 'new creates a separate member that hides the base one when accessed through the base type. override replaces the virtual slot, so calls through the base type dispatch to the derived implementation.'),
  q('q25', 'CHECK · OOP', 'What is encapsulation?', [
    ['Hiding internal details behind a stable public surface', true],
    ['Putting every field in a public static property', false],
    ['Using only structs', false],
    ['Avoiding inheritance entirely', false],
  ], 'Encapsulation means exposing intent through methods and properties while keeping invariants and representation private. Access modifiers, properties, and validation enforce it.'),
  q('q26', 'CHECK · OOP', 'Which of these are valid C# property features?', [
    ['Auto-properties ({ get; set; })', true],
    ['init-only setters', true],
    ['Expression-bodied getters', true],
    ['A property must always have an explicit backing field.', false],
  ], 'Auto-properties generate the backing field for you, init allows setting only during object construction, and getters can be expression-bodied.', true),
  q('q27', 'CHECK · OOP', 'Which is true about a static class?', [
    ['It cannot be instantiated and can contain only static members', true],
    ['It can be instantiated once', false],
    ['It supports multiple inheritance', false],
    ['It is automatically thread-safe', false],
  ], 'A static class is sealed and abstract implicitly. It is a good home for pure utility methods, but it cannot be injected as an instance, which limits testability for stateful logic.'),
  q('q28', 'CHECK · OOP', 'What does this code do? var p = new Person { Name = "Ada", Age = 36 };', [
    ['Creates a Person and sets properties through an object initializer', true],
    ['Calls a constructor with two arguments', false],
    ['Creates an anonymous type', false],
    ['Uses reflection at run time to set the fields', false],
  ], 'An object initializer calls the parameterless constructor and then assigns the listed properties, in source order, using normal setters or init accessors.'),
  c(
    'c4-intro',
    'CHAPTER 4 · .NET CLI & PROJECTS',
    'The command line is the source of truth.',
    [
      'The .NET SDK ships a single CLI: dotnet. You use it to create projects, restore NuGet packages, build, run, test, publish, and manage tools. A solution (.sln) groups projects; each project is described by a .csproj file that declares the target framework and dependencies.',
      'Learn the loop by heart: dotnet new creates, dotnet restore downloads, dotnet build compiles, dotnet run executes, dotnet test runs tests, and dotnet publish produces deployable output. Prefix with -c Release for production builds.',
    ],
    'Pin the SDK with global.json when a repository must build with a specific SDK band.',
    'This screen covers the commands you will type every day and the files that drive them.',
  ),
  q('q29', 'CHECK · .NET CLI', 'Which command creates a new console application in the current folder?', [
    ['dotnet new console', true],
    ['dotnet create console', false],
    ['dotnet init console', false],
    ['dotnet build console', false],
  ], 'dotnet new <template> scaffolds a project. dotnet new console creates a minimal Program.cs and a .csproj targeting the installed .NET version.'),
  q('q30', 'CHECK · .NET CLI', 'Which of these are valid dotnet commands?', [
    ['dotnet build', true],
    ['dotnet run', true],
    ['dotnet test', true],
    ['dotnet npm', false],
  ], 'build, run, test, restore, publish, pack, and tool are real commands. dotnet npm does not exist.', true),
  q('q31', 'CHECK · .NET CLI', 'What does dotnet restore do?', [
    ['Downloads and resolves NuGet dependencies for the project', true],
    ['Deletes the bin and obj folders', false],
    ['Runs the application', false],
    ['Formats the source code', false],
  ], 'Restore reads the project file and packages.lock.json, contacts the configured NuGet feeds, and populates the global packages folder and obj assets.'),
  q('q32', 'CHECK · .NET CLI', 'Which command produces a Release build ready for deployment?', [
    ['dotnet publish -c Release', true],
    ['dotnet build -c Debug', false],
    ['dotnet run --production', false],
    ['dotnet pack --deploy', false],
  ], 'dotnet publish compiles, restores, and copies the app plus its dependencies into a publish folder. Use -c Release for optimised production output.'),
  q('q33', 'CHECK · .NET CLI', 'Which file declares the project type, target framework, and package references?', [
    ['The .csproj file', true],
    ['appsettings.json', false],
    ['Program.cs', false],
    ['global.json', false],
  ], 'The SDK-style .csproj is the project file. global.json only pins the SDK version, and appsettings.json is application configuration.'),
  q('q34', 'CHECK · .NET CLI', 'Which files typically appear in a dotnet publish output for a framework-dependent app?', [
    ['The application .dll', true],
    ['app.deps.json', true],
    ['app.runtimeconfig.json', true],
    ['The .csproj source file', false],
  ], 'Publish output includes the compiled assembly, dependency manifest, runtime configuration, and referenced package assemblies. Source files are not published.', true),
  q('q35', 'CHECK · .NET CLI', 'What is dotnet ef?', [
    ['The Entity Framework Core command-line tool', true],
    ['A built-in .NET SDK verb with no installation', false],
    ['A unit-testing framework', false],
    ['A package manager replacement for NuGet', false],
  ], 'dotnet ef is the EF Core CLI, installed as a global or local tool. It creates migrations, updates databases, and generates DbContext code.'),
  q('q36', 'CHECK · .NET CLI', 'How can you install a .NET tool?', [
    ['dotnet tool install --global <package>', true],
    ['dotnet tool install <package> with a local tool manifest', true],
    ['As a local tool restored from .config/dotnet-tools.json', true],
    ['npm install -g <package>', false],
  ], 'Global tools are installed per user, while local tools are declared in a manifest so the whole team gets the same version through restore.', true),
  q('q37', 'CHECK · .NET CLI', 'What is the purpose of global.json?', [
    ['Pin the SDK version or roll-forward policy for a repository', true],
    ['Store database connection strings', false],
    ['List NuGet package versions', false],
    ['Define the application entry point', false],
  ], 'global.json controls which .NET SDK a repository uses and how it rolls forward. It prevents surprises when a machine has several SDKs installed.'),
  c(
    'c5-intro',
    'CHAPTER 5 · COLLECTIONS, GENERICS & LINQ',
    'Choose the right collection, then query it lazily.',
    [
      'Generics let you write type-safe, allocation-friendly code that works with any type. List<T> is the default growable list, Dictionary<TKey,TValue> gives fast key lookup, HashSet<T> enforces uniqueness, and arrays are fixed-size and fastest for indexing.',
      'LINQ is a query language over IEnumerable<T>. Most operators are deferred: Where and Select return a new sequence that is evaluated only when you enumerate it. Materialise with ToList, ToArray, Count, or First when you need a snapshot.',
    ],
    'If you enumerate a deferred query twice, the query runs twice. Materialise intentionally.',
    'This screen connects collection choice, generic constraints, and deferred LINQ execution.',
  ),
  q('q38', 'CHECK · COLLECTIONS', 'Why choose List<T> over a T[]?', [
    ['It can grow and shrink dynamically', true],
    ['It is always faster than an array', false],
    ['It stores items on the stack', false],
    ['It allows duplicate keys', false],
  ], 'List<T> wraps an array and resizes it automatically. Arrays remain faster and allocation-free when the size is fixed.'),
  q('q39', 'CHECK · COLLECTIONS', 'Which of these implement IEnumerable<T>?', [
    ['List<string>', true],
    ['Dictionary<int, string>', true],
    ['int[]', true],
    ['StringBuilder', false],
  ], 'Arrays and most collection types implement IEnumerable<T>. StringBuilder exposes characters through an indexer but is not an enumerable sequence of a generic type.', true),
  q('q40', 'CHECK · COLLECTIONS', 'What does deferred execution mean for a LINQ query?', [
    ['The query runs only when the result is enumerated', true],
    ['The query runs at the moment it is written', false],
    ['The query runs on a background thread', false],
    ['The query is cached forever', false],
  ], 'Where, Select, and similar operators build an iterator. Nothing is computed until you enumerate it, which is why later changes to the source are visible.'),
  q('q41', 'CHECK · COLLECTIONS', 'Which LINQ operators are deferred?', [
    ['Where', true],
    ['Select', true],
    ['OrderBy', true],
    ['ToList', false],
  ], 'Where, Select, and OrderBy return sequences that are evaluated on enumeration. ToList immediately executes the query and returns a List<T>.', true),
  q('q42', 'CHECK · COLLECTIONS', 'What does FirstOrDefault return when the sequence is empty?', [
    ['The default value of the element type (null for reference types)', true],
    ['An exception', false],
    ['An empty sequence', false],
    ['The first element of another sequence', false],
  ], 'FirstOrDefault returns default(T) when no element matches, while First throws InvalidOperationException. Use FirstOrDefault only when an absent value is meaningful.'),
  q('q43', 'CHECK · COLLECTIONS', 'Which LINQ operators change the shape of the result?', [
    ['Select', true],
    ['GroupBy', true],
    ['SelectMany', true],
    ['Where', false],
  ], 'Select projects each element, GroupBy creates groups, and SelectMany flattens nested sequences. Where only filters existing elements and keeps their shape.', true),
  q('q44', 'CHECK · COLLECTIONS', 'What does yield return do in a C# method?', [
    ['Produces the next value of an iterator without building the whole collection', true],
    ['Returns from the method immediately and ends iteration', false],
    ['Creates a new thread', false],
    ['Throws an exception after the first element', false],
  ], 'yield return turns the method into an iterator: each MoveNext resumes after the previous yield, so values are produced lazily.'),
  q('q45', 'CHECK · COLLECTIONS', 'What happens when you call Dictionary.Add with a key that already exists?', [
    ['It throws ArgumentException', true],
    ['It silently overwrites the old value', false],
    ['It returns the old value', false],
    ['It creates a second entry with the same key', false],
  ], 'Add requires unique keys and throws on duplicates. The indexer (dictionary[key] = value) overwrites instead. TryAdd returns false without throwing.'),
  q('q46', 'CHECK · COLLECTIONS', 'Which complexity statements are true for common collections?', [
    ['List<T> index access is O(1)', true],
    ['Dictionary<TKey,TValue> average lookup is O(1)', true],
    ['List<T>.Add is amortised O(1)', true],
    ['Dictionary<TKey,TValue> keeps keys sorted', false],
  ], 'List backs an array, so indexing is O(1) and appends are amortised O(1). Dictionary uses hashing for average O(1) lookup, but it does not order keys.', true),
  q('q47', 'CHECK · COLLECTIONS', 'What is IEqualityComparer<T> used for?', [
    ['Customising equality and hashing for dictionaries and sets', true],
    ['Sorting a list', false],
    ['Serialising objects to JSON', false],
    ['Compiling expressions', false],
  ], 'IEqualityComparer<T> supplies Equals and GetHashCode so collections can compare keys with domain-specific rules, such as case-insensitive strings.'),
  q('q48', 'CHECK · COLLECTIONS', 'Which statements about Span<T> are true?', [
    ['It is a stack-only (ref struct) view over contiguous memory', true],
    ['Slicing with Slice does not allocate', true],
    ['It can point at arrays, stackalloc memory, or native memory', true],
    ['It can safely be used across an await boundary', false],
  ], 'Span<T> provides a zero-allocation view over memory. Because it is a ref struct, it cannot be boxed or stored on the heap, so it cannot live across an await.', true),
  c(
    'c6-intro',
    'CHAPTER 6 · DELEGATES, EVENTS & LAMBDAS',
    'Treat behaviour as a value.',
    [
      'A delegate is a type-safe reference to a method. Action<T> returns void, Func<T, TResult> returns a value, and Predicate<T> returns bool. Lambdas create delegates inline, and expression trees represent lambdas as data for providers such as LINQ to Entities.',
      'Events are delegates with restricted access: consumers can subscribe with += and unsubscribe with -=, but only the declaring type can raise the event. This is the observer pattern built into the language.',
    ],
    'Always unsubscribe from long-lived events to avoid keeping subscribers and their object graphs alive.',
    'This screen explains how callbacks, events, and LINQ expression trees are built on delegates.',
  ),
  q('q49', 'CHECK · DELEGATES', 'What is a delegate?', [
    ['A type-safe reference to a method with a specific signature', true],
    ['A value type that stores data', false],
    ['A compiler-generated class for every method', false],
    ['An interface implemented by all classes', false],
  ], 'A delegate instance points at a method (or several, for multicast delegates) and can be passed, stored, and invoked like any other value.'),
  q('q50', 'CHECK · DELEGATES', 'Which of these are delegate types in .NET?', [
    ['Action', true],
    ['Func', true],
    ['Predicate<T>', true],
    ['Task', false],
  ], 'Action, Func, and Predicate are built-in delegate families. Task is a type representing an asynchronous operation, not a delegate.', true),
  q('q51', 'CHECK · DELEGATES', 'What extra restriction does an event add compared with a public delegate field?', [
    ['Outside code can only subscribe or unsubscribe; it cannot invoke or replace the event', true],
    ['It makes the delegate thread-safe automatically', false],
    ['It stores the subscribers in a database', false],
    ['It prevents more than one subscriber', false],
  ], 'An event exposes += and -= to consumers while keeping invocation inside the declaring class. A public delegate field would let anyone invoke or overwrite it.'),
  q('q52', 'CHECK · DELEGATES', 'What does a lambda closure capture?', [
    ['The variables it references from the enclosing scope', true],
    ['Only static fields', false],
    ['A copy of the entire object graph', false],
    ['Nothing; lambdas cannot access outer variables', false],
  ], 'A closure captures variables, not values. If the variable changes after the lambda is created, the lambda sees the latest value unless you copy it into a local.'),
  q('q53', 'CHECK · DELEGATES', 'Which methods match Func<int, int>?', [
    ['int Square(int x)', true],
    ['static int Double(int x) => x * 2;', true],
    ['void Print(int x)', false],
    ['int Read()', false],
  ], 'Func<int, int> takes one int and returns an int. void Print(int) matches Action<int>, and int Read() matches Func<int>.', true),
  q('q54', 'CHECK · DELEGATES', 'In what order does a multicast delegate invoke its subscribers?', [
    ['In subscription order', true],
    ['In reverse subscription order', false],
    ['In alphabetical order of method names', false],
    ['In parallel on the thread pool', false],
  ], 'Combining delegates with += builds an invocation list in subscription order, and the return value of all but the last subscriber is discarded.'),
  c(
    'c7-intro',
    'CHAPTER 7 · ASYNC/AWAIT & CONCURRENCY',
    'Free the thread while you wait.',
    [
      'async and await let a method suspend without blocking a thread. The compiler turns the method into a state machine. When the awaited operation completes, execution resumes, usually on the captured SynchronizationContext or on a thread-pool thread.',
      'Use Task for I/O-bound work and Task.Run to offload CPU-bound work. Never block on async code with .Result or .Wait() in a context that has a synchronization context, and flow a CancellationToken through long-running operations.',
    ],
    'Async all the way: if a method is asynchronous, expose it as Task, not void.',
    'This screen covers the async mental model, common deadlocks, and cancellation.',
  ),
  q('q55', 'CHECK · ASYNC', 'When is async void acceptable?', [
    ['Only for event handlers, where no caller can await the result', true],
    ['Always; it is faster than async Task', false],
    ['For public API methods that return data', false],
    ['For every method in a library', false],
  ], 'async void cannot be awaited, so exceptions escape to the synchronization context and are hard to observe. Use async Task everywhere except event handlers.'),
  q('q56', 'CHECK · ASYNC', 'Which are good asynchronous practices?', [
    ['Await tasks instead of blocking with .Result or .Wait()', true],
    ['Pass a CancellationToken through cancellable operations', true],
    ['Use Task.WhenAll to await independent operations concurrently', true],
    ['Use Thread.Sleep inside async methods', false],
  ], 'Blocking on async code can deadlock, cancellation keeps resources bounded, and WhenAll runs independent work concurrently. Thread.Sleep blocks the thread and should be Task.Delay in async code.', true),
  q('q57', 'CHECK · ASYNC', 'What is Task.Run mainly used for?', [
    ['Offloading CPU-bound work to the thread pool', true],
    ['Making synchronous I/O asynchronous', false],
    ['Creating a new operating-system thread', false],
    ['Guaranteeing work starts immediately', false],
  ], 'Task.Run queues work to the thread pool. It is appropriate for CPU-bound work in a client app; for server I/O, use the native async APIs instead of wrapping blocking calls.'),
  q('q58', 'CHECK · ASYNC', 'What does ConfigureAwait(false) do?', [
    ['Tells the awaiter not to capture the current synchronization context for the continuation', true],
    ['Cancels the task', false],
    ['Runs the continuation on a new thread every time', false],
    ['Disables exception propagation', false],
  ], 'In library code, ConfigureAwait(false) avoids forcing the continuation back onto the UI thread or a custom context, reducing deadlock risk and overhead.'),
  q('q59', 'CHECK · ASYNC', 'Which of these are synchronisation primitives in .NET?', [
    ['SemaphoreSlim', true],
    ['lock (Monitor)', true],
    ['Interlocked', true],
    ['await', false],
  ], 'SemaphoreSlim limits concurrency and supports async waits. lock/Monitor provide mutual exclusion, and Interlocked performs atomic operations. await is language syntax, not a primitive.', true),
  q('q60', 'CHECK · ASYNC', 'What is the difference between Task.WhenAll and Task.WhenAny?', [
    ['WhenAll completes when every task finishes; WhenAny completes when the first does.', true],
    ['WhenAll runs tasks sequentially; WhenAny runs them in parallel.', false],
    ['They are identical.', false],
    ['WhenAny cancels the remaining tasks automatically.', false],
  ], 'WhenAll aggregates all results and exceptions; WhenAny returns the first completed task. Neither cancels the other tasks automatically.'),
  q('q61', 'CHECK · ASYNC', 'What commonly causes a deadlock when mixing sync and async code?', [
    ['Blocking on a task with .Result in a context that needs the same thread to continue', true],
    ['Using await in an async method', false],
    ['Using Task.Delay', false],
    ['Using a CancellationToken', false],
  ], 'The async continuation wants the captured context, but the context is blocked waiting for the task. Await all the way instead of blocking.'),
  q('q62', 'CHECK · ASYNC', 'Which statements about CancellationToken are true?', [
    ['Cancellation is cooperative', true],
    ['ThrowIfCancellationRequested throws OperationCanceledException', true],
    ['Tokens can be linked with CreateLinkedTokenSource', true],
    ['Cancelling a token immediately kills the thread', false],
  ], 'A cancellation token is a request, not a forced abort. Code must observe the token and stop. Linked sources combine timeouts with caller cancellation.', true),
  c(
    'c8-intro',
    'CHAPTER 8 · MEMORY, GC & DISPOSAL',
    'Know what allocates and what must be released.',
    [
      'The garbage collector manages the managed heap, reclaiming objects that are no longer reachable. Generations (0, 1, 2) make collection efficient, and the Large Object Heap holds allocations of roughly 85 KB or more. You rarely need GC.Collect(); the collector is tuned for throughput.',
      'Managed memory is automatic, but unmanaged resources (file handles, sockets, native memory) are not. Implement IDisposable and use using or await using to release them deterministically.',
    ],
    'A finalizer is a safety net, not a replacement for Dispose. Most classes should not have one.',
    'This screen explains generations, disposal, leaks, and weak references.',
  ),
  q('q63', 'CHECK · MEMORY', 'What does the .NET garbage collector manage?', [
    ['Objects on the managed heap', true],
    ['Open file handles', false, 'File handles are unmanaged resources released by Dispose.'],
    ['Database connections', false],
    ['Native memory allocated with Marshal.AllocHGlobal', false],
  ], 'The GC tracks managed references and reclaims unreachable objects. Unmanaged handles and native memory must be released explicitly, typically through IDisposable.'),
  q('q64', 'CHECK · MEMORY', 'Which are valid ways to release IDisposable resources?', [
    ['using (var stream = File.OpenRead(path)) { ... }', true],
    ['using var stream = File.OpenRead(path);', true],
    ['await using var resource = ...; for IAsyncDisposable', true],
    ['A finalizer is always required', false],
  ], 'using declarations and statements call Dispose deterministically. await using handles IAsyncDisposable. A finalizer is only needed when you directly own unmanaged resources.', true),
  q('q65', 'CHECK · MEMORY', 'Why should you generally avoid calling GC.Collect()?', [
    ['It forces a full collection and can hurt performance', true],
    ['It is not a real API', false],
    ['It only collects strings', false],
    ['It disables the GC permanently', false],
  ], 'GC.Collect forces a collection that the runtime would normally schedule itself. Used indiscriminately, it promotes objects and causes pauses without improving throughput.'),
  q('q66', 'CHECK · MEMORY', 'Which allocations typically go to the Large Object Heap (LOH)?', [
    ['Byte arrays of about 85 KB or more', true],
    ['Every reference type', false],
    ['All structs', false],
    ['Only strings', false],
  ], 'Objects around 85,000 bytes or larger are allocated on the LOH, which is collected with gen 2 and is not compacted by default.'),
  q('q67', 'CHECK · MEMORY', 'Which situations can cause managed memory leaks?', [
    ['Event handlers that are never unsubscribed', true],
    ['Long-lived static collections that keep growing', true],
    ['Registering objects in a global cache without eviction', true],
    ['The GC not running for an hour', false],
  ], 'The GC reclaims unreachable objects, but event subscriptions, statics, and unbounded caches keep objects reachable. Those are logical leaks, not GC failures.', true),
  q('q68', 'CHECK · MEMORY', 'What is a WeakReference used for?', [
    ['Referencing an object without preventing its collection', true],
    ['Making an object immutable', false],
    ['Freeing native memory immediately', false],
    ['Creating a thread-safe cache', false],
  ], 'A weak reference lets the GC reclaim the target while still allowing you to access it if it is alive. It is useful for caches where memory pressure should decide eviction.'),
  c(
    'c9-intro',
    'CHAPTER 9 · EXCEPTIONS, LOGGING & DIAGNOSTICS',
    'Fail loudly, log usefully, recover deliberately.',
    [
      'Exceptions are for exceptional conditions, not normal control flow. Catch the most specific type you can handle, use exception filters (when) when the decision is conditional, and rethrow with throw; to preserve the stack trace.',
      'Use ILogger<T> for structured logging instead of string concatenation. Log at the right level (Trace, Debug, Information, Warning, Error, Critical), attach scopes, and never log secrets.',
    ],
    'Never catch Exception just to swallow it. If you cannot handle it, let it propagate.',
    'This screen covers exception strategy, stack traces, and structured logging.',
  ),
  q('q69', 'CHECK · EXCEPTIONS', 'In what order should catch clauses appear?', [
    ['From the most specific exception to the most general', true],
    ['From the most general to the most specific', false],
    ['Alphabetically', false],
    ['It does not matter', false],
  ], 'If a general catch (Exception) comes first, it makes later, more specific catches unreachable or useless. C# also rejects unreachable catch clauses at compile time.'),
  q('q70', 'CHECK · EXCEPTIONS', 'Which are good exception-handling practices?', [
    ['Throw specific exception types with clear messages', true],
    ['Include the inner exception when wrapping', true],
    ['Use exception filters (catch ... when) when appropriate', true],
    ['Catch and ignore every exception', false],
  ], 'Specific types let callers react correctly, inner exceptions preserve the cause, and filters avoid catching and rethrowing. Swallowing exceptions hides failures.', true),
  q('q71', 'CHECK · EXCEPTIONS', 'When does a finally block run?', [
    ['After the try block, whether it succeeds or throws', true],
    ['Only when no exception occurs', false],
    ['Only when an exception occurs', false],
    ['Never in async methods', false],
  ], 'finally is for cleanup and runs on normal completion, on handled exceptions, and on unhandled exceptions as they leave the method. It does not run if the process is terminated abruptly.'),
  q('q72', 'CHECK · EXCEPTIONS', 'What is the difference between throw; and throw ex; inside a catch block?', [
    ['throw; preserves the original stack trace; throw ex; resets it to the current line', true],
    ['They are identical', false],
    ['throw ex; preserves the stack trace; throw; does not', false],
    ['Both are compile errors', false],
  ], 'Rethrowing with throw ex; loses the original throw site. Use throw; to preserve the stack. If you need extra context, wrap with a new exception and pass the original as innerException.'),
  q('q73', 'CHECK · EXCEPTIONS', 'Which are features of Microsoft.Extensions.Logging (ILogger)?', [
    ['Structured logging with message templates', true],
    ['Log levels such as Information and Error', true],
    ['Scopes that attach context to a group of messages', true],
    ['It only writes to the console', false],
  ], 'ILogger is an abstraction with providers for console, debug, EventSource, and third-party sinks. Structured templates keep parameters as named fields.', true),
  q('q74', 'CHECK · EXCEPTIONS', 'What should a custom exception type derive from?', [
    ['Exception (or another appropriate exception type)', true],
    ['ValueType', false],
    ['IDisposable', false],
    ['Attribute', false],
  ], 'Custom exceptions derive from Exception, usually provide the standard constructors, and use the serializable pattern only if you still need it.'),
  c(
    'c10-intro',
    'CHAPTER 10 · FILE I/O & SERIALIZATION',
    'Streams, JSON, and async I/O.',
    [
      '.NET I/O is built on Stream. File, FileStream, StreamReader, and StreamWriter wrap the operating system. Async variants (ReadAsync, CopyToAsync, ReadAllTextAsync) keep threads free while the disk or network works.',
      'System.Text.Json is the built-in JSON serializer with source generation, custom converters, and configurable options. Use JsonSerializerOptions consistently and remember that casing policy affects the wire format.',
    ],
    'Open streams for as short a time as possible and always dispose them, preferably with using.',
    'This screen covers stream basics, async file APIs, and System.Text.Json configuration.',
  ),
  q('q75', 'CHECK · I/O', 'Which namespace contains System.Text.Json?', [
    ['System.Text.Json', true],
    ['Newtonsoft.Json', false],
    ['System.Runtime.Serialization.Json', false, 'That is a different, older serializer.'],
    ['Microsoft.Json', false],
  ], 'The built-in JSON serializer lives in the System.Text.Json namespace and ships with modern .NET.'),
  q('q76', 'CHECK · I/O', 'Which are features of System.Text.Json?', [
    ['Source-generated serializers', true],
    ['Custom converters', true],
    ['Configurable JsonSerializerOptions', true],
    ['It requires Newtonsoft.Json at run time', false],
  ], 'System.Text.Json supports source generation, custom converters, naming policies, and options. It does not depend on Newtonsoft.Json.', true),
  q('q77', 'CHECK · I/O', 'What is File.ReadAllText best suited for?', [
    ['Reading a small text file completely into memory', true],
    ['Streaming a multi-gigabyte log file', false],
    ['Writing binary data', false],
    ['Opening a database connection', false],
  ], 'ReadAllText allocates the whole file as a string, which is convenient for small configuration or data files. For large files, stream with StreamReader.'),
  q('q78', 'CHECK · I/O', 'Which are asynchronous file APIs?', [
    ['File.ReadAllTextAsync', true],
    ['File.WriteAllTextAsync', true],
    ['Stream.CopyToAsync', true],
    ['File.ReadAllText', false],
  ], 'The Async variants return Task and do not block the calling thread while the I/O completes.', true),
  q('q79', 'CHECK · I/O', 'How should you release a FileStream when you are done?', [
    ['Dispose it, preferably with a using statement or declaration', true],
    ['Call GC.Collect()', false],
    ['Set the variable to null', false],
    ['Leave it open for the next request', false],
  ], 'A FileStream holds an operating-system handle that the GC does not release deterministically. using ensures Dispose runs even when an exception is thrown.'),
  q('q80', 'CHECK · I/O', 'Which properties exist on JsonSerializerOptions?', [
    ['PropertyNamingPolicy', true],
    ['WriteIndented', true],
    ['DefaultIgnoreCondition', true],
    ['ConnectionString', false],
  ], 'PropertyNamingPolicy controls casing, WriteIndented pretty-prints, and DefaultIgnoreCondition controls null/default omission. There is no ConnectionString option.', true),
  c(
    'c11-intro',
    'CHAPTER 11 · ENTITY FRAMEWORK CORE',
    'Model the database in C#, query it with LINQ.',
    [
      'EF Core is an object-relational mapper. A DbContext represents a session with the database and exposes DbSet<T> properties for entities. LINQ queries are translated to SQL, and SaveChanges persists tracked changes in a transaction.',
      'Migrations evolve the schema from your model. Keep DbContext scoped per request, avoid N+1 queries with Include or projection, and use AsNoTracking for read-only queries.',
    ],
    'Always parameterise queries; never build SQL by concatenating user input.',
    'This screen covers DbContext lifetime, tracking, migrations, and query performance.',
  ),
  q('q81', 'CHECK · EF CORE', 'What lifetime should a DbContext normally have in ASP.NET Core?', [
    ['Scoped per HTTP request', true],
    ['Singleton for the whole application', false],
    ['One instance per database table', false],
    ['Transient for every LINQ call', false],
  ], 'A DbContext is not thread-safe, so it should live for one unit of work, typically one HTTP request. AddDbContext registers it as scoped by default.'),
  q('q82', 'CHECK · EF CORE', 'Which are core features of EF Core?', [
    ['LINQ-to-SQL translation', true],
    ['Migrations', true],
    ['Change tracking', true],
    ['It only supports SQL Server', false],
  ], 'EF Core translates LINQ, generates migrations, and tracks changes across providers such as SQL Server, PostgreSQL, SQLite, and MySQL.', true),
  q('q83', 'CHECK · EF CORE', 'What does AsNoTracking do?', [
    ['Returns entities without adding them to the change tracker', true],
    ['Disables the database query cache', false],
    ['Prevents the query from being translated to SQL', false],
    ['Makes the entities read-only in the database', false],
  ], 'For read-only queries, AsNoTracking avoids the cost and memory of tracking. The returned entities are not updated by SaveChanges.'),
  q('q84', 'CHECK · EF CORE', 'Which are valid EF Core migration commands?', [
    ['dotnet ef migrations add InitialCreate', true],
    ['dotnet ef database update', true],
    ['dotnet ef migrations remove', true],
    ['dotnet ef database format', false],
  ], 'add creates a migration, update applies pending migrations, and remove reverts the last unapplied migration. database format is not a command.', true),
  q('q85', 'CHECK · EF CORE', 'What is the N+1 query problem?', [
    ['One query for a parent list plus one query per child instead of a single join', true],
    ['A query that returns N+1 rows', false],
    ['A migration that fails on the last row', false],
    ['A connection pool size of N+1', false],
  ], 'Lazy loading or per-item queries can generate many round trips. Use Include, projection, or explicit joins to fetch related data efficiently.'),
  q('q86', 'CHECK · EF CORE', 'What is Include used for?', [
    ['Eager loading related entities in the same query', true],
    ['Including a namespace in the generated SQL', false],
    ['Adding a migration', false],
    ['Including a connection string', false],
  ], 'Include tells EF Core to load navigation properties, usually through a join, instead of leaving them null or lazy-loaded later. ThenInclude continues loading deeper relationships.'),
  q('q87', 'CHECK · EF CORE', 'How can you configure the EF Core model?', [
    ['Data annotations', true],
    ['Fluent API in OnModelCreating', true],
    ['Conventions', true],
    ['Editing the generated SQL by hand', false],
  ], 'Conventions infer the model, data annotations add attributes, and the Fluent API gives full control in OnModelCreating. Generated SQL is not the model.', true),
  q('q88', 'CHECK · EF CORE', 'What does SaveChangesAsync do?', [
    ['Persists tracked changes to the database in a transaction', true],
    ['Recreates the database schema', false],
    ['Downloads data from the database', false],
    ['Runs all pending migrations', false],
  ], 'SaveChanges writes inserts, updates, and deletes for tracked entities. It wraps the operation in a transaction unless you manage one explicitly.'),
  q('q89', 'CHECK · EF CORE', 'Which techniques handle optimistic concurrency in EF Core?', [
    ['A rowversion/TIMESTAMP concurrency token', true],
    ['Configuring a property with IsConcurrencyToken', true],
    ['Handling DbUpdateConcurrencyException', true],
    ['Locking the whole table for every request', false],
  ], 'A concurrency token is checked in the WHERE clause of updates. If no row matches, EF Core throws DbUpdateConcurrencyException, which you handle by reloading or merging.', true),
  q('q90', 'CHECK · EF CORE', 'What is the difference between DbContext.Add and DbContext.Update?', [
    ['Add marks an entity as Added (insert); Update marks it as Modified (update).', true],
    ['They are aliases for the same operation.', false],
    ['Update inserts and Add updates.', false],
    ['Add works only for value types.', false],
  ], 'Add assumes the row does not exist and generates an INSERT. Update assumes it exists and marks all properties as modified, generating an UPDATE.'),
  q('q91', 'CHECK · EF CORE', 'Which practices improve EF Core query performance?', [
    ['Project only the columns you need with Select', true],
    ['Use AsNoTracking for read-only queries', true],
    ['Avoid N+1 by loading related data deliberately', true],
    ['Always call ToList before filtering', false],
  ], 'Projection reduces data transferred, AsNoTracking removes tracking overhead, and deliberate loading avoids extra round trips. ToList before filtering pulls the whole table into memory.', true),
  q('q92', 'CHECK · EF CORE', 'What advantage do ExecuteUpdate and ExecuteDelete provide?', [
    ['They run a single SQL statement without loading entities into memory', true],
    ['They automatically create a migration', false],
    ['They only work with in-memory databases', false],
    ['They disable change tracking globally', false],
  ], 'ExecuteUpdate and ExecuteDelete translate the operation to a single SQL statement, which is much cheaper than loading and tracking thousands of entities.'),
  c(
    'c12-intro',
    'CHAPTER 12 · ASP.NET CORE FUNDAMENTALS',
    'Hosting, middleware, dependency injection.',
    [
      'ASP.NET Core apps are console apps with a host. WebApplication.CreateBuilder sets up configuration, logging, dependency injection, and Kestrel. The middleware pipeline processes each request in order; each component can act before and after the next one.',
      'Dependency injection is built in. Register services with AddSingleton, AddScoped, or AddTransient, then receive them through constructors or minimal API parameters. Configuration comes from appsettings.json, environment variables, user secrets, and command-line arguments.',
    ],
    'Middleware order matters: authentication and authorisation must run before endpoints that require them.',
    'This screen gives the mental model for the request pipeline, DI lifetimes, and configuration.',
  ),
  q('q93', 'CHECK · ASP.NET CORE', 'How does the ASP.NET Core middleware pipeline process a request?', [
    ['In the order middleware is registered, with each component able to call the next', true],
    ['In random order chosen at run time', false],
    ['All middleware runs in parallel', false],
    ['Only the last middleware runs', false],
  ], 'Middleware is composed as a chain. Each component decides whether to call next and can run logic before and after the rest of the pipeline.'),
  q('q94', 'CHECK · ASP.NET CORE', 'Which service lifetimes does Microsoft.Extensions.DependencyInjection support?', [
    ['Singleton', true],
    ['Scoped', true],
    ['Transient', true],
    ['ThreadLocal', false],
  ], 'Singleton creates one instance per application, scoped one per request/scope, and transient one per resolution. ThreadLocal is a storage concept, not a DI lifetime.', true),
  q('q95', 'CHECK · ASP.NET CORE', 'What does the scoped lifetime mean in ASP.NET Core?', [
    ['One instance per HTTP request (per DI scope)', true],
    ['One instance per application', false],
    ['One instance per thread', false],
    ['A new instance every time it is resolved', false],
  ], 'Scoped services live for the duration of a request scope, which makes them suitable for DbContext and request-specific state.'),
  q('q96', 'CHECK · ASP.NET CORE', 'What does WebApplication.CreateBuilder(args) do?', [
    ['Creates a builder preconfigured with configuration, logging, DI, and Kestrel', true],
    ['Starts the web server immediately', false],
    ['Creates a database migration', false],
    ['Publishes the application', false],
  ], 'The builder exposes Services and Configuration; Build creates the app, and Run starts the server. Starting the server is a separate step.'),
  q('q97', 'CHECK · ASP.NET CORE', 'Which are configuration sources in a typical ASP.NET Core app?', [
    ['appsettings.json', true],
    ['Environment variables', true],
    ['Command-line arguments', true],
    ['The .csproj file at run time', false],
  ], 'Configuration is layered: appsettings.json, appsettings.{Environment}.json, environment variables, user secrets, and command line. The .csproj is build-time only.', true),
  q('q98', 'CHECK · ASP.NET CORE', 'What is IOptions<T> used for?', [
    ['Injecting strongly typed configuration sections', true],
    ['Storing user passwords', false],
    ['Creating database migrations', false],
    ['Handling HTTP routing', false],
  ], 'Bind a configuration section to a class and inject IOptions<T>, IOptionsSnapshot<T>, or IOptionsMonitor<T> depending on how dynamically you need to read changes.'),
  q('q99', 'CHECK · ASP.NET CORE', 'Which are built-in ASP.NET Core middleware components?', [
    ['Authentication', true],
    ['Authorization', true],
    ['Static files', true],
    ['Entity Framework Core migrations', false],
  ], 'Authentication, authorization, static files, routing, CORS, and exception handling are middleware. EF Core migrations are a tooling concern, not middleware.', true),
  q('q100', 'CHECK · ASP.NET CORE', 'Which environment variable selects the ASP.NET Core environment?', [
    ['ASPNETCORE_ENVIRONMENT', true],
    ['NODE_ENV', false],
    ['DOTNET_FRAMEWORK', false],
    ['ASPNETCORE_PORT', false],
  ], 'ASPNETCORE_ENVIRONMENT is read into IWebHostEnvironment.EnvironmentName, commonly Development, Staging, or Production.'),
  q('q101', 'CHECK · ASP.NET CORE', 'Which logging providers ship with Microsoft.Extensions.Logging?', [
    ['Console', true],
    ['Debug', true],
    ['EventSource', true],
    ['Hadoop', false],
  ], 'Console, Debug, EventSource, and EventLog (Windows) are common built-in providers. Third-party packages add Serilog, NLog, and others.', true),
  q('q102', 'CHECK · ASP.NET CORE', 'What is a captive dependency?', [
    ['A singleton that captures a scoped service and keeps it alive for the application lifetime', true],
    ['A dependency that cannot be resolved', false],
    ['A service registered twice', false],
    ['A transient service used in a controller', false],
  ], 'Resolving a scoped service from a singleton pins that scoped instance for the life of the app. Use scope factories or restructure the dependency.'),
  c(
    'c13-intro',
    'CHAPTER 13 · BUILDING WEB APIs',
    'Routing, binding, validation, and HTTP semantics.',
    [
      'ASP.NET Core supports controller-based APIs and minimal APIs. Controllers use attribute routing such as [Route("api/[controller]")], model binding from route, query, and body, and filters. Minimal APIs map handlers directly with app.MapGet, MapPost, and friends.',
      'Return the right status code: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, and 500 Internal Server Error. Use model validation and OpenAPI to document the contract.',
    ],
    'GET and HEAD should be safe; GET, PUT, and DELETE should be idempotent.',
    'This screen covers HTTP semantics, routing, model binding, validation, and API documentation.',
  ),
  q('q103', 'CHECK · WEB API', 'Which HTTP methods are expected to be safe (no intended server state change)?', [
    ['GET', true],
    ['POST', false],
    ['DELETE', false],
    ['PUT', false],
  ], 'GET is safe: it should not change server state. PUT and DELETE may change state, and POST is generally non-idempotent.'),
  q('q104', 'CHECK · WEB API', 'Which status codes indicate success for a create/read/delete API?', [
    ['200 OK', true],
    ['201 Created', true],
    ['204 No Content', true],
    ['404 Not Found', false],
  ], '200 returns content, 201 signals a created resource (ideally with a Location header), and 204 signals success with no body. 404 is a client-visible error.', true),
  q('q105', 'CHECK · WEB API', 'What does [Route("api/[controller]")] do on a controller?', [
    ['Sets the route prefix using the controller name', true],
    ['Registers the controller in DI', false],
    ['Enables model validation', false],
    ['Creates a database table', false],
  ], 'The [controller] token is replaced by the controller class name without the Controller suffix, so ProductsController becomes api/Products.'),
  q('q106', 'CHECK · WEB API', 'Which are valid ways to validate API input in ASP.NET Core?', [
    ['[Required] and [Range] data annotations', true],
    ['Checking ModelState.IsValid', true],
    ['FluentValidation integration', true],
    ['Relying on the database to reject every bad value', false],
  ], 'Data annotations, ModelState, and FluentValidation validate before the handler runs. Database constraints are a last line of defence, not a user-facing validation strategy.', true),
  q('q107', 'CHECK · WEB API', 'What does [FromBody] tell ASP.NET Core?', [
    ['Bind the parameter from the request body', true],
    ['Read the parameter from the query string', false],
    ['Read the parameter from the route', false],
    ['Read the parameter from a header', false],
  ], 'FromBody uses an input formatter such as System.Text.Json to deserialize the request body into the parameter type.'),
  q('q108', 'CHECK · WEB API', 'What is the difference between PUT and PATCH?', [
    ['PUT replaces the resource; PATCH applies a partial update', true],
    ['PUT is for creation only; PATCH is for deletion', false],
    ['They are identical', false],
    ['PATCH must return 204', false],
  ], 'PUT sends a full representation and is idempotent. PATCH sends a partial change, often with JSON Patch or a merge document, and is not necessarily idempotent.'),
  q('q109', 'CHECK · WEB API', 'What does an OpenAPI document provide?', [
    ['A machine-readable description of the endpoints', true],
    ['A way to generate client SDKs', true],
    ['Interactive API testing through Swagger UI', true],
    ['The database schema for the application', false],
  ], 'OpenAPI describes routes, parameters, schemas, and responses. Tools can generate clients and documentation from it. It is not a database schema.', true),
  q('q110', 'CHECK · WEB API', 'How do you define a GET endpoint in a minimal API?', [
    ['app.MapGet("/products", () => ...)', true],
    ['app.MapRoute("/products", ...)', false],
    ['app.Get("/products", ...)', false],
    ['app.Route.Get("/products", ...)', false],
  ], 'Minimal APIs use extension methods such as MapGet, MapPost, MapPut, and MapDelete on the endpoint route builder.'),
  q('q111', 'CHECK · WEB API', 'Which mechanisms participate in content negotiation?', [
    ['The Accept request header', true],
    ['The [Produces] attribute', true],
    ['Output formatters', true],
    ['The SQL connection string', false],
  ], 'Content negotiation uses the Accept header, formatter support, and attributes such as [Produces] to select the response format.', true),
  q('q112', 'CHECK · WEB API', 'What is the difference between 401 Unauthorized and 403 Forbidden?', [
    ['401 means authentication is missing or invalid; 403 means the authenticated caller lacks permission', true],
    ['401 means the server crashed; 403 means the route is missing', false],
    ['They are interchangeable', false],
    ['403 means the request body is too large', false],
  ], '401 challenges the client to authenticate. 403 means the server understood who you are but refuses the action.'),
  c(
    'c14-intro',
    'CHAPTER 14 · WPF, XAML & MVVM',
    'Declarative desktop UI with data binding.',
    [
      'WPF builds Windows desktop applications with XAML, a declarative markup language. Controls are arranged by layout panels (Grid, StackPanel, DockPanel), styled with resources and templates, and bound to data through DataContext.',
      'MVVM separates the View (XAML), the ViewModel (presentation state and commands implementing INotifyPropertyChanged), and the Model (domain data). Bindings update the UI automatically, and ICommand turns user actions into testable methods.',
    ],
    'Raise PropertyChanged for every bound property you change; otherwise the UI silently shows stale data.',
    'This screen covers XAML, layout, bindings, MVVM, commands, and the UI thread.',
  ),
  q('q113', 'CHECK · WPF', 'What is XAML?', [
    ['A declarative markup language used to define WPF user interfaces', true],
    ['A database query language', false],
    ['A C# replacement that runs without the CLR', false],
    ['A binary format for assemblies', false],
  ], 'XAML describes objects and properties in XML. The XAML compiler turns it into C# code that builds the visual tree.'),
  q('q114', 'CHECK · WPF', 'Which binding modes exist in WPF?', [
    ['OneWay', true],
    ['TwoWay', true],
    ['OneTime', true],
    ['ThreeWay', false],
  ], 'WPF supports OneWay, TwoWay, OneWayToSource, OneTime, and Default. ThreeWay does not exist.', true),
  q('q115', 'CHECK · WPF', 'What is INotifyPropertyChanged used for?', [
    ['Notifying bindings that a property value changed', true],
    ['Validating database migrations', false],
    ['Creating a new UI thread', false],
    ['Serialising objects to JSON', false],
  ], 'When a ViewModel raises PropertyChanged, WPF re-reads the binding source and updates the UI. Without it, changes are not reflected.'),
  q('q116', 'CHECK · WPF', 'Which parts make up the MVVM pattern?', [
    ['Model', true],
    ['View', true],
    ['ViewModel', true],
    ['Controller', false],
  ], 'MVVM has Model, View, and ViewModel. Controller belongs to MVC, not MVVM.', true),
  q('q117', 'CHECK · WPF', 'Why use ObservableCollection<T> for a bound list?', [
    ['It notifies the UI when items are added, removed, or replaced', true],
    ['It stores items in a database', false],
    ['It is immutable', false],
    ['It automatically runs on a background thread', false],
  ], 'ObservableCollection raises CollectionChanged, so an ItemsControl updates without rebuilding the whole list. Item property changes still require INotifyPropertyChanged on the item.'),
  q('q118', 'CHECK · WPF', 'What is the DataContext in WPF?', [
    ['The default source object for data bindings in a visual subtree', true],
    ['The application connection string', false],
    ['The main window class', false],
    ['A thread-local variable', false],
  ], 'DataContext flows down the visual tree. Bindings without an explicit Source resolve against the nearest DataContext, which is usually the ViewModel.'),
  q('q119', 'CHECK · WPF', 'Which are WPF layout panels?', [
    ['Grid', true],
    ['StackPanel', true],
    ['DockPanel', true],
    ['FlexBox', false],
  ], 'Grid, StackPanel, DockPanel, WrapPanel, and Canvas are WPF panels. FlexBox is a CSS layout model, not WPF.', true),
  q('q120', 'CHECK · WPF', 'What is ICommand used for in MVVM?', [
    ['Binding a user action to a ViewModel method', true],
    ['Defining a database transaction', false],
    ['Compiling XAML', false],
    ['Managing the UI thread', false],
  ], 'ICommand exposes Execute and CanExecute, so buttons can bind to commands and enable or disable automatically. RelayCommand or CommunityToolkit.Mvvm provide implementations.'),
  q('q121', 'CHECK · WPF', 'Which features can be used in a WPF binding?', [
    ['Value converters', true],
    ['StringFormat', true],
    ['FallbackValue', true],
    ['SQL injection', false],
  ], 'Converters transform values, StringFormat formats output, and FallbackValue is shown when binding fails. SQL injection is a security attack, not a binding feature.', true),
  q('q122', 'CHECK · WPF', 'Why is the Dispatcher important in WPF?', [
    ['UI objects can only be updated from the thread that created them; the Dispatcher marshals work to that thread.', true],
    ['It compiles XAML to IL', false],
    ['It stores application settings', false],
    ['It replaces dependency injection', false],
  ], 'WPF has thread affinity. Background work must return to the UI thread with Dispatcher.Invoke or InvokeAsync before touching controls.'),
  q('q123', 'CHECK · WPF', 'What is the main benefit of a DependencyProperty?', [
    ['It supports data binding, styling, animation, and default value inheritance', true],
    ['It is faster than every normal property', false],
    ['It removes the need for INotifyPropertyChanged', false],
    ['It can only be used in ASP.NET Core', false],
  ], 'Dependency properties participate in the WPF property system, enabling binding, styling, animation, and value precedence. They are not a general-purpose replacement for CLR properties.'),
  c(
    'c15-intro',
    'CHAPTER 15 · TESTING & CODE QUALITY',
    'Fast feedback beats late debugging.',
    [
      'Unit tests check one behaviour in isolation, integration tests cross real boundaries such as a database, and end-to-end tests exercise the whole system. xUnit is the common .NET framework: [Fact] for a single case and [Theory] with [InlineData] for data-driven cases.',
      'Good tests follow Arrange-Act-Assert, are deterministic, and use fakes or mocks for external dependencies. Static analyzers, EditorConfig, and nullable reference types catch defects before tests even run.',
    ],
    'A test that fails randomly is worse than no test; remove flakiness before adding coverage.',
    'This screen covers the testing pyramid, xUnit attributes, test doubles, and static analysis.',
  ),
  q('q124', 'CHECK · TESTING', 'What is the difference between [Fact] and [Theory] in xUnit?', [
    ['[Fact] is one test case; [Theory] runs the same test with multiple data sets', true],
    ['[Fact] is for integration tests only', false],
    ['[Theory] is a mocking library', false],
    ['They are identical', false],
  ], '[Theory] combined with [InlineData], [MemberData], or [ClassData] runs a parameterised test once per data set.'),
  q('q125', 'CHECK · TESTING', 'Which qualities should a good unit test have?', [
    ['Fast', true],
    ['Isolated from other tests', true],
    ['Deterministic', true],
    ['Dependent on the production network', false],
  ], 'Unit tests should be fast, isolated, and deterministic. Network, clock, and file-system dependencies make them slow and flaky; abstract them behind interfaces.', true),
  q('q126', 'CHECK · TESTING', 'What is the purpose of a mocking library such as Moq or NSubstitute?', [
    ['Creating test doubles that simulate dependencies', true],
    ['Compiling the application faster', false],
    ['Replacing the garbage collector', false],
    ['Deploying to production', false],
  ], 'Mocking libraries create fakes that return configured values, record calls, and verify interactions, so units can be tested without real infrastructure.'),
  q('q127', 'CHECK · TESTING', 'Which are recognised levels of automated testing?', [
    ['Unit tests', true],
    ['Integration tests', true],
    ['End-to-end tests', true],
    ['Production-only tests', false],
  ], 'Unit, integration, and end-to-end tests form the testing pyramid. Production smoke tests exist, but they are not a substitute for automated tests.', true),
  q('q128', 'CHECK · TESTING', 'What does the Arrange-Act-Assert structure describe?', [
    ['The three phases of a clear unit test', true],
    ['Three hosting environments in ASP.NET Core', false],
    ['Three types of garbage collection', false],
    ['Three WPF layout panels', false],
  ], 'Arrange sets up the system, Act performs the behaviour under test, and Assert verifies the expected outcome.'),
  q('q129', 'CHECK · TESTING', 'Which tools help enforce C# code quality?', [
    ['Roslyn analyzers', true],
    ['EditorConfig rules', true],
    ['Nullable reference types', true],
    ['Disabling all warnings', false],
  ], 'Analyzers, EditorConfig, and nullable annotations catch problems at build time. Suppressing all warnings hides real defects.', true),
  c(
    'c16-intro',
    'CHAPTER 16 · SECURITY, DEPLOYMENT & MODERN .NET',
    'Ship it safely and keep it current.',
    [
      'Never commit secrets; use user secrets in development, environment variables or a vault in production. Always use HTTPS, validate input, hash passwords with ASP.NET Core Identity or a modern KDF, and use parameterised queries or an ORM.',
      'dotnet publish produces either a framework-dependent deployment (smaller, requires the runtime) or a self-contained deployment (bundles the runtime). Modern .NET ships a major version every November, with even-numbered releases receiving long-term support.',
    ],
    'Security is a default, not a feature you add at the end.',
    'This screen covers secrets, web security basics, deployment models, and the .NET release cadence.',
  ),
  q('q130', 'CHECK · SECURITY', 'Where should production secrets live?', [
    ['In environment variables or a secure vault', true],
    ['Committed to appsettings.json', false],
    ['In source code constants', false],
    ['In a public README', false],
  ], 'User secrets are for local development only. Production secrets belong in environment variables, Azure Key Vault, AWS Secrets Manager, or an equivalent vault.'),
  q('q131', 'CHECK · SECURITY', 'Which are sound web application security practices?', [
    ['Use HTTPS everywhere', true],
    ['Validate and encode user input', true],
    ['Use parameterised queries', true],
    ['Store passwords in plain text for support', false],
  ], 'HTTPS protects transport, input validation and encoding prevent injection and XSS, and parameterised queries stop SQL injection. Plain-text passwords are never acceptable.', true),
  q('q132', 'CHECK · SECURITY', 'How should passwords be stored?', [
    ['As a salted hash produced by a modern KDF such as PBKDF2, bcrypt, or Argon2', true],
    ['Encrypted with a key stored in the same database', false],
    ['As a SHA-256 hash without a salt', false],
    ['In plain text with file permissions', false],
  ], 'Use ASP.NET Core Identity or a reputable KDF. Fast unsalted hashes are vulnerable to rainbow tables and GPU cracking.'),
  q('q133', 'CHECK · DEPLOYMENT', 'What is a self-contained .NET deployment?', [
    ['A publish that bundles the .NET runtime with the application', true],
    ['An app that requires the runtime to be installed separately', false],
    ['An app with no dependencies at all', false],
    ['A debug-only build', false],
  ], 'Self-contained deployments include the runtime, so the target machine does not need .NET installed. Framework-dependent deployments are smaller but require a compatible runtime.'),
  q('q134', 'CHECK · MODERN .NET', 'Which features are part of modern .NET?', [
    ['Minimal APIs', true],
    ['Native AOT compilation', true],
    ['Records', true],
    ['Cross-platform Web Forms', false],
  ], 'Minimal APIs, Native AOT, and records are modern .NET features. Web Forms is a legacy ASP.NET Framework technology and is not cross-platform.', true),
  q('q135', 'CHECK · MODERN .NET', 'How often does .NET receive a new major version?', [
    ['Once per year, in November', true],
    ['Once every five years', false],
    ['Every month', false],
    ['Only when Windows updates', false],
  ], 'Modern .NET ships a major version each November. Even-numbered versions are LTS (three years of support); odd-numbered versions are STS (18 months).'),
]

const commandMeta: LessonMeta = {
  course: 'dotnet CLI — Command Line Essentials',
  chapter: '4 chapters · 20 questions',
  lesson: 'Master the dotnet command line',
  estimatedMinutes: 60,
}

const commandFrames: LessonFrame[] = [
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

const dockerMeta: LessonMeta = {
  course: 'Docker — Containers from Zero to Compose',
  chapter: '4 chapters · 20 questions',
  lesson: 'Build, run and ship containers',
  estimatedMinutes: 75,
}

const dockerFrames: LessonFrame[] = [
  c(
    'docker-c1',
    'DOCKER · CHAPTER 1',
    'Images and containers.',
    [
      'An image is an immutable template made of read-only layers. A container is a running instance of an image with a writable layer on top. You pull images from a registry, run containers locally, and push images back for others to use.',
      'Containers share the host kernel but have their own filesystem, network namespace, and process tree. That is why they start quickly and stay much lighter than virtual machines.',
    ],
    'Think image = class, container = instance.',
    'This chapter introduces images, containers, and the lifecycle commands around them.',
  ),
  c(
    'docker-c2',
    'DOCKER · CHAPTER 2',
    'Writing a Dockerfile.',
    [
      'A Dockerfile is a recipe for building an image. FROM selects the base image, COPY brings files in, RUN executes build steps, and CMD or ENTRYPOINT defines what starts when the container runs.',
      'Order instructions from least to most frequently changing so layer caching works. Multi-stage builds let you compile in one stage and copy only the artifacts into a small final image.',
    ],
    'A .dockerignore keeps build contexts small and prevents secrets from being copied into images.',
    'This chapter covers Dockerfile instructions, entrypoints, caching, and multi-stage builds.',
  ),
  q('docker-q1', 'CHECK · DOCKER', 'What is the difference between an image and a container?', [
    ['An image is a template; a container is a running instance of it', true],
    ['An image is a running process; a container is a file', false],
    ['They are the same thing', false],
    ['A container is stored in a registry; an image runs locally', false],
  ], 'Images are immutable templates. Containers add a writable layer and run processes based on an image.'),
  q('docker-q2', 'CHECK · DOCKER', 'Which are Docker objects?', [
    ['Image', true],
    ['Container', true],
    ['Volume', true],
    ['Kernel', false],
  ], 'Docker manages images, containers, volumes, and networks. The kernel is provided by the host operating system.', true),
  q('docker-q3', 'CHECK · DOCKER', 'What does docker run do?', [
    ['Creates and starts a container from an image', true],
    ['Only downloads an image', false],
    ['Only builds an image', false],
    ['Deletes a stopped container', false],
  ], 'docker run pulls the image if needed, creates a container, and starts it with the given command and options.'),
  q('docker-q4', 'CHECK · DOCKER', 'Which command lists all containers, including stopped ones?', [
    ['docker ps -a', true],
    ['docker ps', false, 'That lists only running containers by default.'],
    ['docker images -a', false],
    ['docker container list --stopped', false],
  ], 'docker ps shows running containers; -a includes stopped and created containers.'),
  q('docker-q5', 'CHECK · DOCKER', 'Which command downloads an image from a registry?', [
    ['docker pull', true],
    ['docker push', false],
    ['docker fetch', false],
    ['docker get', false],
  ], 'docker pull downloads image layers. docker push uploads them to a registry.'),
  q('docker-q6', 'CHECK · DOCKER', 'Which Dockerfile instruction selects the base image?', [
    ['FROM', true],
    ['BASE', false],
    ['IMAGE', false],
    ['RUN', false],
  ], 'FROM must be the first instruction (apart from comments and ARG). It selects the parent image for the build.'),
  q('docker-q7', 'CHECK · DOCKER', 'Which are valid Dockerfile instructions?', [
    ['FROM', true],
    ['COPY', true],
    ['RUN', true],
    ['SELECT', false],
  ], 'FROM, COPY, RUN, WORKDIR, ENV, CMD, and ENTRYPOINT are real instructions. SELECT is SQL.', true),
  q('docker-q8', 'CHECK · DOCKER', 'What is the relationship between ENTRYPOINT and CMD?', [
    ['ENTRYPOINT sets the executable; CMD supplies default arguments that can be overridden', true],
    ['CMD sets the executable; ENTRYPOINT supplies arguments', false],
    ['They are aliases', false],
    ['Both can only be used once and cancel each other', false],
  ], 'ENTRYPOINT defines the command that always runs. CMD provides default arguments, which a docker run command can replace.'),
  q('docker-q9', 'CHECK · DOCKER', 'Why use a multi-stage Dockerfile?', [
    ['To compile in one stage and keep the final image small', true],
    ['To run multiple containers in one image', false],
    ['To avoid writing a Dockerfile', false],
    ['To disable layer caching', false],
  ], 'Multi-stage builds separate build dependencies from runtime artifacts, so the final image ships only what it needs.'),
  q('docker-q10', 'CHECK · DOCKER', 'What is the purpose of .dockerignore?', [
    ['Exclude files from the build context', true],
    ['Ignore containers during docker ps', false],
    ['Skip Dockerfile instructions', false],
    ['Hide layers from the registry', false],
  ], 'The build context is sent to the daemon. .dockerignore keeps it small and prevents copying secrets or node_modules into the image.'),
  c(
    'docker-c3',
    'DOCKER · CHAPTER 3',
    'Ports, volumes, and environment.',
    [
      'Containers are isolated by default. Publish a port with -p host:container so the host can reach the service. Environment variables configure the app at run time with -e or an env file.',
      'Container filesystems disappear with the container. Named volumes keep data beyond the container lifecycle, bind mounts expose host directories, and tmpfs keeps data in memory.',
    ],
    'Map ports as -p 8080:80: host port first, container port second.',
    'This chapter covers networking, persistence, and runtime configuration for containers.',
  ),
  c(
    'docker-c4',
    'DOCKER · CHAPTER 4',
    'Compose, build, and registries.',
    [
      'Docker Compose describes a multi-container application in a YAML file. docker compose up starts the services, -d runs them in the background, and docker compose down stops and removes them.',
      'docker build -t tags an image, and docker push publishes it to a registry such as Docker Hub or GitHub Container Registry. Compose can also build images from a Dockerfile when the service declares build.',
    ],
    'Keep compose files declarative: version pinned images, named volumes, and environment values from a .env file.',
    'This chapter covers Compose, image tagging, and publishing to a registry.',
  ),
  q('docker-q11', 'CHECK · DOCKER', 'What does -p 8080:80 mean in docker run?', [
    ['Host port 8080 maps to container port 80', true],
    ['Container port 8080 maps to host port 80', false],
    ['Both ports are 8080', false],
    ['Port 80 is exposed only on localhost', false],
  ], 'The syntax is -p <host-port>:<container-port>. Requests to host 8080 are forwarded to port 80 inside the container.'),
  q('docker-q12', 'CHECK · DOCKER', 'Why use a named volume?', [
    ['To persist data beyond the container lifecycle', true],
    ['To publish a port', false],
    ['To speed up the build', false],
    ['To store the Dockerfile', false],
  ], 'Named volumes are managed by Docker and survive container removal. They are the usual choice for databases.'),
  q('docker-q13', 'CHECK · DOCKER', 'Which are Docker mount types?', [
    ['Named volume', true],
    ['Bind mount', true],
    ['tmpfs', true],
    ['Swap file', false],
  ], 'Docker supports volumes, bind mounts, and tmpfs mounts. A swap file is an operating-system paging mechanism, not a mount type.', true),
  q('docker-q14', 'CHECK · DOCKER', 'Which flag sets an environment variable for a container?', [
    ['-e KEY=value', true],
    ['--env-file-only KEY=value', false],
    ['-p KEY=value', false],
    ['-v KEY=value', false],
  ], 'Use -e or --env to pass environment variables, or --env-file to load several from a file.'),
  q('docker-q15', 'CHECK · DOCKER', 'Which command shows the output written by a container?', [
    ['docker logs', true],
    ['docker output', false],
    ['docker console', false],
    ['docker print', false],
  ], 'docker logs prints stdout and stderr from a container. Add -f to follow the stream.'),
  q('docker-q16', 'CHECK · DOCKER', 'What does docker compose up -d do?', [
    ['Starts the services in the background', true],
    ['Builds images only', false],
    ['Deletes the services', false],
    ['Prints the compose file', false],
  ], 'The -d flag runs services detached. Without it, Compose attaches to the logs.'),
  q('docker-q17', 'CHECK · DOCKER', 'Which are top-level keys in a Compose file?', [
    ['services', true],
    ['networks', true],
    ['volumes', true],
    ['Dockerfile', false],
  ], 'Compose files have services, networks, and volumes. A Dockerfile is referenced inside a service build section, not as a top-level key.', true),
  q('docker-q18', 'CHECK · DOCKER', 'What does docker build -t myapp:1.0 . do?', [
    ['Builds an image from the current directory and tags it myapp:1.0', true],
    ['Runs the myapp image', false],
    ['Pushes the image to a registry', false],
    ['Creates a container named myapp', false],
  ], 'The -t flag names and tags the image, and the trailing dot selects the current directory as the build context.'),
  q('docker-q19', 'CHECK · DOCKER', 'Which command uploads an image to a registry?', [
    ['docker push', true],
    ['docker pull', false],
    ['docker send', false],
    ['docker upload', false],
  ], 'docker push uploads tagged image layers to the registry. You usually log in first with docker login.'),
  q('docker-q20', 'CHECK · DOCKER', 'What does docker compose down -v do?', [
    ['Stops and removes containers, and also removes named volumes', true],
    ['Removes only the images', false],
    ['Starts the services with volumes', false],
    ['Deletes the compose file', false],
  ], 'down removes containers and networks; -v also removes the declared volumes, deleting their data.'),
]

const fastapiMeta: LessonMeta = {
  course: 'FastAPI — Modern Python APIs',
  chapter: '4 chapters · 20 questions',
  lesson: 'Build typed, async APIs with FastAPI',
  estimatedMinutes: 75,
}

const fastapiFrames: LessonFrame[] = [
  c(
    'fastapi-c1',
    'FASTAPI · CHAPTER 1',
    'Routes, parameters, and the dev server.',
    [
      'FastAPI is a modern Python web framework built on Starlette for the web layer and Pydantic for data validation. Declare a route with a decorator such as @app.get, write a Python function, and FastAPI generates the OpenAPI schema and interactive docs for you.',
      'Path parameters are declared in the route string and matched by function arguments. Query parameters are function arguments that are not part of the path. Uvicorn runs the app in development with reload enabled.',
    ],
    'Run the dev server with uvicorn main:app --reload, then open /docs.',
    'This chapter introduces routing, parameters, and running a FastAPI application.',
  ),
  c(
    'fastapi-c2',
    'FASTAPI · CHAPTER 2',
    'Pydantic models and validation.',
    [
      'Pydantic models describe the shape and types of request and response data. Declare a class based on BaseModel and use it as a parameter to receive a validated JSON body. Invalid input is rejected automatically with a 422 response.',
      'Field adds constraints such as minimum length or numeric ranges, and response_model validates and filters what the API returns. Nested models compose cleanly for larger payloads.',
    ],
    'Validation happens before your handler runs, so the handler receives clean, typed data.',
    'This chapter covers Pydantic models, constraints, response models, and validation errors.',
  ),
  q('fastapi-q1', 'CHECK · FASTAPI', 'Which two libraries does FastAPI build on?', [
    ['Starlette and Pydantic', true],
    ['Flask and SQLAlchemy', false],
    ['Django and DRF', false],
    ['Tornado and Marshmallow', false],
  ], 'Starlette provides the ASGI web layer and Pydantic provides data validation and serialization.'),
  q('fastapi-q2', 'CHECK · FASTAPI', 'Which decorators define routes in FastAPI?', [
    ['@app.get', true],
    ['@app.post', true],
    ['@app.put', true],
    ['@app.fetch', false],
  ], 'FastAPI exposes HTTP verb decorators such as get, post, put, patch, and delete. fetch is a JavaScript API, not a FastAPI decorator.', true),
  q('fastapi-q3', 'CHECK · FASTAPI', 'How is a path parameter declared?', [
    ['In the route string, with a matching function argument', true],
    ['Only in the request body', false],
    ['Only in a query string', false],
    ['In a separate YAML file', false],
  ], 'A route like /items/{item_id} declares item_id in the path; the function receives it as an argument.'),
  q('fastapi-q4', 'CHECK · FASTAPI', 'Which command runs a FastAPI app in development with auto-reload?', [
    ['uvicorn main:app --reload', true],
    ['fastapi run --watch', false],
    ['python -m fastapi serve', false],
    ['gunicorn main:app --reload', false],
  ], 'Uvicorn is the common ASGI server. main:app means the app object in main.py, and --reload watches for changes.'),
  q('fastapi-q5', 'CHECK · FASTAPI', 'When is a function argument treated as a query parameter?', [
    ['When it is not part of the path and has a simple type', true],
    ['When it is wrapped in BaseModel', false],
    ['When it is named request', false],
    ['When it starts with an underscore', false],
  ], 'FastAPI treats simple arguments that are not path parameters as query parameters. Pydantic models are read from the body.'),
  q('fastapi-q6', 'CHECK · FASTAPI', 'What is a Pydantic BaseModel used for in FastAPI?', [
    ['Validating and parsing request data', true],
    ['Running SQL migrations', false],
    ['Starting the ASGI server', false],
    ['Defining HTML templates', false],
  ], 'A BaseModel class describes the expected fields and types. FastAPI validates the body and passes a model instance to the handler.'),
  q('fastapi-q7', 'CHECK · FASTAPI', 'Which are Pydantic features?', [
    ['Type validation', true],
    ['Serialization to JSON-compatible data', true],
    ['Nested models', true],
    ['Executing raw SQL', false],
  ], 'Pydantic validates types, serializes models, and supports nested models and constraints. It does not execute SQL.', true),
  q('fastapi-q8', 'CHECK · FASTAPI', 'What does response_model do?', [
    ['Validates and filters the response payload', true],
    ['Selects the database table', false],
    ['Sets the HTTP server port', false],
    ['Disables validation for that route', false],
  ], 'response_model documents and enforces the response shape, removing fields that are not declared in the model.'),
  q('fastapi-q9', 'CHECK · FASTAPI', 'How do you add a minimum length constraint to a string field?', [
    ['Field(min_length=3)', true],
    ['Field(gt=3)', false, 'gt applies to numeric comparisons, not string length.'],
    ['String(min=3)', false],
    ['Column(length=3)', false],
  ], 'In Pydantic v2, Field(min_length=3) enforces a minimum string length. Numeric constraints use gt, ge, lt, and le.'),
  q('fastapi-q10', 'CHECK · FASTAPI', 'Which status code does FastAPI return by default for request validation errors?', [
    ['422 Unprocessable Entity', true],
    ['400 Bad Request', false],
    ['401 Unauthorized', false],
    ['500 Internal Server Error', false],
  ], 'FastAPI returns 422 with details about the invalid fields when Pydantic validation fails.'),
  c(
    'fastapi-c3',
    'FASTAPI · CHAPTER 3',
    'Async, dependencies, and errors.',
    [
      'Use async def for handlers that await I/O. FastAPI runs synchronous handlers in a thread pool, so blocking code does not freeze the event loop. Dependencies declared with Depends centralise shared logic such as database sessions and authentication.',
      'Raise HTTPException to return a controlled error status and message. BackgroundTasks schedules work after the response is sent, and security helpers such as OAuth2PasswordBearer implement token-based authentication.',
    ],
    'Never call blocking libraries inside async handlers without offloading them.',
    'This chapter covers async handlers, dependency injection, authentication, and error handling.',
  ),
  c(
    'fastapi-c4',
    'FASTAPI · CHAPTER 4',
    'Docs, tests, and deployment.',
    [
      'FastAPI generates an OpenAPI schema automatically. Swagger UI is served at /docs and ReDoc at /redoc, which makes the API explorable without extra work.',
      'Test routes with pytest and fastapi.testclient.TestClient. In production, run Uvicorn or Gunicorn with Uvicorn workers behind a reverse proxy, configure CORS deliberately, and terminate HTTPS at the proxy.',
    ],
    'Keep the generated OpenAPI schema in your contract tests.',
    'This chapter covers interactive docs, testing, and production deployment concerns.',
  ),
  q('fastapi-q11', 'CHECK · FASTAPI', 'When should a FastAPI handler be declared async def?', [
    ['When it performs awaitable I/O', true],
    ['For every handler, even CPU-bound work', false],
    ['Only for database migrations', false],
    ['Never; FastAPI requires def', false],
  ], 'async def is for awaitable I/O. Sync def handlers are executed in a thread pool by FastAPI.'),
  q('fastapi-q12', 'CHECK · FASTAPI', 'Which tasks are good uses of Depends?', [
    ['Shared database sessions', true],
    ['Authentication checks', true],
    ['Reusable pagination logic', true],
    ['Rendering HTML templates only', false],
  ], 'Depends injects shared logic and resources. Template rendering is a separate concern, not a reason to use Depends by itself.', true),
  q('fastapi-q13', 'CHECK · FASTAPI', 'Which helper implements OAuth2 password bearer token authentication?', [
    ['OAuth2PasswordBearer', true],
    ['HTTPBasicBearer', false],
    ['TokenDepends', false],
    ['PasswordMiddleware', false],
  ], 'OAuth2PasswordBearer extracts the bearer token from the Authorization header. It is commonly combined with a token verification dependency.'),
  q('fastapi-q14', 'CHECK · FASTAPI', 'What are BackgroundTasks used for?', [
    ['Running work after the response is sent', true],
    ['Starting the ASGI server', false],
    ['Validating request bodies', false],
    ['Serving static files', false],
  ], 'BackgroundTasks schedule short follow-up work, such as sending an email, without delaying the response.'),
  q('fastapi-q15', 'CHECK · FASTAPI', 'How do you return a 404 error from a handler?', [
    ['raise HTTPException(status_code=404, detail="Not found")', true],
    ['return 404', false],
    ['raise NotFoundException()', false],
    ['return {"status": 404}', false],
  ], 'HTTPException returns a controlled error response with a status code and detail message.'),
  q('fastapi-q16', 'CHECK · FASTAPI', 'Where are the interactive API docs served by default?', [
    ['/docs and /redoc', true],
    ['/swagger and /openapi', false],
    ['/api/docs only', false],
    ['/schema and /ui', false],
  ], 'Swagger UI is at /docs and ReDoc at /redoc. Both are generated from the OpenAPI schema.'),
  q('fastapi-q17', 'CHECK · FASTAPI', 'Which tools are commonly used to test FastAPI apps?', [
    ['TestClient', true],
    ['pytest', true],
    ['httpx', true],
    ['Selenium', false],
  ], 'TestClient, pytest, and httpx cover functional and integration testing. Selenium drives browsers and is not the usual choice for API tests.', true),
  q('fastapi-q18', 'CHECK · FASTAPI', 'How do you send a GET request with TestClient?', [
    ['TestClient(app).get("/")', true],
    ['TestClient(app).request("GET /")', false],
    ['app.test("/")', false],
    ['pytest.get(app, "/")', false],
  ], 'TestClient exposes the HTTP verb methods. Calling .get returns a response object with status_code and json().'),
  q('fastapi-q19', 'CHECK · FASTAPI', 'What does FastAPI generate from your route and model definitions?', [
    ['An OpenAPI schema', true],
    ['A database migration', false],
    ['A Dockerfile', false],
    ['A Python virtual environment', false],
  ], 'FastAPI builds an OpenAPI schema from types and routes, then uses it to render the docs and client tooling.'),
  q('fastapi-q20', 'CHECK · FASTAPI', 'Which are sound production concerns for a FastAPI service?', [
    ['Run multiple server workers behind a reverse proxy', true],
    ['Configure CORS deliberately', true],
    ['Terminate HTTPS at the proxy', true],
    ['Disable HTTPS to reduce overhead', false],
  ], 'Scale with workers behind a proxy, restrict CORS, and terminate HTTPS securely. Disabling HTTPS exposes credentials and data.', true),
]

export type CourseId = 'dotnet' | 'dotnet-command' | 'docker' | 'fastapi'

export type Course = {
  id: CourseId
  meta: LessonMeta
  frames: LessonFrame[]
}

export const defaultCourseId: CourseId = 'dotnet'

export const courses: Course[] = [
  { id: 'dotnet', meta: dotnetMeta, frames: dotnetFrames },
  { id: 'dotnet-command', meta: commandMeta, frames: commandFrames },
  { id: 'docker', meta: dockerMeta, frames: dockerFrames },
  { id: 'fastapi', meta: fastapiMeta, frames: fastapiFrames },
]

export function getCourse(id: string): Course {
  return (
    courses.find((course) => course.id === id) ??
    courses.find((course) => course.id === defaultCourseId) ??
    courses[0]
  )
}

function resolveCourseId(): CourseId {
  if (typeof window === 'undefined') return defaultCourseId

  const requested =
    new URLSearchParams(window.location.search).get('course') ?? window.location.hash.slice(1)

  return courses.some((course) => course.id === requested) ? (requested as CourseId) : defaultCourseId
}

const activeCourse = getCourse(resolveCourseId())

export const activeCourseId = activeCourse.id
export const lessonMeta = activeCourse.meta
export const lessonFrames = activeCourse.frames

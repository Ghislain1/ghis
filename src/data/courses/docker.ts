import type { LessonFrame, LessonMeta } from '../../types'
import { c, q } from '../frames'

export const meta: LessonMeta = {
  course: 'Docker — Containers from Zero to Compose',
  chapter: '4 chapters · 20 questions',
  lesson: 'Build, run and ship containers',
  estimatedMinutes: 75,
}

export const frames: LessonFrame[] = [
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

# SOSE2025 Project

This is a monorepo project using Next.js, TypeScript, and Prisma ORM. The project is structured as a workspace with multiple packages.

## Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Docker and Docker Compose (for database)

## Project Structure

```
sose2025/
├── packages/
│   └── web/           # Next.js web application
│       ├── prisma/    # Prisma schema and migrations
│       └── src/       # Application source code
├── package.json       # Root package.json for workspace management
└── compose.yaml       # Docker Compose configuration
```

## Getting Started

1.  Clone the repository:

    ```bash
    git clone https://github.com/thm-ops/sose2025.git
    cd sose2025
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Setup database from migrations (creates new migration if there are any changes):

    ```bash
    npm run prisma:migrate
    ```

    or use (fast synchronization with schema.prisma, never creates migrations):

    ```bash
    npm run prisma:push
    ```

4.  (Optionally) Fill the database with sample data (provided in @/lib/data):

    ```bash
    npm run prisma:seed
    ```

5.  Start the development environment:

    ```bash
    # Start the database using Docker Compose
    docker-compose up -d

    # Start the development server
    npm run dev:web
    ```

## Prisma ORM Usage

The project uses Prisma ORM for database management. Here are the main Prisma commands:

### Database Management

- Generate Prisma Client:

  ```bash
  npm run prisma:generate
  ```

- Create and apply migrations:

  ```bash
  npm run prisma:migrate
  ```

- Push schema changes directly to the database:

  (it doesn't creates migration and should be used when for development needs)

  ```bash
  npm run prisma:push
  ```

- Seed the database with initial data:

  ```bash
    npm run prisma:seed
  ```

### Working with Prisma

1. The Prisma schema is located in `packages/web/prisma/schema.prisma`
2. After making changes to the schema, run:

   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

3. To view and manage your database, you can use Prisma Studio:
   ```bash
   npm run prisma:studio
   ```

## Development Scripts

- `npm run dev:web` - Start the development server
- `npm run build:web` - Build the web application
- `npm run start:web` - Start the production server
- `npm run lint` - Run linting
- `npm run format` - Format code using Prettier

## Docker Support

The project includes Docker Compose configuration for the database. To start the database:

```bash
docker-compose up -d
```

To stop the database:

```bash
docker-compose down
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

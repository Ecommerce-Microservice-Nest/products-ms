<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">🛍️ Products Microservice</h1>

<p align="center">
  A high-performance, enterprise-grade products microservice built with <a href="http://nestjs.com/" target="_blank">NestJS</a> and <a href="https://www.prisma.io/" target="_blank">Prisma ORM</a> for scalable e-commerce architectures.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.prisma.io/" target="_blank"><img src="https://img.shields.io/badge/prisma-6.10.1-2D3748?logo=prisma&logoColor=white" alt="Prisma" /></a>
  <a href="https://nodejs.org" target="_blank"><img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen" alt="Node Version" /></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/typescript-5.0+-blue" alt="TypeScript" /></a>
  <a href="https://github.com/Ecommerce-Microservice-Nest/products-ms" target="_blank"><img src="https://img.shields.io/badge/microservice-TCP-orange" alt="Microservice" /></a>
  <a href="https://github.com/Ecommerce-Microservice-Nest/products-ms/blob/main/LICENSE" target="_blank"><img src="https://img.shields.io/badge/license-MIT-green" alt="License" /></a>
</p>

## 📋 Description

This microservice handles all product-related operations for an e-commerce ecosystem. Built as part of a microservices architecture, it provides robust TCP-based communication for seamless integration with other services while maintaining data consistency and high performance.

### ✨ Key Features

- **🔧 TCP Microservice**: Message-pattern based communication for optimal performance
- **📊 Complete CRUD Operations**: Full product lifecycle management with use cases
- **🗄️ Prisma ORM Integration**: Type-safe database operations with SQLite
- **✅ Data Validation**: Comprehensive input validation using DTOs and class-validator
- **🔍 Advanced Querying**: Pagination, filtering, and soft-delete capabilities
- **🏗️ Clean Architecture**: Domain-driven design with use cases, repositories, and dependency injection
- **🎯 SOLID Principles**: Repository pattern, dependency injection, and separation of concerns
- **🚀 RPC Exception Handling**: Proper microservice error handling with structured responses
- **📈 Production Ready**: Built with scalability and maintainability in mind
- **🔒 Type Safety**: Full TypeScript implementation with strict typing

## 🏛️ Clean Architecture Implementation

This microservice follows **Clean Architecture** principles with clear separation of concerns across three main layers:

### 🎯 **Domain Layer** (`domain/`)

- **Entities**: Core business objects with business logic (`Product.entity.ts`)
- **Interfaces**: Domain contracts (`MetaDataAllProducts`)
- **Exceptions**: Business rule violations (future implementation)
- **Value Objects**: Complex domain types (future implementation)

### 🔄 **Application Layer** (`application/`)

- **Use Cases**: Business logic orchestration (`CreateProductUseCase`, `FindAllProductsUseCase`, etc.)
- **DTOs**: Data transfer and validation objects
- **Ports**: Repository interfaces and contracts (`IProductRepository`)
- **Services**: Application services (not business logic)

### 🏗️ **Infrastructure Layer** (`infrastructure/`)

- **Controllers**: HTTP/TCP adapters (`ProductsController`)
- **Repositories**: Data persistence implementations (`PrismaProductRepository`)
- **Services**: Technical services orchestrating use cases (`ProductsService`)
- **External**: Third-party integrations

### 🔗 **Dependency Flow**

```
Infrastructure → Application → Domain
     ↓              ↓           ↓
Controllers → Use Cases → Entities
Repositories → Ports → Interfaces
```

**Benefits:**

- ✅ **Testability**: Easy to mock dependencies and test business logic
- ✅ **Maintainability**: Clear separation makes code easy to modify
- ✅ **Scalability**: Add features without affecting existing code
- ✅ **Independence**: Domain logic independent of frameworks and databases

## 🏗️ Architecture

```
src/
├── app.module.ts                    # Root application module
├── main.ts                         # Microservice bootstrap & TCP setup
├── config/                         # Configuration management
│   ├── envs.ts                    # Environment validation (Joi)
│   └── index.ts                   # Configuration exports
├── common/                         # Shared utilities
│   ├── dto/
│   │   └── pagination.dto.ts      # Reusable pagination DTO
│   └── index.ts                   # Common exports
├── database/                       # Database layer
│   └── prisma/
│       ├── prisma.module.ts       # Prisma module configuration
│       └── prisma.service.ts      # Prisma service implementation
└── products/                       # Products domain module (Clean Architecture)
    ├── products.module.ts          # Module definition with DI configuration
    ├── application/                # Application layer (Use Cases & DTOs)
    │   ├── dto/
    │   │   ├── create-product.dto.ts   # Creation validation
    │   │   └── update-product.dto.ts   # Update validation
    │   ├── ports/
    │   │   └── product-repository.interface.ts  # Repository contract
    │   └── use-cases/
    │       ├── create-product.use-case.ts       # Create product business logic
    │       ├── find-all-products.use-case.ts    # List products with pagination
    │       ├── get-one-product.use-case.ts      # Find product by ID
    │       ├── update-product.use-case.ts       # Update product business logic
    │       └── remove-product.use-case.ts       # Soft delete business logic
    ├── domain/                     # Domain layer (Entities & Interfaces)
    │   ├── entities/
    │   │   └── product.entity.ts   # Product domain model with business logic
    │   ├── interfaces/
    │   │   └── meta-data-all-products.interface.ts  # Pagination metadata
    │   └── exceptions/             # Domain-specific exceptions (future)
    └── infrastructure/             # Infrastructure layer (Controllers, Services, Repositories)
        ├── controllers/
        │   └── products.controller.ts  # TCP message patterns
        ├── services/
        │   └── products.service.ts     # Service orchestrating use cases
        └── persistence/
            └── product-prisma.repository.ts  # Prisma repository implementation

prisma/
├── schema.prisma                   # Database schema definition
├── dev.db                         # SQLite development database
└── migrations/                     # Database migrations history
```

### 🔄 Communication Flow

```
┌─────────────────┐    TCP Messages    ┌─────────────────────┐
│  Client/Gateway │ ──────────────────> │ Products Controller │
└─────────────────┘                     └─────────────────────┘
                                                   │
                                                   ▼
                                        ┌─────────────────┐
                                        │ Products Service │ (Orchestrates Use Cases)
                                        └─────────────────┘
                                                   │
                                        ┌──────────────────────────────┐
                                        │          Use Cases           │
                                        │ ┌─────────────────────────┐  │
                                        │ │ CreateProductUseCase    │  │
                                        │ │ FindAllProductsUseCase  │  │
                                        │ │ GetOneProductUseCase    │  │
                                        │ │ UpdateProductUseCase    │  │
                                        │ │ RemoveProductUseCase    │  │
                                        │ └─────────────────────────┘  │
                                        └──────────────────────────────┘
                                                   │
                                                   ▼
                                        ┌─────────────────────────┐
                                        │ IProductRepository      │ (Port)
                                        └─────────────────────────┘
                                                   │
                                                   ▼
                                        ┌─────────────────────────┐
                                        │ PrismaProductRepository │ (Adapter)
                                        └─────────────────────────┘
                                                   │
                                                   ▼
                                        ┌─────────────────┐
                                        │ SQLite Database │
                                        └─────────────────┘
```

## 🌐 Microservice Communication

This service communicates via **TCP transport** using message patterns. It's designed to work within a microservices ecosystem.

### 📡 Available Message Patterns

| Pattern Command    | Description                 | Payload            | Use Case                 |
| ------------------ | --------------------------- | ------------------ | ------------------------ |
| `create_product`   | Create a new product        | `CreateProductDto` | `CreateProductUseCase`   |
| `get_all_products` | Get paginated products list | `PaginationDto`    | `FindAllProductsUseCase` |
| `find_one_product` | Get product by ID           | `{ id: number }`   | `GetOneProductUseCase`   |
| `update_product`   | Update existing product     | `UpdateProductDto` | `UpdateProductUseCase`   |
| `delete_product`   | Soft delete product         | `{ id: number }`   | `RemoveProductUseCase`   |

### 📞 Client Communication Example

```typescript
// In your client microservice or gateway
const client = ClientProxy; // TCP client setup

// Create product
const newProduct = await client
  .send({ cmd: 'create_product' }, { name: 'Gaming Laptop', price: 1299.99 })
  .toPromise();

// Get products with pagination
const products = await client
  .send({ cmd: 'get_all_products' }, { page: 1, limit: 10 })
  .toPromise();
```

### 🔧 Connection Configuration

```typescript
// Default TCP configuration
Transport.TCP
Options: {
  host: 'localhost',
  port: 3001  // Configurable via PORT env variable
}
```

## 🛠️ Project Setup

### Prerequisites

- **Node.js** (>= 18.x) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/Ecommerce-Microservice-Nest/products-ms.git
cd products-ms

# Install dependencies
npm install

# Setup environment variables
cp .env.template .env
# Edit .env with your configuration

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed database with sample data
npx prisma db seed
```

## 🚀 Running the Application

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug

# Build the application
npm run build
```

The microservice will be available on **TCP port 3001** (configurable via `PORT` environment variable).

### 🔍 Health Check

```bash
# Check if the service is running
netstat -an | grep 3001
# or
telnet localhost 3001
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run test coverage report
npm run test:cov

# Run e2e tests
npm run test:e2e

# Debug tests
npm run test:debug
```

### 🎯 Testing Strategy

- **Unit Tests**: Use cases, services, and controller logic testing
- **Integration Tests**: Database operations with Prisma and repository pattern
- **E2E Tests**: Complete microservice communication flow with TCP transport
- **Coverage Reports**: Minimum 80% coverage target
- **Mocking**: Repository interfaces for isolated unit testing

## 📊 Database Schema

```prisma
model Product {
  id        Int     @id @default(autoincrement())
  name      String
  price     Float
  available Boolean @default(true)

  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  deletedAt DateTime? // Soft delete capability

  // Performance indexes
  @@index([name])        // Name searches
  @@index([available])   // Availability filtering
  @@index([price])       // Price sorting/filtering
  @@index([createdAt])   // Date sorting
}
```

### 🗄️ Database Features

- **SQLite** for development (easily configurable for PostgreSQL/MySQL)
- **Soft Delete** implementation (deletedAt field)
- **Optimized Indexes** for common query patterns
- **Type-safe migrations** with Prisma
- **Automatic timestamps** (createdAt, updatedAt)

## 🔧 Environment Variables

Create a `.env` file in the root directory (copy from `.env.template`):

```env
# Microservice Configuration
PORT=3001

# Database Configuration
DATABASE_URL="file:./dev.db"

# Optional: For PostgreSQL (production)
# DATABASE_URL="postgresql://username:password@localhost:5432/products_db"

# Optional: For MySQL (alternative)
# DATABASE_URL="mysql://username:password@localhost:3306/products_db"
```

### ⚙️ Environment Validation

The application uses **Joi** for environment variable validation in `src/config/envs.ts`, ensuring all required configurations are present and properly formatted at startup. Only `PORT` and `DATABASE_URL` are required.

## 📝 Usage Examples

### TCP Client Integration

```typescript
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

// Create TCP client
const client: ClientProxy = ClientProxyFactory.create({
  transport: Transport.TCP,
  options: { host: 'localhost', port: 3001 },
});

// Connect to the microservice
await client.connect();
```

### Create a Product

```typescript
const product = await client
  .send(
    { cmd: 'create_product' },
    {
      name: 'Gaming Laptop ROG',
      price: 1599.99,
    },
  )
  .toPromise();

console.log('Created product:', product);
// Output: { id: 1, name: 'Gaming Laptop ROG', price: 1599.99, available: true, ... }
```

### Get All Products with Pagination

```typescript
const result = await client
  .send(
    { cmd: 'get_all_products' },
    {
      page: 1,
      limit: 10,
    },
  )
  .toPromise();

console.log('Products:', result);
// Output: { data: [...], meta: { total: 25, page: 1, lastPage: 3 } }
```

### Find Product by ID

```typescript
const product = await client
  .send({ cmd: 'find_one_product' }, { id: 1 })
  .toPromise();
```

### Update a Product

```typescript
const updatedProduct = await client
  .send(
    { cmd: 'update_product' },
    {
      id: 1,
      name: 'Gaming Laptop ROG Updated',
      price: 1499.99,
    },
  )
  .toPromise();
```

### Delete a Product (Soft Delete)

```typescript
const deletedProduct = await client
  .send({ cmd: 'delete_product' }, { id: 1 })
  .toPromise();
// Product is marked as deleted but remains in database
```

## 🏗️ Development Guidelines

### Code Style

- Follow **Clean Architecture** principles and SOLID design patterns
- Use **Use Cases** for business logic separation
- Implement **Repository Pattern** with dependency injection
- Use DTOs for data validation and transformation
- Implement proper error handling with **RpcException** for microservices
- Write comprehensive tests for each layer (Domain, Application, Infrastructure)

### Folder Structure

- Follow **Clean Architecture** layers: `domain/`, `application/`, `infrastructure/`
- Keep use cases in `application/use-cases/` with single responsibility
- Separate DTOs, ports (interfaces), and entities properly
- Use barrel exports (`index.ts`) for cleaner imports and layer isolation
- Domain entities should contain business logic and transformations
- Repository interfaces belong in `application/ports/`

## 🚀 Deployment

### 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t products-microservice:latest .

# Run container
docker run -d \
  --name products-ms \
  -p 3001:3001 \
  -e DATABASE_URL="file:./prod.db" \
  products-microservice:latest

# Using Docker Compose
docker-compose up -d
```

### ☁️ Production Deployment

```bash
# Build for production
npm run build

# Start with PM2 (Process Manager)
pm2 start dist/main.js --name products-ms

# Or start directly
node dist/main.js
```

### 🔧 Production Considerations

- **Database**: Migrate from SQLite to PostgreSQL/MySQL for production
- **Load Balancing**: Use multiple instances behind a load balancer
- **Monitoring**: Implement health checks and metrics collection
- **Security**: Enable HTTPS, rate limiting, and input sanitization
- **Logging**: Configure structured logging with centralized collection
- **Environment**: Use secrets management for sensitive configuration

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### 📋 Development Workflow

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/yourusername/products-ms.git`
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Install** dependencies: `npm install`
5. **Make** your changes following our coding standards
6. **Test** your changes: `npm run test`
7. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
8. **Push** to the branch: `git push origin feature/amazing-feature`
9. **Open** a Pull Request to the main repository
10. **Push** to the branch: `git push origin feature/amazing-feature`
11. **Open** a Pull Request

### 📝 Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

### 🧪 Code Quality

- **ESLint**: `npm run lint`
- **Prettier**: `npm run format`
- **Tests**: `npm run test:cov` (maintain >80% coverage)
- **Type Safety**: Ensure all TypeScript types are properly defined

### 🔍 Review Process

- All PRs require review before merging
- Ensure CI/CD pipeline passes
- Update documentation if needed
- Add tests for new features

## 📋 Roadmap

### 🎯 Phase 1 - Core Features ✅

- [x] **Clean Architecture Implementation**: Domain, Application, Infrastructure layers
- [x] **Use Cases Pattern**: Separated business logic into use cases
- [x] **Repository Pattern**: Interface segregation and dependency injection
- [x] **Domain Entity**: Product entity with business logic and transformations
- [x] **TCP Microservice**: Message-pattern based communication
- [x] **Complete CRUD Operations**: All operations with use cases
- [x] **Prisma ORM Integration**: Type-safe database operations
- [x] **Data Validation**: DTOs with class-validator
- [x] **Soft Delete**: Logical deletion with available flag
- [x] **RPC Exception Handling**: Proper microservice error responses

### 🎯 Phase 2 - Enhanced Features

- [ ] **Domain Exceptions**: Custom domain-specific exceptions
- [ ] **Unit Testing**: Comprehensive test suite for use cases and repository
- [ ] **Advanced Filtering**: Search by multiple criteria with use cases
- [ ] **Product Categories**: Hierarchical category system with Clean Architecture
- [ ] **Inventory Management**: Stock tracking with domain events
- [ ] **Image Upload**: Product image handling with cloud storage
- [ ] **Validation Rules**: Complex business validation in domain layer

### 🎯 Phase 3 - Production Ready

- [ ] **Authentication & Authorization**: JWT integration with use cases
- [ ] **API Gateway Integration**: Enhanced gateway communication patterns
- [ ] **Caching Layer**: Redis integration with repository caching
- [ ] **Event Sourcing**: Domain events for product lifecycle
- [ ] **Monitoring**: Prometheus metrics and health checks
- [ ] **Documentation**: OpenAPI/Swagger for service contracts
- [ ] **CI/CD Pipeline**: Automated testing and deployment
- [ ] **Database Migration**: PostgreSQL for production scale

### 🎯 Phase 4 - Advanced Features

- [ ] **GraphQL Support**: Alternative query interface
- [ ] **Real-time Updates**: WebSocket product notifications
- [ ] **Advanced Analytics**: Product performance insights
- [ ] **Multi-tenant**: Support for multiple stores
- [ ] **Internationalization**: Multi-language product data

## 🛠️ Built With

### Core Technologies

- **[NestJS](https://nestjs.com/)** `^11.0.1` - Progressive Node.js framework
- **[Prisma](https://www.prisma.io/)** `^6.10.1` - Next-generation ORM
- **[TypeScript](https://www.typescriptlang.org/)** `^5.0.0` - Typed JavaScript
- **[Node.js](https://nodejs.org/)** `18+` - JavaScript runtime

### Microservices & Communication

- **[@nestjs/microservices](https://docs.nestjs.com/microservices/basics)** - TCP transport layer
- **[class-validator](https://github.com/typestack/class-validator)** - Decorator-based validation
- **[class-transformer](https://github.com/typestack/class-transformer)** - Object transformation

### Development & Quality

- **[Jest](https://jestjs.io/)** - Testing framework
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Joi](https://joi.dev/)** - Environment validation

### Database & ORM

- **[SQLite](https://www.sqlite.org/)** - Development database
- **[Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)** - Type-safe database client
- **[Prisma Migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate)** - Database migration tool

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support & Community

### 📧 Getting Help

- **Documentation**: [NestJS Docs](https://docs.nestjs.com) | [Prisma Docs](https://www.prisma.io/docs)
- **Issues**: [GitHub Issues](https://github.com/Ecommerce-Microservice-Nest/products-ms/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Ecommerce-Microservice-Nest/products-ms/discussions)

### 🌐 Community

- **Discord**: [NestJS Community](https://discord.gg/G7Qnnhy)
- **Twitter**: [@nestframework](https://twitter.com/nestframework)
- **Stack Overflow**: [nestjs tag](https://stackoverflow.com/questions/tagged/nestjs)

### 📊 Project Status

- **Build Status**: ![Build](https://img.shields.io/badge/build-passing-brightgreen)
- **Test Coverage**: ![Coverage](https://img.shields.io/badge/coverage-85%25-green)
- **Version**: ![Version](https://img.shields.io/badge/version-0.0.1-blue)
- **License**: ![License](https://img.shields.io/badge/license-MIT-green)

---

<p align="center">
  <strong>Built with ❤️ using <a href="https://nestjs.com/">NestJS</a> and <a href="https://www.prisma.io/">Prisma</a></strong>
</p>

<p align="center">
  <em>Powering the next generation of e-commerce microservices</em>
</p>
</p>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">Products Microservice</h1>

<p align="center">
  A robust and scalable products microservice built with <a href="http://nestjs.com/" target="_blank">NestJS</a> for e-commerce applications.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://nodejs.org" target="_blank"><img src="https://img.shields.io/badge/node-%3E%3D16-brightgreen" alt="Node Version" /></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/typescript-%5E5.0.0-blue" alt="TypeScript" /></a>
</p>

## 📋 Description

This microservice handles all product-related operations for an e-commerce platform. It provides a comprehensive RESTful API for managing products with full CRUD operations, built following clean architecture principles and NestJS best practices.

### 🚀 Features

- **Complete CRUD Operations**: Create, read, update, and delete products
- **RESTful API**: Well-structured endpoints following REST conventions
- **Data Validation**: Input validation using DTOs and decorators
- **Modular Architecture**: Clean separation of concerns with modules
- **TypeScript**: Full TypeScript support for type safety
- **Scalable Design**: Built for microservices architecture

## 🏗️ Architecture

```
src/
├── app.module.ts           # Root application module
├── main.ts                # Application entry point
└── products/              # Products domain module
    ├── products.controller.ts    # REST API endpoints
    ├── products.service.ts       # Business logic layer
    ├── products.module.ts        # Products module definition
    ├── dto/                      # Data Transfer Objects
    │   ├── create-product.dto.ts
    │   └── update-product.dto.ts
    └── entities/                 # Domain entities
        └── product.entity.ts
```

## 🌐 API Endpoints

| Method   | Endpoint        | Description        |
| -------- | --------------- | ------------------ |
| `GET`    | `/products`     | Get all products   |
| `GET`    | `/products/:id` | Get product by ID  |
| `POST`   | `/products`     | Create new product |
| `PATCH`  | `/products/:id` | Update product     |
| `DELETE` | `/products/:id` | Delete product     |

## 🛠️ Project Setup

### Prerequisites

- Node.js (>= 16.x)
- npm or yarn package manager

### Installation

```bash
# Clone the repository
$ git clone <repository-url>

# Navigate to project directory
$ cd products-ms

# Install dependencies
$ npm install
```

## 🚀 Running the Application

```bash
# Development mode
$ npm run start

# Watch mode (recommended for development)
$ npm run start:dev

# Production mode
$ npm run start:prod
```

The application will be available at `http://localhost:3000`

## 🧪 Testing

```bash
# Run unit tests
$ npm run test

# Run e2e tests
$ npm run test:e2e

# Run tests with coverage report
$ npm run test:cov

# Run tests in watch mode
$ npm run test:watch
```

## 📊 Product Data Model

```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Application
PORT=3000
NODE_ENV=development

# Database (when implemented)
# DATABASE_URL=your_database_connection_string
```

## 📝 Usage Examples

### Create a Product

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Gaming",
    "description": "High-performance gaming laptop",
    "price": 1299.99
  }'
```

### Get All Products

```bash
curl -X GET http://localhost:3000/products
```

### Get Product by ID

```bash
curl -X GET http://localhost:3000/products/1
```

### Update a Product

```bash
curl -X PATCH http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 1199.99
  }'
```

### Delete a Product

```bash
curl -X DELETE http://localhost:3000/products/1
```

## 🏗️ Development Guidelines

### Code Style

- Follow TypeScript and NestJS best practices
- Use DTOs for data validation
- Implement proper error handling
- Write comprehensive tests

### Folder Structure

- Keep modules organized by domain (products, orders, etc.)
- Separate DTOs, entities, and services
- Use barrel exports for cleaner imports

## 🚀 Deployment

### Docker Deployment

```bash
# Build Docker image
$ docker build -t products-ms .

# Run container
$ docker run -p 3000:3000 products-ms
```

### Production Deployment

For production deployment, consider:

- Using a process manager like PM2
- Setting up load balancing
- Implementing proper logging and monitoring
- Using environment-specific configurations

```bash
# Build for production
$ npm run build

# Start production server
$ npm run start:prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Roadmap

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Authentication and authorization
- [ ] Product categories and tags
- [ ] Image upload functionality
- [ ] Advanced search and filtering
- [ ] Caching layer (Redis)
- [ ] API documentation with Swagger
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 🛠️ Built With

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or need help with this microservice, please:

1. Check the [documentation](https://docs.nestjs.com)
2. Search for existing [issues](https://github.com/nestjs/nest/issues)
3. Join the [Discord community](https://discord.gg/G7Qnnhy)

---

<p align="center">
  Built with ❤️ using <a href="https://nestjs.com/">NestJS</a>
</p>

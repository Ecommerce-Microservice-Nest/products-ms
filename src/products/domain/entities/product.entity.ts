interface PrismaProductData {
  id: number;
  name: string;
  price: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class Product {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly price: number,
    public readonly available: boolean = true,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
    public readonly deletedAt?: Date,
  ) {}

  // Factory: Prisma → Dominio
  static fromPrisma(prismaProduct: PrismaProductData): Product {
    return new Product(
      prismaProduct.id,
      prismaProduct.name,
      prismaProduct.price,
      prismaProduct.available,
      prismaProduct.createdAt,
      prismaProduct.updatedAt,
      prismaProduct.deletedAt || undefined, // ← Manejar null
    );
  }

  // Mapper: Dominio → Prisma
  toPrisma() {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      available: this.available,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  // Lógica de negocio
  markAsDeleted(): Product {
    return new Product(
      this.id,
      this.name,
      this.price,
      false,
      this.createdAt,
      new Date(),
      new Date(),
    );
  }
}

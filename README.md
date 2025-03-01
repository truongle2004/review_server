# 1. Why Do We Need `reflect-metadata` in `tsyringe`?

## **Introduction**
When using **tsyringe** (a dependency injection container for TypeScript), it is required to import `reflect-metadata` **at the very top** of your main entry file. Without this import, dependency injection will not work correctly.

```ts
import "reflect-metadata"; // Must be the first import!
```

## **Why is `reflect-metadata` Required?**
TypeScript does **not** natively store type information at runtime. The `reflect-metadata` package enables TypeScript to store and retrieve metadata, which is essential for **decorator-based dependency injection** in `tsyringe`.

### **How TypeScript Normally Works**
By default, TypeScript **erases** type information at runtime. Consider this example:

```ts
class ExampleService {}

class ExampleController {
  constructor(private service: ExampleService) {}
}
```

At runtime, JavaScript has no way of knowing that `ExampleController` depends on `ExampleService`. This is because TypeScript removes type information during compilation.

### **How `reflect-metadata` Helps**
When `reflect-metadata` is imported, TypeScript **stores metadata** about class dependencies, allowing `tsyringe` to resolve them.

## **Example Without `reflect-metadata`**
```ts
import { injectable, container } from "tsyringe";

@injectable()
class Service {}

const instance = container.resolve(Service);
console.log(instance);
```
💥 **Error: "Cannot inject because no design-time metadata is available"**

This happens because TypeScript does not store constructor parameter types by default.

## **Example With `reflect-metadata`**
```ts
import "reflect-metadata"; // Required at the top!
import { injectable, container } from "tsyringe";

@injectable()
class Service {}

const instance = container.resolve(Service);
console.log(instance);
```
✅ **Works Fine!** The container successfully resolves `Service`.

## **Why Must It Be at the First Line?**
- `reflect-metadata` **modifies global behavior** and enables decorators to store metadata.
- It must be **imported before any decorators are used** in your project.
- TypeScript needs it to store metadata **before classes are instantiated**.

## **Conclusion**
When using `tsyringe`, always add:

```ts
import "reflect-metadata";
```

**at the very top** of your entry file to ensure decorators work correctly. 🚀

# 2. Remember to create entity from typeorm in entities folder

- By the default typeOrm will create a table for the entity in the database by scanning all entities in the entities folder

- The entity file should be end with `.entity.ts` (for example `todo.entity.ts`)

# 3. The .env will be look like this

```bash
PORT=3000
DB_HOST=localhost
DB_NAME=reviews
DB_USER=root
DB_PASS=root
DB_PORT=3306
DB_DIALECT=mysql
DB_LOGGING=true
DB_SYNCHRONIZE=true

```

# 4. All the func in controller have to use arrow function for make sure that the `this` keyword is bound to the correct object instance.
```ts
public getProducts = async (req: Request, res: Response) => {
    return await this.getProductService.execute(req, res)
}
```
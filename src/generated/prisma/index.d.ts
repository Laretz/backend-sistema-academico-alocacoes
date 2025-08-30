
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Disciplina
 * 
 */
export type Disciplina = $Result.DefaultSelection<Prisma.$DisciplinaPayload>
/**
 * Model Turma
 * 
 */
export type Turma = $Result.DefaultSelection<Prisma.$TurmaPayload>
/**
 * Model Sala
 * 
 */
export type Sala = $Result.DefaultSelection<Prisma.$SalaPayload>
/**
 * Model Horario
 * 
 */
export type Horario = $Result.DefaultSelection<Prisma.$HorarioPayload>
/**
 * Model Alocacao
 * 
 */
export type Alocacao = $Result.DefaultSelection<Prisma.$AlocacaoPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.disciplina`: Exposes CRUD operations for the **Disciplina** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Disciplinas
    * const disciplinas = await prisma.disciplina.findMany()
    * ```
    */
  get disciplina(): Prisma.DisciplinaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.turma`: Exposes CRUD operations for the **Turma** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Turmas
    * const turmas = await prisma.turma.findMany()
    * ```
    */
  get turma(): Prisma.TurmaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sala`: Exposes CRUD operations for the **Sala** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Salas
    * const salas = await prisma.sala.findMany()
    * ```
    */
  get sala(): Prisma.SalaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.horario`: Exposes CRUD operations for the **Horario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Horarios
    * const horarios = await prisma.horario.findMany()
    * ```
    */
  get horario(): Prisma.HorarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.alocacao`: Exposes CRUD operations for the **Alocacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alocacaos
    * const alocacaos = await prisma.alocacao.findMany()
    * ```
    */
  get alocacao(): Prisma.AlocacaoDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.14.0
   * Query Engine version: 717184b7b35ea05dfa71a3236b7af656013e1e49
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Disciplina: 'Disciplina',
    Turma: 'Turma',
    Sala: 'Sala',
    Horario: 'Horario',
    Alocacao: 'Alocacao'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "disciplina" | "turma" | "sala" | "horario" | "alocacao"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Disciplina: {
        payload: Prisma.$DisciplinaPayload<ExtArgs>
        fields: Prisma.DisciplinaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DisciplinaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DisciplinaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>
          }
          findFirst: {
            args: Prisma.DisciplinaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DisciplinaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>
          }
          findMany: {
            args: Prisma.DisciplinaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>[]
          }
          create: {
            args: Prisma.DisciplinaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>
          }
          createMany: {
            args: Prisma.DisciplinaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DisciplinaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>[]
          }
          delete: {
            args: Prisma.DisciplinaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>
          }
          update: {
            args: Prisma.DisciplinaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>
          }
          deleteMany: {
            args: Prisma.DisciplinaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DisciplinaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DisciplinaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>[]
          }
          upsert: {
            args: Prisma.DisciplinaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DisciplinaPayload>
          }
          aggregate: {
            args: Prisma.DisciplinaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDisciplina>
          }
          groupBy: {
            args: Prisma.DisciplinaGroupByArgs<ExtArgs>
            result: $Utils.Optional<DisciplinaGroupByOutputType>[]
          }
          count: {
            args: Prisma.DisciplinaCountArgs<ExtArgs>
            result: $Utils.Optional<DisciplinaCountAggregateOutputType> | number
          }
        }
      }
      Turma: {
        payload: Prisma.$TurmaPayload<ExtArgs>
        fields: Prisma.TurmaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TurmaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TurmaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          findFirst: {
            args: Prisma.TurmaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TurmaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          findMany: {
            args: Prisma.TurmaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>[]
          }
          create: {
            args: Prisma.TurmaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          createMany: {
            args: Prisma.TurmaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TurmaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>[]
          }
          delete: {
            args: Prisma.TurmaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          update: {
            args: Prisma.TurmaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          deleteMany: {
            args: Prisma.TurmaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TurmaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TurmaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>[]
          }
          upsert: {
            args: Prisma.TurmaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TurmaPayload>
          }
          aggregate: {
            args: Prisma.TurmaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTurma>
          }
          groupBy: {
            args: Prisma.TurmaGroupByArgs<ExtArgs>
            result: $Utils.Optional<TurmaGroupByOutputType>[]
          }
          count: {
            args: Prisma.TurmaCountArgs<ExtArgs>
            result: $Utils.Optional<TurmaCountAggregateOutputType> | number
          }
        }
      }
      Sala: {
        payload: Prisma.$SalaPayload<ExtArgs>
        fields: Prisma.SalaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SalaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SalaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaPayload>
          }
          findFirst: {
            args: Prisma.SalaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SalaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaPayload>
          }
          findMany: {
            args: Prisma.SalaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaPayload>[]
          }
          create: {
            args: Prisma.SalaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaPayload>
          }
          createMany: {
            args: Prisma.SalaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SalaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaPayload>[]
          }
          delete: {
            args: Prisma.SalaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaPayload>
          }
          update: {
            args: Prisma.SalaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaPayload>
          }
          deleteMany: {
            args: Prisma.SalaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SalaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SalaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaPayload>[]
          }
          upsert: {
            args: Prisma.SalaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalaPayload>
          }
          aggregate: {
            args: Prisma.SalaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSala>
          }
          groupBy: {
            args: Prisma.SalaGroupByArgs<ExtArgs>
            result: $Utils.Optional<SalaGroupByOutputType>[]
          }
          count: {
            args: Prisma.SalaCountArgs<ExtArgs>
            result: $Utils.Optional<SalaCountAggregateOutputType> | number
          }
        }
      }
      Horario: {
        payload: Prisma.$HorarioPayload<ExtArgs>
        fields: Prisma.HorarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HorarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HorarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioPayload>
          }
          findFirst: {
            args: Prisma.HorarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HorarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioPayload>
          }
          findMany: {
            args: Prisma.HorarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioPayload>[]
          }
          create: {
            args: Prisma.HorarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioPayload>
          }
          createMany: {
            args: Prisma.HorarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HorarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioPayload>[]
          }
          delete: {
            args: Prisma.HorarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioPayload>
          }
          update: {
            args: Prisma.HorarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioPayload>
          }
          deleteMany: {
            args: Prisma.HorarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HorarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HorarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioPayload>[]
          }
          upsert: {
            args: Prisma.HorarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HorarioPayload>
          }
          aggregate: {
            args: Prisma.HorarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHorario>
          }
          groupBy: {
            args: Prisma.HorarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<HorarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.HorarioCountArgs<ExtArgs>
            result: $Utils.Optional<HorarioCountAggregateOutputType> | number
          }
        }
      }
      Alocacao: {
        payload: Prisma.$AlocacaoPayload<ExtArgs>
        fields: Prisma.AlocacaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlocacaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlocacaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlocacaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlocacaoPayload>
          }
          findFirst: {
            args: Prisma.AlocacaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlocacaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlocacaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlocacaoPayload>
          }
          findMany: {
            args: Prisma.AlocacaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlocacaoPayload>[]
          }
          create: {
            args: Prisma.AlocacaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlocacaoPayload>
          }
          createMany: {
            args: Prisma.AlocacaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlocacaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlocacaoPayload>[]
          }
          delete: {
            args: Prisma.AlocacaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlocacaoPayload>
          }
          update: {
            args: Prisma.AlocacaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlocacaoPayload>
          }
          deleteMany: {
            args: Prisma.AlocacaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlocacaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AlocacaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlocacaoPayload>[]
          }
          upsert: {
            args: Prisma.AlocacaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlocacaoPayload>
          }
          aggregate: {
            args: Prisma.AlocacaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlocacao>
          }
          groupBy: {
            args: Prisma.AlocacaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlocacaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlocacaoCountArgs<ExtArgs>
            result: $Utils.Optional<AlocacaoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    disciplina?: DisciplinaOmit
    turma?: TurmaOmit
    sala?: SalaOmit
    horario?: HorarioOmit
    alocacao?: AlocacaoOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    alocacoes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alocacoes?: boolean | UserCountOutputTypeCountAlocacoesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAlocacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlocacaoWhereInput
  }


  /**
   * Count Type DisciplinaCountOutputType
   */

  export type DisciplinaCountOutputType = {
    alocacoes: number
  }

  export type DisciplinaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alocacoes?: boolean | DisciplinaCountOutputTypeCountAlocacoesArgs
  }

  // Custom InputTypes
  /**
   * DisciplinaCountOutputType without action
   */
  export type DisciplinaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DisciplinaCountOutputType
     */
    select?: DisciplinaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DisciplinaCountOutputType without action
   */
  export type DisciplinaCountOutputTypeCountAlocacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlocacaoWhereInput
  }


  /**
   * Count Type TurmaCountOutputType
   */

  export type TurmaCountOutputType = {
    alocacoes: number
  }

  export type TurmaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alocacoes?: boolean | TurmaCountOutputTypeCountAlocacoesArgs
  }

  // Custom InputTypes
  /**
   * TurmaCountOutputType without action
   */
  export type TurmaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TurmaCountOutputType
     */
    select?: TurmaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TurmaCountOutputType without action
   */
  export type TurmaCountOutputTypeCountAlocacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlocacaoWhereInput
  }


  /**
   * Count Type SalaCountOutputType
   */

  export type SalaCountOutputType = {
    alocacoes: number
  }

  export type SalaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alocacoes?: boolean | SalaCountOutputTypeCountAlocacoesArgs
  }

  // Custom InputTypes
  /**
   * SalaCountOutputType without action
   */
  export type SalaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalaCountOutputType
     */
    select?: SalaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SalaCountOutputType without action
   */
  export type SalaCountOutputTypeCountAlocacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlocacaoWhereInput
  }


  /**
   * Count Type HorarioCountOutputType
   */

  export type HorarioCountOutputType = {
    alocacoes: number
  }

  export type HorarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alocacoes?: boolean | HorarioCountOutputTypeCountAlocacoesArgs
  }

  // Custom InputTypes
  /**
   * HorarioCountOutputType without action
   */
  export type HorarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HorarioCountOutputType
     */
    select?: HorarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HorarioCountOutputType without action
   */
  export type HorarioCountOutputTypeCountAlocacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlocacaoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    cargaHorariaMax: number | null
  }

  export type UserSumAggregateOutputType = {
    cargaHorariaMax: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    nome: string | null
    email: string | null
    senha: string | null
    role: string | null
    especializacao: string | null
    cargaHorariaMax: number | null
    preferencia: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    email: string | null
    senha: string | null
    role: string | null
    especializacao: string | null
    cargaHorariaMax: number | null
    preferencia: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    nome: number
    email: number
    senha: number
    role: number
    especializacao: number
    cargaHorariaMax: number
    preferencia: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    cargaHorariaMax?: true
  }

  export type UserSumAggregateInputType = {
    cargaHorariaMax?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    role?: true
    especializacao?: true
    cargaHorariaMax?: true
    preferencia?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    role?: true
    especializacao?: true
    cargaHorariaMax?: true
    preferencia?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    nome?: true
    email?: true
    senha?: true
    role?: true
    especializacao?: true
    cargaHorariaMax?: true
    preferencia?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    nome: string
    email: string
    senha: string
    role: string
    especializacao: string
    cargaHorariaMax: number
    preferencia: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    especializacao?: boolean
    cargaHorariaMax?: boolean
    preferencia?: boolean
    alocacoes?: boolean | User$alocacoesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    especializacao?: boolean
    cargaHorariaMax?: boolean
    preferencia?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    especializacao?: boolean
    cargaHorariaMax?: boolean
    preferencia?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    role?: boolean
    especializacao?: boolean
    cargaHorariaMax?: boolean
    preferencia?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "email" | "senha" | "role" | "especializacao" | "cargaHorariaMax" | "preferencia", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alocacoes?: boolean | User$alocacoesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      alocacoes: Prisma.$AlocacaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      email: string
      senha: string
      role: string
      especializacao: string
      cargaHorariaMax: number
      preferencia: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alocacoes<T extends User$alocacoesArgs<ExtArgs> = {}>(args?: Subset<T, User$alocacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlocacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly nome: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly senha: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly especializacao: FieldRef<"User", 'String'>
    readonly cargaHorariaMax: FieldRef<"User", 'Int'>
    readonly preferencia: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.alocacoes
   */
  export type User$alocacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoInclude<ExtArgs> | null
    where?: AlocacaoWhereInput
    orderBy?: AlocacaoOrderByWithRelationInput | AlocacaoOrderByWithRelationInput[]
    cursor?: AlocacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlocacaoScalarFieldEnum | AlocacaoScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Disciplina
   */

  export type AggregateDisciplina = {
    _count: DisciplinaCountAggregateOutputType | null
    _avg: DisciplinaAvgAggregateOutputType | null
    _sum: DisciplinaSumAggregateOutputType | null
    _min: DisciplinaMinAggregateOutputType | null
    _max: DisciplinaMaxAggregateOutputType | null
  }

  export type DisciplinaAvgAggregateOutputType = {
    cargaHorariaTotal: number | null
  }

  export type DisciplinaSumAggregateOutputType = {
    cargaHorariaTotal: number | null
  }

  export type DisciplinaMinAggregateOutputType = {
    id: string | null
    nome: string | null
    cargaHorariaTotal: number | null
  }

  export type DisciplinaMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    cargaHorariaTotal: number | null
  }

  export type DisciplinaCountAggregateOutputType = {
    id: number
    nome: number
    cargaHorariaTotal: number
    _all: number
  }


  export type DisciplinaAvgAggregateInputType = {
    cargaHorariaTotal?: true
  }

  export type DisciplinaSumAggregateInputType = {
    cargaHorariaTotal?: true
  }

  export type DisciplinaMinAggregateInputType = {
    id?: true
    nome?: true
    cargaHorariaTotal?: true
  }

  export type DisciplinaMaxAggregateInputType = {
    id?: true
    nome?: true
    cargaHorariaTotal?: true
  }

  export type DisciplinaCountAggregateInputType = {
    id?: true
    nome?: true
    cargaHorariaTotal?: true
    _all?: true
  }

  export type DisciplinaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Disciplina to aggregate.
     */
    where?: DisciplinaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disciplinas to fetch.
     */
    orderBy?: DisciplinaOrderByWithRelationInput | DisciplinaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DisciplinaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disciplinas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disciplinas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Disciplinas
    **/
    _count?: true | DisciplinaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DisciplinaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DisciplinaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DisciplinaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DisciplinaMaxAggregateInputType
  }

  export type GetDisciplinaAggregateType<T extends DisciplinaAggregateArgs> = {
        [P in keyof T & keyof AggregateDisciplina]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDisciplina[P]>
      : GetScalarType<T[P], AggregateDisciplina[P]>
  }




  export type DisciplinaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DisciplinaWhereInput
    orderBy?: DisciplinaOrderByWithAggregationInput | DisciplinaOrderByWithAggregationInput[]
    by: DisciplinaScalarFieldEnum[] | DisciplinaScalarFieldEnum
    having?: DisciplinaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DisciplinaCountAggregateInputType | true
    _avg?: DisciplinaAvgAggregateInputType
    _sum?: DisciplinaSumAggregateInputType
    _min?: DisciplinaMinAggregateInputType
    _max?: DisciplinaMaxAggregateInputType
  }

  export type DisciplinaGroupByOutputType = {
    id: string
    nome: string
    cargaHorariaTotal: number
    _count: DisciplinaCountAggregateOutputType | null
    _avg: DisciplinaAvgAggregateOutputType | null
    _sum: DisciplinaSumAggregateOutputType | null
    _min: DisciplinaMinAggregateOutputType | null
    _max: DisciplinaMaxAggregateOutputType | null
  }

  type GetDisciplinaGroupByPayload<T extends DisciplinaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DisciplinaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DisciplinaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DisciplinaGroupByOutputType[P]>
            : GetScalarType<T[P], DisciplinaGroupByOutputType[P]>
        }
      >
    >


  export type DisciplinaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cargaHorariaTotal?: boolean
    alocacoes?: boolean | Disciplina$alocacoesArgs<ExtArgs>
    _count?: boolean | DisciplinaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["disciplina"]>

  export type DisciplinaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cargaHorariaTotal?: boolean
  }, ExtArgs["result"]["disciplina"]>

  export type DisciplinaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    cargaHorariaTotal?: boolean
  }, ExtArgs["result"]["disciplina"]>

  export type DisciplinaSelectScalar = {
    id?: boolean
    nome?: boolean
    cargaHorariaTotal?: boolean
  }

  export type DisciplinaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "cargaHorariaTotal", ExtArgs["result"]["disciplina"]>
  export type DisciplinaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alocacoes?: boolean | Disciplina$alocacoesArgs<ExtArgs>
    _count?: boolean | DisciplinaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DisciplinaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DisciplinaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DisciplinaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Disciplina"
    objects: {
      alocacoes: Prisma.$AlocacaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      cargaHorariaTotal: number
    }, ExtArgs["result"]["disciplina"]>
    composites: {}
  }

  type DisciplinaGetPayload<S extends boolean | null | undefined | DisciplinaDefaultArgs> = $Result.GetResult<Prisma.$DisciplinaPayload, S>

  type DisciplinaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DisciplinaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DisciplinaCountAggregateInputType | true
    }

  export interface DisciplinaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Disciplina'], meta: { name: 'Disciplina' } }
    /**
     * Find zero or one Disciplina that matches the filter.
     * @param {DisciplinaFindUniqueArgs} args - Arguments to find a Disciplina
     * @example
     * // Get one Disciplina
     * const disciplina = await prisma.disciplina.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DisciplinaFindUniqueArgs>(args: SelectSubset<T, DisciplinaFindUniqueArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Disciplina that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DisciplinaFindUniqueOrThrowArgs} args - Arguments to find a Disciplina
     * @example
     * // Get one Disciplina
     * const disciplina = await prisma.disciplina.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DisciplinaFindUniqueOrThrowArgs>(args: SelectSubset<T, DisciplinaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Disciplina that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaFindFirstArgs} args - Arguments to find a Disciplina
     * @example
     * // Get one Disciplina
     * const disciplina = await prisma.disciplina.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DisciplinaFindFirstArgs>(args?: SelectSubset<T, DisciplinaFindFirstArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Disciplina that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaFindFirstOrThrowArgs} args - Arguments to find a Disciplina
     * @example
     * // Get one Disciplina
     * const disciplina = await prisma.disciplina.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DisciplinaFindFirstOrThrowArgs>(args?: SelectSubset<T, DisciplinaFindFirstOrThrowArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Disciplinas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Disciplinas
     * const disciplinas = await prisma.disciplina.findMany()
     * 
     * // Get first 10 Disciplinas
     * const disciplinas = await prisma.disciplina.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const disciplinaWithIdOnly = await prisma.disciplina.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DisciplinaFindManyArgs>(args?: SelectSubset<T, DisciplinaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Disciplina.
     * @param {DisciplinaCreateArgs} args - Arguments to create a Disciplina.
     * @example
     * // Create one Disciplina
     * const Disciplina = await prisma.disciplina.create({
     *   data: {
     *     // ... data to create a Disciplina
     *   }
     * })
     * 
     */
    create<T extends DisciplinaCreateArgs>(args: SelectSubset<T, DisciplinaCreateArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Disciplinas.
     * @param {DisciplinaCreateManyArgs} args - Arguments to create many Disciplinas.
     * @example
     * // Create many Disciplinas
     * const disciplina = await prisma.disciplina.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DisciplinaCreateManyArgs>(args?: SelectSubset<T, DisciplinaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Disciplinas and returns the data saved in the database.
     * @param {DisciplinaCreateManyAndReturnArgs} args - Arguments to create many Disciplinas.
     * @example
     * // Create many Disciplinas
     * const disciplina = await prisma.disciplina.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Disciplinas and only return the `id`
     * const disciplinaWithIdOnly = await prisma.disciplina.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DisciplinaCreateManyAndReturnArgs>(args?: SelectSubset<T, DisciplinaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Disciplina.
     * @param {DisciplinaDeleteArgs} args - Arguments to delete one Disciplina.
     * @example
     * // Delete one Disciplina
     * const Disciplina = await prisma.disciplina.delete({
     *   where: {
     *     // ... filter to delete one Disciplina
     *   }
     * })
     * 
     */
    delete<T extends DisciplinaDeleteArgs>(args: SelectSubset<T, DisciplinaDeleteArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Disciplina.
     * @param {DisciplinaUpdateArgs} args - Arguments to update one Disciplina.
     * @example
     * // Update one Disciplina
     * const disciplina = await prisma.disciplina.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DisciplinaUpdateArgs>(args: SelectSubset<T, DisciplinaUpdateArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Disciplinas.
     * @param {DisciplinaDeleteManyArgs} args - Arguments to filter Disciplinas to delete.
     * @example
     * // Delete a few Disciplinas
     * const { count } = await prisma.disciplina.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DisciplinaDeleteManyArgs>(args?: SelectSubset<T, DisciplinaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Disciplinas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Disciplinas
     * const disciplina = await prisma.disciplina.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DisciplinaUpdateManyArgs>(args: SelectSubset<T, DisciplinaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Disciplinas and returns the data updated in the database.
     * @param {DisciplinaUpdateManyAndReturnArgs} args - Arguments to update many Disciplinas.
     * @example
     * // Update many Disciplinas
     * const disciplina = await prisma.disciplina.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Disciplinas and only return the `id`
     * const disciplinaWithIdOnly = await prisma.disciplina.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DisciplinaUpdateManyAndReturnArgs>(args: SelectSubset<T, DisciplinaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Disciplina.
     * @param {DisciplinaUpsertArgs} args - Arguments to update or create a Disciplina.
     * @example
     * // Update or create a Disciplina
     * const disciplina = await prisma.disciplina.upsert({
     *   create: {
     *     // ... data to create a Disciplina
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Disciplina we want to update
     *   }
     * })
     */
    upsert<T extends DisciplinaUpsertArgs>(args: SelectSubset<T, DisciplinaUpsertArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Disciplinas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaCountArgs} args - Arguments to filter Disciplinas to count.
     * @example
     * // Count the number of Disciplinas
     * const count = await prisma.disciplina.count({
     *   where: {
     *     // ... the filter for the Disciplinas we want to count
     *   }
     * })
    **/
    count<T extends DisciplinaCountArgs>(
      args?: Subset<T, DisciplinaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DisciplinaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Disciplina.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DisciplinaAggregateArgs>(args: Subset<T, DisciplinaAggregateArgs>): Prisma.PrismaPromise<GetDisciplinaAggregateType<T>>

    /**
     * Group by Disciplina.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DisciplinaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DisciplinaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DisciplinaGroupByArgs['orderBy'] }
        : { orderBy?: DisciplinaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DisciplinaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDisciplinaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Disciplina model
   */
  readonly fields: DisciplinaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Disciplina.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DisciplinaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alocacoes<T extends Disciplina$alocacoesArgs<ExtArgs> = {}>(args?: Subset<T, Disciplina$alocacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlocacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Disciplina model
   */
  interface DisciplinaFieldRefs {
    readonly id: FieldRef<"Disciplina", 'String'>
    readonly nome: FieldRef<"Disciplina", 'String'>
    readonly cargaHorariaTotal: FieldRef<"Disciplina", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Disciplina findUnique
   */
  export type DisciplinaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disciplina
     */
    omit?: DisciplinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * Filter, which Disciplina to fetch.
     */
    where: DisciplinaWhereUniqueInput
  }

  /**
   * Disciplina findUniqueOrThrow
   */
  export type DisciplinaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disciplina
     */
    omit?: DisciplinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * Filter, which Disciplina to fetch.
     */
    where: DisciplinaWhereUniqueInput
  }

  /**
   * Disciplina findFirst
   */
  export type DisciplinaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disciplina
     */
    omit?: DisciplinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * Filter, which Disciplina to fetch.
     */
    where?: DisciplinaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disciplinas to fetch.
     */
    orderBy?: DisciplinaOrderByWithRelationInput | DisciplinaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Disciplinas.
     */
    cursor?: DisciplinaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disciplinas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disciplinas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Disciplinas.
     */
    distinct?: DisciplinaScalarFieldEnum | DisciplinaScalarFieldEnum[]
  }

  /**
   * Disciplina findFirstOrThrow
   */
  export type DisciplinaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disciplina
     */
    omit?: DisciplinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * Filter, which Disciplina to fetch.
     */
    where?: DisciplinaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disciplinas to fetch.
     */
    orderBy?: DisciplinaOrderByWithRelationInput | DisciplinaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Disciplinas.
     */
    cursor?: DisciplinaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disciplinas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disciplinas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Disciplinas.
     */
    distinct?: DisciplinaScalarFieldEnum | DisciplinaScalarFieldEnum[]
  }

  /**
   * Disciplina findMany
   */
  export type DisciplinaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disciplina
     */
    omit?: DisciplinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * Filter, which Disciplinas to fetch.
     */
    where?: DisciplinaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Disciplinas to fetch.
     */
    orderBy?: DisciplinaOrderByWithRelationInput | DisciplinaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Disciplinas.
     */
    cursor?: DisciplinaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Disciplinas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Disciplinas.
     */
    skip?: number
    distinct?: DisciplinaScalarFieldEnum | DisciplinaScalarFieldEnum[]
  }

  /**
   * Disciplina create
   */
  export type DisciplinaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disciplina
     */
    omit?: DisciplinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * The data needed to create a Disciplina.
     */
    data: XOR<DisciplinaCreateInput, DisciplinaUncheckedCreateInput>
  }

  /**
   * Disciplina createMany
   */
  export type DisciplinaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Disciplinas.
     */
    data: DisciplinaCreateManyInput | DisciplinaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Disciplina createManyAndReturn
   */
  export type DisciplinaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Disciplina
     */
    omit?: DisciplinaOmit<ExtArgs> | null
    /**
     * The data used to create many Disciplinas.
     */
    data: DisciplinaCreateManyInput | DisciplinaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Disciplina update
   */
  export type DisciplinaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disciplina
     */
    omit?: DisciplinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * The data needed to update a Disciplina.
     */
    data: XOR<DisciplinaUpdateInput, DisciplinaUncheckedUpdateInput>
    /**
     * Choose, which Disciplina to update.
     */
    where: DisciplinaWhereUniqueInput
  }

  /**
   * Disciplina updateMany
   */
  export type DisciplinaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Disciplinas.
     */
    data: XOR<DisciplinaUpdateManyMutationInput, DisciplinaUncheckedUpdateManyInput>
    /**
     * Filter which Disciplinas to update
     */
    where?: DisciplinaWhereInput
    /**
     * Limit how many Disciplinas to update.
     */
    limit?: number
  }

  /**
   * Disciplina updateManyAndReturn
   */
  export type DisciplinaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Disciplina
     */
    omit?: DisciplinaOmit<ExtArgs> | null
    /**
     * The data used to update Disciplinas.
     */
    data: XOR<DisciplinaUpdateManyMutationInput, DisciplinaUncheckedUpdateManyInput>
    /**
     * Filter which Disciplinas to update
     */
    where?: DisciplinaWhereInput
    /**
     * Limit how many Disciplinas to update.
     */
    limit?: number
  }

  /**
   * Disciplina upsert
   */
  export type DisciplinaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disciplina
     */
    omit?: DisciplinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * The filter to search for the Disciplina to update in case it exists.
     */
    where: DisciplinaWhereUniqueInput
    /**
     * In case the Disciplina found by the `where` argument doesn't exist, create a new Disciplina with this data.
     */
    create: XOR<DisciplinaCreateInput, DisciplinaUncheckedCreateInput>
    /**
     * In case the Disciplina was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DisciplinaUpdateInput, DisciplinaUncheckedUpdateInput>
  }

  /**
   * Disciplina delete
   */
  export type DisciplinaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disciplina
     */
    omit?: DisciplinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
    /**
     * Filter which Disciplina to delete.
     */
    where: DisciplinaWhereUniqueInput
  }

  /**
   * Disciplina deleteMany
   */
  export type DisciplinaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Disciplinas to delete
     */
    where?: DisciplinaWhereInput
    /**
     * Limit how many Disciplinas to delete.
     */
    limit?: number
  }

  /**
   * Disciplina.alocacoes
   */
  export type Disciplina$alocacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoInclude<ExtArgs> | null
    where?: AlocacaoWhereInput
    orderBy?: AlocacaoOrderByWithRelationInput | AlocacaoOrderByWithRelationInput[]
    cursor?: AlocacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlocacaoScalarFieldEnum | AlocacaoScalarFieldEnum[]
  }

  /**
   * Disciplina without action
   */
  export type DisciplinaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Disciplina
     */
    select?: DisciplinaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Disciplina
     */
    omit?: DisciplinaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DisciplinaInclude<ExtArgs> | null
  }


  /**
   * Model Turma
   */

  export type AggregateTurma = {
    _count: TurmaCountAggregateOutputType | null
    _avg: TurmaAvgAggregateOutputType | null
    _sum: TurmaSumAggregateOutputType | null
    _min: TurmaMinAggregateOutputType | null
    _max: TurmaMaxAggregateOutputType | null
  }

  export type TurmaAvgAggregateOutputType = {
    numAlunos: number | null
    periodo: number | null
  }

  export type TurmaSumAggregateOutputType = {
    numAlunos: number | null
    periodo: number | null
  }

  export type TurmaMinAggregateOutputType = {
    id: string | null
    nome: string | null
    numAlunos: number | null
    periodo: number | null
    turno: string | null
  }

  export type TurmaMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    numAlunos: number | null
    periodo: number | null
    turno: string | null
  }

  export type TurmaCountAggregateOutputType = {
    id: number
    nome: number
    numAlunos: number
    periodo: number
    turno: number
    _all: number
  }


  export type TurmaAvgAggregateInputType = {
    numAlunos?: true
    periodo?: true
  }

  export type TurmaSumAggregateInputType = {
    numAlunos?: true
    periodo?: true
  }

  export type TurmaMinAggregateInputType = {
    id?: true
    nome?: true
    numAlunos?: true
    periodo?: true
    turno?: true
  }

  export type TurmaMaxAggregateInputType = {
    id?: true
    nome?: true
    numAlunos?: true
    periodo?: true
    turno?: true
  }

  export type TurmaCountAggregateInputType = {
    id?: true
    nome?: true
    numAlunos?: true
    periodo?: true
    turno?: true
    _all?: true
  }

  export type TurmaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Turma to aggregate.
     */
    where?: TurmaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turmas to fetch.
     */
    orderBy?: TurmaOrderByWithRelationInput | TurmaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TurmaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turmas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turmas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Turmas
    **/
    _count?: true | TurmaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TurmaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TurmaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TurmaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TurmaMaxAggregateInputType
  }

  export type GetTurmaAggregateType<T extends TurmaAggregateArgs> = {
        [P in keyof T & keyof AggregateTurma]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTurma[P]>
      : GetScalarType<T[P], AggregateTurma[P]>
  }




  export type TurmaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TurmaWhereInput
    orderBy?: TurmaOrderByWithAggregationInput | TurmaOrderByWithAggregationInput[]
    by: TurmaScalarFieldEnum[] | TurmaScalarFieldEnum
    having?: TurmaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TurmaCountAggregateInputType | true
    _avg?: TurmaAvgAggregateInputType
    _sum?: TurmaSumAggregateInputType
    _min?: TurmaMinAggregateInputType
    _max?: TurmaMaxAggregateInputType
  }

  export type TurmaGroupByOutputType = {
    id: string
    nome: string
    numAlunos: number
    periodo: number
    turno: string
    _count: TurmaCountAggregateOutputType | null
    _avg: TurmaAvgAggregateOutputType | null
    _sum: TurmaSumAggregateOutputType | null
    _min: TurmaMinAggregateOutputType | null
    _max: TurmaMaxAggregateOutputType | null
  }

  type GetTurmaGroupByPayload<T extends TurmaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TurmaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TurmaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TurmaGroupByOutputType[P]>
            : GetScalarType<T[P], TurmaGroupByOutputType[P]>
        }
      >
    >


  export type TurmaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    numAlunos?: boolean
    periodo?: boolean
    turno?: boolean
    alocacoes?: boolean | Turma$alocacoesArgs<ExtArgs>
    _count?: boolean | TurmaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["turma"]>

  export type TurmaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    numAlunos?: boolean
    periodo?: boolean
    turno?: boolean
  }, ExtArgs["result"]["turma"]>

  export type TurmaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    numAlunos?: boolean
    periodo?: boolean
    turno?: boolean
  }, ExtArgs["result"]["turma"]>

  export type TurmaSelectScalar = {
    id?: boolean
    nome?: boolean
    numAlunos?: boolean
    periodo?: boolean
    turno?: boolean
  }

  export type TurmaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "numAlunos" | "periodo" | "turno", ExtArgs["result"]["turma"]>
  export type TurmaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alocacoes?: boolean | Turma$alocacoesArgs<ExtArgs>
    _count?: boolean | TurmaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TurmaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TurmaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TurmaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Turma"
    objects: {
      alocacoes: Prisma.$AlocacaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      numAlunos: number
      periodo: number
      turno: string
    }, ExtArgs["result"]["turma"]>
    composites: {}
  }

  type TurmaGetPayload<S extends boolean | null | undefined | TurmaDefaultArgs> = $Result.GetResult<Prisma.$TurmaPayload, S>

  type TurmaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TurmaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TurmaCountAggregateInputType | true
    }

  export interface TurmaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Turma'], meta: { name: 'Turma' } }
    /**
     * Find zero or one Turma that matches the filter.
     * @param {TurmaFindUniqueArgs} args - Arguments to find a Turma
     * @example
     * // Get one Turma
     * const turma = await prisma.turma.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TurmaFindUniqueArgs>(args: SelectSubset<T, TurmaFindUniqueArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Turma that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TurmaFindUniqueOrThrowArgs} args - Arguments to find a Turma
     * @example
     * // Get one Turma
     * const turma = await prisma.turma.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TurmaFindUniqueOrThrowArgs>(args: SelectSubset<T, TurmaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Turma that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaFindFirstArgs} args - Arguments to find a Turma
     * @example
     * // Get one Turma
     * const turma = await prisma.turma.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TurmaFindFirstArgs>(args?: SelectSubset<T, TurmaFindFirstArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Turma that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaFindFirstOrThrowArgs} args - Arguments to find a Turma
     * @example
     * // Get one Turma
     * const turma = await prisma.turma.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TurmaFindFirstOrThrowArgs>(args?: SelectSubset<T, TurmaFindFirstOrThrowArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Turmas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Turmas
     * const turmas = await prisma.turma.findMany()
     * 
     * // Get first 10 Turmas
     * const turmas = await prisma.turma.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const turmaWithIdOnly = await prisma.turma.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TurmaFindManyArgs>(args?: SelectSubset<T, TurmaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Turma.
     * @param {TurmaCreateArgs} args - Arguments to create a Turma.
     * @example
     * // Create one Turma
     * const Turma = await prisma.turma.create({
     *   data: {
     *     // ... data to create a Turma
     *   }
     * })
     * 
     */
    create<T extends TurmaCreateArgs>(args: SelectSubset<T, TurmaCreateArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Turmas.
     * @param {TurmaCreateManyArgs} args - Arguments to create many Turmas.
     * @example
     * // Create many Turmas
     * const turma = await prisma.turma.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TurmaCreateManyArgs>(args?: SelectSubset<T, TurmaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Turmas and returns the data saved in the database.
     * @param {TurmaCreateManyAndReturnArgs} args - Arguments to create many Turmas.
     * @example
     * // Create many Turmas
     * const turma = await prisma.turma.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Turmas and only return the `id`
     * const turmaWithIdOnly = await prisma.turma.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TurmaCreateManyAndReturnArgs>(args?: SelectSubset<T, TurmaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Turma.
     * @param {TurmaDeleteArgs} args - Arguments to delete one Turma.
     * @example
     * // Delete one Turma
     * const Turma = await prisma.turma.delete({
     *   where: {
     *     // ... filter to delete one Turma
     *   }
     * })
     * 
     */
    delete<T extends TurmaDeleteArgs>(args: SelectSubset<T, TurmaDeleteArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Turma.
     * @param {TurmaUpdateArgs} args - Arguments to update one Turma.
     * @example
     * // Update one Turma
     * const turma = await prisma.turma.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TurmaUpdateArgs>(args: SelectSubset<T, TurmaUpdateArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Turmas.
     * @param {TurmaDeleteManyArgs} args - Arguments to filter Turmas to delete.
     * @example
     * // Delete a few Turmas
     * const { count } = await prisma.turma.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TurmaDeleteManyArgs>(args?: SelectSubset<T, TurmaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Turmas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Turmas
     * const turma = await prisma.turma.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TurmaUpdateManyArgs>(args: SelectSubset<T, TurmaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Turmas and returns the data updated in the database.
     * @param {TurmaUpdateManyAndReturnArgs} args - Arguments to update many Turmas.
     * @example
     * // Update many Turmas
     * const turma = await prisma.turma.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Turmas and only return the `id`
     * const turmaWithIdOnly = await prisma.turma.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TurmaUpdateManyAndReturnArgs>(args: SelectSubset<T, TurmaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Turma.
     * @param {TurmaUpsertArgs} args - Arguments to update or create a Turma.
     * @example
     * // Update or create a Turma
     * const turma = await prisma.turma.upsert({
     *   create: {
     *     // ... data to create a Turma
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Turma we want to update
     *   }
     * })
     */
    upsert<T extends TurmaUpsertArgs>(args: SelectSubset<T, TurmaUpsertArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Turmas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaCountArgs} args - Arguments to filter Turmas to count.
     * @example
     * // Count the number of Turmas
     * const count = await prisma.turma.count({
     *   where: {
     *     // ... the filter for the Turmas we want to count
     *   }
     * })
    **/
    count<T extends TurmaCountArgs>(
      args?: Subset<T, TurmaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TurmaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Turma.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TurmaAggregateArgs>(args: Subset<T, TurmaAggregateArgs>): Prisma.PrismaPromise<GetTurmaAggregateType<T>>

    /**
     * Group by Turma.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TurmaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TurmaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TurmaGroupByArgs['orderBy'] }
        : { orderBy?: TurmaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TurmaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTurmaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Turma model
   */
  readonly fields: TurmaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Turma.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TurmaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alocacoes<T extends Turma$alocacoesArgs<ExtArgs> = {}>(args?: Subset<T, Turma$alocacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlocacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Turma model
   */
  interface TurmaFieldRefs {
    readonly id: FieldRef<"Turma", 'String'>
    readonly nome: FieldRef<"Turma", 'String'>
    readonly numAlunos: FieldRef<"Turma", 'Int'>
    readonly periodo: FieldRef<"Turma", 'Int'>
    readonly turno: FieldRef<"Turma", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Turma findUnique
   */
  export type TurmaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter, which Turma to fetch.
     */
    where: TurmaWhereUniqueInput
  }

  /**
   * Turma findUniqueOrThrow
   */
  export type TurmaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter, which Turma to fetch.
     */
    where: TurmaWhereUniqueInput
  }

  /**
   * Turma findFirst
   */
  export type TurmaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter, which Turma to fetch.
     */
    where?: TurmaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turmas to fetch.
     */
    orderBy?: TurmaOrderByWithRelationInput | TurmaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Turmas.
     */
    cursor?: TurmaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turmas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turmas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Turmas.
     */
    distinct?: TurmaScalarFieldEnum | TurmaScalarFieldEnum[]
  }

  /**
   * Turma findFirstOrThrow
   */
  export type TurmaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter, which Turma to fetch.
     */
    where?: TurmaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turmas to fetch.
     */
    orderBy?: TurmaOrderByWithRelationInput | TurmaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Turmas.
     */
    cursor?: TurmaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turmas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turmas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Turmas.
     */
    distinct?: TurmaScalarFieldEnum | TurmaScalarFieldEnum[]
  }

  /**
   * Turma findMany
   */
  export type TurmaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter, which Turmas to fetch.
     */
    where?: TurmaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Turmas to fetch.
     */
    orderBy?: TurmaOrderByWithRelationInput | TurmaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Turmas.
     */
    cursor?: TurmaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Turmas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Turmas.
     */
    skip?: number
    distinct?: TurmaScalarFieldEnum | TurmaScalarFieldEnum[]
  }

  /**
   * Turma create
   */
  export type TurmaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * The data needed to create a Turma.
     */
    data: XOR<TurmaCreateInput, TurmaUncheckedCreateInput>
  }

  /**
   * Turma createMany
   */
  export type TurmaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Turmas.
     */
    data: TurmaCreateManyInput | TurmaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Turma createManyAndReturn
   */
  export type TurmaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * The data used to create many Turmas.
     */
    data: TurmaCreateManyInput | TurmaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Turma update
   */
  export type TurmaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * The data needed to update a Turma.
     */
    data: XOR<TurmaUpdateInput, TurmaUncheckedUpdateInput>
    /**
     * Choose, which Turma to update.
     */
    where: TurmaWhereUniqueInput
  }

  /**
   * Turma updateMany
   */
  export type TurmaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Turmas.
     */
    data: XOR<TurmaUpdateManyMutationInput, TurmaUncheckedUpdateManyInput>
    /**
     * Filter which Turmas to update
     */
    where?: TurmaWhereInput
    /**
     * Limit how many Turmas to update.
     */
    limit?: number
  }

  /**
   * Turma updateManyAndReturn
   */
  export type TurmaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * The data used to update Turmas.
     */
    data: XOR<TurmaUpdateManyMutationInput, TurmaUncheckedUpdateManyInput>
    /**
     * Filter which Turmas to update
     */
    where?: TurmaWhereInput
    /**
     * Limit how many Turmas to update.
     */
    limit?: number
  }

  /**
   * Turma upsert
   */
  export type TurmaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * The filter to search for the Turma to update in case it exists.
     */
    where: TurmaWhereUniqueInput
    /**
     * In case the Turma found by the `where` argument doesn't exist, create a new Turma with this data.
     */
    create: XOR<TurmaCreateInput, TurmaUncheckedCreateInput>
    /**
     * In case the Turma was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TurmaUpdateInput, TurmaUncheckedUpdateInput>
  }

  /**
   * Turma delete
   */
  export type TurmaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
    /**
     * Filter which Turma to delete.
     */
    where: TurmaWhereUniqueInput
  }

  /**
   * Turma deleteMany
   */
  export type TurmaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Turmas to delete
     */
    where?: TurmaWhereInput
    /**
     * Limit how many Turmas to delete.
     */
    limit?: number
  }

  /**
   * Turma.alocacoes
   */
  export type Turma$alocacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoInclude<ExtArgs> | null
    where?: AlocacaoWhereInput
    orderBy?: AlocacaoOrderByWithRelationInput | AlocacaoOrderByWithRelationInput[]
    cursor?: AlocacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlocacaoScalarFieldEnum | AlocacaoScalarFieldEnum[]
  }

  /**
   * Turma without action
   */
  export type TurmaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Turma
     */
    select?: TurmaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Turma
     */
    omit?: TurmaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TurmaInclude<ExtArgs> | null
  }


  /**
   * Model Sala
   */

  export type AggregateSala = {
    _count: SalaCountAggregateOutputType | null
    _avg: SalaAvgAggregateOutputType | null
    _sum: SalaSumAggregateOutputType | null
    _min: SalaMinAggregateOutputType | null
    _max: SalaMaxAggregateOutputType | null
  }

  export type SalaAvgAggregateOutputType = {
    capacidade: number | null
  }

  export type SalaSumAggregateOutputType = {
    capacidade: number | null
  }

  export type SalaMinAggregateOutputType = {
    id: string | null
    nome: string | null
    predio: string | null
    capacidade: number | null
    tipo: string | null
  }

  export type SalaMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    predio: string | null
    capacidade: number | null
    tipo: string | null
  }

  export type SalaCountAggregateOutputType = {
    id: number
    nome: number
    predio: number
    capacidade: number
    tipo: number
    _all: number
  }


  export type SalaAvgAggregateInputType = {
    capacidade?: true
  }

  export type SalaSumAggregateInputType = {
    capacidade?: true
  }

  export type SalaMinAggregateInputType = {
    id?: true
    nome?: true
    predio?: true
    capacidade?: true
    tipo?: true
  }

  export type SalaMaxAggregateInputType = {
    id?: true
    nome?: true
    predio?: true
    capacidade?: true
    tipo?: true
  }

  export type SalaCountAggregateInputType = {
    id?: true
    nome?: true
    predio?: true
    capacidade?: true
    tipo?: true
    _all?: true
  }

  export type SalaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sala to aggregate.
     */
    where?: SalaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Salas to fetch.
     */
    orderBy?: SalaOrderByWithRelationInput | SalaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SalaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Salas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Salas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Salas
    **/
    _count?: true | SalaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SalaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SalaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SalaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SalaMaxAggregateInputType
  }

  export type GetSalaAggregateType<T extends SalaAggregateArgs> = {
        [P in keyof T & keyof AggregateSala]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSala[P]>
      : GetScalarType<T[P], AggregateSala[P]>
  }




  export type SalaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SalaWhereInput
    orderBy?: SalaOrderByWithAggregationInput | SalaOrderByWithAggregationInput[]
    by: SalaScalarFieldEnum[] | SalaScalarFieldEnum
    having?: SalaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SalaCountAggregateInputType | true
    _avg?: SalaAvgAggregateInputType
    _sum?: SalaSumAggregateInputType
    _min?: SalaMinAggregateInputType
    _max?: SalaMaxAggregateInputType
  }

  export type SalaGroupByOutputType = {
    id: string
    nome: string
    predio: string
    capacidade: number
    tipo: string
    _count: SalaCountAggregateOutputType | null
    _avg: SalaAvgAggregateOutputType | null
    _sum: SalaSumAggregateOutputType | null
    _min: SalaMinAggregateOutputType | null
    _max: SalaMaxAggregateOutputType | null
  }

  type GetSalaGroupByPayload<T extends SalaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SalaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SalaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SalaGroupByOutputType[P]>
            : GetScalarType<T[P], SalaGroupByOutputType[P]>
        }
      >
    >


  export type SalaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    predio?: boolean
    capacidade?: boolean
    tipo?: boolean
    alocacoes?: boolean | Sala$alocacoesArgs<ExtArgs>
    _count?: boolean | SalaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sala"]>

  export type SalaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    predio?: boolean
    capacidade?: boolean
    tipo?: boolean
  }, ExtArgs["result"]["sala"]>

  export type SalaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    predio?: boolean
    capacidade?: boolean
    tipo?: boolean
  }, ExtArgs["result"]["sala"]>

  export type SalaSelectScalar = {
    id?: boolean
    nome?: boolean
    predio?: boolean
    capacidade?: boolean
    tipo?: boolean
  }

  export type SalaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "predio" | "capacidade" | "tipo", ExtArgs["result"]["sala"]>
  export type SalaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alocacoes?: boolean | Sala$alocacoesArgs<ExtArgs>
    _count?: boolean | SalaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SalaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SalaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SalaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Sala"
    objects: {
      alocacoes: Prisma.$AlocacaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      predio: string
      capacidade: number
      tipo: string
    }, ExtArgs["result"]["sala"]>
    composites: {}
  }

  type SalaGetPayload<S extends boolean | null | undefined | SalaDefaultArgs> = $Result.GetResult<Prisma.$SalaPayload, S>

  type SalaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SalaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SalaCountAggregateInputType | true
    }

  export interface SalaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Sala'], meta: { name: 'Sala' } }
    /**
     * Find zero or one Sala that matches the filter.
     * @param {SalaFindUniqueArgs} args - Arguments to find a Sala
     * @example
     * // Get one Sala
     * const sala = await prisma.sala.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SalaFindUniqueArgs>(args: SelectSubset<T, SalaFindUniqueArgs<ExtArgs>>): Prisma__SalaClient<$Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Sala that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SalaFindUniqueOrThrowArgs} args - Arguments to find a Sala
     * @example
     * // Get one Sala
     * const sala = await prisma.sala.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SalaFindUniqueOrThrowArgs>(args: SelectSubset<T, SalaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SalaClient<$Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sala that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalaFindFirstArgs} args - Arguments to find a Sala
     * @example
     * // Get one Sala
     * const sala = await prisma.sala.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SalaFindFirstArgs>(args?: SelectSubset<T, SalaFindFirstArgs<ExtArgs>>): Prisma__SalaClient<$Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Sala that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalaFindFirstOrThrowArgs} args - Arguments to find a Sala
     * @example
     * // Get one Sala
     * const sala = await prisma.sala.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SalaFindFirstOrThrowArgs>(args?: SelectSubset<T, SalaFindFirstOrThrowArgs<ExtArgs>>): Prisma__SalaClient<$Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Salas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Salas
     * const salas = await prisma.sala.findMany()
     * 
     * // Get first 10 Salas
     * const salas = await prisma.sala.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const salaWithIdOnly = await prisma.sala.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SalaFindManyArgs>(args?: SelectSubset<T, SalaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Sala.
     * @param {SalaCreateArgs} args - Arguments to create a Sala.
     * @example
     * // Create one Sala
     * const Sala = await prisma.sala.create({
     *   data: {
     *     // ... data to create a Sala
     *   }
     * })
     * 
     */
    create<T extends SalaCreateArgs>(args: SelectSubset<T, SalaCreateArgs<ExtArgs>>): Prisma__SalaClient<$Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Salas.
     * @param {SalaCreateManyArgs} args - Arguments to create many Salas.
     * @example
     * // Create many Salas
     * const sala = await prisma.sala.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SalaCreateManyArgs>(args?: SelectSubset<T, SalaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Salas and returns the data saved in the database.
     * @param {SalaCreateManyAndReturnArgs} args - Arguments to create many Salas.
     * @example
     * // Create many Salas
     * const sala = await prisma.sala.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Salas and only return the `id`
     * const salaWithIdOnly = await prisma.sala.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SalaCreateManyAndReturnArgs>(args?: SelectSubset<T, SalaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Sala.
     * @param {SalaDeleteArgs} args - Arguments to delete one Sala.
     * @example
     * // Delete one Sala
     * const Sala = await prisma.sala.delete({
     *   where: {
     *     // ... filter to delete one Sala
     *   }
     * })
     * 
     */
    delete<T extends SalaDeleteArgs>(args: SelectSubset<T, SalaDeleteArgs<ExtArgs>>): Prisma__SalaClient<$Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Sala.
     * @param {SalaUpdateArgs} args - Arguments to update one Sala.
     * @example
     * // Update one Sala
     * const sala = await prisma.sala.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SalaUpdateArgs>(args: SelectSubset<T, SalaUpdateArgs<ExtArgs>>): Prisma__SalaClient<$Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Salas.
     * @param {SalaDeleteManyArgs} args - Arguments to filter Salas to delete.
     * @example
     * // Delete a few Salas
     * const { count } = await prisma.sala.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SalaDeleteManyArgs>(args?: SelectSubset<T, SalaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Salas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Salas
     * const sala = await prisma.sala.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SalaUpdateManyArgs>(args: SelectSubset<T, SalaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Salas and returns the data updated in the database.
     * @param {SalaUpdateManyAndReturnArgs} args - Arguments to update many Salas.
     * @example
     * // Update many Salas
     * const sala = await prisma.sala.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Salas and only return the `id`
     * const salaWithIdOnly = await prisma.sala.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SalaUpdateManyAndReturnArgs>(args: SelectSubset<T, SalaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Sala.
     * @param {SalaUpsertArgs} args - Arguments to update or create a Sala.
     * @example
     * // Update or create a Sala
     * const sala = await prisma.sala.upsert({
     *   create: {
     *     // ... data to create a Sala
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Sala we want to update
     *   }
     * })
     */
    upsert<T extends SalaUpsertArgs>(args: SelectSubset<T, SalaUpsertArgs<ExtArgs>>): Prisma__SalaClient<$Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Salas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalaCountArgs} args - Arguments to filter Salas to count.
     * @example
     * // Count the number of Salas
     * const count = await prisma.sala.count({
     *   where: {
     *     // ... the filter for the Salas we want to count
     *   }
     * })
    **/
    count<T extends SalaCountArgs>(
      args?: Subset<T, SalaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SalaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Sala.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SalaAggregateArgs>(args: Subset<T, SalaAggregateArgs>): Prisma.PrismaPromise<GetSalaAggregateType<T>>

    /**
     * Group by Sala.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SalaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SalaGroupByArgs['orderBy'] }
        : { orderBy?: SalaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SalaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSalaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Sala model
   */
  readonly fields: SalaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Sala.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SalaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alocacoes<T extends Sala$alocacoesArgs<ExtArgs> = {}>(args?: Subset<T, Sala$alocacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlocacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Sala model
   */
  interface SalaFieldRefs {
    readonly id: FieldRef<"Sala", 'String'>
    readonly nome: FieldRef<"Sala", 'String'>
    readonly predio: FieldRef<"Sala", 'String'>
    readonly capacidade: FieldRef<"Sala", 'Int'>
    readonly tipo: FieldRef<"Sala", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Sala findUnique
   */
  export type SalaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sala
     */
    select?: SalaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sala
     */
    omit?: SalaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaInclude<ExtArgs> | null
    /**
     * Filter, which Sala to fetch.
     */
    where: SalaWhereUniqueInput
  }

  /**
   * Sala findUniqueOrThrow
   */
  export type SalaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sala
     */
    select?: SalaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sala
     */
    omit?: SalaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaInclude<ExtArgs> | null
    /**
     * Filter, which Sala to fetch.
     */
    where: SalaWhereUniqueInput
  }

  /**
   * Sala findFirst
   */
  export type SalaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sala
     */
    select?: SalaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sala
     */
    omit?: SalaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaInclude<ExtArgs> | null
    /**
     * Filter, which Sala to fetch.
     */
    where?: SalaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Salas to fetch.
     */
    orderBy?: SalaOrderByWithRelationInput | SalaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Salas.
     */
    cursor?: SalaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Salas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Salas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Salas.
     */
    distinct?: SalaScalarFieldEnum | SalaScalarFieldEnum[]
  }

  /**
   * Sala findFirstOrThrow
   */
  export type SalaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sala
     */
    select?: SalaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sala
     */
    omit?: SalaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaInclude<ExtArgs> | null
    /**
     * Filter, which Sala to fetch.
     */
    where?: SalaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Salas to fetch.
     */
    orderBy?: SalaOrderByWithRelationInput | SalaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Salas.
     */
    cursor?: SalaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Salas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Salas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Salas.
     */
    distinct?: SalaScalarFieldEnum | SalaScalarFieldEnum[]
  }

  /**
   * Sala findMany
   */
  export type SalaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sala
     */
    select?: SalaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sala
     */
    omit?: SalaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaInclude<ExtArgs> | null
    /**
     * Filter, which Salas to fetch.
     */
    where?: SalaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Salas to fetch.
     */
    orderBy?: SalaOrderByWithRelationInput | SalaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Salas.
     */
    cursor?: SalaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Salas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Salas.
     */
    skip?: number
    distinct?: SalaScalarFieldEnum | SalaScalarFieldEnum[]
  }

  /**
   * Sala create
   */
  export type SalaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sala
     */
    select?: SalaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sala
     */
    omit?: SalaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaInclude<ExtArgs> | null
    /**
     * The data needed to create a Sala.
     */
    data: XOR<SalaCreateInput, SalaUncheckedCreateInput>
  }

  /**
   * Sala createMany
   */
  export type SalaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Salas.
     */
    data: SalaCreateManyInput | SalaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sala createManyAndReturn
   */
  export type SalaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sala
     */
    select?: SalaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sala
     */
    omit?: SalaOmit<ExtArgs> | null
    /**
     * The data used to create many Salas.
     */
    data: SalaCreateManyInput | SalaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Sala update
   */
  export type SalaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sala
     */
    select?: SalaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sala
     */
    omit?: SalaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaInclude<ExtArgs> | null
    /**
     * The data needed to update a Sala.
     */
    data: XOR<SalaUpdateInput, SalaUncheckedUpdateInput>
    /**
     * Choose, which Sala to update.
     */
    where: SalaWhereUniqueInput
  }

  /**
   * Sala updateMany
   */
  export type SalaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Salas.
     */
    data: XOR<SalaUpdateManyMutationInput, SalaUncheckedUpdateManyInput>
    /**
     * Filter which Salas to update
     */
    where?: SalaWhereInput
    /**
     * Limit how many Salas to update.
     */
    limit?: number
  }

  /**
   * Sala updateManyAndReturn
   */
  export type SalaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sala
     */
    select?: SalaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Sala
     */
    omit?: SalaOmit<ExtArgs> | null
    /**
     * The data used to update Salas.
     */
    data: XOR<SalaUpdateManyMutationInput, SalaUncheckedUpdateManyInput>
    /**
     * Filter which Salas to update
     */
    where?: SalaWhereInput
    /**
     * Limit how many Salas to update.
     */
    limit?: number
  }

  /**
   * Sala upsert
   */
  export type SalaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sala
     */
    select?: SalaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sala
     */
    omit?: SalaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaInclude<ExtArgs> | null
    /**
     * The filter to search for the Sala to update in case it exists.
     */
    where: SalaWhereUniqueInput
    /**
     * In case the Sala found by the `where` argument doesn't exist, create a new Sala with this data.
     */
    create: XOR<SalaCreateInput, SalaUncheckedCreateInput>
    /**
     * In case the Sala was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SalaUpdateInput, SalaUncheckedUpdateInput>
  }

  /**
   * Sala delete
   */
  export type SalaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sala
     */
    select?: SalaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sala
     */
    omit?: SalaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaInclude<ExtArgs> | null
    /**
     * Filter which Sala to delete.
     */
    where: SalaWhereUniqueInput
  }

  /**
   * Sala deleteMany
   */
  export type SalaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Salas to delete
     */
    where?: SalaWhereInput
    /**
     * Limit how many Salas to delete.
     */
    limit?: number
  }

  /**
   * Sala.alocacoes
   */
  export type Sala$alocacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoInclude<ExtArgs> | null
    where?: AlocacaoWhereInput
    orderBy?: AlocacaoOrderByWithRelationInput | AlocacaoOrderByWithRelationInput[]
    cursor?: AlocacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlocacaoScalarFieldEnum | AlocacaoScalarFieldEnum[]
  }

  /**
   * Sala without action
   */
  export type SalaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Sala
     */
    select?: SalaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Sala
     */
    omit?: SalaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalaInclude<ExtArgs> | null
  }


  /**
   * Model Horario
   */

  export type AggregateHorario = {
    _count: HorarioCountAggregateOutputType | null
    _min: HorarioMinAggregateOutputType | null
    _max: HorarioMaxAggregateOutputType | null
  }

  export type HorarioMinAggregateOutputType = {
    id: string | null
    diaSemana: string | null
    horarioInicio: Date | null
    horarioFim: Date | null
  }

  export type HorarioMaxAggregateOutputType = {
    id: string | null
    diaSemana: string | null
    horarioInicio: Date | null
    horarioFim: Date | null
  }

  export type HorarioCountAggregateOutputType = {
    id: number
    diaSemana: number
    horarioInicio: number
    horarioFim: number
    _all: number
  }


  export type HorarioMinAggregateInputType = {
    id?: true
    diaSemana?: true
    horarioInicio?: true
    horarioFim?: true
  }

  export type HorarioMaxAggregateInputType = {
    id?: true
    diaSemana?: true
    horarioInicio?: true
    horarioFim?: true
  }

  export type HorarioCountAggregateInputType = {
    id?: true
    diaSemana?: true
    horarioInicio?: true
    horarioFim?: true
    _all?: true
  }

  export type HorarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Horario to aggregate.
     */
    where?: HorarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Horarios to fetch.
     */
    orderBy?: HorarioOrderByWithRelationInput | HorarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HorarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Horarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Horarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Horarios
    **/
    _count?: true | HorarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HorarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HorarioMaxAggregateInputType
  }

  export type GetHorarioAggregateType<T extends HorarioAggregateArgs> = {
        [P in keyof T & keyof AggregateHorario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHorario[P]>
      : GetScalarType<T[P], AggregateHorario[P]>
  }




  export type HorarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HorarioWhereInput
    orderBy?: HorarioOrderByWithAggregationInput | HorarioOrderByWithAggregationInput[]
    by: HorarioScalarFieldEnum[] | HorarioScalarFieldEnum
    having?: HorarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HorarioCountAggregateInputType | true
    _min?: HorarioMinAggregateInputType
    _max?: HorarioMaxAggregateInputType
  }

  export type HorarioGroupByOutputType = {
    id: string
    diaSemana: string
    horarioInicio: Date
    horarioFim: Date
    _count: HorarioCountAggregateOutputType | null
    _min: HorarioMinAggregateOutputType | null
    _max: HorarioMaxAggregateOutputType | null
  }

  type GetHorarioGroupByPayload<T extends HorarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HorarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HorarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HorarioGroupByOutputType[P]>
            : GetScalarType<T[P], HorarioGroupByOutputType[P]>
        }
      >
    >


  export type HorarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    diaSemana?: boolean
    horarioInicio?: boolean
    horarioFim?: boolean
    alocacoes?: boolean | Horario$alocacoesArgs<ExtArgs>
    _count?: boolean | HorarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["horario"]>

  export type HorarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    diaSemana?: boolean
    horarioInicio?: boolean
    horarioFim?: boolean
  }, ExtArgs["result"]["horario"]>

  export type HorarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    diaSemana?: boolean
    horarioInicio?: boolean
    horarioFim?: boolean
  }, ExtArgs["result"]["horario"]>

  export type HorarioSelectScalar = {
    id?: boolean
    diaSemana?: boolean
    horarioInicio?: boolean
    horarioFim?: boolean
  }

  export type HorarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "diaSemana" | "horarioInicio" | "horarioFim", ExtArgs["result"]["horario"]>
  export type HorarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alocacoes?: boolean | Horario$alocacoesArgs<ExtArgs>
    _count?: boolean | HorarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type HorarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type HorarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $HorarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Horario"
    objects: {
      alocacoes: Prisma.$AlocacaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      diaSemana: string
      horarioInicio: Date
      horarioFim: Date
    }, ExtArgs["result"]["horario"]>
    composites: {}
  }

  type HorarioGetPayload<S extends boolean | null | undefined | HorarioDefaultArgs> = $Result.GetResult<Prisma.$HorarioPayload, S>

  type HorarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HorarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HorarioCountAggregateInputType | true
    }

  export interface HorarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Horario'], meta: { name: 'Horario' } }
    /**
     * Find zero or one Horario that matches the filter.
     * @param {HorarioFindUniqueArgs} args - Arguments to find a Horario
     * @example
     * // Get one Horario
     * const horario = await prisma.horario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HorarioFindUniqueArgs>(args: SelectSubset<T, HorarioFindUniqueArgs<ExtArgs>>): Prisma__HorarioClient<$Result.GetResult<Prisma.$HorarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Horario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HorarioFindUniqueOrThrowArgs} args - Arguments to find a Horario
     * @example
     * // Get one Horario
     * const horario = await prisma.horario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HorarioFindUniqueOrThrowArgs>(args: SelectSubset<T, HorarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HorarioClient<$Result.GetResult<Prisma.$HorarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Horario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorarioFindFirstArgs} args - Arguments to find a Horario
     * @example
     * // Get one Horario
     * const horario = await prisma.horario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HorarioFindFirstArgs>(args?: SelectSubset<T, HorarioFindFirstArgs<ExtArgs>>): Prisma__HorarioClient<$Result.GetResult<Prisma.$HorarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Horario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorarioFindFirstOrThrowArgs} args - Arguments to find a Horario
     * @example
     * // Get one Horario
     * const horario = await prisma.horario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HorarioFindFirstOrThrowArgs>(args?: SelectSubset<T, HorarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__HorarioClient<$Result.GetResult<Prisma.$HorarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Horarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Horarios
     * const horarios = await prisma.horario.findMany()
     * 
     * // Get first 10 Horarios
     * const horarios = await prisma.horario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const horarioWithIdOnly = await prisma.horario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HorarioFindManyArgs>(args?: SelectSubset<T, HorarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HorarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Horario.
     * @param {HorarioCreateArgs} args - Arguments to create a Horario.
     * @example
     * // Create one Horario
     * const Horario = await prisma.horario.create({
     *   data: {
     *     // ... data to create a Horario
     *   }
     * })
     * 
     */
    create<T extends HorarioCreateArgs>(args: SelectSubset<T, HorarioCreateArgs<ExtArgs>>): Prisma__HorarioClient<$Result.GetResult<Prisma.$HorarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Horarios.
     * @param {HorarioCreateManyArgs} args - Arguments to create many Horarios.
     * @example
     * // Create many Horarios
     * const horario = await prisma.horario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HorarioCreateManyArgs>(args?: SelectSubset<T, HorarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Horarios and returns the data saved in the database.
     * @param {HorarioCreateManyAndReturnArgs} args - Arguments to create many Horarios.
     * @example
     * // Create many Horarios
     * const horario = await prisma.horario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Horarios and only return the `id`
     * const horarioWithIdOnly = await prisma.horario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HorarioCreateManyAndReturnArgs>(args?: SelectSubset<T, HorarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HorarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Horario.
     * @param {HorarioDeleteArgs} args - Arguments to delete one Horario.
     * @example
     * // Delete one Horario
     * const Horario = await prisma.horario.delete({
     *   where: {
     *     // ... filter to delete one Horario
     *   }
     * })
     * 
     */
    delete<T extends HorarioDeleteArgs>(args: SelectSubset<T, HorarioDeleteArgs<ExtArgs>>): Prisma__HorarioClient<$Result.GetResult<Prisma.$HorarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Horario.
     * @param {HorarioUpdateArgs} args - Arguments to update one Horario.
     * @example
     * // Update one Horario
     * const horario = await prisma.horario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HorarioUpdateArgs>(args: SelectSubset<T, HorarioUpdateArgs<ExtArgs>>): Prisma__HorarioClient<$Result.GetResult<Prisma.$HorarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Horarios.
     * @param {HorarioDeleteManyArgs} args - Arguments to filter Horarios to delete.
     * @example
     * // Delete a few Horarios
     * const { count } = await prisma.horario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HorarioDeleteManyArgs>(args?: SelectSubset<T, HorarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Horarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Horarios
     * const horario = await prisma.horario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HorarioUpdateManyArgs>(args: SelectSubset<T, HorarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Horarios and returns the data updated in the database.
     * @param {HorarioUpdateManyAndReturnArgs} args - Arguments to update many Horarios.
     * @example
     * // Update many Horarios
     * const horario = await prisma.horario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Horarios and only return the `id`
     * const horarioWithIdOnly = await prisma.horario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HorarioUpdateManyAndReturnArgs>(args: SelectSubset<T, HorarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HorarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Horario.
     * @param {HorarioUpsertArgs} args - Arguments to update or create a Horario.
     * @example
     * // Update or create a Horario
     * const horario = await prisma.horario.upsert({
     *   create: {
     *     // ... data to create a Horario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Horario we want to update
     *   }
     * })
     */
    upsert<T extends HorarioUpsertArgs>(args: SelectSubset<T, HorarioUpsertArgs<ExtArgs>>): Prisma__HorarioClient<$Result.GetResult<Prisma.$HorarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Horarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorarioCountArgs} args - Arguments to filter Horarios to count.
     * @example
     * // Count the number of Horarios
     * const count = await prisma.horario.count({
     *   where: {
     *     // ... the filter for the Horarios we want to count
     *   }
     * })
    **/
    count<T extends HorarioCountArgs>(
      args?: Subset<T, HorarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HorarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Horario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HorarioAggregateArgs>(args: Subset<T, HorarioAggregateArgs>): Prisma.PrismaPromise<GetHorarioAggregateType<T>>

    /**
     * Group by Horario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HorarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HorarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HorarioGroupByArgs['orderBy'] }
        : { orderBy?: HorarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HorarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHorarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Horario model
   */
  readonly fields: HorarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Horario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HorarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alocacoes<T extends Horario$alocacoesArgs<ExtArgs> = {}>(args?: Subset<T, Horario$alocacoesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlocacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Horario model
   */
  interface HorarioFieldRefs {
    readonly id: FieldRef<"Horario", 'String'>
    readonly diaSemana: FieldRef<"Horario", 'String'>
    readonly horarioInicio: FieldRef<"Horario", 'DateTime'>
    readonly horarioFim: FieldRef<"Horario", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Horario findUnique
   */
  export type HorarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Horario
     */
    select?: HorarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Horario
     */
    omit?: HorarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioInclude<ExtArgs> | null
    /**
     * Filter, which Horario to fetch.
     */
    where: HorarioWhereUniqueInput
  }

  /**
   * Horario findUniqueOrThrow
   */
  export type HorarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Horario
     */
    select?: HorarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Horario
     */
    omit?: HorarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioInclude<ExtArgs> | null
    /**
     * Filter, which Horario to fetch.
     */
    where: HorarioWhereUniqueInput
  }

  /**
   * Horario findFirst
   */
  export type HorarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Horario
     */
    select?: HorarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Horario
     */
    omit?: HorarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioInclude<ExtArgs> | null
    /**
     * Filter, which Horario to fetch.
     */
    where?: HorarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Horarios to fetch.
     */
    orderBy?: HorarioOrderByWithRelationInput | HorarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Horarios.
     */
    cursor?: HorarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Horarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Horarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Horarios.
     */
    distinct?: HorarioScalarFieldEnum | HorarioScalarFieldEnum[]
  }

  /**
   * Horario findFirstOrThrow
   */
  export type HorarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Horario
     */
    select?: HorarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Horario
     */
    omit?: HorarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioInclude<ExtArgs> | null
    /**
     * Filter, which Horario to fetch.
     */
    where?: HorarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Horarios to fetch.
     */
    orderBy?: HorarioOrderByWithRelationInput | HorarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Horarios.
     */
    cursor?: HorarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Horarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Horarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Horarios.
     */
    distinct?: HorarioScalarFieldEnum | HorarioScalarFieldEnum[]
  }

  /**
   * Horario findMany
   */
  export type HorarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Horario
     */
    select?: HorarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Horario
     */
    omit?: HorarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioInclude<ExtArgs> | null
    /**
     * Filter, which Horarios to fetch.
     */
    where?: HorarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Horarios to fetch.
     */
    orderBy?: HorarioOrderByWithRelationInput | HorarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Horarios.
     */
    cursor?: HorarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Horarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Horarios.
     */
    skip?: number
    distinct?: HorarioScalarFieldEnum | HorarioScalarFieldEnum[]
  }

  /**
   * Horario create
   */
  export type HorarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Horario
     */
    select?: HorarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Horario
     */
    omit?: HorarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Horario.
     */
    data: XOR<HorarioCreateInput, HorarioUncheckedCreateInput>
  }

  /**
   * Horario createMany
   */
  export type HorarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Horarios.
     */
    data: HorarioCreateManyInput | HorarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Horario createManyAndReturn
   */
  export type HorarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Horario
     */
    select?: HorarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Horario
     */
    omit?: HorarioOmit<ExtArgs> | null
    /**
     * The data used to create many Horarios.
     */
    data: HorarioCreateManyInput | HorarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Horario update
   */
  export type HorarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Horario
     */
    select?: HorarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Horario
     */
    omit?: HorarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Horario.
     */
    data: XOR<HorarioUpdateInput, HorarioUncheckedUpdateInput>
    /**
     * Choose, which Horario to update.
     */
    where: HorarioWhereUniqueInput
  }

  /**
   * Horario updateMany
   */
  export type HorarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Horarios.
     */
    data: XOR<HorarioUpdateManyMutationInput, HorarioUncheckedUpdateManyInput>
    /**
     * Filter which Horarios to update
     */
    where?: HorarioWhereInput
    /**
     * Limit how many Horarios to update.
     */
    limit?: number
  }

  /**
   * Horario updateManyAndReturn
   */
  export type HorarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Horario
     */
    select?: HorarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Horario
     */
    omit?: HorarioOmit<ExtArgs> | null
    /**
     * The data used to update Horarios.
     */
    data: XOR<HorarioUpdateManyMutationInput, HorarioUncheckedUpdateManyInput>
    /**
     * Filter which Horarios to update
     */
    where?: HorarioWhereInput
    /**
     * Limit how many Horarios to update.
     */
    limit?: number
  }

  /**
   * Horario upsert
   */
  export type HorarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Horario
     */
    select?: HorarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Horario
     */
    omit?: HorarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Horario to update in case it exists.
     */
    where: HorarioWhereUniqueInput
    /**
     * In case the Horario found by the `where` argument doesn't exist, create a new Horario with this data.
     */
    create: XOR<HorarioCreateInput, HorarioUncheckedCreateInput>
    /**
     * In case the Horario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HorarioUpdateInput, HorarioUncheckedUpdateInput>
  }

  /**
   * Horario delete
   */
  export type HorarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Horario
     */
    select?: HorarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Horario
     */
    omit?: HorarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioInclude<ExtArgs> | null
    /**
     * Filter which Horario to delete.
     */
    where: HorarioWhereUniqueInput
  }

  /**
   * Horario deleteMany
   */
  export type HorarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Horarios to delete
     */
    where?: HorarioWhereInput
    /**
     * Limit how many Horarios to delete.
     */
    limit?: number
  }

  /**
   * Horario.alocacoes
   */
  export type Horario$alocacoesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoInclude<ExtArgs> | null
    where?: AlocacaoWhereInput
    orderBy?: AlocacaoOrderByWithRelationInput | AlocacaoOrderByWithRelationInput[]
    cursor?: AlocacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlocacaoScalarFieldEnum | AlocacaoScalarFieldEnum[]
  }

  /**
   * Horario without action
   */
  export type HorarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Horario
     */
    select?: HorarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Horario
     */
    omit?: HorarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HorarioInclude<ExtArgs> | null
  }


  /**
   * Model Alocacao
   */

  export type AggregateAlocacao = {
    _count: AlocacaoCountAggregateOutputType | null
    _min: AlocacaoMinAggregateOutputType | null
    _max: AlocacaoMaxAggregateOutputType | null
  }

  export type AlocacaoMinAggregateOutputType = {
    id: string | null
    id_user: string | null
    id_disciplina: string | null
    id_turma: string | null
    id_sala: string | null
    id_horario: string | null
    created_at: Date | null
  }

  export type AlocacaoMaxAggregateOutputType = {
    id: string | null
    id_user: string | null
    id_disciplina: string | null
    id_turma: string | null
    id_sala: string | null
    id_horario: string | null
    created_at: Date | null
  }

  export type AlocacaoCountAggregateOutputType = {
    id: number
    id_user: number
    id_disciplina: number
    id_turma: number
    id_sala: number
    id_horario: number
    created_at: number
    _all: number
  }


  export type AlocacaoMinAggregateInputType = {
    id?: true
    id_user?: true
    id_disciplina?: true
    id_turma?: true
    id_sala?: true
    id_horario?: true
    created_at?: true
  }

  export type AlocacaoMaxAggregateInputType = {
    id?: true
    id_user?: true
    id_disciplina?: true
    id_turma?: true
    id_sala?: true
    id_horario?: true
    created_at?: true
  }

  export type AlocacaoCountAggregateInputType = {
    id?: true
    id_user?: true
    id_disciplina?: true
    id_turma?: true
    id_sala?: true
    id_horario?: true
    created_at?: true
    _all?: true
  }

  export type AlocacaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alocacao to aggregate.
     */
    where?: AlocacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alocacaos to fetch.
     */
    orderBy?: AlocacaoOrderByWithRelationInput | AlocacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlocacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alocacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alocacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Alocacaos
    **/
    _count?: true | AlocacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlocacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlocacaoMaxAggregateInputType
  }

  export type GetAlocacaoAggregateType<T extends AlocacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateAlocacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlocacao[P]>
      : GetScalarType<T[P], AggregateAlocacao[P]>
  }




  export type AlocacaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlocacaoWhereInput
    orderBy?: AlocacaoOrderByWithAggregationInput | AlocacaoOrderByWithAggregationInput[]
    by: AlocacaoScalarFieldEnum[] | AlocacaoScalarFieldEnum
    having?: AlocacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlocacaoCountAggregateInputType | true
    _min?: AlocacaoMinAggregateInputType
    _max?: AlocacaoMaxAggregateInputType
  }

  export type AlocacaoGroupByOutputType = {
    id: string
    id_user: string
    id_disciplina: string
    id_turma: string
    id_sala: string
    id_horario: string
    created_at: Date
    _count: AlocacaoCountAggregateOutputType | null
    _min: AlocacaoMinAggregateOutputType | null
    _max: AlocacaoMaxAggregateOutputType | null
  }

  type GetAlocacaoGroupByPayload<T extends AlocacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlocacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlocacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlocacaoGroupByOutputType[P]>
            : GetScalarType<T[P], AlocacaoGroupByOutputType[P]>
        }
      >
    >


  export type AlocacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_user?: boolean
    id_disciplina?: boolean
    id_turma?: boolean
    id_sala?: boolean
    id_horario?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    disciplina?: boolean | DisciplinaDefaultArgs<ExtArgs>
    turma?: boolean | TurmaDefaultArgs<ExtArgs>
    sala?: boolean | SalaDefaultArgs<ExtArgs>
    horario?: boolean | HorarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alocacao"]>

  export type AlocacaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_user?: boolean
    id_disciplina?: boolean
    id_turma?: boolean
    id_sala?: boolean
    id_horario?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    disciplina?: boolean | DisciplinaDefaultArgs<ExtArgs>
    turma?: boolean | TurmaDefaultArgs<ExtArgs>
    sala?: boolean | SalaDefaultArgs<ExtArgs>
    horario?: boolean | HorarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alocacao"]>

  export type AlocacaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    id_user?: boolean
    id_disciplina?: boolean
    id_turma?: boolean
    id_sala?: boolean
    id_horario?: boolean
    created_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    disciplina?: boolean | DisciplinaDefaultArgs<ExtArgs>
    turma?: boolean | TurmaDefaultArgs<ExtArgs>
    sala?: boolean | SalaDefaultArgs<ExtArgs>
    horario?: boolean | HorarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alocacao"]>

  export type AlocacaoSelectScalar = {
    id?: boolean
    id_user?: boolean
    id_disciplina?: boolean
    id_turma?: boolean
    id_sala?: boolean
    id_horario?: boolean
    created_at?: boolean
  }

  export type AlocacaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "id_user" | "id_disciplina" | "id_turma" | "id_sala" | "id_horario" | "created_at", ExtArgs["result"]["alocacao"]>
  export type AlocacaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    disciplina?: boolean | DisciplinaDefaultArgs<ExtArgs>
    turma?: boolean | TurmaDefaultArgs<ExtArgs>
    sala?: boolean | SalaDefaultArgs<ExtArgs>
    horario?: boolean | HorarioDefaultArgs<ExtArgs>
  }
  export type AlocacaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    disciplina?: boolean | DisciplinaDefaultArgs<ExtArgs>
    turma?: boolean | TurmaDefaultArgs<ExtArgs>
    sala?: boolean | SalaDefaultArgs<ExtArgs>
    horario?: boolean | HorarioDefaultArgs<ExtArgs>
  }
  export type AlocacaoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    disciplina?: boolean | DisciplinaDefaultArgs<ExtArgs>
    turma?: boolean | TurmaDefaultArgs<ExtArgs>
    sala?: boolean | SalaDefaultArgs<ExtArgs>
    horario?: boolean | HorarioDefaultArgs<ExtArgs>
  }

  export type $AlocacaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Alocacao"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      disciplina: Prisma.$DisciplinaPayload<ExtArgs>
      turma: Prisma.$TurmaPayload<ExtArgs>
      sala: Prisma.$SalaPayload<ExtArgs>
      horario: Prisma.$HorarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      id_user: string
      id_disciplina: string
      id_turma: string
      id_sala: string
      id_horario: string
      created_at: Date
    }, ExtArgs["result"]["alocacao"]>
    composites: {}
  }

  type AlocacaoGetPayload<S extends boolean | null | undefined | AlocacaoDefaultArgs> = $Result.GetResult<Prisma.$AlocacaoPayload, S>

  type AlocacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AlocacaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlocacaoCountAggregateInputType | true
    }

  export interface AlocacaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Alocacao'], meta: { name: 'Alocacao' } }
    /**
     * Find zero or one Alocacao that matches the filter.
     * @param {AlocacaoFindUniqueArgs} args - Arguments to find a Alocacao
     * @example
     * // Get one Alocacao
     * const alocacao = await prisma.alocacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlocacaoFindUniqueArgs>(args: SelectSubset<T, AlocacaoFindUniqueArgs<ExtArgs>>): Prisma__AlocacaoClient<$Result.GetResult<Prisma.$AlocacaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Alocacao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlocacaoFindUniqueOrThrowArgs} args - Arguments to find a Alocacao
     * @example
     * // Get one Alocacao
     * const alocacao = await prisma.alocacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlocacaoFindUniqueOrThrowArgs>(args: SelectSubset<T, AlocacaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlocacaoClient<$Result.GetResult<Prisma.$AlocacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alocacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlocacaoFindFirstArgs} args - Arguments to find a Alocacao
     * @example
     * // Get one Alocacao
     * const alocacao = await prisma.alocacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlocacaoFindFirstArgs>(args?: SelectSubset<T, AlocacaoFindFirstArgs<ExtArgs>>): Prisma__AlocacaoClient<$Result.GetResult<Prisma.$AlocacaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alocacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlocacaoFindFirstOrThrowArgs} args - Arguments to find a Alocacao
     * @example
     * // Get one Alocacao
     * const alocacao = await prisma.alocacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlocacaoFindFirstOrThrowArgs>(args?: SelectSubset<T, AlocacaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlocacaoClient<$Result.GetResult<Prisma.$AlocacaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Alocacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlocacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alocacaos
     * const alocacaos = await prisma.alocacao.findMany()
     * 
     * // Get first 10 Alocacaos
     * const alocacaos = await prisma.alocacao.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alocacaoWithIdOnly = await prisma.alocacao.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlocacaoFindManyArgs>(args?: SelectSubset<T, AlocacaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlocacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Alocacao.
     * @param {AlocacaoCreateArgs} args - Arguments to create a Alocacao.
     * @example
     * // Create one Alocacao
     * const Alocacao = await prisma.alocacao.create({
     *   data: {
     *     // ... data to create a Alocacao
     *   }
     * })
     * 
     */
    create<T extends AlocacaoCreateArgs>(args: SelectSubset<T, AlocacaoCreateArgs<ExtArgs>>): Prisma__AlocacaoClient<$Result.GetResult<Prisma.$AlocacaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Alocacaos.
     * @param {AlocacaoCreateManyArgs} args - Arguments to create many Alocacaos.
     * @example
     * // Create many Alocacaos
     * const alocacao = await prisma.alocacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlocacaoCreateManyArgs>(args?: SelectSubset<T, AlocacaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Alocacaos and returns the data saved in the database.
     * @param {AlocacaoCreateManyAndReturnArgs} args - Arguments to create many Alocacaos.
     * @example
     * // Create many Alocacaos
     * const alocacao = await prisma.alocacao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Alocacaos and only return the `id`
     * const alocacaoWithIdOnly = await prisma.alocacao.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlocacaoCreateManyAndReturnArgs>(args?: SelectSubset<T, AlocacaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlocacaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Alocacao.
     * @param {AlocacaoDeleteArgs} args - Arguments to delete one Alocacao.
     * @example
     * // Delete one Alocacao
     * const Alocacao = await prisma.alocacao.delete({
     *   where: {
     *     // ... filter to delete one Alocacao
     *   }
     * })
     * 
     */
    delete<T extends AlocacaoDeleteArgs>(args: SelectSubset<T, AlocacaoDeleteArgs<ExtArgs>>): Prisma__AlocacaoClient<$Result.GetResult<Prisma.$AlocacaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Alocacao.
     * @param {AlocacaoUpdateArgs} args - Arguments to update one Alocacao.
     * @example
     * // Update one Alocacao
     * const alocacao = await prisma.alocacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlocacaoUpdateArgs>(args: SelectSubset<T, AlocacaoUpdateArgs<ExtArgs>>): Prisma__AlocacaoClient<$Result.GetResult<Prisma.$AlocacaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Alocacaos.
     * @param {AlocacaoDeleteManyArgs} args - Arguments to filter Alocacaos to delete.
     * @example
     * // Delete a few Alocacaos
     * const { count } = await prisma.alocacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlocacaoDeleteManyArgs>(args?: SelectSubset<T, AlocacaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alocacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlocacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alocacaos
     * const alocacao = await prisma.alocacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlocacaoUpdateManyArgs>(args: SelectSubset<T, AlocacaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alocacaos and returns the data updated in the database.
     * @param {AlocacaoUpdateManyAndReturnArgs} args - Arguments to update many Alocacaos.
     * @example
     * // Update many Alocacaos
     * const alocacao = await prisma.alocacao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Alocacaos and only return the `id`
     * const alocacaoWithIdOnly = await prisma.alocacao.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AlocacaoUpdateManyAndReturnArgs>(args: SelectSubset<T, AlocacaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlocacaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Alocacao.
     * @param {AlocacaoUpsertArgs} args - Arguments to update or create a Alocacao.
     * @example
     * // Update or create a Alocacao
     * const alocacao = await prisma.alocacao.upsert({
     *   create: {
     *     // ... data to create a Alocacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alocacao we want to update
     *   }
     * })
     */
    upsert<T extends AlocacaoUpsertArgs>(args: SelectSubset<T, AlocacaoUpsertArgs<ExtArgs>>): Prisma__AlocacaoClient<$Result.GetResult<Prisma.$AlocacaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Alocacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlocacaoCountArgs} args - Arguments to filter Alocacaos to count.
     * @example
     * // Count the number of Alocacaos
     * const count = await prisma.alocacao.count({
     *   where: {
     *     // ... the filter for the Alocacaos we want to count
     *   }
     * })
    **/
    count<T extends AlocacaoCountArgs>(
      args?: Subset<T, AlocacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlocacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alocacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlocacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlocacaoAggregateArgs>(args: Subset<T, AlocacaoAggregateArgs>): Prisma.PrismaPromise<GetAlocacaoAggregateType<T>>

    /**
     * Group by Alocacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlocacaoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlocacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlocacaoGroupByArgs['orderBy'] }
        : { orderBy?: AlocacaoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlocacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlocacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Alocacao model
   */
  readonly fields: AlocacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Alocacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlocacaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    disciplina<T extends DisciplinaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DisciplinaDefaultArgs<ExtArgs>>): Prisma__DisciplinaClient<$Result.GetResult<Prisma.$DisciplinaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    turma<T extends TurmaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TurmaDefaultArgs<ExtArgs>>): Prisma__TurmaClient<$Result.GetResult<Prisma.$TurmaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sala<T extends SalaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SalaDefaultArgs<ExtArgs>>): Prisma__SalaClient<$Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    horario<T extends HorarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HorarioDefaultArgs<ExtArgs>>): Prisma__HorarioClient<$Result.GetResult<Prisma.$HorarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Alocacao model
   */
  interface AlocacaoFieldRefs {
    readonly id: FieldRef<"Alocacao", 'String'>
    readonly id_user: FieldRef<"Alocacao", 'String'>
    readonly id_disciplina: FieldRef<"Alocacao", 'String'>
    readonly id_turma: FieldRef<"Alocacao", 'String'>
    readonly id_sala: FieldRef<"Alocacao", 'String'>
    readonly id_horario: FieldRef<"Alocacao", 'String'>
    readonly created_at: FieldRef<"Alocacao", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Alocacao findUnique
   */
  export type AlocacaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoInclude<ExtArgs> | null
    /**
     * Filter, which Alocacao to fetch.
     */
    where: AlocacaoWhereUniqueInput
  }

  /**
   * Alocacao findUniqueOrThrow
   */
  export type AlocacaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoInclude<ExtArgs> | null
    /**
     * Filter, which Alocacao to fetch.
     */
    where: AlocacaoWhereUniqueInput
  }

  /**
   * Alocacao findFirst
   */
  export type AlocacaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoInclude<ExtArgs> | null
    /**
     * Filter, which Alocacao to fetch.
     */
    where?: AlocacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alocacaos to fetch.
     */
    orderBy?: AlocacaoOrderByWithRelationInput | AlocacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alocacaos.
     */
    cursor?: AlocacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alocacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alocacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alocacaos.
     */
    distinct?: AlocacaoScalarFieldEnum | AlocacaoScalarFieldEnum[]
  }

  /**
   * Alocacao findFirstOrThrow
   */
  export type AlocacaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoInclude<ExtArgs> | null
    /**
     * Filter, which Alocacao to fetch.
     */
    where?: AlocacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alocacaos to fetch.
     */
    orderBy?: AlocacaoOrderByWithRelationInput | AlocacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alocacaos.
     */
    cursor?: AlocacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alocacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alocacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alocacaos.
     */
    distinct?: AlocacaoScalarFieldEnum | AlocacaoScalarFieldEnum[]
  }

  /**
   * Alocacao findMany
   */
  export type AlocacaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoInclude<ExtArgs> | null
    /**
     * Filter, which Alocacaos to fetch.
     */
    where?: AlocacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alocacaos to fetch.
     */
    orderBy?: AlocacaoOrderByWithRelationInput | AlocacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Alocacaos.
     */
    cursor?: AlocacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alocacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alocacaos.
     */
    skip?: number
    distinct?: AlocacaoScalarFieldEnum | AlocacaoScalarFieldEnum[]
  }

  /**
   * Alocacao create
   */
  export type AlocacaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoInclude<ExtArgs> | null
    /**
     * The data needed to create a Alocacao.
     */
    data: XOR<AlocacaoCreateInput, AlocacaoUncheckedCreateInput>
  }

  /**
   * Alocacao createMany
   */
  export type AlocacaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Alocacaos.
     */
    data: AlocacaoCreateManyInput | AlocacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Alocacao createManyAndReturn
   */
  export type AlocacaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * The data used to create many Alocacaos.
     */
    data: AlocacaoCreateManyInput | AlocacaoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Alocacao update
   */
  export type AlocacaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoInclude<ExtArgs> | null
    /**
     * The data needed to update a Alocacao.
     */
    data: XOR<AlocacaoUpdateInput, AlocacaoUncheckedUpdateInput>
    /**
     * Choose, which Alocacao to update.
     */
    where: AlocacaoWhereUniqueInput
  }

  /**
   * Alocacao updateMany
   */
  export type AlocacaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Alocacaos.
     */
    data: XOR<AlocacaoUpdateManyMutationInput, AlocacaoUncheckedUpdateManyInput>
    /**
     * Filter which Alocacaos to update
     */
    where?: AlocacaoWhereInput
    /**
     * Limit how many Alocacaos to update.
     */
    limit?: number
  }

  /**
   * Alocacao updateManyAndReturn
   */
  export type AlocacaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * The data used to update Alocacaos.
     */
    data: XOR<AlocacaoUpdateManyMutationInput, AlocacaoUncheckedUpdateManyInput>
    /**
     * Filter which Alocacaos to update
     */
    where?: AlocacaoWhereInput
    /**
     * Limit how many Alocacaos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Alocacao upsert
   */
  export type AlocacaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoInclude<ExtArgs> | null
    /**
     * The filter to search for the Alocacao to update in case it exists.
     */
    where: AlocacaoWhereUniqueInput
    /**
     * In case the Alocacao found by the `where` argument doesn't exist, create a new Alocacao with this data.
     */
    create: XOR<AlocacaoCreateInput, AlocacaoUncheckedCreateInput>
    /**
     * In case the Alocacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlocacaoUpdateInput, AlocacaoUncheckedUpdateInput>
  }

  /**
   * Alocacao delete
   */
  export type AlocacaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoInclude<ExtArgs> | null
    /**
     * Filter which Alocacao to delete.
     */
    where: AlocacaoWhereUniqueInput
  }

  /**
   * Alocacao deleteMany
   */
  export type AlocacaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alocacaos to delete
     */
    where?: AlocacaoWhereInput
    /**
     * Limit how many Alocacaos to delete.
     */
    limit?: number
  }

  /**
   * Alocacao without action
   */
  export type AlocacaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alocacao
     */
    select?: AlocacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alocacao
     */
    omit?: AlocacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlocacaoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    email: 'email',
    senha: 'senha',
    role: 'role',
    especializacao: 'especializacao',
    cargaHorariaMax: 'cargaHorariaMax',
    preferencia: 'preferencia'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DisciplinaScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    cargaHorariaTotal: 'cargaHorariaTotal'
  };

  export type DisciplinaScalarFieldEnum = (typeof DisciplinaScalarFieldEnum)[keyof typeof DisciplinaScalarFieldEnum]


  export const TurmaScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    numAlunos: 'numAlunos',
    periodo: 'periodo',
    turno: 'turno'
  };

  export type TurmaScalarFieldEnum = (typeof TurmaScalarFieldEnum)[keyof typeof TurmaScalarFieldEnum]


  export const SalaScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    predio: 'predio',
    capacidade: 'capacidade',
    tipo: 'tipo'
  };

  export type SalaScalarFieldEnum = (typeof SalaScalarFieldEnum)[keyof typeof SalaScalarFieldEnum]


  export const HorarioScalarFieldEnum: {
    id: 'id',
    diaSemana: 'diaSemana',
    horarioInicio: 'horarioInicio',
    horarioFim: 'horarioFim'
  };

  export type HorarioScalarFieldEnum = (typeof HorarioScalarFieldEnum)[keyof typeof HorarioScalarFieldEnum]


  export const AlocacaoScalarFieldEnum: {
    id: 'id',
    id_user: 'id_user',
    id_disciplina: 'id_disciplina',
    id_turma: 'id_turma',
    id_sala: 'id_sala',
    id_horario: 'id_horario',
    created_at: 'created_at'
  };

  export type AlocacaoScalarFieldEnum = (typeof AlocacaoScalarFieldEnum)[keyof typeof AlocacaoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    nome?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    senha?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    especializacao?: StringFilter<"User"> | string
    cargaHorariaMax?: IntFilter<"User"> | number
    preferencia?: StringNullableFilter<"User"> | string | null
    alocacoes?: AlocacaoListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    especializacao?: SortOrder
    cargaHorariaMax?: SortOrder
    preferencia?: SortOrderInput | SortOrder
    alocacoes?: AlocacaoOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nome?: StringFilter<"User"> | string
    senha?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    especializacao?: StringFilter<"User"> | string
    cargaHorariaMax?: IntFilter<"User"> | number
    preferencia?: StringNullableFilter<"User"> | string | null
    alocacoes?: AlocacaoListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    especializacao?: SortOrder
    cargaHorariaMax?: SortOrder
    preferencia?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    nome?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    senha?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    especializacao?: StringWithAggregatesFilter<"User"> | string
    cargaHorariaMax?: IntWithAggregatesFilter<"User"> | number
    preferencia?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type DisciplinaWhereInput = {
    AND?: DisciplinaWhereInput | DisciplinaWhereInput[]
    OR?: DisciplinaWhereInput[]
    NOT?: DisciplinaWhereInput | DisciplinaWhereInput[]
    id?: StringFilter<"Disciplina"> | string
    nome?: StringFilter<"Disciplina"> | string
    cargaHorariaTotal?: IntFilter<"Disciplina"> | number
    alocacoes?: AlocacaoListRelationFilter
  }

  export type DisciplinaOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    cargaHorariaTotal?: SortOrder
    alocacoes?: AlocacaoOrderByRelationAggregateInput
  }

  export type DisciplinaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DisciplinaWhereInput | DisciplinaWhereInput[]
    OR?: DisciplinaWhereInput[]
    NOT?: DisciplinaWhereInput | DisciplinaWhereInput[]
    nome?: StringFilter<"Disciplina"> | string
    cargaHorariaTotal?: IntFilter<"Disciplina"> | number
    alocacoes?: AlocacaoListRelationFilter
  }, "id">

  export type DisciplinaOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    cargaHorariaTotal?: SortOrder
    _count?: DisciplinaCountOrderByAggregateInput
    _avg?: DisciplinaAvgOrderByAggregateInput
    _max?: DisciplinaMaxOrderByAggregateInput
    _min?: DisciplinaMinOrderByAggregateInput
    _sum?: DisciplinaSumOrderByAggregateInput
  }

  export type DisciplinaScalarWhereWithAggregatesInput = {
    AND?: DisciplinaScalarWhereWithAggregatesInput | DisciplinaScalarWhereWithAggregatesInput[]
    OR?: DisciplinaScalarWhereWithAggregatesInput[]
    NOT?: DisciplinaScalarWhereWithAggregatesInput | DisciplinaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Disciplina"> | string
    nome?: StringWithAggregatesFilter<"Disciplina"> | string
    cargaHorariaTotal?: IntWithAggregatesFilter<"Disciplina"> | number
  }

  export type TurmaWhereInput = {
    AND?: TurmaWhereInput | TurmaWhereInput[]
    OR?: TurmaWhereInput[]
    NOT?: TurmaWhereInput | TurmaWhereInput[]
    id?: StringFilter<"Turma"> | string
    nome?: StringFilter<"Turma"> | string
    numAlunos?: IntFilter<"Turma"> | number
    periodo?: IntFilter<"Turma"> | number
    turno?: StringFilter<"Turma"> | string
    alocacoes?: AlocacaoListRelationFilter
  }

  export type TurmaOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    numAlunos?: SortOrder
    periodo?: SortOrder
    turno?: SortOrder
    alocacoes?: AlocacaoOrderByRelationAggregateInput
  }

  export type TurmaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TurmaWhereInput | TurmaWhereInput[]
    OR?: TurmaWhereInput[]
    NOT?: TurmaWhereInput | TurmaWhereInput[]
    nome?: StringFilter<"Turma"> | string
    numAlunos?: IntFilter<"Turma"> | number
    periodo?: IntFilter<"Turma"> | number
    turno?: StringFilter<"Turma"> | string
    alocacoes?: AlocacaoListRelationFilter
  }, "id">

  export type TurmaOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    numAlunos?: SortOrder
    periodo?: SortOrder
    turno?: SortOrder
    _count?: TurmaCountOrderByAggregateInput
    _avg?: TurmaAvgOrderByAggregateInput
    _max?: TurmaMaxOrderByAggregateInput
    _min?: TurmaMinOrderByAggregateInput
    _sum?: TurmaSumOrderByAggregateInput
  }

  export type TurmaScalarWhereWithAggregatesInput = {
    AND?: TurmaScalarWhereWithAggregatesInput | TurmaScalarWhereWithAggregatesInput[]
    OR?: TurmaScalarWhereWithAggregatesInput[]
    NOT?: TurmaScalarWhereWithAggregatesInput | TurmaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Turma"> | string
    nome?: StringWithAggregatesFilter<"Turma"> | string
    numAlunos?: IntWithAggregatesFilter<"Turma"> | number
    periodo?: IntWithAggregatesFilter<"Turma"> | number
    turno?: StringWithAggregatesFilter<"Turma"> | string
  }

  export type SalaWhereInput = {
    AND?: SalaWhereInput | SalaWhereInput[]
    OR?: SalaWhereInput[]
    NOT?: SalaWhereInput | SalaWhereInput[]
    id?: StringFilter<"Sala"> | string
    nome?: StringFilter<"Sala"> | string
    predio?: StringFilter<"Sala"> | string
    capacidade?: IntFilter<"Sala"> | number
    tipo?: StringFilter<"Sala"> | string
    alocacoes?: AlocacaoListRelationFilter
  }

  export type SalaOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    predio?: SortOrder
    capacidade?: SortOrder
    tipo?: SortOrder
    alocacoes?: AlocacaoOrderByRelationAggregateInput
  }

  export type SalaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SalaWhereInput | SalaWhereInput[]
    OR?: SalaWhereInput[]
    NOT?: SalaWhereInput | SalaWhereInput[]
    nome?: StringFilter<"Sala"> | string
    predio?: StringFilter<"Sala"> | string
    capacidade?: IntFilter<"Sala"> | number
    tipo?: StringFilter<"Sala"> | string
    alocacoes?: AlocacaoListRelationFilter
  }, "id">

  export type SalaOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    predio?: SortOrder
    capacidade?: SortOrder
    tipo?: SortOrder
    _count?: SalaCountOrderByAggregateInput
    _avg?: SalaAvgOrderByAggregateInput
    _max?: SalaMaxOrderByAggregateInput
    _min?: SalaMinOrderByAggregateInput
    _sum?: SalaSumOrderByAggregateInput
  }

  export type SalaScalarWhereWithAggregatesInput = {
    AND?: SalaScalarWhereWithAggregatesInput | SalaScalarWhereWithAggregatesInput[]
    OR?: SalaScalarWhereWithAggregatesInput[]
    NOT?: SalaScalarWhereWithAggregatesInput | SalaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Sala"> | string
    nome?: StringWithAggregatesFilter<"Sala"> | string
    predio?: StringWithAggregatesFilter<"Sala"> | string
    capacidade?: IntWithAggregatesFilter<"Sala"> | number
    tipo?: StringWithAggregatesFilter<"Sala"> | string
  }

  export type HorarioWhereInput = {
    AND?: HorarioWhereInput | HorarioWhereInput[]
    OR?: HorarioWhereInput[]
    NOT?: HorarioWhereInput | HorarioWhereInput[]
    id?: StringFilter<"Horario"> | string
    diaSemana?: StringFilter<"Horario"> | string
    horarioInicio?: DateTimeFilter<"Horario"> | Date | string
    horarioFim?: DateTimeFilter<"Horario"> | Date | string
    alocacoes?: AlocacaoListRelationFilter
  }

  export type HorarioOrderByWithRelationInput = {
    id?: SortOrder
    diaSemana?: SortOrder
    horarioInicio?: SortOrder
    horarioFim?: SortOrder
    alocacoes?: AlocacaoOrderByRelationAggregateInput
  }

  export type HorarioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: HorarioWhereInput | HorarioWhereInput[]
    OR?: HorarioWhereInput[]
    NOT?: HorarioWhereInput | HorarioWhereInput[]
    diaSemana?: StringFilter<"Horario"> | string
    horarioInicio?: DateTimeFilter<"Horario"> | Date | string
    horarioFim?: DateTimeFilter<"Horario"> | Date | string
    alocacoes?: AlocacaoListRelationFilter
  }, "id">

  export type HorarioOrderByWithAggregationInput = {
    id?: SortOrder
    diaSemana?: SortOrder
    horarioInicio?: SortOrder
    horarioFim?: SortOrder
    _count?: HorarioCountOrderByAggregateInput
    _max?: HorarioMaxOrderByAggregateInput
    _min?: HorarioMinOrderByAggregateInput
  }

  export type HorarioScalarWhereWithAggregatesInput = {
    AND?: HorarioScalarWhereWithAggregatesInput | HorarioScalarWhereWithAggregatesInput[]
    OR?: HorarioScalarWhereWithAggregatesInput[]
    NOT?: HorarioScalarWhereWithAggregatesInput | HorarioScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Horario"> | string
    diaSemana?: StringWithAggregatesFilter<"Horario"> | string
    horarioInicio?: DateTimeWithAggregatesFilter<"Horario"> | Date | string
    horarioFim?: DateTimeWithAggregatesFilter<"Horario"> | Date | string
  }

  export type AlocacaoWhereInput = {
    AND?: AlocacaoWhereInput | AlocacaoWhereInput[]
    OR?: AlocacaoWhereInput[]
    NOT?: AlocacaoWhereInput | AlocacaoWhereInput[]
    id?: StringFilter<"Alocacao"> | string
    id_user?: StringFilter<"Alocacao"> | string
    id_disciplina?: StringFilter<"Alocacao"> | string
    id_turma?: StringFilter<"Alocacao"> | string
    id_sala?: StringFilter<"Alocacao"> | string
    id_horario?: StringFilter<"Alocacao"> | string
    created_at?: DateTimeFilter<"Alocacao"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    disciplina?: XOR<DisciplinaScalarRelationFilter, DisciplinaWhereInput>
    turma?: XOR<TurmaScalarRelationFilter, TurmaWhereInput>
    sala?: XOR<SalaScalarRelationFilter, SalaWhereInput>
    horario?: XOR<HorarioScalarRelationFilter, HorarioWhereInput>
  }

  export type AlocacaoOrderByWithRelationInput = {
    id?: SortOrder
    id_user?: SortOrder
    id_disciplina?: SortOrder
    id_turma?: SortOrder
    id_sala?: SortOrder
    id_horario?: SortOrder
    created_at?: SortOrder
    user?: UserOrderByWithRelationInput
    disciplina?: DisciplinaOrderByWithRelationInput
    turma?: TurmaOrderByWithRelationInput
    sala?: SalaOrderByWithRelationInput
    horario?: HorarioOrderByWithRelationInput
  }

  export type AlocacaoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AlocacaoWhereInput | AlocacaoWhereInput[]
    OR?: AlocacaoWhereInput[]
    NOT?: AlocacaoWhereInput | AlocacaoWhereInput[]
    id_user?: StringFilter<"Alocacao"> | string
    id_disciplina?: StringFilter<"Alocacao"> | string
    id_turma?: StringFilter<"Alocacao"> | string
    id_sala?: StringFilter<"Alocacao"> | string
    id_horario?: StringFilter<"Alocacao"> | string
    created_at?: DateTimeFilter<"Alocacao"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    disciplina?: XOR<DisciplinaScalarRelationFilter, DisciplinaWhereInput>
    turma?: XOR<TurmaScalarRelationFilter, TurmaWhereInput>
    sala?: XOR<SalaScalarRelationFilter, SalaWhereInput>
    horario?: XOR<HorarioScalarRelationFilter, HorarioWhereInput>
  }, "id">

  export type AlocacaoOrderByWithAggregationInput = {
    id?: SortOrder
    id_user?: SortOrder
    id_disciplina?: SortOrder
    id_turma?: SortOrder
    id_sala?: SortOrder
    id_horario?: SortOrder
    created_at?: SortOrder
    _count?: AlocacaoCountOrderByAggregateInput
    _max?: AlocacaoMaxOrderByAggregateInput
    _min?: AlocacaoMinOrderByAggregateInput
  }

  export type AlocacaoScalarWhereWithAggregatesInput = {
    AND?: AlocacaoScalarWhereWithAggregatesInput | AlocacaoScalarWhereWithAggregatesInput[]
    OR?: AlocacaoScalarWhereWithAggregatesInput[]
    NOT?: AlocacaoScalarWhereWithAggregatesInput | AlocacaoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Alocacao"> | string
    id_user?: StringWithAggregatesFilter<"Alocacao"> | string
    id_disciplina?: StringWithAggregatesFilter<"Alocacao"> | string
    id_turma?: StringWithAggregatesFilter<"Alocacao"> | string
    id_sala?: StringWithAggregatesFilter<"Alocacao"> | string
    id_horario?: StringWithAggregatesFilter<"Alocacao"> | string
    created_at?: DateTimeWithAggregatesFilter<"Alocacao"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    nome: string
    email: string
    senha: string
    role?: string
    especializacao: string
    cargaHorariaMax: number
    preferencia?: string | null
    alocacoes?: AlocacaoCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    nome: string
    email: string
    senha: string
    role?: string
    especializacao: string
    cargaHorariaMax: number
    preferencia?: string | null
    alocacoes?: AlocacaoUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    especializacao?: StringFieldUpdateOperationsInput | string
    cargaHorariaMax?: IntFieldUpdateOperationsInput | number
    preferencia?: NullableStringFieldUpdateOperationsInput | string | null
    alocacoes?: AlocacaoUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    especializacao?: StringFieldUpdateOperationsInput | string
    cargaHorariaMax?: IntFieldUpdateOperationsInput | number
    preferencia?: NullableStringFieldUpdateOperationsInput | string | null
    alocacoes?: AlocacaoUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    nome: string
    email: string
    senha: string
    role?: string
    especializacao: string
    cargaHorariaMax: number
    preferencia?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    especializacao?: StringFieldUpdateOperationsInput | string
    cargaHorariaMax?: IntFieldUpdateOperationsInput | number
    preferencia?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    especializacao?: StringFieldUpdateOperationsInput | string
    cargaHorariaMax?: IntFieldUpdateOperationsInput | number
    preferencia?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DisciplinaCreateInput = {
    id?: string
    nome: string
    cargaHorariaTotal: number
    alocacoes?: AlocacaoCreateNestedManyWithoutDisciplinaInput
  }

  export type DisciplinaUncheckedCreateInput = {
    id?: string
    nome: string
    cargaHorariaTotal: number
    alocacoes?: AlocacaoUncheckedCreateNestedManyWithoutDisciplinaInput
  }

  export type DisciplinaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cargaHorariaTotal?: IntFieldUpdateOperationsInput | number
    alocacoes?: AlocacaoUpdateManyWithoutDisciplinaNestedInput
  }

  export type DisciplinaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cargaHorariaTotal?: IntFieldUpdateOperationsInput | number
    alocacoes?: AlocacaoUncheckedUpdateManyWithoutDisciplinaNestedInput
  }

  export type DisciplinaCreateManyInput = {
    id?: string
    nome: string
    cargaHorariaTotal: number
  }

  export type DisciplinaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cargaHorariaTotal?: IntFieldUpdateOperationsInput | number
  }

  export type DisciplinaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cargaHorariaTotal?: IntFieldUpdateOperationsInput | number
  }

  export type TurmaCreateInput = {
    id?: string
    nome: string
    numAlunos: number
    periodo: number
    turno: string
    alocacoes?: AlocacaoCreateNestedManyWithoutTurmaInput
  }

  export type TurmaUncheckedCreateInput = {
    id?: string
    nome: string
    numAlunos: number
    periodo: number
    turno: string
    alocacoes?: AlocacaoUncheckedCreateNestedManyWithoutTurmaInput
  }

  export type TurmaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    numAlunos?: IntFieldUpdateOperationsInput | number
    periodo?: IntFieldUpdateOperationsInput | number
    turno?: StringFieldUpdateOperationsInput | string
    alocacoes?: AlocacaoUpdateManyWithoutTurmaNestedInput
  }

  export type TurmaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    numAlunos?: IntFieldUpdateOperationsInput | number
    periodo?: IntFieldUpdateOperationsInput | number
    turno?: StringFieldUpdateOperationsInput | string
    alocacoes?: AlocacaoUncheckedUpdateManyWithoutTurmaNestedInput
  }

  export type TurmaCreateManyInput = {
    id?: string
    nome: string
    numAlunos: number
    periodo: number
    turno: string
  }

  export type TurmaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    numAlunos?: IntFieldUpdateOperationsInput | number
    periodo?: IntFieldUpdateOperationsInput | number
    turno?: StringFieldUpdateOperationsInput | string
  }

  export type TurmaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    numAlunos?: IntFieldUpdateOperationsInput | number
    periodo?: IntFieldUpdateOperationsInput | number
    turno?: StringFieldUpdateOperationsInput | string
  }

  export type SalaCreateInput = {
    id?: string
    nome: string
    predio: string
    capacidade: number
    tipo: string
    alocacoes?: AlocacaoCreateNestedManyWithoutSalaInput
  }

  export type SalaUncheckedCreateInput = {
    id?: string
    nome: string
    predio: string
    capacidade: number
    tipo: string
    alocacoes?: AlocacaoUncheckedCreateNestedManyWithoutSalaInput
  }

  export type SalaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    predio?: StringFieldUpdateOperationsInput | string
    capacidade?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    alocacoes?: AlocacaoUpdateManyWithoutSalaNestedInput
  }

  export type SalaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    predio?: StringFieldUpdateOperationsInput | string
    capacidade?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
    alocacoes?: AlocacaoUncheckedUpdateManyWithoutSalaNestedInput
  }

  export type SalaCreateManyInput = {
    id?: string
    nome: string
    predio: string
    capacidade: number
    tipo: string
  }

  export type SalaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    predio?: StringFieldUpdateOperationsInput | string
    capacidade?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
  }

  export type SalaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    predio?: StringFieldUpdateOperationsInput | string
    capacidade?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
  }

  export type HorarioCreateInput = {
    id?: string
    diaSemana: string
    horarioInicio: Date | string
    horarioFim: Date | string
    alocacoes?: AlocacaoCreateNestedManyWithoutHorarioInput
  }

  export type HorarioUncheckedCreateInput = {
    id?: string
    diaSemana: string
    horarioInicio: Date | string
    horarioFim: Date | string
    alocacoes?: AlocacaoUncheckedCreateNestedManyWithoutHorarioInput
  }

  export type HorarioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    diaSemana?: StringFieldUpdateOperationsInput | string
    horarioInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    horarioFim?: DateTimeFieldUpdateOperationsInput | Date | string
    alocacoes?: AlocacaoUpdateManyWithoutHorarioNestedInput
  }

  export type HorarioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    diaSemana?: StringFieldUpdateOperationsInput | string
    horarioInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    horarioFim?: DateTimeFieldUpdateOperationsInput | Date | string
    alocacoes?: AlocacaoUncheckedUpdateManyWithoutHorarioNestedInput
  }

  export type HorarioCreateManyInput = {
    id?: string
    diaSemana: string
    horarioInicio: Date | string
    horarioFim: Date | string
  }

  export type HorarioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    diaSemana?: StringFieldUpdateOperationsInput | string
    horarioInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    horarioFim?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HorarioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    diaSemana?: StringFieldUpdateOperationsInput | string
    horarioInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    horarioFim?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlocacaoCreateInput = {
    id?: string
    created_at?: Date | string
    user: UserCreateNestedOneWithoutAlocacoesInput
    disciplina: DisciplinaCreateNestedOneWithoutAlocacoesInput
    turma: TurmaCreateNestedOneWithoutAlocacoesInput
    sala: SalaCreateNestedOneWithoutAlocacoesInput
    horario: HorarioCreateNestedOneWithoutAlocacoesInput
  }

  export type AlocacaoUncheckedCreateInput = {
    id?: string
    id_user: string
    id_disciplina: string
    id_turma: string
    id_sala: string
    id_horario: string
    created_at?: Date | string
  }

  export type AlocacaoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAlocacoesNestedInput
    disciplina?: DisciplinaUpdateOneRequiredWithoutAlocacoesNestedInput
    turma?: TurmaUpdateOneRequiredWithoutAlocacoesNestedInput
    sala?: SalaUpdateOneRequiredWithoutAlocacoesNestedInput
    horario?: HorarioUpdateOneRequiredWithoutAlocacoesNestedInput
  }

  export type AlocacaoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_user?: StringFieldUpdateOperationsInput | string
    id_disciplina?: StringFieldUpdateOperationsInput | string
    id_turma?: StringFieldUpdateOperationsInput | string
    id_sala?: StringFieldUpdateOperationsInput | string
    id_horario?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlocacaoCreateManyInput = {
    id?: string
    id_user: string
    id_disciplina: string
    id_turma: string
    id_sala: string
    id_horario: string
    created_at?: Date | string
  }

  export type AlocacaoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlocacaoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_user?: StringFieldUpdateOperationsInput | string
    id_disciplina?: StringFieldUpdateOperationsInput | string
    id_turma?: StringFieldUpdateOperationsInput | string
    id_sala?: StringFieldUpdateOperationsInput | string
    id_horario?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type AlocacaoListRelationFilter = {
    every?: AlocacaoWhereInput
    some?: AlocacaoWhereInput
    none?: AlocacaoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AlocacaoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    especializacao?: SortOrder
    cargaHorariaMax?: SortOrder
    preferencia?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    cargaHorariaMax?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    especializacao?: SortOrder
    cargaHorariaMax?: SortOrder
    preferencia?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    role?: SortOrder
    especializacao?: SortOrder
    cargaHorariaMax?: SortOrder
    preferencia?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    cargaHorariaMax?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DisciplinaCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cargaHorariaTotal?: SortOrder
  }

  export type DisciplinaAvgOrderByAggregateInput = {
    cargaHorariaTotal?: SortOrder
  }

  export type DisciplinaMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cargaHorariaTotal?: SortOrder
  }

  export type DisciplinaMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    cargaHorariaTotal?: SortOrder
  }

  export type DisciplinaSumOrderByAggregateInput = {
    cargaHorariaTotal?: SortOrder
  }

  export type TurmaCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    numAlunos?: SortOrder
    periodo?: SortOrder
    turno?: SortOrder
  }

  export type TurmaAvgOrderByAggregateInput = {
    numAlunos?: SortOrder
    periodo?: SortOrder
  }

  export type TurmaMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    numAlunos?: SortOrder
    periodo?: SortOrder
    turno?: SortOrder
  }

  export type TurmaMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    numAlunos?: SortOrder
    periodo?: SortOrder
    turno?: SortOrder
  }

  export type TurmaSumOrderByAggregateInput = {
    numAlunos?: SortOrder
    periodo?: SortOrder
  }

  export type SalaCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    predio?: SortOrder
    capacidade?: SortOrder
    tipo?: SortOrder
  }

  export type SalaAvgOrderByAggregateInput = {
    capacidade?: SortOrder
  }

  export type SalaMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    predio?: SortOrder
    capacidade?: SortOrder
    tipo?: SortOrder
  }

  export type SalaMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    predio?: SortOrder
    capacidade?: SortOrder
    tipo?: SortOrder
  }

  export type SalaSumOrderByAggregateInput = {
    capacidade?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type HorarioCountOrderByAggregateInput = {
    id?: SortOrder
    diaSemana?: SortOrder
    horarioInicio?: SortOrder
    horarioFim?: SortOrder
  }

  export type HorarioMaxOrderByAggregateInput = {
    id?: SortOrder
    diaSemana?: SortOrder
    horarioInicio?: SortOrder
    horarioFim?: SortOrder
  }

  export type HorarioMinOrderByAggregateInput = {
    id?: SortOrder
    diaSemana?: SortOrder
    horarioInicio?: SortOrder
    horarioFim?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DisciplinaScalarRelationFilter = {
    is?: DisciplinaWhereInput
    isNot?: DisciplinaWhereInput
  }

  export type TurmaScalarRelationFilter = {
    is?: TurmaWhereInput
    isNot?: TurmaWhereInput
  }

  export type SalaScalarRelationFilter = {
    is?: SalaWhereInput
    isNot?: SalaWhereInput
  }

  export type HorarioScalarRelationFilter = {
    is?: HorarioWhereInput
    isNot?: HorarioWhereInput
  }

  export type AlocacaoCountOrderByAggregateInput = {
    id?: SortOrder
    id_user?: SortOrder
    id_disciplina?: SortOrder
    id_turma?: SortOrder
    id_sala?: SortOrder
    id_horario?: SortOrder
    created_at?: SortOrder
  }

  export type AlocacaoMaxOrderByAggregateInput = {
    id?: SortOrder
    id_user?: SortOrder
    id_disciplina?: SortOrder
    id_turma?: SortOrder
    id_sala?: SortOrder
    id_horario?: SortOrder
    created_at?: SortOrder
  }

  export type AlocacaoMinOrderByAggregateInput = {
    id?: SortOrder
    id_user?: SortOrder
    id_disciplina?: SortOrder
    id_turma?: SortOrder
    id_sala?: SortOrder
    id_horario?: SortOrder
    created_at?: SortOrder
  }

  export type AlocacaoCreateNestedManyWithoutUserInput = {
    create?: XOR<AlocacaoCreateWithoutUserInput, AlocacaoUncheckedCreateWithoutUserInput> | AlocacaoCreateWithoutUserInput[] | AlocacaoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutUserInput | AlocacaoCreateOrConnectWithoutUserInput[]
    createMany?: AlocacaoCreateManyUserInputEnvelope
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
  }

  export type AlocacaoUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AlocacaoCreateWithoutUserInput, AlocacaoUncheckedCreateWithoutUserInput> | AlocacaoCreateWithoutUserInput[] | AlocacaoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutUserInput | AlocacaoCreateOrConnectWithoutUserInput[]
    createMany?: AlocacaoCreateManyUserInputEnvelope
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type AlocacaoUpdateManyWithoutUserNestedInput = {
    create?: XOR<AlocacaoCreateWithoutUserInput, AlocacaoUncheckedCreateWithoutUserInput> | AlocacaoCreateWithoutUserInput[] | AlocacaoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutUserInput | AlocacaoCreateOrConnectWithoutUserInput[]
    upsert?: AlocacaoUpsertWithWhereUniqueWithoutUserInput | AlocacaoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AlocacaoCreateManyUserInputEnvelope
    set?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    disconnect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    delete?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    update?: AlocacaoUpdateWithWhereUniqueWithoutUserInput | AlocacaoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AlocacaoUpdateManyWithWhereWithoutUserInput | AlocacaoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AlocacaoScalarWhereInput | AlocacaoScalarWhereInput[]
  }

  export type AlocacaoUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AlocacaoCreateWithoutUserInput, AlocacaoUncheckedCreateWithoutUserInput> | AlocacaoCreateWithoutUserInput[] | AlocacaoUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutUserInput | AlocacaoCreateOrConnectWithoutUserInput[]
    upsert?: AlocacaoUpsertWithWhereUniqueWithoutUserInput | AlocacaoUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AlocacaoCreateManyUserInputEnvelope
    set?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    disconnect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    delete?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    update?: AlocacaoUpdateWithWhereUniqueWithoutUserInput | AlocacaoUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AlocacaoUpdateManyWithWhereWithoutUserInput | AlocacaoUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AlocacaoScalarWhereInput | AlocacaoScalarWhereInput[]
  }

  export type AlocacaoCreateNestedManyWithoutDisciplinaInput = {
    create?: XOR<AlocacaoCreateWithoutDisciplinaInput, AlocacaoUncheckedCreateWithoutDisciplinaInput> | AlocacaoCreateWithoutDisciplinaInput[] | AlocacaoUncheckedCreateWithoutDisciplinaInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutDisciplinaInput | AlocacaoCreateOrConnectWithoutDisciplinaInput[]
    createMany?: AlocacaoCreateManyDisciplinaInputEnvelope
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
  }

  export type AlocacaoUncheckedCreateNestedManyWithoutDisciplinaInput = {
    create?: XOR<AlocacaoCreateWithoutDisciplinaInput, AlocacaoUncheckedCreateWithoutDisciplinaInput> | AlocacaoCreateWithoutDisciplinaInput[] | AlocacaoUncheckedCreateWithoutDisciplinaInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutDisciplinaInput | AlocacaoCreateOrConnectWithoutDisciplinaInput[]
    createMany?: AlocacaoCreateManyDisciplinaInputEnvelope
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
  }

  export type AlocacaoUpdateManyWithoutDisciplinaNestedInput = {
    create?: XOR<AlocacaoCreateWithoutDisciplinaInput, AlocacaoUncheckedCreateWithoutDisciplinaInput> | AlocacaoCreateWithoutDisciplinaInput[] | AlocacaoUncheckedCreateWithoutDisciplinaInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutDisciplinaInput | AlocacaoCreateOrConnectWithoutDisciplinaInput[]
    upsert?: AlocacaoUpsertWithWhereUniqueWithoutDisciplinaInput | AlocacaoUpsertWithWhereUniqueWithoutDisciplinaInput[]
    createMany?: AlocacaoCreateManyDisciplinaInputEnvelope
    set?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    disconnect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    delete?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    update?: AlocacaoUpdateWithWhereUniqueWithoutDisciplinaInput | AlocacaoUpdateWithWhereUniqueWithoutDisciplinaInput[]
    updateMany?: AlocacaoUpdateManyWithWhereWithoutDisciplinaInput | AlocacaoUpdateManyWithWhereWithoutDisciplinaInput[]
    deleteMany?: AlocacaoScalarWhereInput | AlocacaoScalarWhereInput[]
  }

  export type AlocacaoUncheckedUpdateManyWithoutDisciplinaNestedInput = {
    create?: XOR<AlocacaoCreateWithoutDisciplinaInput, AlocacaoUncheckedCreateWithoutDisciplinaInput> | AlocacaoCreateWithoutDisciplinaInput[] | AlocacaoUncheckedCreateWithoutDisciplinaInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutDisciplinaInput | AlocacaoCreateOrConnectWithoutDisciplinaInput[]
    upsert?: AlocacaoUpsertWithWhereUniqueWithoutDisciplinaInput | AlocacaoUpsertWithWhereUniqueWithoutDisciplinaInput[]
    createMany?: AlocacaoCreateManyDisciplinaInputEnvelope
    set?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    disconnect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    delete?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    update?: AlocacaoUpdateWithWhereUniqueWithoutDisciplinaInput | AlocacaoUpdateWithWhereUniqueWithoutDisciplinaInput[]
    updateMany?: AlocacaoUpdateManyWithWhereWithoutDisciplinaInput | AlocacaoUpdateManyWithWhereWithoutDisciplinaInput[]
    deleteMany?: AlocacaoScalarWhereInput | AlocacaoScalarWhereInput[]
  }

  export type AlocacaoCreateNestedManyWithoutTurmaInput = {
    create?: XOR<AlocacaoCreateWithoutTurmaInput, AlocacaoUncheckedCreateWithoutTurmaInput> | AlocacaoCreateWithoutTurmaInput[] | AlocacaoUncheckedCreateWithoutTurmaInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutTurmaInput | AlocacaoCreateOrConnectWithoutTurmaInput[]
    createMany?: AlocacaoCreateManyTurmaInputEnvelope
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
  }

  export type AlocacaoUncheckedCreateNestedManyWithoutTurmaInput = {
    create?: XOR<AlocacaoCreateWithoutTurmaInput, AlocacaoUncheckedCreateWithoutTurmaInput> | AlocacaoCreateWithoutTurmaInput[] | AlocacaoUncheckedCreateWithoutTurmaInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutTurmaInput | AlocacaoCreateOrConnectWithoutTurmaInput[]
    createMany?: AlocacaoCreateManyTurmaInputEnvelope
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
  }

  export type AlocacaoUpdateManyWithoutTurmaNestedInput = {
    create?: XOR<AlocacaoCreateWithoutTurmaInput, AlocacaoUncheckedCreateWithoutTurmaInput> | AlocacaoCreateWithoutTurmaInput[] | AlocacaoUncheckedCreateWithoutTurmaInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutTurmaInput | AlocacaoCreateOrConnectWithoutTurmaInput[]
    upsert?: AlocacaoUpsertWithWhereUniqueWithoutTurmaInput | AlocacaoUpsertWithWhereUniqueWithoutTurmaInput[]
    createMany?: AlocacaoCreateManyTurmaInputEnvelope
    set?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    disconnect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    delete?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    update?: AlocacaoUpdateWithWhereUniqueWithoutTurmaInput | AlocacaoUpdateWithWhereUniqueWithoutTurmaInput[]
    updateMany?: AlocacaoUpdateManyWithWhereWithoutTurmaInput | AlocacaoUpdateManyWithWhereWithoutTurmaInput[]
    deleteMany?: AlocacaoScalarWhereInput | AlocacaoScalarWhereInput[]
  }

  export type AlocacaoUncheckedUpdateManyWithoutTurmaNestedInput = {
    create?: XOR<AlocacaoCreateWithoutTurmaInput, AlocacaoUncheckedCreateWithoutTurmaInput> | AlocacaoCreateWithoutTurmaInput[] | AlocacaoUncheckedCreateWithoutTurmaInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutTurmaInput | AlocacaoCreateOrConnectWithoutTurmaInput[]
    upsert?: AlocacaoUpsertWithWhereUniqueWithoutTurmaInput | AlocacaoUpsertWithWhereUniqueWithoutTurmaInput[]
    createMany?: AlocacaoCreateManyTurmaInputEnvelope
    set?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    disconnect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    delete?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    update?: AlocacaoUpdateWithWhereUniqueWithoutTurmaInput | AlocacaoUpdateWithWhereUniqueWithoutTurmaInput[]
    updateMany?: AlocacaoUpdateManyWithWhereWithoutTurmaInput | AlocacaoUpdateManyWithWhereWithoutTurmaInput[]
    deleteMany?: AlocacaoScalarWhereInput | AlocacaoScalarWhereInput[]
  }

  export type AlocacaoCreateNestedManyWithoutSalaInput = {
    create?: XOR<AlocacaoCreateWithoutSalaInput, AlocacaoUncheckedCreateWithoutSalaInput> | AlocacaoCreateWithoutSalaInput[] | AlocacaoUncheckedCreateWithoutSalaInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutSalaInput | AlocacaoCreateOrConnectWithoutSalaInput[]
    createMany?: AlocacaoCreateManySalaInputEnvelope
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
  }

  export type AlocacaoUncheckedCreateNestedManyWithoutSalaInput = {
    create?: XOR<AlocacaoCreateWithoutSalaInput, AlocacaoUncheckedCreateWithoutSalaInput> | AlocacaoCreateWithoutSalaInput[] | AlocacaoUncheckedCreateWithoutSalaInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutSalaInput | AlocacaoCreateOrConnectWithoutSalaInput[]
    createMany?: AlocacaoCreateManySalaInputEnvelope
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
  }

  export type AlocacaoUpdateManyWithoutSalaNestedInput = {
    create?: XOR<AlocacaoCreateWithoutSalaInput, AlocacaoUncheckedCreateWithoutSalaInput> | AlocacaoCreateWithoutSalaInput[] | AlocacaoUncheckedCreateWithoutSalaInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutSalaInput | AlocacaoCreateOrConnectWithoutSalaInput[]
    upsert?: AlocacaoUpsertWithWhereUniqueWithoutSalaInput | AlocacaoUpsertWithWhereUniqueWithoutSalaInput[]
    createMany?: AlocacaoCreateManySalaInputEnvelope
    set?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    disconnect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    delete?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    update?: AlocacaoUpdateWithWhereUniqueWithoutSalaInput | AlocacaoUpdateWithWhereUniqueWithoutSalaInput[]
    updateMany?: AlocacaoUpdateManyWithWhereWithoutSalaInput | AlocacaoUpdateManyWithWhereWithoutSalaInput[]
    deleteMany?: AlocacaoScalarWhereInput | AlocacaoScalarWhereInput[]
  }

  export type AlocacaoUncheckedUpdateManyWithoutSalaNestedInput = {
    create?: XOR<AlocacaoCreateWithoutSalaInput, AlocacaoUncheckedCreateWithoutSalaInput> | AlocacaoCreateWithoutSalaInput[] | AlocacaoUncheckedCreateWithoutSalaInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutSalaInput | AlocacaoCreateOrConnectWithoutSalaInput[]
    upsert?: AlocacaoUpsertWithWhereUniqueWithoutSalaInput | AlocacaoUpsertWithWhereUniqueWithoutSalaInput[]
    createMany?: AlocacaoCreateManySalaInputEnvelope
    set?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    disconnect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    delete?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    update?: AlocacaoUpdateWithWhereUniqueWithoutSalaInput | AlocacaoUpdateWithWhereUniqueWithoutSalaInput[]
    updateMany?: AlocacaoUpdateManyWithWhereWithoutSalaInput | AlocacaoUpdateManyWithWhereWithoutSalaInput[]
    deleteMany?: AlocacaoScalarWhereInput | AlocacaoScalarWhereInput[]
  }

  export type AlocacaoCreateNestedManyWithoutHorarioInput = {
    create?: XOR<AlocacaoCreateWithoutHorarioInput, AlocacaoUncheckedCreateWithoutHorarioInput> | AlocacaoCreateWithoutHorarioInput[] | AlocacaoUncheckedCreateWithoutHorarioInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutHorarioInput | AlocacaoCreateOrConnectWithoutHorarioInput[]
    createMany?: AlocacaoCreateManyHorarioInputEnvelope
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
  }

  export type AlocacaoUncheckedCreateNestedManyWithoutHorarioInput = {
    create?: XOR<AlocacaoCreateWithoutHorarioInput, AlocacaoUncheckedCreateWithoutHorarioInput> | AlocacaoCreateWithoutHorarioInput[] | AlocacaoUncheckedCreateWithoutHorarioInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutHorarioInput | AlocacaoCreateOrConnectWithoutHorarioInput[]
    createMany?: AlocacaoCreateManyHorarioInputEnvelope
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AlocacaoUpdateManyWithoutHorarioNestedInput = {
    create?: XOR<AlocacaoCreateWithoutHorarioInput, AlocacaoUncheckedCreateWithoutHorarioInput> | AlocacaoCreateWithoutHorarioInput[] | AlocacaoUncheckedCreateWithoutHorarioInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutHorarioInput | AlocacaoCreateOrConnectWithoutHorarioInput[]
    upsert?: AlocacaoUpsertWithWhereUniqueWithoutHorarioInput | AlocacaoUpsertWithWhereUniqueWithoutHorarioInput[]
    createMany?: AlocacaoCreateManyHorarioInputEnvelope
    set?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    disconnect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    delete?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    update?: AlocacaoUpdateWithWhereUniqueWithoutHorarioInput | AlocacaoUpdateWithWhereUniqueWithoutHorarioInput[]
    updateMany?: AlocacaoUpdateManyWithWhereWithoutHorarioInput | AlocacaoUpdateManyWithWhereWithoutHorarioInput[]
    deleteMany?: AlocacaoScalarWhereInput | AlocacaoScalarWhereInput[]
  }

  export type AlocacaoUncheckedUpdateManyWithoutHorarioNestedInput = {
    create?: XOR<AlocacaoCreateWithoutHorarioInput, AlocacaoUncheckedCreateWithoutHorarioInput> | AlocacaoCreateWithoutHorarioInput[] | AlocacaoUncheckedCreateWithoutHorarioInput[]
    connectOrCreate?: AlocacaoCreateOrConnectWithoutHorarioInput | AlocacaoCreateOrConnectWithoutHorarioInput[]
    upsert?: AlocacaoUpsertWithWhereUniqueWithoutHorarioInput | AlocacaoUpsertWithWhereUniqueWithoutHorarioInput[]
    createMany?: AlocacaoCreateManyHorarioInputEnvelope
    set?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    disconnect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    delete?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    connect?: AlocacaoWhereUniqueInput | AlocacaoWhereUniqueInput[]
    update?: AlocacaoUpdateWithWhereUniqueWithoutHorarioInput | AlocacaoUpdateWithWhereUniqueWithoutHorarioInput[]
    updateMany?: AlocacaoUpdateManyWithWhereWithoutHorarioInput | AlocacaoUpdateManyWithWhereWithoutHorarioInput[]
    deleteMany?: AlocacaoScalarWhereInput | AlocacaoScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAlocacoesInput = {
    create?: XOR<UserCreateWithoutAlocacoesInput, UserUncheckedCreateWithoutAlocacoesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAlocacoesInput
    connect?: UserWhereUniqueInput
  }

  export type DisciplinaCreateNestedOneWithoutAlocacoesInput = {
    create?: XOR<DisciplinaCreateWithoutAlocacoesInput, DisciplinaUncheckedCreateWithoutAlocacoesInput>
    connectOrCreate?: DisciplinaCreateOrConnectWithoutAlocacoesInput
    connect?: DisciplinaWhereUniqueInput
  }

  export type TurmaCreateNestedOneWithoutAlocacoesInput = {
    create?: XOR<TurmaCreateWithoutAlocacoesInput, TurmaUncheckedCreateWithoutAlocacoesInput>
    connectOrCreate?: TurmaCreateOrConnectWithoutAlocacoesInput
    connect?: TurmaWhereUniqueInput
  }

  export type SalaCreateNestedOneWithoutAlocacoesInput = {
    create?: XOR<SalaCreateWithoutAlocacoesInput, SalaUncheckedCreateWithoutAlocacoesInput>
    connectOrCreate?: SalaCreateOrConnectWithoutAlocacoesInput
    connect?: SalaWhereUniqueInput
  }

  export type HorarioCreateNestedOneWithoutAlocacoesInput = {
    create?: XOR<HorarioCreateWithoutAlocacoesInput, HorarioUncheckedCreateWithoutAlocacoesInput>
    connectOrCreate?: HorarioCreateOrConnectWithoutAlocacoesInput
    connect?: HorarioWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAlocacoesNestedInput = {
    create?: XOR<UserCreateWithoutAlocacoesInput, UserUncheckedCreateWithoutAlocacoesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAlocacoesInput
    upsert?: UserUpsertWithoutAlocacoesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAlocacoesInput, UserUpdateWithoutAlocacoesInput>, UserUncheckedUpdateWithoutAlocacoesInput>
  }

  export type DisciplinaUpdateOneRequiredWithoutAlocacoesNestedInput = {
    create?: XOR<DisciplinaCreateWithoutAlocacoesInput, DisciplinaUncheckedCreateWithoutAlocacoesInput>
    connectOrCreate?: DisciplinaCreateOrConnectWithoutAlocacoesInput
    upsert?: DisciplinaUpsertWithoutAlocacoesInput
    connect?: DisciplinaWhereUniqueInput
    update?: XOR<XOR<DisciplinaUpdateToOneWithWhereWithoutAlocacoesInput, DisciplinaUpdateWithoutAlocacoesInput>, DisciplinaUncheckedUpdateWithoutAlocacoesInput>
  }

  export type TurmaUpdateOneRequiredWithoutAlocacoesNestedInput = {
    create?: XOR<TurmaCreateWithoutAlocacoesInput, TurmaUncheckedCreateWithoutAlocacoesInput>
    connectOrCreate?: TurmaCreateOrConnectWithoutAlocacoesInput
    upsert?: TurmaUpsertWithoutAlocacoesInput
    connect?: TurmaWhereUniqueInput
    update?: XOR<XOR<TurmaUpdateToOneWithWhereWithoutAlocacoesInput, TurmaUpdateWithoutAlocacoesInput>, TurmaUncheckedUpdateWithoutAlocacoesInput>
  }

  export type SalaUpdateOneRequiredWithoutAlocacoesNestedInput = {
    create?: XOR<SalaCreateWithoutAlocacoesInput, SalaUncheckedCreateWithoutAlocacoesInput>
    connectOrCreate?: SalaCreateOrConnectWithoutAlocacoesInput
    upsert?: SalaUpsertWithoutAlocacoesInput
    connect?: SalaWhereUniqueInput
    update?: XOR<XOR<SalaUpdateToOneWithWhereWithoutAlocacoesInput, SalaUpdateWithoutAlocacoesInput>, SalaUncheckedUpdateWithoutAlocacoesInput>
  }

  export type HorarioUpdateOneRequiredWithoutAlocacoesNestedInput = {
    create?: XOR<HorarioCreateWithoutAlocacoesInput, HorarioUncheckedCreateWithoutAlocacoesInput>
    connectOrCreate?: HorarioCreateOrConnectWithoutAlocacoesInput
    upsert?: HorarioUpsertWithoutAlocacoesInput
    connect?: HorarioWhereUniqueInput
    update?: XOR<XOR<HorarioUpdateToOneWithWhereWithoutAlocacoesInput, HorarioUpdateWithoutAlocacoesInput>, HorarioUncheckedUpdateWithoutAlocacoesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AlocacaoCreateWithoutUserInput = {
    id?: string
    created_at?: Date | string
    disciplina: DisciplinaCreateNestedOneWithoutAlocacoesInput
    turma: TurmaCreateNestedOneWithoutAlocacoesInput
    sala: SalaCreateNestedOneWithoutAlocacoesInput
    horario: HorarioCreateNestedOneWithoutAlocacoesInput
  }

  export type AlocacaoUncheckedCreateWithoutUserInput = {
    id?: string
    id_disciplina: string
    id_turma: string
    id_sala: string
    id_horario: string
    created_at?: Date | string
  }

  export type AlocacaoCreateOrConnectWithoutUserInput = {
    where: AlocacaoWhereUniqueInput
    create: XOR<AlocacaoCreateWithoutUserInput, AlocacaoUncheckedCreateWithoutUserInput>
  }

  export type AlocacaoCreateManyUserInputEnvelope = {
    data: AlocacaoCreateManyUserInput | AlocacaoCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AlocacaoUpsertWithWhereUniqueWithoutUserInput = {
    where: AlocacaoWhereUniqueInput
    update: XOR<AlocacaoUpdateWithoutUserInput, AlocacaoUncheckedUpdateWithoutUserInput>
    create: XOR<AlocacaoCreateWithoutUserInput, AlocacaoUncheckedCreateWithoutUserInput>
  }

  export type AlocacaoUpdateWithWhereUniqueWithoutUserInput = {
    where: AlocacaoWhereUniqueInput
    data: XOR<AlocacaoUpdateWithoutUserInput, AlocacaoUncheckedUpdateWithoutUserInput>
  }

  export type AlocacaoUpdateManyWithWhereWithoutUserInput = {
    where: AlocacaoScalarWhereInput
    data: XOR<AlocacaoUpdateManyMutationInput, AlocacaoUncheckedUpdateManyWithoutUserInput>
  }

  export type AlocacaoScalarWhereInput = {
    AND?: AlocacaoScalarWhereInput | AlocacaoScalarWhereInput[]
    OR?: AlocacaoScalarWhereInput[]
    NOT?: AlocacaoScalarWhereInput | AlocacaoScalarWhereInput[]
    id?: StringFilter<"Alocacao"> | string
    id_user?: StringFilter<"Alocacao"> | string
    id_disciplina?: StringFilter<"Alocacao"> | string
    id_turma?: StringFilter<"Alocacao"> | string
    id_sala?: StringFilter<"Alocacao"> | string
    id_horario?: StringFilter<"Alocacao"> | string
    created_at?: DateTimeFilter<"Alocacao"> | Date | string
  }

  export type AlocacaoCreateWithoutDisciplinaInput = {
    id?: string
    created_at?: Date | string
    user: UserCreateNestedOneWithoutAlocacoesInput
    turma: TurmaCreateNestedOneWithoutAlocacoesInput
    sala: SalaCreateNestedOneWithoutAlocacoesInput
    horario: HorarioCreateNestedOneWithoutAlocacoesInput
  }

  export type AlocacaoUncheckedCreateWithoutDisciplinaInput = {
    id?: string
    id_user: string
    id_turma: string
    id_sala: string
    id_horario: string
    created_at?: Date | string
  }

  export type AlocacaoCreateOrConnectWithoutDisciplinaInput = {
    where: AlocacaoWhereUniqueInput
    create: XOR<AlocacaoCreateWithoutDisciplinaInput, AlocacaoUncheckedCreateWithoutDisciplinaInput>
  }

  export type AlocacaoCreateManyDisciplinaInputEnvelope = {
    data: AlocacaoCreateManyDisciplinaInput | AlocacaoCreateManyDisciplinaInput[]
    skipDuplicates?: boolean
  }

  export type AlocacaoUpsertWithWhereUniqueWithoutDisciplinaInput = {
    where: AlocacaoWhereUniqueInput
    update: XOR<AlocacaoUpdateWithoutDisciplinaInput, AlocacaoUncheckedUpdateWithoutDisciplinaInput>
    create: XOR<AlocacaoCreateWithoutDisciplinaInput, AlocacaoUncheckedCreateWithoutDisciplinaInput>
  }

  export type AlocacaoUpdateWithWhereUniqueWithoutDisciplinaInput = {
    where: AlocacaoWhereUniqueInput
    data: XOR<AlocacaoUpdateWithoutDisciplinaInput, AlocacaoUncheckedUpdateWithoutDisciplinaInput>
  }

  export type AlocacaoUpdateManyWithWhereWithoutDisciplinaInput = {
    where: AlocacaoScalarWhereInput
    data: XOR<AlocacaoUpdateManyMutationInput, AlocacaoUncheckedUpdateManyWithoutDisciplinaInput>
  }

  export type AlocacaoCreateWithoutTurmaInput = {
    id?: string
    created_at?: Date | string
    user: UserCreateNestedOneWithoutAlocacoesInput
    disciplina: DisciplinaCreateNestedOneWithoutAlocacoesInput
    sala: SalaCreateNestedOneWithoutAlocacoesInput
    horario: HorarioCreateNestedOneWithoutAlocacoesInput
  }

  export type AlocacaoUncheckedCreateWithoutTurmaInput = {
    id?: string
    id_user: string
    id_disciplina: string
    id_sala: string
    id_horario: string
    created_at?: Date | string
  }

  export type AlocacaoCreateOrConnectWithoutTurmaInput = {
    where: AlocacaoWhereUniqueInput
    create: XOR<AlocacaoCreateWithoutTurmaInput, AlocacaoUncheckedCreateWithoutTurmaInput>
  }

  export type AlocacaoCreateManyTurmaInputEnvelope = {
    data: AlocacaoCreateManyTurmaInput | AlocacaoCreateManyTurmaInput[]
    skipDuplicates?: boolean
  }

  export type AlocacaoUpsertWithWhereUniqueWithoutTurmaInput = {
    where: AlocacaoWhereUniqueInput
    update: XOR<AlocacaoUpdateWithoutTurmaInput, AlocacaoUncheckedUpdateWithoutTurmaInput>
    create: XOR<AlocacaoCreateWithoutTurmaInput, AlocacaoUncheckedCreateWithoutTurmaInput>
  }

  export type AlocacaoUpdateWithWhereUniqueWithoutTurmaInput = {
    where: AlocacaoWhereUniqueInput
    data: XOR<AlocacaoUpdateWithoutTurmaInput, AlocacaoUncheckedUpdateWithoutTurmaInput>
  }

  export type AlocacaoUpdateManyWithWhereWithoutTurmaInput = {
    where: AlocacaoScalarWhereInput
    data: XOR<AlocacaoUpdateManyMutationInput, AlocacaoUncheckedUpdateManyWithoutTurmaInput>
  }

  export type AlocacaoCreateWithoutSalaInput = {
    id?: string
    created_at?: Date | string
    user: UserCreateNestedOneWithoutAlocacoesInput
    disciplina: DisciplinaCreateNestedOneWithoutAlocacoesInput
    turma: TurmaCreateNestedOneWithoutAlocacoesInput
    horario: HorarioCreateNestedOneWithoutAlocacoesInput
  }

  export type AlocacaoUncheckedCreateWithoutSalaInput = {
    id?: string
    id_user: string
    id_disciplina: string
    id_turma: string
    id_horario: string
    created_at?: Date | string
  }

  export type AlocacaoCreateOrConnectWithoutSalaInput = {
    where: AlocacaoWhereUniqueInput
    create: XOR<AlocacaoCreateWithoutSalaInput, AlocacaoUncheckedCreateWithoutSalaInput>
  }

  export type AlocacaoCreateManySalaInputEnvelope = {
    data: AlocacaoCreateManySalaInput | AlocacaoCreateManySalaInput[]
    skipDuplicates?: boolean
  }

  export type AlocacaoUpsertWithWhereUniqueWithoutSalaInput = {
    where: AlocacaoWhereUniqueInput
    update: XOR<AlocacaoUpdateWithoutSalaInput, AlocacaoUncheckedUpdateWithoutSalaInput>
    create: XOR<AlocacaoCreateWithoutSalaInput, AlocacaoUncheckedCreateWithoutSalaInput>
  }

  export type AlocacaoUpdateWithWhereUniqueWithoutSalaInput = {
    where: AlocacaoWhereUniqueInput
    data: XOR<AlocacaoUpdateWithoutSalaInput, AlocacaoUncheckedUpdateWithoutSalaInput>
  }

  export type AlocacaoUpdateManyWithWhereWithoutSalaInput = {
    where: AlocacaoScalarWhereInput
    data: XOR<AlocacaoUpdateManyMutationInput, AlocacaoUncheckedUpdateManyWithoutSalaInput>
  }

  export type AlocacaoCreateWithoutHorarioInput = {
    id?: string
    created_at?: Date | string
    user: UserCreateNestedOneWithoutAlocacoesInput
    disciplina: DisciplinaCreateNestedOneWithoutAlocacoesInput
    turma: TurmaCreateNestedOneWithoutAlocacoesInput
    sala: SalaCreateNestedOneWithoutAlocacoesInput
  }

  export type AlocacaoUncheckedCreateWithoutHorarioInput = {
    id?: string
    id_user: string
    id_disciplina: string
    id_turma: string
    id_sala: string
    created_at?: Date | string
  }

  export type AlocacaoCreateOrConnectWithoutHorarioInput = {
    where: AlocacaoWhereUniqueInput
    create: XOR<AlocacaoCreateWithoutHorarioInput, AlocacaoUncheckedCreateWithoutHorarioInput>
  }

  export type AlocacaoCreateManyHorarioInputEnvelope = {
    data: AlocacaoCreateManyHorarioInput | AlocacaoCreateManyHorarioInput[]
    skipDuplicates?: boolean
  }

  export type AlocacaoUpsertWithWhereUniqueWithoutHorarioInput = {
    where: AlocacaoWhereUniqueInput
    update: XOR<AlocacaoUpdateWithoutHorarioInput, AlocacaoUncheckedUpdateWithoutHorarioInput>
    create: XOR<AlocacaoCreateWithoutHorarioInput, AlocacaoUncheckedCreateWithoutHorarioInput>
  }

  export type AlocacaoUpdateWithWhereUniqueWithoutHorarioInput = {
    where: AlocacaoWhereUniqueInput
    data: XOR<AlocacaoUpdateWithoutHorarioInput, AlocacaoUncheckedUpdateWithoutHorarioInput>
  }

  export type AlocacaoUpdateManyWithWhereWithoutHorarioInput = {
    where: AlocacaoScalarWhereInput
    data: XOR<AlocacaoUpdateManyMutationInput, AlocacaoUncheckedUpdateManyWithoutHorarioInput>
  }

  export type UserCreateWithoutAlocacoesInput = {
    id?: string
    nome: string
    email: string
    senha: string
    role?: string
    especializacao: string
    cargaHorariaMax: number
    preferencia?: string | null
  }

  export type UserUncheckedCreateWithoutAlocacoesInput = {
    id?: string
    nome: string
    email: string
    senha: string
    role?: string
    especializacao: string
    cargaHorariaMax: number
    preferencia?: string | null
  }

  export type UserCreateOrConnectWithoutAlocacoesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAlocacoesInput, UserUncheckedCreateWithoutAlocacoesInput>
  }

  export type DisciplinaCreateWithoutAlocacoesInput = {
    id?: string
    nome: string
    cargaHorariaTotal: number
  }

  export type DisciplinaUncheckedCreateWithoutAlocacoesInput = {
    id?: string
    nome: string
    cargaHorariaTotal: number
  }

  export type DisciplinaCreateOrConnectWithoutAlocacoesInput = {
    where: DisciplinaWhereUniqueInput
    create: XOR<DisciplinaCreateWithoutAlocacoesInput, DisciplinaUncheckedCreateWithoutAlocacoesInput>
  }

  export type TurmaCreateWithoutAlocacoesInput = {
    id?: string
    nome: string
    numAlunos: number
    periodo: number
    turno: string
  }

  export type TurmaUncheckedCreateWithoutAlocacoesInput = {
    id?: string
    nome: string
    numAlunos: number
    periodo: number
    turno: string
  }

  export type TurmaCreateOrConnectWithoutAlocacoesInput = {
    where: TurmaWhereUniqueInput
    create: XOR<TurmaCreateWithoutAlocacoesInput, TurmaUncheckedCreateWithoutAlocacoesInput>
  }

  export type SalaCreateWithoutAlocacoesInput = {
    id?: string
    nome: string
    predio: string
    capacidade: number
    tipo: string
  }

  export type SalaUncheckedCreateWithoutAlocacoesInput = {
    id?: string
    nome: string
    predio: string
    capacidade: number
    tipo: string
  }

  export type SalaCreateOrConnectWithoutAlocacoesInput = {
    where: SalaWhereUniqueInput
    create: XOR<SalaCreateWithoutAlocacoesInput, SalaUncheckedCreateWithoutAlocacoesInput>
  }

  export type HorarioCreateWithoutAlocacoesInput = {
    id?: string
    diaSemana: string
    horarioInicio: Date | string
    horarioFim: Date | string
  }

  export type HorarioUncheckedCreateWithoutAlocacoesInput = {
    id?: string
    diaSemana: string
    horarioInicio: Date | string
    horarioFim: Date | string
  }

  export type HorarioCreateOrConnectWithoutAlocacoesInput = {
    where: HorarioWhereUniqueInput
    create: XOR<HorarioCreateWithoutAlocacoesInput, HorarioUncheckedCreateWithoutAlocacoesInput>
  }

  export type UserUpsertWithoutAlocacoesInput = {
    update: XOR<UserUpdateWithoutAlocacoesInput, UserUncheckedUpdateWithoutAlocacoesInput>
    create: XOR<UserCreateWithoutAlocacoesInput, UserUncheckedCreateWithoutAlocacoesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAlocacoesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAlocacoesInput, UserUncheckedUpdateWithoutAlocacoesInput>
  }

  export type UserUpdateWithoutAlocacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    especializacao?: StringFieldUpdateOperationsInput | string
    cargaHorariaMax?: IntFieldUpdateOperationsInput | number
    preferencia?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateWithoutAlocacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    especializacao?: StringFieldUpdateOperationsInput | string
    cargaHorariaMax?: IntFieldUpdateOperationsInput | number
    preferencia?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DisciplinaUpsertWithoutAlocacoesInput = {
    update: XOR<DisciplinaUpdateWithoutAlocacoesInput, DisciplinaUncheckedUpdateWithoutAlocacoesInput>
    create: XOR<DisciplinaCreateWithoutAlocacoesInput, DisciplinaUncheckedCreateWithoutAlocacoesInput>
    where?: DisciplinaWhereInput
  }

  export type DisciplinaUpdateToOneWithWhereWithoutAlocacoesInput = {
    where?: DisciplinaWhereInput
    data: XOR<DisciplinaUpdateWithoutAlocacoesInput, DisciplinaUncheckedUpdateWithoutAlocacoesInput>
  }

  export type DisciplinaUpdateWithoutAlocacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cargaHorariaTotal?: IntFieldUpdateOperationsInput | number
  }

  export type DisciplinaUncheckedUpdateWithoutAlocacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    cargaHorariaTotal?: IntFieldUpdateOperationsInput | number
  }

  export type TurmaUpsertWithoutAlocacoesInput = {
    update: XOR<TurmaUpdateWithoutAlocacoesInput, TurmaUncheckedUpdateWithoutAlocacoesInput>
    create: XOR<TurmaCreateWithoutAlocacoesInput, TurmaUncheckedCreateWithoutAlocacoesInput>
    where?: TurmaWhereInput
  }

  export type TurmaUpdateToOneWithWhereWithoutAlocacoesInput = {
    where?: TurmaWhereInput
    data: XOR<TurmaUpdateWithoutAlocacoesInput, TurmaUncheckedUpdateWithoutAlocacoesInput>
  }

  export type TurmaUpdateWithoutAlocacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    numAlunos?: IntFieldUpdateOperationsInput | number
    periodo?: IntFieldUpdateOperationsInput | number
    turno?: StringFieldUpdateOperationsInput | string
  }

  export type TurmaUncheckedUpdateWithoutAlocacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    numAlunos?: IntFieldUpdateOperationsInput | number
    periodo?: IntFieldUpdateOperationsInput | number
    turno?: StringFieldUpdateOperationsInput | string
  }

  export type SalaUpsertWithoutAlocacoesInput = {
    update: XOR<SalaUpdateWithoutAlocacoesInput, SalaUncheckedUpdateWithoutAlocacoesInput>
    create: XOR<SalaCreateWithoutAlocacoesInput, SalaUncheckedCreateWithoutAlocacoesInput>
    where?: SalaWhereInput
  }

  export type SalaUpdateToOneWithWhereWithoutAlocacoesInput = {
    where?: SalaWhereInput
    data: XOR<SalaUpdateWithoutAlocacoesInput, SalaUncheckedUpdateWithoutAlocacoesInput>
  }

  export type SalaUpdateWithoutAlocacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    predio?: StringFieldUpdateOperationsInput | string
    capacidade?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
  }

  export type SalaUncheckedUpdateWithoutAlocacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    predio?: StringFieldUpdateOperationsInput | string
    capacidade?: IntFieldUpdateOperationsInput | number
    tipo?: StringFieldUpdateOperationsInput | string
  }

  export type HorarioUpsertWithoutAlocacoesInput = {
    update: XOR<HorarioUpdateWithoutAlocacoesInput, HorarioUncheckedUpdateWithoutAlocacoesInput>
    create: XOR<HorarioCreateWithoutAlocacoesInput, HorarioUncheckedCreateWithoutAlocacoesInput>
    where?: HorarioWhereInput
  }

  export type HorarioUpdateToOneWithWhereWithoutAlocacoesInput = {
    where?: HorarioWhereInput
    data: XOR<HorarioUpdateWithoutAlocacoesInput, HorarioUncheckedUpdateWithoutAlocacoesInput>
  }

  export type HorarioUpdateWithoutAlocacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    diaSemana?: StringFieldUpdateOperationsInput | string
    horarioInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    horarioFim?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HorarioUncheckedUpdateWithoutAlocacoesInput = {
    id?: StringFieldUpdateOperationsInput | string
    diaSemana?: StringFieldUpdateOperationsInput | string
    horarioInicio?: DateTimeFieldUpdateOperationsInput | Date | string
    horarioFim?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlocacaoCreateManyUserInput = {
    id?: string
    id_disciplina: string
    id_turma: string
    id_sala: string
    id_horario: string
    created_at?: Date | string
  }

  export type AlocacaoUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    disciplina?: DisciplinaUpdateOneRequiredWithoutAlocacoesNestedInput
    turma?: TurmaUpdateOneRequiredWithoutAlocacoesNestedInput
    sala?: SalaUpdateOneRequiredWithoutAlocacoesNestedInput
    horario?: HorarioUpdateOneRequiredWithoutAlocacoesNestedInput
  }

  export type AlocacaoUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_disciplina?: StringFieldUpdateOperationsInput | string
    id_turma?: StringFieldUpdateOperationsInput | string
    id_sala?: StringFieldUpdateOperationsInput | string
    id_horario?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlocacaoUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_disciplina?: StringFieldUpdateOperationsInput | string
    id_turma?: StringFieldUpdateOperationsInput | string
    id_sala?: StringFieldUpdateOperationsInput | string
    id_horario?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlocacaoCreateManyDisciplinaInput = {
    id?: string
    id_user: string
    id_turma: string
    id_sala: string
    id_horario: string
    created_at?: Date | string
  }

  export type AlocacaoUpdateWithoutDisciplinaInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAlocacoesNestedInput
    turma?: TurmaUpdateOneRequiredWithoutAlocacoesNestedInput
    sala?: SalaUpdateOneRequiredWithoutAlocacoesNestedInput
    horario?: HorarioUpdateOneRequiredWithoutAlocacoesNestedInput
  }

  export type AlocacaoUncheckedUpdateWithoutDisciplinaInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_user?: StringFieldUpdateOperationsInput | string
    id_turma?: StringFieldUpdateOperationsInput | string
    id_sala?: StringFieldUpdateOperationsInput | string
    id_horario?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlocacaoUncheckedUpdateManyWithoutDisciplinaInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_user?: StringFieldUpdateOperationsInput | string
    id_turma?: StringFieldUpdateOperationsInput | string
    id_sala?: StringFieldUpdateOperationsInput | string
    id_horario?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlocacaoCreateManyTurmaInput = {
    id?: string
    id_user: string
    id_disciplina: string
    id_sala: string
    id_horario: string
    created_at?: Date | string
  }

  export type AlocacaoUpdateWithoutTurmaInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAlocacoesNestedInput
    disciplina?: DisciplinaUpdateOneRequiredWithoutAlocacoesNestedInput
    sala?: SalaUpdateOneRequiredWithoutAlocacoesNestedInput
    horario?: HorarioUpdateOneRequiredWithoutAlocacoesNestedInput
  }

  export type AlocacaoUncheckedUpdateWithoutTurmaInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_user?: StringFieldUpdateOperationsInput | string
    id_disciplina?: StringFieldUpdateOperationsInput | string
    id_sala?: StringFieldUpdateOperationsInput | string
    id_horario?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlocacaoUncheckedUpdateManyWithoutTurmaInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_user?: StringFieldUpdateOperationsInput | string
    id_disciplina?: StringFieldUpdateOperationsInput | string
    id_sala?: StringFieldUpdateOperationsInput | string
    id_horario?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlocacaoCreateManySalaInput = {
    id?: string
    id_user: string
    id_disciplina: string
    id_turma: string
    id_horario: string
    created_at?: Date | string
  }

  export type AlocacaoUpdateWithoutSalaInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAlocacoesNestedInput
    disciplina?: DisciplinaUpdateOneRequiredWithoutAlocacoesNestedInput
    turma?: TurmaUpdateOneRequiredWithoutAlocacoesNestedInput
    horario?: HorarioUpdateOneRequiredWithoutAlocacoesNestedInput
  }

  export type AlocacaoUncheckedUpdateWithoutSalaInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_user?: StringFieldUpdateOperationsInput | string
    id_disciplina?: StringFieldUpdateOperationsInput | string
    id_turma?: StringFieldUpdateOperationsInput | string
    id_horario?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlocacaoUncheckedUpdateManyWithoutSalaInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_user?: StringFieldUpdateOperationsInput | string
    id_disciplina?: StringFieldUpdateOperationsInput | string
    id_turma?: StringFieldUpdateOperationsInput | string
    id_horario?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlocacaoCreateManyHorarioInput = {
    id?: string
    id_user: string
    id_disciplina: string
    id_turma: string
    id_sala: string
    created_at?: Date | string
  }

  export type AlocacaoUpdateWithoutHorarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAlocacoesNestedInput
    disciplina?: DisciplinaUpdateOneRequiredWithoutAlocacoesNestedInput
    turma?: TurmaUpdateOneRequiredWithoutAlocacoesNestedInput
    sala?: SalaUpdateOneRequiredWithoutAlocacoesNestedInput
  }

  export type AlocacaoUncheckedUpdateWithoutHorarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_user?: StringFieldUpdateOperationsInput | string
    id_disciplina?: StringFieldUpdateOperationsInput | string
    id_turma?: StringFieldUpdateOperationsInput | string
    id_sala?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlocacaoUncheckedUpdateManyWithoutHorarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    id_user?: StringFieldUpdateOperationsInput | string
    id_disciplina?: StringFieldUpdateOperationsInput | string
    id_turma?: StringFieldUpdateOperationsInput | string
    id_sala?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
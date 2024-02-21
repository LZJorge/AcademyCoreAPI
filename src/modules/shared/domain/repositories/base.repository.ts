/**
 * defines a generic repository with methods for creating, finding, updating, and deleting entities of type T.
 */
export interface Repository<T> {
    /**
     * @description Creates a new entity of type T.
     */
    create(data: T): Promise<T | null>;

    /**
     * @description Finds an entity by its ID.
     */
    findOne(id: string): Promise<T | null>;

    /**
     * @description Finds all entities of type T.
     */
    findAll(): Promise<T[]>;

    /**
     * @description Finds all entities of type T by a specific parameter and value.
     */
    findAllBy(param: keyof T, value: unknown): Promise<T[]>;

    /**
     * @description Updates an entity with the provided data.
     */
    update(data: T): Promise<T | null>;

    /**
     * @description Deletes an entity by its ID.
     */
    delete(id: string): Promise<{ success: boolean }>;
}
/**
 * All the entities should extend this class
 */
export abstract class Entity {
    id: string;
    constructor(id: string) {
        this.id = id;
    }
}
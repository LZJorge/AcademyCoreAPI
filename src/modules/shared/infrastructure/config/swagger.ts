import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export enum SwaggerTags {
    USERS = 'Users',
    STUDENTS = 'Students'
}

export class SwaggerConfig {
    private options: Options;
    private _spec: object;

    constructor(version: string) {
        this.options = {
            definition: {
                openapi: '3.0.1',
                info: {
                    title: 'REST API for Swagger Documentation',
                    version: version,
                },
                schemes: ['http', 'https'],
                servers: [
                    { url: 'http://localhost:8000/' }
                ],
                tags: [
                    { name: SwaggerTags.USERS },
                    { name: SwaggerTags.STUDENTS }
                ]
            },
            apis: [
                'src/modules/user/infrastructure/router/user.router.ts',
            ]
        };

        this._spec = swaggerJSDoc(this.options);
    }

    public get spec() {
        return this._spec;
    }

    public get setup() {
        return swaggerUi;
    }
}
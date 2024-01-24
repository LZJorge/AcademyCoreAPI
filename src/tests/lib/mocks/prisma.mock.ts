import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
jest.mock('@prisma/client', () => ({
    __esModule: true,
    PrismaClient: jest.fn().mockImplementation(() => mockDeep<PrismaClient>())
}));
beforeEach(() => {
    mockReset(prismaMock);
});
export const prismaMock = new PrismaClient() as unknown as DeepMockProxy<PrismaClient>;
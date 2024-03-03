import { canSearchUserByParam } from '@user/domain/values/canSearchUserBy';

describe('Can search By user param validation test', () => {
    it('should return true if provided user search param are valid:', () => {
        let result = canSearchUserByParam('firstname');
        expect(result).toBeTruthy();
    
        result = canSearchUserByParam('lastname');
        expect(result).toBeTruthy();
    
        result = canSearchUserByParam('created_at');
        expect(result).toBeTruthy();
    });
    
    it('should return false if provided user search param are invalid:', () => {
        const result = canSearchUserByParam('<Invalid user search param>');
        expect(result).toBeFalsy();
    });
});
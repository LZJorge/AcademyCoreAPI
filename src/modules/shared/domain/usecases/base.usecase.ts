/** 
 * @requires T
 * @type T represents interface of response returned by the run method
 * @type U represents interface of dto received from controller
 * 
 * @param current indicates current value on update usecases
 */
export interface useCaseBase<T, U = never> {
    run(dto?: U, current?: unknown): Promise<T>;
}
type Success<T> = { success: true; result: T };
type Failure = { success: false; err: Error };

export type ResultPromiseResponse<T> = Success<T> | Failure;

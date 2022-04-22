export function notFoundError(entity: string) {
	return {
		type: 'error_not_found',
		message: `Could not find specified "${entity}"!`
	};
}

export function badRequestError(entity: string) {
	return {
		type: 'error_bad_request',
		message: entity ? `This is a "${entity}" Error!` : `That's an error!`
	};
}

export function unauthorizedError(entity: string) {
	return {
		type: 'error_unauthorized',
		message: entity
			? `To access your account you need to be authenticated, enter the correct "${entity}"!`
			: `To access, you must be authenticated!`
	};
}

export function conflictError(entity: string) {
	return {
		type: 'error_conflict',
		message: entity
			? `A conflict has been generated with the "${entity}", please try again!`
			: `A conflict has been generated, please try again!`
	};
}

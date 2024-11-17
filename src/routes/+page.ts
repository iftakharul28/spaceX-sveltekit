import type { landpadsType } from '../types/landpads';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('https://api.spacexdata.com/v3/landpads');
	const result = (await response.json()) as landpadsType[];

	if (!result) {
		error(404, 'Not found');
	}

	return { result };
};

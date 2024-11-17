export type landpadsType = {
	full_name: string;
	status: string;
	wikipedia: string;
	details: string;
	launches: string[];
	id: string;
	location: {
		name: string;
		region: string;
		latitude: number;
		longitude: number;
	};
	landing_type: string;
	attempted_landings: number;
	successful_landings: number;
};

export default function generateColors(count: number) {
	const colors: string[] = [];
	for (let i = 0; i < count; i++) {
		const hue = Math.floor((360 / count) * i);
		colors.push(`hsl(${hue}, 70%, 60%)`);
	}
	return colors;
}

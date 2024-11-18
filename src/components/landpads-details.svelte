<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import type { landpadsType } from '../types/landpads';
	let { item }: { item: landpadsType } = $props();
	let defaultModal = $state(false);
</script>

<button
	type="button"
	onclick={() => (defaultModal = true)}
	class="rounded bg-gray-200 px-3 py-0.5 text-gray-900">View Details</button
>
<Modal
	title={item.full_name}
	bind:open={defaultModal}
	autoclose={false}
	class="w-full whitespace-normal"
>
	<p class="text-base text-gray-900">
		{item.details}
	</p>
</Modal>

<script lang="ts">
	import { Button, Modal } from 'flowbite-svelte';
	import type { landpadsType } from '../types/landpads';
	let { item }: { item: landpadsType } = $props();
	let defaultModal = $state(false);
</script>

<Button
	on:click={() => (defaultModal = true)}
	class="bg-gray-200 text-gray-800 hover:bg-gray-200 hover:text-gray-800">View Details</Button
>
<Modal
	title={item.full_name}
	bind:open={defaultModal}
	autoclose={false}
	class="w-full whitespace-normal"
>
	<p class="text-base text-gray-500 dark:text-gray-400">
		{item.details}
	</p>
</Modal>

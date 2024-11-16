<script lang="ts">
	import { Progressbar } from 'flowbite-svelte';

	export let progress: number;
</script>

{#if progress != 0}
	<Progressbar size="h-2.5" {progress} />
	<p class="text-xs font-medium">{Math.floor(progress)}%</p>
{:else}
	<p class="text-xs font-medium">N/A</p>
{/if}

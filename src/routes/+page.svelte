<script lang="ts">
	export let form;
	function copyable(node: HTMLElement) {
		function handleClick() {
			const textToCopy = node.innerText || node.textContent;
			navigator.clipboard
				.writeText(textToCopy ?? '')
				.then(() => {
					alert(`Copied ${textToCopy} to clipboard!`);
				})
				.catch((err) => {
					console.error('Failed to copy: ', err);
				});
		}

		node.addEventListener('click', handleClick);
		return {
			destroy() {
				node.removeEventListener('click', handleClick);
			}
		};
	}
</script>

<div class="relative h-dvh">
	<div class=" h-full w-full flex items-stretch justify-stretch">
		{#if Array.isArray(form?.palette) && form.palette.length > 0}
			{#each form.palette as color}
				<div
					use:copyable
					class="color-block flex-1 flex text-3xl font-bold items-start pt-80 justify-center"
					style="--color:{color};"
				>
					{color}
				</div>
			{/each}
		{:else}
			<div class="w-full h-full bg-gray-300"></div>
			<div class=" w-full h-full bg-blue-300"></div>
		{/if}
	</div>
	<form method="POST" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		<label
			for="input"
			class="block mb-2 text-lg font-medium text-gray-100 bg-gray-900/50 text-center"
			>Describe your colors. (Try Color of Google, Color of Forest, etc.)</label
		>
		{#if form?.error}
			<p class=" text-red-800">{form.error}</p>
		{/if}
		<div>
			<input
				type="text"
				id="input"
				name="prompt"
				class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
			/>
			<button
				type="submit"
				class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
				>Generate</button
			>
		</div>
	</form>
</div>

<style>
	.color-block {
		background-color: var(--color);
	}
</style>

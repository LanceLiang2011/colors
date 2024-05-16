<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<title>AI Color Palette Generator</title>
	<meta
		name="description"
		content="Generate custom color palettes based on your theme or brand using OpenAI's API."
	/>
	<meta property="og:title" content="Color Palette Generator" />
	<meta
		property="og:description"
		content="Generate custom color palettes based on your theme or brand using OpenAI's API."
	/>
	<meta property="og:image" content="/path/to/your/image.png" />
	<meta property="og:url" content="https://yourwebsite.com/color-palette-generator" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Color Palette Generator" />
	<meta
		name="twitter:description"
		content="Generate custom color palettes based on your theme or brand using OpenAI's API."
	/>
	<meta name="twitter:image" content="/path/to/your/image.png" />
</svelte:head>

<main>
	<slot />
</main>
<footer
	class=" fixed md:absolute bottom-0 w-full text-slate-700 flex justify-center items-center my-12"
>
	Lance Liang &copy; {new Date().getFullYear().toString()} | All rights reserved
</footer>

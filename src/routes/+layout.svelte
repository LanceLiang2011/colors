<script lang="ts">
	import '../app.css';
</script>

<main>
	<slot />
</main>
<footer
	class=" fixed md:absolute bottom-0 w-full text-slate-700 flex justify-center items-center my-12"
>
	Lance Liang &copy; {new Date().getFullYear().toString()} | All rights reserved
</footer>

<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Act1Manifesto from '$lib/components/Act1Manifesto.svelte';
  import Act2Ecosystem from '$lib/components/Act2Ecosystem.svelte';
  import Act3Timeline from '$lib/components/Act3Timeline.svelte';
  import Act4Grid from '$lib/components/Act4Grid.svelte';
  import Act4Outro from '$lib/components/Act4Outro.svelte';
</script>

<svelte:head>
  <title>Fist Kolektif</title>
</svelte:head>

<Navbar />
<main class="bg-primary text-secondary min-h-screen font-sans selection:bg-secondary selection:text-primary">
  <Act1Manifesto />
  <Act2Ecosystem />
  <Act3Timeline />
  <Act4Grid />
  <Act4Outro />
</main>

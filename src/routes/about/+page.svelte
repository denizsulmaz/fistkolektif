<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<svelte:head>
  <title>About - FIST Kolektif</title>
</svelte:head>

<section class="min-h-screen w-full bg-primary text-secondary pt-32 pb-16 px-4 md:px-12 lg:px-24 flex items-center justify-center">
  <div 
    in:fade={{ duration: 1000, delay: 200 }}
    class="max-w-3xl mx-auto text-center flex flex-col items-center"
  >
    <h1 class="font-branch text-5xl md:text-7xl leading-none mb-12">About</h1>
    
    <div class="space-y-8 font-sans text-lg md:text-xl text-secondary/80 leading-relaxed">
      <p>
        FIST Kolektif is an alternative business ecosystem and united collective of builders. 
        We operate outside the noise, funding our own vision and building our own reality.
      </p>
      
      <p>
        This collective is not a traditional company or agency. It is a geographically distributed, 
        interconnected network of independent projects spanning non-profit organizations, technology platforms, 
        physical products, and digital experiences.
      </p>
      
      <p>
        We believe in pure execution. Successes propel us forward. Exits become our legacy. 
        Failures become our foundation. Every execution is proudly displayed as a testament to building in the real world.
      </p>
    </div>
    
    <div class="mt-24 pt-8 border-t border-secondary/10">
      <a href="/" class="font-sans uppercase tracking-widest text-sm hover:text-white transition-colors flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        Return to Ecosystem
      </a>
    </div>
  </div>
</section>

<footer class="w-full bg-primary pb-8 text-center z-10 relative">
  <p class="font-sans text-xs tracking-widest uppercase text-secondary/40">2026 © FIST Kolektif LLC</p>
</footer>

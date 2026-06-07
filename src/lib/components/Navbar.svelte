<script lang="ts">
  import { fade } from 'svelte/transition';
  
  let isModalOpen = $state(false);
</script>

<!-- Removed mix-blend-difference because it caused an outline rendering bug on some displays. -->
<nav class="fixed top-0 left-0 w-full p-6 md:p-8 z-40 pointer-events-none text-[#f5f5f5]">
  <div class="flex justify-between items-center w-full max-w-7xl mx-auto pointer-events-auto">
    <!-- Logo Placeholder -->
    <a href="/" class="font-branch text-2xl md:text-3xl uppercase tracking-widest hover:opacity-70 transition-opacity">
      Fist Kolektif
    </a>
    
    <div class="flex items-center gap-6">
      <a href="/about" aria-label="About" class="hover:opacity-70 transition-opacity flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
      </a>
      <button onclick={() => isModalOpen = true} aria-label="Contact" class="hover:opacity-70 transition-opacity flex items-center justify-center cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
      </button>
    </div>
  </div>
</nav>

<!-- Full Screen Modal -->
{#if isModalOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    transition:fade={{ duration: 300 }}
    class="fixed inset-0 z-50 bg-primary flex flex-col items-center justify-center text-secondary px-4"
    onclick={(e) => { if (e.target === e.currentTarget) isModalOpen = false; }}
  >
    <!-- Close Button -->
    <button 
      onclick={() => isModalOpen = false} 
      class="absolute top-6 right-6 md:top-8 md:right-8 p-2 hover:opacity-70 transition-opacity cursor-pointer"
      aria-label="Close modal"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>

    <div class="text-center space-y-16">
      <div class="space-y-6">
        <p class="font-sans uppercase tracking-widest text-sm text-secondary/50">Get in touch</p>
        <a href="mailto:hello@fistkolektif.com" class="font-branch text-4xl md:text-7xl lg:text-[6vw] block hover:text-transparent transition-all duration-300" style="-webkit-text-stroke: 1px #f5f5f5;">
          hello@fistkolektif.com
        </a>
      </div>

      <div class="space-y-6">
        <p class="font-sans uppercase tracking-widest text-sm text-secondary/50">Network</p>
        <div class="flex items-center justify-center gap-8 md:gap-16">
          <a href="https://linkedin.com/company/fistkolektif" target="_blank" rel="noopener noreferrer" class="font-sans text-xl md:text-2xl uppercase tracking-widest hover:text-white/50 transition-colors">LinkedIn</a>
          <a href="https://instagram.com/fistkolektif" target="_blank" rel="noopener noreferrer" class="font-sans text-xl md:text-2xl uppercase tracking-widest hover:text-white/50 transition-colors">Instagram</a>
        </div>
      </div>
    </div>
  </div>
{/if}

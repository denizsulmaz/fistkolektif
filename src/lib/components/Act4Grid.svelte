<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let sectionRef: HTMLElement;
  let cardsRef: HTMLElement[] = $state([]);
  let exitCardsRef: HTMLElement[] = $state([]);
  let ctaRef: HTMLElement;

  const activeBrands = [
    { 
      name: 'V FOR HUMAN', 
      industry: 'Human Rights',
      medium: 'Non-profit',
      color: '#3C0672',
      desc: 'A non-profit organization focused on human rights.',
      url: 'https://vforhuman.org',
    },
    { 
      name: 'MXD Culture', 
      industry: 'Movement',
      medium: 'Community',
      color: '#3137fd',
      desc: 'A global movement and underground cultural community.',
      url: 'https://mxdculture.com',
    },
    { 
      name: 'SPHOT', 
      industry: 'Photography',
      medium: 'Platform',
      color: '#FFFA6C',
      desc: 'A photography community and visual discovery platform.',
      url: 'https://booksphot.com',
    },
    { 
      name: 'Social Walkers', 
      industry: 'Connection',
      medium: 'Mobile App',
      color: '#850D48',
      desc: 'A mobile application for connecting active walkers.',
      url: 'https://socialwalkers.com',
    }
  ];

  const exitBrands = [
    { 
      year: 2020,
      name: 'SoundPool', 
      industry: 'Music',
      medium: 'dApp',
      color: '#4A5D6E',
      desc: 'A decentralized protocol for artist royalties.',
      url: 'https://soundpool.app',
    },
    { 
      year: 2022,
      name: 'COPPLINN', 
      industry: 'HiFi Audio',
      medium: 'Sculpture',
      color: '#D4A373',
      desc: 'High-fidelity audio equipment constructed with brutalist sculptural design.',
      url: 'https://copplinn.com',
    },
    { 
      year: 2023,
      name: 'MANRVA', 
      industry: 'Space',
      medium: 'Agency',
      color: '#9A7B56',
      desc: 'A creative space and branding agency for the next generation of builders.',
      url: 'https://manrva.com',
    }
  ];

  function openBrandUrl(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    [...cardsRef, ...exitCardsRef].forEach((card) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: card.dataset.opacity ? parseFloat(card.dataset.opacity) : 1, 
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    if (ctaRef) {
      gsap.fromTo(ctaRef,
        { opacity: 0, y: 50 },
        {
          opacity: 1, 
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ctaRef,
            start: 'top 95%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  });
</script>

<section bind:this={sectionRef} class="min-h-screen w-full bg-primary text-secondary py-24 md:py-32 px-4 md:px-12 lg:px-24 relative z-10">
  <div class="max-w-7xl mx-auto">
    <div class="mb-16 md:mb-20">
      <h2 class="font-branch text-5xl md:text-8xl leading-none">The Circle</h2>
      <p class="font-sans mt-6 text-secondary/60 max-w-lg text-lg">We are a collective of independent entities. Success, exit, or failure. Every execution is a piece of the foundation.</p>
    </div>

    <!-- Active Projects: 2 Column Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {#each activeBrands as brand, i}
        <div 
          bind:this={cardsRef[i]}
          class="brand-card active-card group relative flex flex-col justify-between p-8 md:p-12 border border-secondary/20 bg-primary h-[350px] transition-all duration-500 cursor-pointer opacity-0"
          style="--accent-color: {brand.color}; --hover-text: {brand.name === 'SPHOT' ? '#000000' : '#ffffff'};"
          onclick={() => openBrandUrl(brand.url)}
          role="link"
          tabindex="0"
          onkeydown={(e) => { if (e.key === 'Enter') openBrandUrl(brand.url); }}
        >
          <!-- Arrow icon top-right -->
          <div class="link-arrow absolute top-6 right-6 md:top-8 md:right-8 w-9 h-9 md:w-10 md:h-10 rounded-full border border-secondary/20 flex items-center justify-center transition-all duration-500 group-hover:border-current group-hover:bg-white/10">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="transition-transform duration-500">
              <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>

          <div class="space-y-4">
            <div class="flex flex-wrap gap-2">
              <span class="pill-industry inline-block font-sans text-[10px] md:text-xs uppercase tracking-widest px-3 py-1 rounded-full border transition-all duration-300">
                {brand.industry}
              </span>
              <span class="pill-medium inline-block font-sans text-[10px] md:text-xs uppercase tracking-widest px-3 py-1 rounded-full border transition-all duration-300">
                {brand.medium}
              </span>
            </div>
            <h3 class="font-branch text-4xl md:text-5xl text-secondary transition-colors duration-500">{brand.name}</h3>
          </div>
          <div class="space-y-6">
            <p class="font-sans text-sm md:text-base text-secondary/80 leading-relaxed transition-colors duration-500">{brand.desc}</p>
            <div class="separator-line w-full h-[1px] bg-secondary/20 transition-colors duration-500"></div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Concluded Executions (Lower Height, Chronological) -->
    <div class="mt-24 md:mt-32">
      <h3 class="font-branch text-3xl md:text-5xl mb-8 md:mb-12 border-b border-secondary/10 pb-4 text-secondary/80">Concluded Executions</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {#each exitBrands as brand, i}
          <div 
            bind:this={exitCardsRef[i]}
            data-opacity="0.6"
            class="brand-card concluded-card group relative flex flex-col p-6 md:p-8 border border-secondary/10 bg-primary opacity-0 h-auto"
            style="--accent-color: {brand.color}; --accent-light: {brand.color}10; --accent-text: rgba(255,255,255,0.4);"
          >

            <div class="flex justify-between items-start mb-6 gap-2">
              <div class="flex flex-wrap gap-1.5">
                <span class="pill-industry inline-block font-sans text-[8px] md:text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border transition-all duration-300">
                  {brand.industry}
                </span>
                <span class="pill-medium inline-block font-sans text-[8px] md:text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border transition-all duration-300">
                  {brand.medium}
                </span>
              </div>
              <span class="font-sans text-[10px] md:text-xs text-secondary/30 mt-0.5">{brand.year}</span>
            </div>
            <h3 class="font-branch text-2xl md:text-3xl text-secondary mb-3">{brand.name}</h3>
            <p class="font-sans text-xs md:text-sm text-secondary/50 leading-relaxed">{brand.desc}</p>
          </div>
        {/each}
      </div>
    </div>

    <!-- Call to Action Nuance Section -->
    <div bind:this={ctaRef} class="mt-32 md:mt-48 text-center max-w-2xl mx-auto border-t border-secondary/10 pt-16 md:pt-24 opacity-0 pb-12">
      <p class="font-sans text-[10px] md:text-xs uppercase tracking-widest text-secondary/50 mb-4 md:mb-6">Execution is Everything</p>
      <h3 class="font-branch text-3xl md:text-5xl text-secondary leading-tight">We are always looking for visionary builders. Reach out to collaborate.</h3>
    </div>

  </div>
</section>

<style>
  .brand-card {
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .brand-card .pill-industry {
    border-color: rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.7);
    background-color: rgba(255, 255, 255, 0.05);
  }

  .brand-card .pill-medium {
    border-color: rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.7);
    background-color: rgba(255, 255, 255, 0.05);
  }

  /* Concluded cards styling */
  .brand-card.concluded-card .pill-industry {
    border-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.4);
    background-color: transparent;
  }
  .brand-card.concluded-card .pill-medium {
    border-color: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.3);
    background-color: transparent;
  }

  /* Active brand cards hover behavior */
  .brand-card.active-card:hover {
    background-color: var(--accent-color) !important;
    border-color: var(--accent-color) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }

  .brand-card.active-card:hover h3 {
    color: var(--hover-text) !important;
  }

  .brand-card.active-card:hover p {
    color: var(--hover-text) !important;
  }

  .brand-card.active-card:hover .link-arrow {
    border-color: var(--hover-text) !important;
    color: var(--hover-text) !important;
  }

  .brand-card.active-card:hover .pill-industry {
    background-color: var(--hover-text) !important;
    color: var(--accent-color) !important;
    border-color: var(--hover-text) !important;
  }

  .brand-card.active-card:hover .pill-medium {
    border-color: var(--hover-text) !important;
    color: var(--hover-text) !important;
    background-color: transparent !important;
  }

  .brand-card.active-card:hover .separator-line {
    background-color: var(--hover-text) !important;
    opacity: 0.3;
  }
</style>

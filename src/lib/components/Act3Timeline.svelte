<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let sectionRef: HTMLElement;
  let wrapperRef: HTMLElement;

  const timelineItems = [
    { year: 2020, name: 'SoundPool', status: 'exit' },
    { year: 2021, name: 'V FOR HUMAN', status: 'active' },
    { year: 2022, name: 'COPPLINN', status: 'exit' },
    { year: 2023, name: 'MANRVA', status: 'exit' },
    { year: 2023, name: 'MXD Culture', status: 'active' },
    { year: 2026, name: 'SPHOT', status: 'active' },
    { year: 2026, name: 'Social Walkers', status: 'active' },
  ];

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef,
        start: 'top top',
        end: '+=300%', // 3 screens of scrolling
        scrub: 1,
        pin: true
      }
    });

    const wrapperWidth = wrapperRef.scrollWidth;
    const windowWidth = window.innerWidth;
    const distanceToScroll = wrapperWidth - windowWidth;

    tl.to(wrapperRef, {
      x: -distanceToScroll,
      ease: 'none'
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  });
</script>

<section bind:this={sectionRef} class="h-screen w-full relative z-10 bg-primary text-secondary overflow-hidden">
  <!-- Top gradient separator -->
  <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary to-transparent z-20 pointer-events-none"></div>

  <div bind:this={wrapperRef} class="h-full flex items-center px-[5vw] md:px-[10vw] gap-[8vw] md:gap-[15vw] w-max">
    
    <!-- Title Area -->
    <div class="flex-shrink-0 w-[80vw] md:w-[40vw] text-left pr-10 md:pr-20">
      <h2 class="font-branch text-6xl md:text-8xl leading-none">The<br/>Timeline</h2>
      <p class="font-sans mt-6 text-secondary/50 max-w-sm uppercase tracking-widest text-sm">Chronology of execution</p>
    </div>

    <!-- Timeline Items -->
    {#each timelineItems as item}
      <div class="flex-shrink-0 flex flex-col justify-center relative group {item.status === 'exit' ? 'opacity-60' : 'cursor-pointer hover:scale-105 transition-transform duration-500'}">
        <div class="absolute -top-12 left-0 font-sans text-secondary/30 text-xl tracking-widest">{item.year}</div>
        <div class="border-l border-secondary/20 pl-8 py-4 h-full flex flex-col justify-center">
          <h3 class="font-branch text-4xl md:text-7xl {item.status === 'exit' ? 'text-secondary/80' : 'group-hover:text-white transition-colors duration-300'}">{item.name}</h3>
          {#if item.status === 'exit'}
             <p class="font-sans text-xs uppercase tracking-widest text-secondary/40 mt-4">Concluded</p>
          {/if}
        </div>
      </div>
    {/each}

    <!-- Padding at the end -->
    <div class="w-[10vw] flex-shrink-0"></div>
  </div>
</section>

<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  let sectionRef: HTMLElement;
  let textRefs: HTMLElement[] = [];

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: '.act1-content',
      }
    });

    textRefs.forEach((text, i) => {
      // First phrase is visible immediately without scrolling
      if (i === 0) {
        tl.to(text, { opacity: 0, y: -40, duration: 1, ease: 'power2.in' });
      } else {
        // Subsequent phrases fade in and up
        tl.fromTo(text, 
          { opacity: 0, y: 40 }, 
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );
        // Fade out and up, unless it's the last one
        if (i < textRefs.length - 1) {
          tl.to(text, { opacity: 0, y: -40, duration: 1, ease: 'power2.in' }, '+=0.5');
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  });
</script>

<section bind:this={sectionRef} class="h-[220vh] w-full relative z-10">
  <div class="act1-content h-screen w-full flex items-center justify-center pointer-events-none">
    <div class="relative w-full max-w-6xl mx-auto px-4 h-[300px] flex items-center justify-center text-center">
      {#each [
        "We build our own reality.",
        "Outside the noise.",
        "United by execution.",
        "An alternative ecosystem of builders.",
        "Welcome to FIST Kolektif."
      ] as phrase, i}
        <h1 
          bind:this={textRefs[i]}
          class="absolute font-branch text-5xl md:text-8xl lg:text-[8vw] leading-[1.1] {i === 0 ? 'opacity-100' : 'opacity-0'}"
          style="text-wrap: balance;"
        >
          {phrase}
        </h1>
      {/each}
    </div>
  </div>
</section>


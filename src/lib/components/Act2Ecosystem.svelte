<script lang="ts">
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { geoNaturalEarth1 } from 'd3-geo';
  import { mapPaths, MAP_WIDTH, MAP_HEIGHT } from '$lib/assets/map-paths';

  let sectionRef: HTMLElement;
  let mapRef: HTMLElement;
  let pinsRef: HTMLElement[] = [];

  // Business locations with real geo coordinates
  // Pin coordinates are slightly offset from real positions to avoid overlap on a world map
  const locations = [
    { id: 'v4h',   name: 'V FOR HUMAN',    loc: 'Istanbul, TUR',      lng: 27.5,   lat: 41.8,  labelDir: 'top'    as const },
    { id: 'sw',    name: 'Social Walkers',  loc: 'Istanbul, TUR',      lng: 29.0,   lat: 39.5,  labelDir: 'bottom' as const },
    { id: 'mxd',   name: 'MXD Culture',     loc: 'Barcelona, ESP',     lng: -3.7,   lat: 40.42, labelDir: 'top'    as const },
    { id: 'man',   name: 'MANRVA',          loc: 'Bangkok, THA',       lng: 100.5,  lat: 13.75, labelDir: 'top'    as const },
    { id: 'sphot', name: 'SPHOT',           loc: 'Seoul, KOR',         lng: 126.98, lat: 37.57, labelDir: 'top'    as const },
    { id: 'cop',   name: 'COPPLINN',        loc: 'Kocaeli, TUR',       lng: 31.5,   lat: 40.6,  labelDir: 'right'  as const },
    { id: 'sp',    name: 'SoundPool',       loc: 'San Francisco, USA', lng: -122.4, lat: 37.78, labelDir: 'top'    as const }
  ];

  let idleTimer: ReturnType<typeof setTimeout>;
  let showAllTooltips = $state(false);

  // Projection for pin placement only (same as used to generate paths)
  const projection = geoNaturalEarth1()
    .scale(155)
    .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2]);

  function resetIdle() {
    showAllTooltips = false;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => { showAllTooltips = true; }, 2500);
  }

  function geoToPercent(lng: number, lat: number): { x: string; y: string } {
    const projected = projection([lng, lat]);
    if (!projected) return { x: '50%', y: '50%' };
    const x = (projected[0] / MAP_WIDTH) * 100;
    const y = (projected[1] / MAP_HEIGHT) * 100;
    return { x: `${x}%`, y: `${y}%` };
  }

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('scroll', resetIdle);
    resetIdle();

    ScrollTrigger.create({
      trigger: sectionRef,
      start: 'top 60%',
      onEnter: () => {
        gsap.to(mapRef, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' });

        pinsRef.forEach((pin, index) => {
          if (!pin) return;
          gsap.to(pin, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.3 + (index * 0.1),
            ease: 'back.out(1.5)'
          });
        });
      }
    });

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('scroll', resetIdle);
    };
  });
</script>

<section bind:this={sectionRef} class="min-h-screen w-full relative z-10 bg-primary overflow-hidden flex flex-col justify-center items-center py-16 md:py-20">

  <!-- Title -->
  <div class="mb-8 md:mb-12 z-30 pointer-events-none text-center">
    <h2 class="font-branch text-4xl md:text-6xl lg:text-7xl text-secondary leading-none opacity-80">Global Footprint</h2>
    <p class="font-sans text-secondary/50 uppercase tracking-widest text-xs md:text-sm mt-4">Nodes in the network</p>
  </div>

  <!-- Map Container (larger than viewport to 'zoom in' on the continents) -->
  <div class="relative w-[150vw] md:w-[130vw] lg:w-[115vw] max-w-[2500px]">
    <div
      bind:this={mapRef}
      class="relative w-full opacity-0 scale-95"
      style="aspect-ratio: {MAP_WIDTH} / {MAP_HEIGHT};"
    >
      <!-- SVG World Map (pre-generated paths, no runtime processing) -->
      <svg
        viewBox="0 0 {MAP_WIDTH} {MAP_HEIGHT}"
        class="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="map-vignette" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="transparent" />
            <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.6" />
          </radialGradient>
        </defs>

        <!-- Land masses (static, pre-generated) -->
        {#each mapPaths as d}
          <path
            {d}
            fill="rgba(255, 255, 255, 0.02)"
            stroke="rgba(255, 255, 255, 0.15)"
            stroke-width="0.5"
          />
        {/each}

        <!-- Vignette -->
        <rect x="0" y="0" width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#map-vignette)" />
      </svg>

      <!-- Edge fade -->
      <div class="absolute inset-0 pointer-events-none" style="
        background: linear-gradient(to bottom, #0a0a0a 0%, transparent 12%, transparent 88%, #0a0a0a 100%);
      "></div>
      <div class="absolute inset-0 pointer-events-none" style="
        background: linear-gradient(to right, #0a0a0a 0%, transparent 8%, transparent 92%, #0a0a0a 100%);
        opacity: 0.5;
      "></div>

      <!-- Location Pins -->
      {#each locations as loc, i}
        {@const pos = geoToPercent(loc.lng, loc.lat)}
        <div
          bind:this={pinsRef[i]}
          class="absolute flex flex-col items-center group cursor-pointer pointer-events-auto z-10 opacity-0"
          style="left: {pos.x}; top: {pos.y}; transform: translate(-50%, -50%) translateY(2rem);"
        >
          <div class="pin-dot relative w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white transition-transform duration-300 group-hover:scale-[2]">
            <div class="absolute inset-0 rounded-full bg-white animate-ping opacity-30"></div>
          </div>
          <div class="absolute transition-all duration-500 pointer-events-none whitespace-nowrap bg-black/85 backdrop-blur-md border border-white/10 px-3 py-2 rounded-md text-center z-20 shadow-2xl
            {loc.labelDir === 'top' ? 'bottom-5 md:bottom-6' : ''}
            {loc.labelDir === 'bottom' ? 'top-5 md:top-6' : ''}
            {loc.labelDir === 'right' ? 'left-5 md:left-6 top-1/2 -translate-y-1/2' : ''}
            {showAllTooltips ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'}">
            <p class="font-sans text-white text-[10px] md:text-xs font-semibold leading-none tracking-wider">{loc.name}</p>
            <p class="font-sans text-[7px] md:text-[9px] uppercase tracking-widest text-white/40 mt-1">{loc.loc}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>

</section>

<style>
  .pin-dot {
    box-shadow: 0 0 12px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.3);
  }
</style>

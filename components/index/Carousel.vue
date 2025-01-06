<template>
  <div class="relative w-full overflow-hidden h-140 pt-32">
    <div class="flex transition-transform duration-500 ease-in-out">
      <div class="w-full flex-shrink-0">
        <img src="@/public/standard.gif" alt="Slide 1" class="w-full h-96  object-cover">
      </div>
      <div class="w-full flex-shrink-0">
        <img src="@/public/moyen.gif" alt="Slide 2" class="w-full h-96 object-cover">
      </div>
      <div class="w-full flex-shrink-0">
        <img src="@/public/difficile.gif" alt="Slide 3" class="w-full h-96 object-cover">
      </div>
    </div>

    <button 
      @click="prevSlide" 
      class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 hover:bg-opacity-75 z-20 cursor-pointer">
      &#8592;
    </button>
    <button 
      @click="nextSlide" 
      class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 hover:bg-opacity-75 z-20 cursor-pointer">
      &#8594;
    </button>

    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
      <button 
        v-for="n in slides" 
        :key="n" 
        @click="goToSlide(n-1)"
        :class="['w-3 h-3 rounded-full bg-white', currentSlide === n-1 ? 'opacity-100' : 'opacity-50']">
      </button>
    </div>
  </div>
</template>

<script setup>

const currentSlide = ref(0)
const slides = ref(3) 
const slideInterval = ref(null)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value
  updateSlidePosition()
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value) % slides.value
  updateSlidePosition()
}

const goToSlide = (index) => {
  currentSlide.value = index
  updateSlidePosition()
}

const updateSlidePosition = () => {
  const container = document.querySelector('.flex.transition-transform')
  if (container) {
    container.style.transform = `translateX(-${currentSlide.value * 100}%)`
  }
}

const startAutoSlide = () => {
  slideInterval.value = setInterval(nextSlide, 5000) // Change de slide toutes les 5 secondes
}

const stopAutoSlide = () => {
  if (slideInterval.value) {
    clearInterval(slideInterval.value)
  }
}

onMounted(() => {
  updateSlidePosition()
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})
</script>
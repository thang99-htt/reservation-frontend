<template>
    <div class="">
        <img v-for="image in images" :key="image.id" :src="image.src" alt="Image" class="mb-2">
    </div>
</template>

<script>
    export default {
        data() {
            return {
                images: [
                    { id: 1, src: 'images/home1.jpg' , position: 0 },
                    { id: 2, src: 'images/home2.jpg' , position: 0 },
                    { id: 3, src: 'images/home3.jpg' , position: 0 },
                    { id: 4, src: 'images/home4.jpg' , position: 0 },
                    { id: 5, src: 'images/home5.jpg' , position: 0}
                ]
            }
        },
    }
</script>

<style>
    img {
        width: 100%;
        height: auto;
    }

</style>
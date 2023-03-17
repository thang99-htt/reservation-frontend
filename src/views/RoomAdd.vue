<template>
    <div class="page">
        <h4>Thêm Phòng</h4>
        <RoomForm
            :room="room"
            @submit:room="createRoom"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
    import RoomForm from "@/components/RoomForm.vue";
    import RoomService from "@/services/room.service";

    export default {
        components: {
            RoomForm,
        },
        props: {
            id: { type: String, required: true },
        },
        data() {
            return {
                room: {
                    'name': "",
                    'price': "",
                    'type': "",
                    'is_vailable': "",
                },
                message: "",
            };
        },
        methods: {
            async createRoom(data) {
                try {
                    await RoomService.create( data);
                    this.message = "Phòng được thêm thành công.";
                } catch (error) {
                    console.log(error);
                }
            },
        },
    };
</script>

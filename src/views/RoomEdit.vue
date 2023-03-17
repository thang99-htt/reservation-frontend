<template>
    <div v-if="room" class="page">
        <h4>Hiệu chỉnh Phòng</h4>
        <RoomForm
            :room="room"
            @submit:room="updateRoom"
            @delete:room="deleteRoom"
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
                room: null,
                message: "",
            };
        },
        methods: {
            async getRoom(id) {
                try {
                    this.room = await RoomService.get(id);
                } catch (error) {
                    console.log(error);
                    // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
                    this.$router.push({
                        name: "notfound",
                        params: {
                            pathMatch: this.$route.path.split("/").slice(1)
                        },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
            },
            async updateRoom(data) {
                try {
                    await RoomService.update(this.room._id, data);
                    this.message = "Phòng được cập nhật thành công.";
                } catch (error) {
                    console.log(error);
                }
            },
            async deleteRoom() {
                if (confirm("Bạn muốn xóa Phòng này?")) {
                    try {
                        await RoomService.delete(this.room._id);
                        this.$router.push({ name: "room" });
                    } catch (error) {
                        console.log(error);
                    }
                }
            },
        },
        created() {
            this.getRoom(this.id);
            this.message = "";
        },
    };
</script>

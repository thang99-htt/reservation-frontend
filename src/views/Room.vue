<template>
    <div class="row">
        <div class="col-12">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-12">
            <RoomList
                v-if="filteredRoomsCount > 0"
                :rooms="filteredRooms"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có phòng nào.</p>

            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddRoom">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button
                    class="btn btn-sm btn-danger"
                    @click="removeAllRooms"
                >
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <!-- <div class="mt-3 col-md-6">
            <div v-if="activeRoom">
                <h4>
                    Chi tiết Liên hệ
                    <i class="fas fa-address-card"></i>
                </h4>
                <RoomCard :room="activeRoom" />
                <router-link
                    :to="{
                        name: 'room.edit',
                        params: { id: activeRoom._id },
                    }"
                >
                    <span class="mt-2 badge badge-warning">
                    <i class="fas fa-edit"></i> Hiệu chỉnh</span
                >
                </router-link>
            </div>
        </div> -->
    </div>
</template>

<script>
    import RoomCard from "@/components/RoomCard.vue";
    import InputSearch from "@/components/InputSearch.vue";
    import RoomList from "@/components/RoomList.vue";
    import RoomService from "@/services/room.service";

    export default {
    components: {
        RoomCard,
        InputSearch,
        RoomList,
    },
    // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
    data() {
        return {
            rooms: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        // Giám sát các thay đổi của biến searchText.
        // Bỏ chọn phần tử đang được chọn trong danh sách.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Chuyển các đối tượng room thành chuỗi để tiện cho tìm kiếm.
        roomStrings() {
            return this.rooms.map((room) => {
                const { name, email, address, phone } = room;
                return [name, email, address, phone].join("");
            });
        },
        // Trả về các room có chứa thông tin cần tìm kiếm.
        filteredRooms() {
            if (!this.searchText) return this.rooms;
            return this.rooms.filter((_room, index) =>
                this.roomStrings[index].includes(this.searchText)
            );
        },
        activeRoom() {
            if (this.activeIndex < 0) return null;
            return this.filteredRooms[this.activeIndex];
        },
        filteredRoomsCount() {
            return this.filteredRooms.length;
        },
    },
    methods: {
        async retrieveRooms() {
            try {
                this.rooms = await RoomService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveRooms();
            this.activeIndex = -1;
        },
        async removeAllRooms() {
            if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                try {
                    await RoomService.deleteAll();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddRoom() {
            this.$router.push({ name: "room.add" });
        },
    },
    mounted() {
        this.refreshList();
    },
    };
</script>

<style scoped>
    .page {
    text-align: left;
    max-width: 750px;
    }
</style>

<template>
    <div class="row">
        <div class="col-12 mt-150 mb-3">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-12">
            <RoomList
                v-if="filteredRoomsCount > 0"
                :rooms="filteredRooms"
                v-model:activeIndex="activeIndex"
            />
            <p v-else>Không có phòng nào.</p>
        </div>
    </div>
</template>

<script>
	import $ from 'jquery'
    import InputSearch from "@/components/users/rooms/InputSearch.vue";
    import RoomList from "@/components/users/rooms/RoomList.vue";
    import RoomService from "@/services/room.service";

    export default {
        name: 'room',
        components: {
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
        },
        mounted() {
            this.refreshList();
            $('.header').addClass('scrolled');
        },
    };
</script>

<style scoped>
    .page {
    text-align: left;
    max-width: 750px;
    }
</style>

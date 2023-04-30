<template>
    <div class="row">
        <div class="col-12 mt-150 mb-3">
            <InputSearch 
                :search="search"
                @submitSearch="retrieveRooms"
            />
        </div>
        <div class="mt-3 col-12">
            <RoomList
                v-show="filteredRoomsCount > 0"
                :rooms="filteredRooms"
                :key="rooms.length"
                :search="search"
            />
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
                search: {
                    checkin_date: new Date().toISOString().slice(0, 10),
                    checkout_date: new Date(new Date().getTime() + 86400000).toISOString().slice(0, 10),
                    num_of_guests: "",
                    type: "",
                    status: ""
                },
            };
        },
        watch: {
            search: {
                handler: "retrieveRooms",
                deep: true,
            },
        },
        computed: {
            filteredRooms() {
                return this.rooms;
            },
            filteredRoomsCount() {
                return this.filteredRooms.length;
            },
        },
        methods: {
            async retrieveRooms() {
                try {
                    this.rooms = await RoomService.getAll(this.search.num_of_guests, this.search.type, this.search.status);
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveRooms();
            },
        },
        mounted() {
            this.refreshList();
            $('.header').addClass('scrolled');
            $(window).on('scroll', function() {
                $('.header').addClass('scrolled');
            });
        },
    };
</script>

<style scoped>
    .page {
    text-align: left;
    max-width: 750px;
    }
</style>

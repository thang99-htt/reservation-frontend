<template>
    <div class="container-fluid p-5 profiles mt-70">
        <div class="row">
            <div class="col-2">
                <div class="sidebar">
                    <nav class="navbar"> 
                        <div class="navbar-nav w-100">
                            <p class="name">{{ getUser.name }}</p>
                            <p class="text-dark">{{ getUser.email }}</p>
                            <p class="mt-2 mb-2">{{ getUser.phone }}</p>
                        </div>
                    </nav>
                </div>
            </div>
            <div class="col-10">
                <div class="ms-3">
                    <div class="box-header with-border p-0 mb-4">
                        <h3>Đơn đặt phòng gần đây</h3>
                    </div>
                    <BookingList 
                        v-if="filteredBookingsCount > 0"
                        :bookings="filteredBookings"
                    />
                    <div v-else>
                        <img src="/images/empty-cart.svg" class="d-block m-auto" alt="" />
                        <h6 class="text-center mt-4">Chưa có đơn đặt phòng nào.</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	import $ from 'jquery'
    import {mapGetters} from 'vuex';
    import BookingList from "@/components/users/bookings/BookingList.vue";
    import BookingService from "@/services/booking.service";

    export default {
        components: {
            BookingList,
        },
        data() {
            return {
                bookings: [],
            };
        },
        methods: {
            async retrieveBookings() {
                try {
                    this.bookings = await BookingService.getAllBooking(this.getUser._id);
                    this.bookings.reverse();
                } catch (error) {
                    console.log(error);
                }
            },
        },
        mounted() {
            this.retrieveBookings()
            $('.header').addClass('scrolled');
            $(window).on('scroll', function() {
                $('.header').addClass('scrolled');
            });
        },
        computed: {
            filteredBookings() {
                return this.bookings;
            },
            filteredBookingsCount() {
                return this.filteredBookings.length;
            },
            ...mapGetters(['getUser']),
        }
    };
</script>
<style scoped> 
    .accordion-item {
        border: none !important;
    }
    .accordion-button {
        font-weight: 600 !important;
        font-size: 20px;
    }

    .acc-name {
        border-right: 1px solid #a4a4a4;
        padding-right: 8px;
        margin-right: 4px;
    }

    a {
        cursor: pointer;
    }
</style>
<template>
    <div class="accordion mt-3">
        <div
            class="accordion-item"
            v-for="(booking, index) in bookingsList"
            :key="booking._id"
        >
            <div class="accordion-status">
                <span> {{ booking.status }}</span>
                <span v-if="booking.paid === false">Chưa thanh toán</span>
                <span v-else>Đã thanh toán</span>
            </div>
            <hr>
            <div class="accordion-content justify">
                <div class="row">
                    <div class="col-8">
                        <div class="row">
                            <div class="col-4">
                                <div v-if="booking.room_type == 'Phòng nghỉ dưỡng'">
                                    <div :id="'carouselExampleControls_' + index" class="carousel slide" data-ride="carousel">
                                        <ol class="carousel-indicators">
                                            <li data-target="'#carouselExampleControls_' + index" data-slide-to="0" class="active"></li>
                                            <li data-target="'#carouselExampleControls_' + index" data-slide-to="1"></li>
                                            <li data-target="'#carouselExampleControls_' + index" data-slide-to="2"></li>
                                            <li data-target="'#carouselExampleControls_' + index" data-slide-to="3"></li>
                                        </ol>
                                        <div class="carousel-inner">
                                            <div class="carousel-item" v-for="(resortImg, index) in resortsList" :key="index" :class="{ active: index === currentIndex }">
                                                <img :src="resortImg.image" alt="" width="200" height="150" class="d-block w-100">
                                            </div>
                                        </div>
                                        <button class="carousel-control-prev" type="button" :data-target="'#carouselExampleControls_' + index" data-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        </button>
                                        <button class="carousel-control-next" type="button" :data-target="'#carouselExampleControls_' + index" data-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                </div>
                                <div v-if="booking.room_type == 'Phòng thượng hạng'">
                                    <div :id="'carouselExampleControls_' + index" class="carousel slide" data-ride="carousel">
                                        <ol class="carousel-indicators">
                                            <li data-target="'#carouselExampleControls_' + index" data-slide-to="0" class="active"></li>
                                            <li data-target="'#carouselExampleControls_' + index" data-slide-to="1"></li>
                                            <li data-target="'#carouselExampleControls_' + index" data-slide-to="2"></li>
                                            <li data-target="'#carouselExampleControls_' + index" data-slide-to="3"></li>
                                        </ol>
                                        <div class="carousel-inner">
                                            <div class="carousel-item" v-for="(suitImg, index) in suitsList" :key="index" :class="{ active: index === currentIndex }">
                                                <img :src="suitImg.image" alt="" width="200" height="150" class="d-block w-100">
                                            </div>
                                        </div>
                                        <button class="carousel-control-prev" type="button" :data-target="'#carouselExampleControls_' + index" data-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        </button>
                                        <button class="carousel-control-next" type="button" :data-target="'#carouselExampleControls_' + index" data-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                </div>
                                <div v-if="booking.room_type == 'Biệt thự'">
                                    <div :id="'carouselExampleControls_' + index" class="carousel slide" data-ride="carousel">
                                        <ol class="carousel-indicators">
                                            <li data-target="'#carouselExampleControls_' + index" data-slide-to="0" class="active"></li>
                                            <li data-target="'#carouselExampleControls_' + index" data-slide-to="1"></li>
                                            <li data-target="'#carouselExampleControls_' + index" data-slide-to="2"></li>
                                            <li data-target="'#carouselExampleControls_' + index" data-slide-to="3"></li>
                                        </ol>
                                        <div class="carousel-inner">
                                            <div class="carousel-item" v-for="(villaImg, index) in villasList" :key="index" :class="{ active: index === currentIndex }">
                                                <img :src="villaImg.image" alt="" width="200" height="150" class="d-block w-100">
                                            </div>
                                        </div>
                                        <button class="carousel-control-prev" type="button" :data-target="'#carouselExampleControls_' + index" data-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        </button>
                                        <button class="carousel-control-next" type="button" :data-target="'#carouselExampleControls_' + index" data-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-8">
                                <h3>{{ booking.room_name }}</h3>
                                <p>Loại phòng: {{ booking.room_type }}</p>
                                <p>Sức chứa: {{ booking.room_capacity }} người</p>
                                <p>Giá: {{ formatPrice(booking.room_price) }} VNĐ / Đêm</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="accordion-btn">
                            <p>Ngày nhận phòng: {{ booking.checkin_date }}</p>
                            <p>Ngày trả phòng: {{ booking.checkout_date }}</p>
                            <p>Số lượng khách: {{ booking.num_of_guests }} người</p>
                            <p>Phí dịch vụ: 250.000</p>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
            <div class="accordion-btn">
                <div>
                    <span>Thành tiền: </span><span class="fs-4 ms-3">{{ formatPrice(booking.total_price) }} VNĐ</span>
                </div>
                <button
                    v-if="booking.status == 'Đang chờ xử lý'"
                    type="button"
                    class="btn btn-danger"
                    @click="cancleOrder(booking)"
                >
                    Hủy đơn
                </button>
                <button
                    v-else-if="booking.status == 'Đã hủy'"
                    type="button"
                    class="btn btn-secondary"
                >
                    Đã hủy
                </button>
                <button
                    v-else
                    type="button"
                    class="btn btn-success"
                >
                    Đã hoàn thành
                </button>     
            </div>
        </div>
    </div>
</template>

<script>
    import BookingService from "@/services/booking.service";
    import {mapGetters} from 'vuex';

    export default {
        name: 'bookingList',
        props: {
            bookings: { type: Array, default: [] },
        },
        data() {
            return {
                bookingsList: this.bookings,
                currentIndex: 1,
                resortsList: [
                    { image: 'images/phong-nghi-duong-1.jpg' },
                    { image: 'images/phong-nghi-duong-2.jpg' },
                    { image: 'images/phong-nghi-duong-3.jpg' },
                    { image: 'images/phong-nghi-duong-4.jpg' },
                ],
                suitsList: [
                    { image: 'images/phong-thuong-hang-1.jpg' },
                    { image: 'images/phong-thuong-hang-2.jpg' },
                    { image: 'images/phong-thuong-hang-3.jpg' },
                    { image: 'images/phong-thuong-hang-4.jpg' },
                ],
                villasList: [
                    { image: 'images/biet-thu-4.jpg' },
                    { image: 'images/biet-thu-6.jpg' },
                    { image: 'images/biet-thu-9.jpg' },
                    { image: 'images/biet-thu-12.jpg' },
                ],
            };
        },
        methods: {
            getImage(image){
                return 'http://127.0.0.1:8000/storage/uploads/products/'+image;
            },
            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            cancleOrder(booking) {
                try {
                    BookingService.cancleOrder(booking._id)
                    .then(async (response) => {
                        console.log(response)
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        
                        this.bookingsList = await BookingService.getAllBooking(this.getUser._id);

                        Toast.fire({
                            icon: 'success',
                            title: 'Đơn đặt phòng đã được hủy.'
                        })
                    })                  

                } catch (error) {
                    console.log(error);
                }   
            },
        },

        computed: {
            ...mapGetters(['getUser']),
        }
        
    };
</script>

<style>
    .accordion-item {
        background-color: #fffdfd;
        box-shadow: 0 0 10px #00000012;
        padding: 20px;
        margin-bottom: 20px;
    }

    .accordion-item img {
        border-radius: 4px;
    }

    .accordion-item hr {
        height: 1px;
        color: #aeaeaeee;
    }

    .accordion-status {
        display: flex;
        justify-content: end;
    }
    
    .accordion-status span {
        padding: 0 10px ;
    }
    
    .accordion-status span:nth-child(1) {
        color: #26aa99;
        font-weight: bold;
        border-right: 1px solid #ccc;
    }

    .accordion-status span:nth-child(2) {
        color: orangered;
    }

    .accordion-price {
        display: flex;
        align-items: center;
        justify-content: end;
    }
    
    .accordion-btn {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
    }
    
    .accordion-btn button {
        margin: 10px 0;
        padding: 8px 30px ;
    }
    .accordion-btn span:nth-child(2) {
        color: #0167f3;
    }
</style>
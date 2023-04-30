<template>
    <div class="container mt-3">
        <h3>Tất cả phòng</h3>
        
        <div class="accordion mt-3">
            <div
                class="accordion-item"
                v-for="(room, index) in roomsList"
                :key="room._id"
            >
                <div class="accordion-content">
                    <div class="row">
                        <div class="col-4">
                            <div v-if="room.type == 'Phòng nghỉ dưỡng'">
                                <div :id="'carouselExampleControls_' + index" class="carousel slide" data-ride="carousel">
                                    <ol class="carousel-indicators">
                                        <li data-target="'#carouselExampleControls_' + index" data-slide-to="0" class="active"></li>
                                        <li data-target="'#carouselExampleControls_' + index" data-slide-to="1"></li>
                                        <li data-target="'#carouselExampleControls_' + index" data-slide-to="2"></li>
                                        <li data-target="'#carouselExampleControls_' + index" data-slide-to="3"></li>
                                    </ol>
                                    <div class="carousel-inner">
                                        <div class="carousel-item" v-for="(resortImg, index) in resortsList" :key="index" :class="{ active: index === currentIndex }">
                                            <img :src="resortImg.image" alt="" width="300" height="250" class="d-block w-100">
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
                            <div v-if="room.type == 'Phòng thượng hạng'">
                                <div :id="'carouselExampleControls_' + index" class="carousel slide" data-ride="carousel">
                                    <ol class="carousel-indicators">
                                        <li data-target="'#carouselExampleControls_' + index" data-slide-to="0" class="active"></li>
                                        <li data-target="'#carouselExampleControls_' + index" data-slide-to="1"></li>
                                        <li data-target="'#carouselExampleControls_' + index" data-slide-to="2"></li>
                                        <li data-target="'#carouselExampleControls_' + index" data-slide-to="3"></li>
                                    </ol>
                                    <div class="carousel-inner">
                                        <div class="carousel-item" v-for="(suitImg, index) in suitsList" :key="index" :class="{ active: index === currentIndex }">
                                            <img :src="suitImg.image" alt="" width="300" height="250" class="d-block w-100">
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
                            <div v-if="room.type == 'Biệt thự'">
                                <div :id="'carouselExampleControls_' + index" class="carousel slide" data-ride="carousel">
                                    <ol class="carousel-indicators">
                                        <li data-target="'#carouselExampleControls_' + index" data-slide-to="0" class="active"></li>
                                        <li data-target="'#carouselExampleControls_' + index" data-slide-to="1"></li>
                                        <li data-target="'#carouselExampleControls_' + index" data-slide-to="2"></li>
                                        <li data-target="'#carouselExampleControls_' + index" data-slide-to="3"></li>
                                    </ol>
                                    <div class="carousel-inner">
                                        <div class="carousel-item" v-for="(villaImg, index) in villasList" :key="index" :class="{ active: index === currentIndex }">
                                            <img :src="villaImg.image" alt="" width="300" height="250" class="d-block w-100">
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
                        <div class="col-4 accordion-info">
                            <h2>{{ room.name }}</h2>
                            <p>Loại phòng: {{ room.type }}</p>
                            <p>Sức chứa: {{ room.capacity }} người</p>
                            <p>Giá: {{ formatPrice(room.price) }} VNĐ / Đêm</p>
                            <p><strong>Trạng thái: </strong>
                                <span v-if="room.is_available" class="text-success fw-bold">Còn chỗ</span>
                                <span v-else class="text-danger fw-bold">Hết chỗ</span>
                            </p>
                        </div>
                        <div class="col-4 accordion-order">
                            <p class="discount">GIẢM GIÁ THÀNH VIÊN</p>
                            <p class="special">5%</p>
                            <p>Chưa bao gồm thuế và phí dịch vụ</p>
                            <button @click="openModel(room._id)"><span>Đặt ngay</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="myModel">
            <div class="modal d-block">
                <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title" id="updateAddressModalLabel">ĐẶT PHÒNG</h4>
                            <button type="button" class="btn-close"  @click="closeModel"></button>
                        </div>
                        <div class="modal-body">
                            <BookingForm 
                                :room="room"
                                :search="search"
                                :customer="customer"
                                :booking="booking"
                                @submitBooking="createBooking"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BookingForm from "@/components/users/bookings/BookingForm.vue";
    import CustomerService from "@/services/customer.service";
    import BookingService from "@/services/booking.service";
    import RoomService from "@/services/room.service";
    import {mapGetters} from 'vuex';

    export default {
        props: {
            rooms: { type: Array, default: [] },
            search: { type: Array, default: [] },
        },
        components: {
            BookingForm
        },
        data() {
            return {
                myModel: false,
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
                customer: {
                    'name': "",
                    'email': "",
                    'phone': "",
                    'password': "123456",
                    'status': 1
                },
                room: null,
                booking: {
                    'checkin_date': "",
                    'checkout_date': "",
                    'customer_id': "",
                    'room_id': "",
                    'num_of_guests': "",
                    'total_price': "",
                    'status': 'Đang chờ xử lý',
                    'paid': false
                },
                roomsList: this.rooms,
                searchLocal: this.search,
            }
        },
        computed: {
            ...mapGetters(['getUser'])
        },
        methods: {
            async openModel(id) {
                await RoomService.get(id).then((response) => {
                    if(response.is_available == false) {
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
                            Toast.fire({
                                icon: 'warning',
                                title: 'Phòng này không còn trống. Vui lòng chọn phòng khác!'
                            })  
                        this.myModel = false;

                    }
                    else {
                        this.room = response;
                        this.booking.checkin_date = this.search.checkin_date;
                        this.booking.checkout_date = this.search.checkout_date;
                        this.booking.num_of_guests = response.capacity;
                        this.booking.room_id = response._id;

                        const oneDay = 24 * 60 * 60 * 1000;
                        const checkinDate = new Date(this.booking.checkin_date);
                        const checkoutDate = new Date(this.booking.checkout_date);
                        const diffDays = Math.round(Math.abs((checkinDate - checkoutDate) / oneDay));

                        this.booking.total_price = response.price*diffDays + 250000;
                        
                        if(this.getUser) {
                            this.customer.email = this.getUser.email;
                            this.customer.name = this.getUser.name;
                            this.customer.phone = this.getUser.phone;

                        }
                        this.myModel = true;
                    }
                });
            },
            closeModel() {
                this.myModel = false;
                this.reset();
            },
            formatPrice(value) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            },
            reset() {
                this.customer.name = "",
                this.customer.email = "",
                this.customer.phone = ""
            },
            async createBooking(data) {
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
                try {     
                    if(this.getUser) {
                        this.booking.customer_id = this.getUser._id;
                        await BookingService.create(data.booking).then(async () => {
                            this.roomsList = await RoomService.getAll();
                            Toast.fire({
                                icon: 'success',
                                title: 'Đặt phòng thành công.'
                            })
                        })

                        this.myModel = false;
                        this.reset();
                    } else {
                        await CustomerService.register(data.customer).then(async (response) => {
                            this.booking.customer_id = response._id;
                            await BookingService.create(data.booking).then(async () => {
                                this.roomsList = await RoomService.getAll();
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Đặt phòng thành công.'
                                })
                            })
    
                            this.myModel = false;
                            this.reset();
    
                        });  
                    }

                } catch (error) {
                    console.log(error);
                    Toast.fire({
                        icon: 'warning',
                        title: 'Vui lòng chọn ngày nhận và ngày trả phòng!'
                    })
                    this.myModel = false;
                    this.reset();
                }
            },
        },
    };
</script>


<style>
.modal-dialog-scrollable .modal-content {
    padding: 10px;
}
.accordion {
  display: flex;
  flex-direction: column;
}

.accordion-item {
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.accordion-content {
  padding: 1rem;
  background-color: #f5f5f5;
  cursor: pointer;
}

.accordion-content:hover {
  background-color: #eaeaea;
}

.accordion-content img {
    border-radius: 4px;
}

.accordion-info h2 {
    font-weight: 400;
    font-size: 36px;
}

.accordion-order {
    margin-top: 30px;
    text-align: end;
}

.accordion-order p {
    margin: 0;
}

.accordion-order .discount {
    color: #b38b7a;
    font-weight: 700;
}

.accordion-order .special {
    font-size: 50px;
    color: #ff8181;
    margin-right: 20px;
}

.accordion-order button {
 margin-top: 20px;
 margin-left: 150px;
 position: relative;
 display: flex;
 justify-content: center;
 align-items: center;
 border-radius: 5px;
 background: #183153;
 font-family: "Montserrat", sans-serif;
 box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.2);
 overflow: hidden;
 border: none;
}

.accordion-order button:after {
 content: " ";
 width: 0%;
 height: 100%;
 background: #FFD401;
 position: absolute;
 transition: all 0.4s ease-in-out;
 right: 0;
}

.accordion-order button:hover::after {
 right: auto;
 left: 0;
 width: 100%;
}

.accordion-order button span {
 text-align: center;
 text-decoration: none;
 width: 100%;
 padding: 18px 25px;
 color: #fff;
 font-size: 1.125em;
 font-weight: 700;
 letter-spacing: 0.3em;
 z-index: 20;
 transition: all 0.3s ease-in-out;
}

.accordion-order button:hover span {
 color: #183153;
 animation: scaleUp 0.3s ease-in-out;
}

@keyframes scaleUp {
 0% {
  transform: scale(1);
 }

 50% {
  transform: scale(0.95);
 }

 100% {
  transform: scale(1);
 }
}

.error-feedback {
  color: red;
}

.modal-content {
    background-color: #f4f2ed;
}

</style>
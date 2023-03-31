<template>
    <section class="content">  
      <div class="row center-block">
        <div class="col-md-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Danh sách đơn đặt</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
                <div class="row">
                    <div class="mb-5 col-4 ms-4">              
                        <div class="d-flex align-items-center">
                            <button class="btn btn-primary me-3" @click="refreshList()">
                                <i class="fas fa-redo"></i> Làm mới
                            </button>
                            <button class="btn btn-success me-3"  @click="openModel">
                                <i class="fas fa-plus"></i> Thêm mới
                            </button>
                            <button
                                class="btn btn-danger"
                                @click="removeAllBookings"
                            >
                                <i class="fas fa-trash"></i> Xóa tất cả
                            </button>
                        </div>
                    </div>
                </div>
                <div class="row">
                  <div class="col-sm-12 table-responsive">
                    <BookingList
                        v-if="filteredBookingsCount > 0"
                        :bookings="filteredBookings"
                    />
                    <p v-else>Không có phòng nào.</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div v-if="myModel">
        <div class="modal d-block">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateAddressModalLabel">Thêm phòng mới</h5>
                        <button type="button" class="btn-close"  @click="closeModel"></button>
                    </div>
                    <div class="modal-body">{{ room }}
                        <BookingForm 
                            :room="room"
                            @submit:room="createRoom"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BookingList from "@/components/admins/bookings/BookingList.vue";
    import BookingForm from "@/components/admins/bookings/BookingForm.vue";
    import BookingService from "@/services/booking.service";

    export default {
        components: {
            BookingList,
            BookingForm
        },
        name: 'admin.booking',
        // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
        data() {
            return {
                myModel: false,
                bookings: [],
                room: {
                    'name': "",
                    'type': "",
                    'price': "",
                    'capacity': "",
                },
            };
        },
        computed: {
            filteredBookings() {
                return this.bookings;
            },
            filteredBookingsCount() {
                return this.filteredBookings.length;
            },
        },
        methods: {
            openModel() {
                this.myModel = true;
            },
            closeModel() {
                this.myModel = false;
            },
            async retrieveBookings() {
                try {
                    this.bookings = await BookingService.getAll();
                } catch (error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveBookings();
            },
            async createRoom(data) {
                try {
                    await BookingService.create( data).then((response) => {
                        // console.log(response);
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
                            icon: 'success',
                            title: 'Phòng được thêm thành công.'
                        })

                        this.refreshList();

                        this.bookings.push(response); // Sao chép mảng mới để tránh thay đổi trực tiếp giá trị của prop

                        // Cập nhật lại prop `bookings`
                        this.$emit('update:bookings', this.bookings);
                        
                    });
                } catch (error) {
                    console.log(error);
                }
            },
            async removeAllBookings() {
                if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
                    try {
                        await BookingService.deleteAll();
                        this.refreshList();
                    } catch (error) {
                        console.log(error);
                    }
                }
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

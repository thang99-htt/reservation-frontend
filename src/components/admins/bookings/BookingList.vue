<template>
    <table aria-describedby="example1_info" role="grid" id="" class="example1 table table-bordered table-striped dataTable">
        <thead>
            <tr role="row">
                <th aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending" colspan="1"
                    rowspan="1" aria-controls="example1" tabindex="0" class="sorting_asc">#</th>
                <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1"
                    tabindex="0" class="sorting">Khách hàng</th>
                <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1"
                    tabindex="0" class="sorting_asc">Phòng</th>
                <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1"
                    tabindex="0" class="sorting">Số lượng khách</th>
                <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1"
                    tabindex="0" class="sorting">Tổng tiền (VNĐ)</th>
                <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1"
                    tabindex="0" class="sorting">Ngày nhận</th>
                <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1"
                    tabindex="0" class="sorting">Ngày trả</th>
                <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1"
                    tabindex="0" class="sorting" style="width: 100px;">Thanh toán</th>
                <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1"
                    tabindex="0" class="sorting">Trạng thái</th>
                <th aria-label="Browser: activate to sort column ascending" colspan="1" rowspan="1" aria-controls="example1"
                    tabindex="0" class="sorting" style="width: 150px;">Tùy chọn</th>
            </tr>
        </thead>
        <tbody>
            <tr role="row" v-for="(booking, index) in bookingsList" :key="booking">
                <td class="sorting_1">
                    {{ index + 1 }}
                </td>
                <td>{{ booking.customer_name }}</td>
                <td>{{ booking.room_name }}</td>
                <td>{{ booking.num_of_guests }}</td>
                <td>{{ formatPrice(booking.total_price) }}</td>
                <td>{{ booking.checkin_date }}</td>
                <td>{{ booking.checkout_date }}</td>
                <td>
                    <span v-if="booking.paid == true" class="text-success">
                        Đã thanh toán
                    </span>
                    <span v-else class="text-danger">
                        Chưa thanh toán
                    </span>
                </td>
                <td>
                    <button v-if="booking.status == 'Đang chờ xử lý'" class="btn-booking-status booking-status1"
                        @click="updateStatus(booking)">
                        {{ booking.status }}
                    </button>
                    <button v-if="booking.status == 'Đã duyệt'" class="btn-booking-status booking-status2"
                        @click="updateStatus(booking)">
                        {{ booking.status }}
                    </button>
                    <button v-if="booking.status == 'Đã hủy'" :disabled="true" class="btn-booking-status booking-status3"
                        @click="updateStatus(booking)">
                        {{ booking.status }}
                    </button>
                    <button v-if="booking.status == 'Đang sử dụng'" class="btn-booking-status booking-status4"
                        @click="updateStatus(booking)">
                        {{ booking.status }}
                    </button>
                    <button v-if="booking.status == 'Đã hoàn thành'" :disabled="true" class="btn-booking-status booking-status5"
                        @click="updateStatus(booking)">
                        {{ booking.status }}
                    </button>
                </td>
                <td>
                    <button type="button" class="ms-2 btn btn-primary" @click="openModel(booking._id)">
                        <i class="fa fa-pen"></i>
                    </button>
                    <button type="button" class="ms-2 btn btn-danger" @click="deleteBooking(booking._id)">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <div v-if="myModel">
        <div class="modal d-block">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="updateAddressModalLabel">Hiệu chỉnh phòng</h5>
                        <button type="button" class="btn-close" @click="closeModel"></button>
                    </div>
                    <div class="modal-body">
                        <BookingForm :booking="booking" @submit:booking="updateBooking" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-bs'
import BookingService from "@/services/booking.service";
import BookingForm from "@/components/admins/bookings/BookingForm.vue";

export default {
    components: {
        BookingForm
    },
    props: {
        bookings: { type: Array, default: [] },
    },
    data() {
        return {
            myModel: false,
            bookingsList: this.bookings,
            room: {
                'name': "",
                'type': "",
                'price': "",
                'capacity': "",
            },
        };
    },
    watch: {
        bookings(newVal) {
            this.bookingsList = [...newVal]; // Sao chép mảng mới để tránh thay đổi trực tiếp giá trị của prop
            this.$nextTick(() => {
                $('.example1').DataTable().destroy();
                $(".example1").DataTable({
                    "language": {
                        "search": "Tìm kiếm:",
                        "loadingRecords": "Đang tải...",
                        "zeroRecords": "Không tìm thấy kết quả",
                        "lengthMenu": "Hiển thị _MENU_ bản ghi",
                        "info": "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
                        "paginate": {
                            "first": "Trang đầu",
                            "last": "Trang cuối",
                            "next": "Trang sau",
                            "previous": "Trang trước"
                        }
                    }
                })
            });
        },
    },
    mounted() {
        this.bookingsList = [...this.bookings];
        this.$nextTick(() => {
            $(".example1").DataTable({
                    "language": {
                        "search": "Tìm kiếm:",
                        "loadingRecords": "Đang tải...",
                        "zeroRecords": "Không tìm thấy kết quả",
                        "lengthMenu": "Hiển thị _MENU_ bản ghi",
                        "info": "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
                        "paginate": {
                            "first": "Trang đầu",
                            "last": "Trang cuối",
                            "next": "Trang sau",
                            "previous": "Trang trước"
                        }
                    }
                })
        })
    },
    beforeUpdate() {
        $('.example1').DataTable().destroy();
    },
    methods: {
        async openModel(id) {
            await BookingService.get(id).then((response) => {
                this.room = response;
            });
            this.myModel = true;
        },
        async closeModel() {
            this.myModel = false;
            // gán lại giá trị cho.bookingsList
            this.bookingsList = await BookingService.getAll();
            // cập nhật lại DataTable
            this.$nextTick(() => {
                $(".example1").DataTable({
                    "language": {
                        "search": "Tìm kiếm:",
                        "loadingRecords": "Đang tải...",
                        "zeroRecords": "Không tìm thấy kết quả",
                        "lengthMenu": "Hiển thị _MENU_ bản ghi",
                        "info": "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
                        "paginate": {
                            "first": "Trang đầu",
                            "last": "Trang cuối",
                            "next": "Trang sau",
                            "previous": "Trang trước"
                        }
                    }
                })
            });
        },
        formatPrice(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        async updateBooking(data) {
            try {
                await BookingService.update(data._id, data).then(async (response) => {
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

                    // gán lại giá trị cho.bookingsList
                    this.bookingsList = await BookingService.getAll();

                    // cập nhật lại DataTable
                    this.$nextTick(() => {
                        $(".example1").DataTable({
                            "language": {
                                "search": "Tìm kiếm:",
                                "loadingRecords": "Đang tải...",
                                "zeroRecords": "Không tìm thấy kết quả",
                                "lengthMenu": "Hiển thị _MENU_ bản ghi",
                                "info": "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
                                "paginate": {
                                    "first": "Trang đầu",
                                    "last": "Trang cuối",
                                    "next": "Trang sau",
                                    "previous": "Trang trước"
                                }
                            }
                        })
                    });

                    Toast.fire({
                        icon: 'success',
                        title: 'Phòng được cập nhật thành công.'
                    })

                    this.myModel = false;

                });
            } catch (error) {
                console.log(error);
            }
        },
        deleteRoom(id) {
            Swal.fire({
                title: 'Bạn có chắc?',
                text: "Bạn sẽ không thể hoàn tác lại điều này!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy'
            }).then((result) => {
                if (result.value) {
                    BookingService.delete(id).then(() => {
                        this.bookingsList = this.bookingsList.filter(room => room._id !== id);
                        this.$nextTick(() => {
                            $(".example1").DataTable({
                                "language": {
                                    "search": "Tìm kiếm:",
                                    "loadingRecords": "Đang tải...",
                                    "zeroRecords": "Không tìm thấy kết quả",
                                    "lengthMenu": "Hiển thị _MENU_ bản ghi",
                                    "info": "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
                                    "paginate": {
                                        "first": "Trang đầu",
                                        "last": "Trang cuối",
                                        "next": "Trang sau",
                                        "previous": "Trang trước"
                                    }
                                }
                            })
                        })
                        Swal.fire('Đã xóa thành công!', '', 'success');
                    });
                }
            })
        },
        async updateStatus(booking) {
                try {
                    await BookingService.updateStatus(booking._id).then(async (response) => {
                        // gán lại giá trị cho.bookingsList
                    this.bookingsList = await BookingService.getAll();
                    this.bookingsList.reverse();
                    // cập nhật lại DataTable
                    this.$nextTick(() => {
                        $(".example1").DataTable({
                            "language": {
                                "search": "Tìm kiếm:",
                                "loadingRecords": "Đang tải...",
                                "zeroRecords": "Không tìm thấy kết quả",
                                "lengthMenu": "Hiển thị _MENU_ bản ghi",
                                "info": "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
                                "paginate": {
                                    "first": "Trang đầu",
                                    "last": "Trang cuối",
                                    "next": "Trang sau",
                                    "previous": "Trang trước"
                                }
                            }
                        })
                    });

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
                        title: 'Trạng thái đơn phòng được cập nhật thành công.'
                    })
                    })                  

                } catch (error) {
                    console.log(error);
                }   
            },
    }
};
</script>

<style>
@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');
@import url('/static/css/bootstrap.min.css');

.form-inline {
    display: unset;
}

.navbar::before,
.navbar::after {
    content: unset;
}


.btn-booking-status {
    width: 125px;
    height: 30px;
    padding: 0 !important;
    font-size: 15px !important;
    color: #fff;
    border: none;
    border-radius: 4px;
}

.booking-status1 {
    background-color: #eb8108;
}

.booking-status2 {
    background-color: #009ec6;
}

.booking-status3 {
    background-color: #c60000;
}

.booking-status4 {
    background-color: #00b597;
}

.booking-status5 {
    background-color: #00862a;
}
</style>